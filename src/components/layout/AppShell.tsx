import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import BottomNav from './BottomNav'
import { Shield } from 'lucide-react'
import { useEffect } from 'react'

export default function AppShell() {
  const { isMiniApp, tg } = useTelegram()
  const location = useLocation()
  const navigate = useNavigate()
  const isRoot = location.pathname === '/'

  useEffect(() => {
    if (!isMiniApp || !tg) return
    tg.ready()
    tg.expand()
  }, [isMiniApp, tg])

  useEffect(() => {
    if (!isMiniApp || !tg) return
    if (isRoot) {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
      const handler = () => navigate(-1)
      tg.BackButton.onClick(handler)
      return () => tg.BackButton.offClick(handler)
    }
  }, [isMiniApp, tg, isRoot, navigate])

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      {!isMiniApp && (
        <header className="sticky top-0 z-50 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800">
          <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-white" />
              <span className="font-bold text-lg">SvoiVPN</span>
            </button>
          </div>
        </header>
      )}

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 pb-24">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}
