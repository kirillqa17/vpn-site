import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import { useTelegram } from './hooks/useTelegram'
import { loginWithTelegram } from './api/auth'
import AppShell from './components/layout/AppShell'
import DashboardPage from './pages/DashboardPage'
import BuyPage from './pages/BuyPage'
import DevicesPage from './pages/DevicesPage'
import SetupPage from './pages/SetupPage'
import ReferralPage from './pages/ReferralPage'
import SettingsPage from './pages/SettingsPage'
import NewsPage from './pages/NewsPage'
import LoginPage from './pages/LoginPage'
import Spinner from './components/ui/Spinner'

export default function App() {
  const { isAuthenticated, isLoading, setAuth, clearAuth, setLoading } = useAuthStore()
  const { isMiniApp, initData } = useTelegram()

  useEffect(() => {
    // Dev mode: skip auth on localhost
    if (import.meta.env.DEV) {
      setAuth('dev-token', 0)
      return
    }

    const saved = localStorage.getItem('auth')
    if (saved) {
      try {
        const { token, telegramId } = JSON.parse(saved)
        if (token && telegramId) {
          setAuth(token, telegramId)
          return
        }
      } catch {}
    }

    if (isMiniApp && initData) {
      loginWithTelegram(initData)
        .then(({ token, telegram_id }) => {
          localStorage.setItem('auth', JSON.stringify({ token, telegramId: telegram_id }))
          setAuth(token, telegram_id)
        })
        .catch(() => clearAuth())
    } else {
      setLoading(false)
    }
  }, [isMiniApp, initData, setAuth, clearAuth, setLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/news" element={<NewsPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
