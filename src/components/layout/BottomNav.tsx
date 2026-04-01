import { useLocation, useNavigate } from 'react-router-dom'
import { Home, ShoppingCart, Smartphone, Settings, Users, Newspaper } from 'lucide-react'
import { useTelegram } from '../../hooks/useTelegram'

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Главная' },
  { path: '/buy', icon: ShoppingCart, label: 'Тарифы' },
  { path: '/devices', icon: Smartphone, label: 'Устройства' },
  { path: '/referral', icon: Users, label: 'Рефералы' },
  { path: '/news', icon: Newspaper, label: 'Новости' },
  { path: '/settings', icon: Settings, label: 'Настройки' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { haptic } = useTelegram()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-950/90 backdrop-blur-xl border-t border-surface-800 safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const isActive = pathname === path
          return (
            <button
              key={path}
              onClick={() => {
                haptic?.selectionChanged()
                navigate(path)
              }}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-surface-500 hover:text-surface-300'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
