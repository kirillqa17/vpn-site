import { useEffect, useRef } from 'react'
import { Shield } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { loginWithTelegramWidget } from '../api/auth'
import { BOT_USERNAME } from '../utils/constants'

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setAuth } = useAuthStore()

  useEffect(() => {
    ;(window as any).onTelegramAuth = async (authData: Record<string, string>) => {
      try {
        const { token, telegram_id } = await loginWithTelegramWidget(authData)
        localStorage.setItem('auth', JSON.stringify({ token, telegramId: telegram_id }))
        setAuth(token, telegram_id)
      } catch {
        alert('Ошибка авторизации. Попробуйте ещё раз.')
      }
    }

    if (containerRef.current) {
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?22'
      script.async = true
      script.setAttribute('data-telegram-login', BOT_USERNAME)
      script.setAttribute('data-size', 'large')
      script.setAttribute('data-radius', '12')
      script.setAttribute('data-onauth', 'onTelegramAuth(user)')
      script.setAttribute('data-request-access', 'write')
      containerRef.current.appendChild(script)
    }
  }, [setAuth])

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-8">
        <div className="space-y-3">
          <Shield className="w-14 h-14 text-white mx-auto" />
          <h1 className="text-3xl font-bold">SvoiVPN</h1>
          <p className="text-surface-400 text-sm">
            Безопасный VPN для всех ваших устройств
          </p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <p className="text-sm text-surface-300">
            Войдите через Telegram для доступа к панели управления
          </p>
          <div ref={containerRef} className="flex justify-center" />
        </div>

        <p className="text-xs text-surface-600">
          Нет аккаунта? Напишите{' '}
          <a
            href={`https://t.me/${BOT_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-surface-400 hover:text-white transition-colors"
          >
            @{BOT_USERNAME}
          </a>
        </p>
      </div>
    </div>
  )
}
