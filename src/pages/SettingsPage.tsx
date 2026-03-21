import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreditCard, Zap, RefreshCw, Trash2, Info, Calendar, Mail, Check } from 'lucide-react'
import { getMe } from '../api/user'
import { toggleAutoRenew, togglePro, unbindCard } from '../api/subscription'
import { linkEmail } from '../api/auth'
import { TARIFF_NAMES, DURATION_LABELS } from '../utils/constants'
import { useTelegram } from '../hooks/useTelegram'
import Toggle from '../components/ui/Toggle'
import Spinner from '../components/ui/Spinner'
import Modal from '../components/ui/Modal'
import { useState } from 'react'

export default function SettingsPage() {
  const { haptic } = useTelegram()
  const queryClient = useQueryClient()
  const [showUnbind, setShowUnbind] = useState(false)
  const [showProInfo, setShowProInfo] = useState(false)
  const [linkEmailValue, setLinkEmailValue] = useState('')
  const [linkPasswordValue, setLinkPasswordValue] = useState('')
  const [linkEmailError, setLinkEmailError] = useState('')
  const [linkEmailSuccess, setLinkEmailSuccess] = useState(false)

  const { data: user, isLoading } = useQuery({ queryKey: ['me'], queryFn: getMe })

  const autoRenewMutation = useMutation({
    mutationFn: (val: boolean) => toggleAutoRenew({ auto_renew: val }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      haptic?.notificationOccurred('success')
    },
  })

  const proMutation = useMutation({
    mutationFn: togglePro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      haptic?.notificationOccurred('success')
    },
  })

  const unbindMutation = useMutation({
    mutationFn: unbindCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      haptic?.notificationOccurred('success')
      setShowUnbind(false)
    },
  })

  const linkEmailMutation = useMutation({
    mutationFn: () => linkEmail(linkEmailValue, linkPasswordValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      haptic?.notificationOccurred('success')
      setLinkEmailValue('')
      setLinkPasswordValue('')
      setLinkEmailError('')
      setLinkEmailSuccess(true)
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.error || err?.response?.data?.message
      setLinkEmailError(msg || 'Не удалось привязать email')
    },
  })

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  const hasCard = !!user.payment_method_id

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold">Настройки</h1>

      {/* Card status */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-surface-400" />
            <div>
              <p className="text-sm font-medium">Карта</p>
              <p className="text-xs text-surface-500">
                {hasCard
                  ? user.card_last4
                    ? `•••• ${user.card_last4}`
                    : 'Привязана'
                  : 'Не привязана'}
              </p>
            </div>
          </div>
          {hasCard && (
            <button
              onClick={() => setShowUnbind(true)}
              className="p-2 rounded-lg hover:bg-red-500/10 text-surface-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Auto-renew */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-surface-400" />
            <div>
              <p className="text-sm font-medium">Автопродление</p>
              {user.auto_renew && user.auto_renew_plan && (
                <p className="text-xs text-surface-500">
                  {TARIFF_NAMES[user.auto_renew_plan] || user.auto_renew_plan}
                  {user.auto_renew_duration && ` / ${DURATION_LABELS[user.auto_renew_duration] || user.auto_renew_duration}`}
                </p>
              )}
            </div>
          </div>
          <Toggle
            enabled={user.auto_renew}
            onChange={(val) => autoRenewMutation.mutate(val)}
            disabled={(!hasCard && !user.auto_renew) || autoRenewMutation.isPending}
          />
        </div>
        {user.auto_renew && user.subscription_end && (
          <div className="flex items-center gap-2 text-xs text-surface-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Следующий платёж: {new Date(user.subscription_end).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        )}
        {!hasCard && (
          <p className="text-xs text-surface-500">
            Для автопродления необходимо привязать карту при оплате
          </p>
        )}
      </div>

      {/* PRO mode */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-surface-400" />
            <div>
              <p className="text-sm font-medium">PRO режим</p>
              <p className="text-xs text-surface-500">
                {user.is_pro ? 'Включён' : 'Выключен'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProInfo(true)}
              className="p-1.5 rounded-lg hover:bg-surface-800 text-surface-500"
            >
              <Info className="w-4 h-4" />
            </button>
            <Toggle
              enabled={user.is_pro}
              onChange={(val) => proMutation.mutate(val)}
              disabled={proMutation.isPending}
            />
          </div>
        </div>
      </div>

      {/* Link Email */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-surface-400" />
          <div>
            <p className="text-sm font-medium">Email для входа</p>
            <p className="text-xs text-surface-500">
              {user.email ? user.email : 'Не привязан'}
            </p>
          </div>
        </div>
        {user.email ? (
          <div className="flex items-center gap-2 text-xs text-green-400">
            <Check className="w-3.5 h-3.5" />
            <span>Email привязан</span>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                value={linkEmailValue}
                onChange={(e) => { setLinkEmailValue(e.target.value); setLinkEmailError(''); setLinkEmailSuccess(false) }}
                className="input-field text-sm"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={linkPasswordValue}
                onChange={(e) => { setLinkPasswordValue(e.target.value); setLinkEmailError(''); setLinkEmailSuccess(false) }}
                className="input-field text-sm"
              />
            </div>
            {linkEmailError && (
              <p className="text-red-400 text-xs">{linkEmailError}</p>
            )}
            {linkEmailSuccess && (
              <p className="text-green-400 text-xs">Email успешно привязан</p>
            )}
            <button
              onClick={() => {
                setLinkEmailError('')
                if (!linkEmailValue.trim() || !linkPasswordValue.trim()) {
                  setLinkEmailError('Заполните все поля')
                  return
                }
                if (linkPasswordValue.length < 6) {
                  setLinkEmailError('Пароль должен содержать минимум 6 символов')
                  return
                }
                linkEmailMutation.mutate()
              }}
              disabled={linkEmailMutation.isPending}
              className="btn-primary w-full text-sm"
            >
              {linkEmailMutation.isPending ? 'Привязка...' : 'Привязать email'}
            </button>
          </>
        )}
      </div>

      {/* Unbind confirmation */}
      <Modal open={showUnbind} onClose={() => setShowUnbind(false)} title="Отвязать карту?">
        <p className="text-sm text-surface-400 mb-4">
          Автопродление будет отключено. Вам нужно будет привязать карту заново при следующей оплате.
        </p>
        <div className="flex gap-2">
          <button onClick={() => setShowUnbind(false)} className="btn-secondary flex-1">
            Отмена
          </button>
          <button
            onClick={() => unbindMutation.mutate()}
            disabled={unbindMutation.isPending}
            className="flex-1 bg-red-500/15 text-red-400 border border-red-500/20 font-semibold rounded-xl px-6 py-3 transition-all hover:bg-red-500/25 active:scale-[0.98]"
          >
            {unbindMutation.isPending ? 'Удаление...' : 'Отвязать'}
          </button>
        </div>
      </Modal>

      {/* PRO info modal */}
      <Modal open={showProInfo} onClose={() => setShowProInfo(false)} title="PRO режим">
        <div className="space-y-3 text-sm text-surface-400">
          <p>PRO режим включает дополнительные протоколы подключения:</p>
          <div className="space-y-2">
            <div className="glass-card p-3">
              <p className="font-medium text-surface-200 mb-1">Без PRO</p>
              <p>Reality</p>
            </div>
            <div className="glass-card p-3 border-white/10">
              <p className="font-medium text-surface-200 mb-1">С PRO</p>
              <p>Reality, XHTTP, gRPC, Trojan, Shadowsocks</p>
            </div>
          </div>
          <p className="text-xs text-surface-500">
            Используйте PRO если основной протокол работает нестабильно.
          </p>
        </div>
      </Modal>
    </div>
  )
}
