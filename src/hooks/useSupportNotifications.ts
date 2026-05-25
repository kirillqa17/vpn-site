// /Users/kirill/SvoiVPN/vpn-web/src/hooks/useSupportNotifications.ts
import { useEffect, useRef, useState } from 'react'
import { getSupportHistory } from '../api/support'

const POLL_INTERVAL_MS = 30_000 // 30 seconds
const LAST_SEEN_KEY = 'support_last_seen_idx'
const CHIME_URL = '/audio/chime.mp3'

// Survive Strict-Mode double-mount: cache audio element on window.
function getChime(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { __svoivpn_chime?: HTMLAudioElement }
  if (!w.__svoivpn_chime) {
    const a = new Audio(CHIME_URL)
    a.preload = 'auto'
    w.__svoivpn_chime = a
  }
  return w.__svoivpn_chime
}

function playChime() {
  const a = getChime()
  if (!a) return
  a.currentTime = 0
  a.play().catch(() => {
    /* autoplay blocked; ignored — user must interact with site first */
  })
}

function flashTitle(unreadCount: number) {
  const w = window as unknown as {
    __svoivpn_flash_timer?: number
    __svoivpn_orig_title?: string
  }
  if (w.__svoivpn_flash_timer) return // already flashing
  if (!w.__svoivpn_orig_title) {
    w.__svoivpn_orig_title = document.title
  }
  const orig = w.__svoivpn_orig_title
  let toggle = true
  w.__svoivpn_flash_timer = window.setInterval(() => {
    document.title = toggle
      ? `(${unreadCount}) Поддержка | SvoiVPN`
      : orig
    toggle = !toggle
  }, 1500)

  const onVis = () => {
    if (document.visibilityState === 'visible') stop()
  }
  const stop = () => {
    if (w.__svoivpn_flash_timer) {
      window.clearInterval(w.__svoivpn_flash_timer)
      w.__svoivpn_flash_timer = undefined
    }
    document.title = orig
    document.removeEventListener('visibilitychange', onVis)
  }
  document.addEventListener('visibilitychange', onVis)
}

export interface SupportNotificationsState {
  unreadCount: number
  totalCount: number
  markAllRead: () => void
}

/**
 * Persistent support-chat poller. Mount once in AppShell.
 *
 * - Polls /history every 30s
 * - Computes unreadCount = totalCount - localStorage.support_last_seen_idx
 * - On new admin msg: chime (if visible) or title-flash (if hidden)
 */
export function useSupportNotifications(): SupportNotificationsState {
  const [totalCount, setTotalCount] = useState(0)
  const [lastSeen, setLastSeen] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    const v = window.localStorage.getItem(LAST_SEEN_KEY)
    return v ? parseInt(v, 10) || 0 : 0
  })
  // Track last admin-message identity to detect "new admin reply" (not just count growth).
  const lastAdminMsgRef = useRef<string | null>(null)
  const firstTickRef = useRef(true)

  useEffect(() => {
    let mounted = true

    const tick = async () => {
      try {
        const h = await getSupportHistory()
        if (!mounted) return
        const total = h.messages.length
        setTotalCount(total)

        // Find latest admin message for change-detection.
        let latestAdmin: string | null = null
        for (let i = h.messages.length - 1; i >= 0; i--) {
          if (h.messages[i].role === 'admin') {
            latestAdmin = `${h.messages[i].created_at}:${h.messages[i].content.slice(0, 32)}`
            break
          }
        }

        // First tick = baseline, no chime even if unread.
        if (firstTickRef.current) {
          firstTickRef.current = false
          lastAdminMsgRef.current = latestAdmin
          return
        }

        if (latestAdmin && latestAdmin !== lastAdminMsgRef.current) {
          lastAdminMsgRef.current = latestAdmin
          if (document.visibilityState === 'visible') {
            playChime()
          } else {
            const newLastSeen = window.localStorage.getItem(LAST_SEEN_KEY)
            const ls = newLastSeen ? parseInt(newLastSeen, 10) || 0 : 0
            flashTitle(Math.max(1, total - ls))
          }
        }
      } catch {
        // ignore — polling errors shouldn't crash app
      }
    }

    void tick()
    const id = window.setInterval(tick, POLL_INTERVAL_MS)
    return () => {
      mounted = false
      window.clearInterval(id)
    }
  }, [])

  const markAllRead = () => {
    setLastSeen(totalCount)
    window.localStorage.setItem(LAST_SEEN_KEY, String(totalCount))
  }

  return {
    unreadCount: Math.max(0, totalCount - lastSeen),
    totalCount,
    markAllRead,
  }
}
