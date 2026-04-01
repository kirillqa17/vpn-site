import { useState, useEffect, useCallback } from 'react'
import { Mail, Eye, EyeOff, ArrowLeft, Newspaper, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { loginWithEmail, registerWithEmail, verifyEmail, forgotPassword, resetPassword } from '../api/auth'
import { getNews, type NewsPost } from '../api/news'
import { BOT_USERNAME } from '../utils/constants'
import SupportChatWidget from '../components/SupportChatWidget'

type Screen = 'login' | 'register' | 'verify' | 'forgot' | 'reset'

export default function LoginPage() {
  const { setAuth } = useAuthStore()

  const [screen, setScreen] = useState<Screen>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [news, setNews] = useState<NewsPost[]>([])
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  useEffect(() => {
    getNews().then(setNews).catch(() => {})
  }, [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const referralId = (() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    return ref ? parseInt(ref, 10) : undefined
  })()

  const startResendTimer = useCallback(() => {
    setResendTimer(60)
  }, [])

  useEffect(() => {
    if (resendTimer <= 0) return
    const interval = setInterval(() => setResendTimer(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [resendTimer])

  const handleResendCode = async () => {
    if (resendTimer > 0) return
    try {
      if (screen === 'verify') {
        await registerWithEmail(email, password)
      } else if (screen === 'reset') {
        await forgotPassword(email)
      }
      startResendTimer()
      setInfo('Код отправлен повторно')
    } catch (err: any) {
      setError(parseError(err, 'Не удалось отправить код'))
    }
  }

  const parseError = (err: any, fallback: string) => {
    const data = err?.response?.data
    if (typeof data === 'string') return data
    if (data?.error) return data.error
    if (data?.message) return data.message
    const status = err?.response?.status
    if (status === 409) return 'Аккаунт с таким email уже существует'
    if (status === 401) return 'Неверный email или пароль'
    if (status === 403) return 'Email не подтверждён. Проверьте почту'
    if (status === 429) return 'Подождите минуту перед повторной отправкой'
    if (status === 400) return 'Неверный или просроченный код'
    return fallback
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) { setError('Заполните все поля'); return }

    setIsSubmitting(true)
    try {
      const { token, telegram_id } = await loginWithEmail(email, password)
      localStorage.setItem('auth', JSON.stringify({ token, telegramId: telegram_id }))
      setAuth(token, telegram_id)
    } catch (err: any) {
      if (err?.response?.status === 403) {
        setScreen('verify')
        setInfo('Email не подтверждён. Проверьте почту или запросите новый код при регистрации.')
      } else {
        setError(parseError(err, 'Неверный email или пароль'))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) { setError('Заполните все поля'); return }
    if (password !== confirmPassword) { setError('Пароли не совпадают'); return }
    if (password.length < 6) { setError('Пароль должен быть не менее 6 символов'); return }

    setIsSubmitting(true)
    try {
      await registerWithEmail(email, password, referralId)
      setScreen('verify')
      startResendTimer()
      setInfo(`Код подтверждения отправлен на ${email}`)
      setError('')
    } catch (err: any) {
      setError(parseError(err, 'Ошибка регистрации'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (code.length !== 6) { setError('Введите 6-значный код'); return }

    setIsSubmitting(true)
    try {
      const { token, telegram_id } = await verifyEmail(email, code)
      localStorage.setItem('auth', JSON.stringify({ token, telegramId: telegram_id }))
      setAuth(token, telegram_id)
    } catch (err: any) {
      setError(parseError(err, 'Неверный или просроченный код'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError('Введите email'); return }

    setIsSubmitting(true)
    try {
      await forgotPassword(email)
      setScreen('reset')
      startResendTimer()
      setInfo(`Код для сброса пароля отправлен на ${email}`)
      setError('')
    } catch (err: any) {
      setError(parseError(err, 'Ошибка отправки'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (code.length !== 6) { setError('Введите 6-значный код'); return }
    if (newPassword.length < 6) { setError('Пароль должен быть не менее 6 символов'); return }

    setIsSubmitting(true)
    try {
      await resetPassword(email, code, newPassword)
      setScreen('login')
      setInfo('Пароль изменён. Войдите с новым паролем.')
      setError('')
      setCode('')
      setNewPassword('')
    } catch (err: any) {
      setError(parseError(err, 'Неверный или просроченный код'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    setScreen('login')
    setError('')
    setInfo('')
    setCode('')
  }

  return (
    <div className="min-h-screen bg-surface-950 relative">
      {/* News sidebar — fixed left on desktop, below form on mobile */}
      {news.length > 0 && (
        <div className="hidden lg:block fixed left-0 top-0 w-[340px] h-screen overflow-y-auto p-6 space-y-3 scrollbar-hide">
          <div className="flex items-center gap-2 text-surface-400">
            <Newspaper className="w-4 h-4" />
            <span className="text-sm font-medium">Новости</span>
          </div>
          {news.slice(0, 10).map((post) => {
            const isExpanded = expandedPost === post.id
            const isLong = post.text.length > 120
            return (
              <div
                key={post.id}
                className="glass-card p-4 space-y-2 text-left cursor-pointer hover:border-surface-600 transition-colors"
                onClick={() => setExpandedPost(isExpanded ? null : post.id)}
              >
                <p className={`text-sm text-surface-200 whitespace-pre-wrap leading-relaxed ${!isExpanded && isLong ? 'line-clamp-3' : ''}`}>
                  {post.text}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-surface-500">
                    {new Date(post.date).toLocaleDateString('ru-RU', {
                      day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                  {isLong && (
                    isExpanded
                      ? <ChevronUp className="w-3.5 h-3.5 text-surface-500" />
                      : <ChevronDown className="w-3.5 h-3.5 text-surface-500" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Auth form — absolute center of viewport */}
      <div className="fixed inset-0 flex flex-col items-center justify-center px-4 py-8 z-10 pointer-events-none">
      <div className="pointer-events-auto">
      <div className="max-w-sm w-full text-center space-y-8">
        <div className="space-y-3">
          <img src="/logo.jpg" alt="SvoiVPN" className="w-20 h-20 mx-auto rounded-2xl" />
          <h1 className="text-3xl font-bold tracking-tight">SvoiVPN</h1>
          <p className="text-surface-400 text-sm">
            Безопасный VPN для всех ваших устройств
          </p>
        </div>

        <div className="glass-card p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 justify-center text-surface-300">
            {(screen === 'verify' || screen === 'forgot' || screen === 'reset') && (
              <button onClick={goBack} className="absolute left-6">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Mail className="w-4 h-4" />
            <p className="text-sm font-medium">
              {screen === 'login' && 'Войти по email'}
              {screen === 'register' && 'Создать аккаунт'}
              {screen === 'verify' && 'Подтверждение email'}
              {screen === 'forgot' && 'Восстановление пароля'}
              {screen === 'reset' && 'Новый пароль'}
            </p>
          </div>

          {/* Info message */}
          {info && <p className="text-blue-400 text-xs">{info}</p>}

          {/* Login form */}
          {screen === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3">
              <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)} className="input-field" autoComplete="email" />
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Пароль" value={password}
                  onChange={(e) => setPassword(e.target.value)} className="input-field pr-10" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="button" onClick={() => { setScreen('forgot'); setError(''); setInfo('') }}
                className="text-xs text-surface-500 hover:text-white transition-colors">
                Забыли пароль?
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Вход...' : 'Войти'}
              </button>
            </form>
          )}

          {/* Register form */}
          {screen === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)} className="input-field" autoComplete="email" />
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Пароль" value={password}
                  onChange={(e) => setPassword(e.target.value)} className="input-field pr-10" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <input type={showPassword ? 'text' : 'password'} placeholder="Подтвердите пароль" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" autoComplete="new-password" />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Создание...' : 'Создать аккаунт'}
              </button>
            </form>
          )}

          {/* Verify code form */}
          {screen === 'verify' && (
            <form onSubmit={handleVerify} className="space-y-3">
              <input type="text" placeholder="Код подтверждения" value={code} maxLength={6}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="input-field text-center text-2xl tracking-[0.3em]" autoComplete="one-time-code" />
              <p className="text-surface-500 text-[11px]">Проверьте папку Спам, если письмо не пришло</p>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Проверка...' : 'Подтвердить'}
              </button>
              <button type="button" onClick={handleResendCode} disabled={resendTimer > 0}
                className="text-xs text-surface-400 hover:text-white transition-colors w-full">
                {resendTimer > 0 ? `Отправить ещё раз (${resendTimer}с)` : 'Отправить код ещё раз'}
              </button>
            </form>
          )}

          {/* Forgot password form */}
          {screen === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-3">
              <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)} className="input-field" autoComplete="email" />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Отправка...' : 'Отправить код'}
              </button>
            </form>
          )}

          {/* Reset password form */}
          {screen === 'reset' && (
            <form onSubmit={handleReset} className="space-y-3">
              <input type="text" placeholder="Код из письма" value={code} maxLength={6}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="input-field text-center text-2xl tracking-[0.3em]" autoComplete="one-time-code" />
              <input type="password" placeholder="Новый пароль" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} className="input-field" autoComplete="new-password" />
              <p className="text-surface-500 text-[11px]">Проверьте папку Спам, если письмо не пришло</p>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Сброс...' : 'Сбросить пароль'}
              </button>
              <button type="button" onClick={handleResendCode} disabled={resendTimer > 0}
                className="text-xs text-surface-400 hover:text-white transition-colors w-full">
                {resendTimer > 0 ? `Отправить ещё раз (${resendTimer}с)` : 'Отправить код ещё раз'}
              </button>
            </form>
          )}

          {/* Toggle login/register */}
          {(screen === 'login' || screen === 'register') && (
            <button onClick={() => { setScreen(screen === 'login' ? 'register' : 'login'); setError(''); setInfo('') }}
              className="text-sm text-surface-400 hover:text-white transition-colors">
              {screen === 'register' ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
            </button>
          )}
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-surface-800" />
          <span className="text-xs text-surface-600">или</span>
          <div className="flex-1 h-px bg-surface-800" />
        </div>

        {/* Telegram login */}
        <div className="glass-card p-6 space-y-4">
          <a href={`https://t.me/${BOT_USERNAME}?start=web_auth`} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            Войти через Telegram
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-surface-600">
          <a href={`https://t.me/${BOT_USERNAME}`} target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">Telegram-бот</a>
          <span>·</span>
          <a href="https://t.me/svoivpnnews" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">Новости</a>
        </div>
      </div>

      </div>
      </div>

      {/* News on mobile — below form */}
      {news.length > 0 && (
        <div className="lg:hidden max-w-sm w-full space-y-3 px-4 pb-8 mx-auto">
          <div className="flex items-center gap-2 text-surface-400">
            <Newspaper className="w-4 h-4" />
            <span className="text-sm font-medium">Новости</span>
          </div>
          {news.slice(0, 5).map((post) => {
            const isExpanded = expandedPost === post.id
            const isLong = post.text.length > 120
            return (
              <div key={post.id} className="glass-card p-4 space-y-2 text-left cursor-pointer" onClick={() => setExpandedPost(isExpanded ? null : post.id)}>
                <p className={`text-sm text-surface-200 whitespace-pre-wrap leading-relaxed ${!isExpanded && isLong ? 'line-clamp-3' : ''}`}>{post.text}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-surface-500">{new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                  {isLong && (isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-surface-500" /> : <ChevronDown className="w-3.5 h-3.5 text-surface-500" />)}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <SupportChatWidget />
    </div>
  )
}
