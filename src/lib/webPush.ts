// /Users/kirill/SvoiVPN/vpn-web/src/lib/webPush.ts
import { subscribePush } from '../api/support'

/** Convert base64url VAPID key to Uint8Array (Web Push API requirement). */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = window.atob(base64)
  const arr = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i)
  return arr
}

/** Encode an ArrayBuffer to base64url for sending to backend. */
function bufToBase64Url(buf: ArrayBuffer | null): string {
  if (!buf) return ''
  const bytes = new Uint8Array(buf)
  let str = ''
  for (const b of bytes) str += String.fromCharCode(b)
  return window.btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export interface PushFlowResult {
  ok: boolean
  reason?: 'unsupported' | 'denied' | 'no_key' | 'error'
}

/**
 * Full opt-in flow: ask permission → register SW → subscribe → send to backend.
 * Returns ok=false with reason if anything stops the flow.
 */
export async function enableWebPush(): Promise<PushFlowResult> {
  if (
    !('serviceWorker' in navigator) ||
    !('PushManager' in window) ||
    !('Notification' in window)
  ) {
    return { ok: false, reason: 'unsupported' }
  }
  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
  if (!publicKey) {
    return { ok: false, reason: 'no_key' }
  }
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') {
    return { ok: false, reason: 'denied' }
  }
  try {
    const reg = await navigator.serviceWorker.register('/sw.js')
    await navigator.serviceWorker.ready
    let sub = await reg.pushManager.getSubscription()
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })
    }
    const p256dh = bufToBase64Url(sub.getKey('p256dh'))
    const auth = bufToBase64Url(sub.getKey('auth'))
    await subscribePush(
      { endpoint: sub.endpoint, keys: { p256dh, auth } },
      navigator.userAgent,
    )
    return { ok: true }
  } catch (e) {
    console.error('[webPush] enable failed:', e)
    return { ok: false, reason: 'error' }
  }
}

export function isPushSupported(): boolean {
  return (
    'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
  )
}

export function getPushPromptStatus(): 'shown' | 'denied' | 'granted' | 'never' {
  const v = window.localStorage.getItem('push_prompt_status')
  if (v === 'shown' || v === 'denied' || v === 'granted') return v
  return 'never'
}

export function setPushPromptStatus(s: 'shown' | 'denied' | 'granted'): void {
  window.localStorage.setItem('push_prompt_status', s)
}
