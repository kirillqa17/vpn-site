import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Clock, Smartphone, ChevronRight, Zap, AlertTriangle } from 'lucide-react'
import { getMe } from '../api/user'
import { formatDate, daysUntil, isExpired, isExpiringSoon } from '../utils/formatDate'
import { TARIFF_NAMES } from '../utils/constants'
import { useTelegram } from '../hooks/useTelegram'
import Spinner from '../components/ui/Spinner'
import FirstPurchaseBonusBanner from '../components/FirstPurchaseBonusBanner'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { haptic } = useTelegram()
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="text-center py-20 text-surface-400">
        <p>Не удалось загрузить данные</p>
        <button onClick={() => window.location.reload()} className="btn-secondary mt-4">
          Повторить
        </button>
      </div>
    )
  }

  const expired = isExpired(user.subscription_end)
  const expiringSoon = isExpiringSoon(user.subscription_end)
  const days = daysUntil(user.subscription_end)
  const planName = TARIFF_NAMES[user.plan] || user.plan

  return (
    <div className="space-y-4 animate-fade-in">
      <FirstPurchaseBonusBanner
        eligible={user.first_purchase_bonus_eligible}
        daysLeft={user.first_purchase_bonus_days_left}
      />

      {/* Status Card */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="SvoiVPN" className={`w-10 h-10 rounded-xl ${expired ? 'opacity-50 grayscale' : ''}`} />
            <div>
              <h2 className="font-semibold text-lg">SvoiVPN</h2>
              <p className="text-sm text-surface-400">{planName}</p>
            </div>
          </div>
          <span className={expired ? 'badge-inactive' : expiringSoon ? 'badge-expiring' : 'badge-active'}>
            {expired ? 'Неактивна' : expiringSoon ? 'Истекает' : 'Активна'}
          </span>
        </div>

        {!expired && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-surface-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Действует до
              </span>
              <span className="text-surface-200">{formatDate(user.subscription_end)}</span>
            </div>
            <div className="w-full bg-surface-800 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  expiringSoon ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
                style={{ width: `${Math.min(100, (days / 30) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-surface-500 text-right">
              {days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}
            </p>
          </div>
        )}

        {expired && (
          <div className="mt-2">
            <p className="text-sm text-surface-400 mb-3">Подписка неактивна. Приобретите тариф для подключения.</p>
            <button
              onClick={() => { haptic?.selectionChanged(); navigate('/buy') }}
              className="btn-primary w-full"
            >
              Купить подписку
            </button>
          </div>
        )}
      </div>

      {/* Expiring warning */}
      {expiringSoon && (
        <div className="glass-card p-4 border-amber-500/30">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-amber-200">Подписка скоро истекает</p>
              <p className="text-xs text-surface-400 mt-0.5">Продлите, чтобы не потерять доступ</p>
            </div>
            <button
              onClick={() => { haptic?.selectionChanged(); navigate('/buy') }}
              className="text-sm font-medium text-white px-3 py-1.5 rounded-lg bg-surface-800"
            >
              Продлить
            </button>
          </div>
        </div>
      )}

      {/* PRO badge */}
      {user.is_pro && (
        <div className="glass-card p-4 border-surface-600">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-white" />
            <div>
              <p className="text-sm font-medium">PRO режим активен</p>
              <p className="text-xs text-surface-400">Reality, XHTTP, gRPC, Trojan, Shadowsocks</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="space-y-2">
        {[
          { label: 'Установка', sub: 'Подключить устройство', icon: Smartphone, path: '/setup' },
          { label: 'Устройства', sub: `Подключено: ${user.device_limit}`, icon: Smartphone, path: '/devices' },
        ].map(({ label, sub, icon: Icon, path }) => (
          <button
            key={path}
            onClick={() => { haptic?.selectionChanged(); navigate(path) }}
            className="glass-card-hover w-full p-4 flex items-center gap-3 text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-surface-800 flex items-center justify-center">
              <Icon className="w-4.5 h-4.5 text-surface-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-surface-500">{sub}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-surface-600" />
          </button>
        ))}
      </div>

      {/* Auto-renew info */}
      {user.auto_renew && (
        <div className="glass-card p-4">
          <p className="text-xs text-surface-500">
            Автопродление включено — {TARIFF_NAMES[user.auto_renew_plan] || user.auto_renew_plan}
          </p>
        </div>
      )}

      {/* Links */}
      <div className="flex items-center justify-center gap-4 text-xs text-surface-600 pt-2">
        <a href="https://t.me/svoivless_bot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram-бот</a>
        <span>·</span>
        <a href="https://t.me/svoivpnnews" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Новости</a>
        <span>·</span>
        <a href="https://t.me/svoivpn_help_bot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Поддержка</a>
      </div>
    </div>
  )
}
