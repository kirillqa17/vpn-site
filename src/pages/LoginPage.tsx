import { useState } from 'react'
import { Mail, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { loginWithEmail, registerWithEmail } from '../api/auth'
import { BOT_USERNAME } from '../utils/constants'

export default function LoginPage() {
  const { setAuth } = useAuthStore()

  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Read referral ID from URL (?ref=123)
  const referralId = (() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    return ref ? parseInt(ref, 10) : undefined
  })()

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
      const { token, telegram_id } = isRegister
        ? await registerWithEmail(email, password, referralId)
        : await loginWithEmail(email, password)
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
          <img src="/logo.jpg" alt="SvoiVPN" className="w-20 h-20 mx-auto rounded-2xl" />
          <h1 className="text-3xl font-bold tracking-tight">SvoiVPN</h1>
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

        {/* Telegram login */}
        <div className="glass-card p-6 space-y-4">
          <a
            href={`https://t.me/${BOT_USERNAME}?start=web_auth`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            Войти через Telegram
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-surface-600">
          <a
            href={`https://t.me/${BOT_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Telegram-бот
          </a>
          <span>·</span>
          <a
            href="https://t.me/svoivpnnews"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Новости
          </a>
        </div>
      </div>
    </div>
  )
}
