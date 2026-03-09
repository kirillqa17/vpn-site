import { useMemo } from 'react'

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
          }
          start_param?: string
        }
        version: string
        platform: string
        colorScheme: 'light' | 'dark'
        themeParams: Record<string, string>
        viewportHeight: number
        viewportStableHeight: number
        isExpanded: boolean
        ready: () => void
        expand: () => void
        close: () => void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          setText: (text: string) => void
          onClick: (cb: () => void) => void
          offClick: (cb: () => void) => void
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
        }
        BackButton: {
          isVisible: boolean
          onClick: (cb: () => void) => void
          offClick: (cb: () => void) => void
          show: () => void
          hide: () => void
        }
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy') => void
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void
          selectionChanged: () => void
        }
        openLink: (url: string) => void
        showConfirm: (message: string, cb: (ok: boolean) => void) => void
        showAlert: (message: string, cb?: () => void) => void
      }
    }
  }
}

export function useTelegram() {
  const tg = window.Telegram?.WebApp
  const isMiniApp = !!tg?.initData

  const user = useMemo(() => tg?.initDataUnsafe?.user, [tg])

  return {
    tg,
    isMiniApp,
    user,
    initData: tg?.initData ?? '',
    platform: tg?.platform ?? 'web',
    haptic: tg?.HapticFeedback,
  }
}
