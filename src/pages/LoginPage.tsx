import { useEffect, useRef, useState } from 'react'
import { Shield, Mail, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { loginWithTelegramWidget, loginWithEmail, registerWithEmail } from '../api/auth'
import { BOT_USERNAME } from '../utils/constants'

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setAuth } = useAuthStore()

  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Заполните все поля')
      return
    }

    if (isRegister && password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    if (isRegister && password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return
    }

    setIsSubmitting(true)
    try {
      const fn = isRegister ? registerWithEmail : loginWithEmail
      const { token, telegram_id } = await fn(email, password)
      localStorage.setItem('auth', JSON.stringify({ token, telegramId: telegram_id }))
      setAuth(token, telegram_id)
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.response?.data?.message
      setError(msg || (isRegister ? 'Ошибка регистрации' : 'Неверный email или пароль'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleMode = () => {
    setIsRegister(!isRegister)
    setError('')
    setConfirmPassword('')
  }

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

        {/* Email auth form */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 justify-center text-surface-300">
            <Mail className="w-4 h-4" />
            <p className="text-sm font-medium">
              {isRegister ? 'Создать аккаунт' : 'Войти по email'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              autoComplete="email"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-10"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {isRegister && (
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                autoComplete="new-password"
              />
            )}

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting
                ? (isRegister ? 'Создание...' : 'Вход...')
                : (isRegister ? 'Создать аккаунт' : 'Войти')}
            </button>
          </form>

          <button
            onClick={toggleMode}
            className="text-sm text-surface-400 hover:text-white transition-colors"
          >
            {isRegister
              ? 'Уже есть аккаунт? Войти'
              : 'Нет аккаунта? Зарегистрироваться'}
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-surface-800" />
          <span className="text-xs text-surface-600">или</span>
          <div className="flex-1 h-px bg-surface-800" />
        </div>

        {/* Telegram widget */}
        <div className="glass-card p-6 space-y-4">
          <p className="text-sm text-surface-300">
            Войдите через Telegram
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
