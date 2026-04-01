import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import BottomNav from './BottomNav'
import SupportChatWidget from '../SupportChatWidget'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AppShell() {
  const { isMiniApp, tg } = useTelegram()
  const location = useLocation()
  const navigate = useNavigate()
  const isRoot = location.pathname === '/'
  const [maintenance, setMaintenance] = useState<{ enabled: boolean; message: string }>({ enabled: false, message: '' })

  useEffect(() => {
    axios.get('/api/app/maintenance').then(({ data }) => {
      setMaintenance({ enabled: data.maintenance, message: data.message || 'Ведутся технические работы' })
    }).catch(() => {})
  }, [])

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
              <img src="/logo.jpg" alt="SvoiVPN" className="w-7 h-7 rounded-lg" />
              <span className="font-bold text-lg tracking-tight">SvoiVPN</span>
            </button>
          </div>
        </header>
      )}

      {maintenance.enabled && (
        <div className="bg-red-500/90 text-white text-center text-sm py-2 px-4">
          {maintenance.message}
        </div>
      )}

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 pb-24">
        <Outlet />
      </main>

      <SupportChatWidget />
      <BottomNav />
    </div>
  )
}
