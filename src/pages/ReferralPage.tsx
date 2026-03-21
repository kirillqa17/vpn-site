import { useQuery } from '@tanstack/react-query'
import { Users, Copy, Check, Gift, Trophy, User, CircleDollarSign } from 'lucide-react'
import { getReferralInfo } from '../api/user'
import { useTelegram } from '../hooks/useTelegram'
import Spinner from '../components/ui/Spinner'
import { useState } from 'react'
import { BOT_USERNAME, TARIFF_NAMES } from '../utils/constants'

const MILESTONES = [
  { count: 5, reward: '365 дней подписки (Семейный)' },
  { count: 10, reward: 'Безлимитная подписка (Семейный)' },
]

export default function ReferralPage() {
  const { haptic } = useTelegram()
  const [copied, setCopied] = useState<string | false>(false)

  const { data, isLoading } = useQuery({
    queryKey: ['referral'],
    queryFn: getReferralInfo,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data) return null

  const botLink = data.invite_link || `https://t.me/${BOT_USERNAME}?start=${data.telegram_id}`
  const webLink = data.web_invite_link || `https://site.svoivpn.online/?ref=${data.telegram_id}`

  async function copyLink(link: string, label: string) {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(label)
      haptic?.notificationOccurred('success')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      haptic?.notificationOccurred('error')
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold">Рефералы</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="glass-card p-4 text-center">
          <Users className="w-5 h-5 text-surface-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{data.referrals_count}</p>
          <p className="text-xs text-surface-500 mt-1">Приглашено</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Trophy className="w-5 h-5 text-surface-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{data.payed_refs}</p>
          <p className="text-xs text-surface-500 mt-1">Оплатили</p>
        </div>
      </div>

      {/* Invite links */}
      <div className="glass-card p-4 space-y-3">
        <p className="text-sm font-medium">Реферальная ссылка (Telegram)</p>
        <div className="flex gap-2">
          <code className="flex-1 bg-surface-800 rounded-lg px-3 py-2.5 text-xs text-surface-300 overflow-hidden text-ellipsis whitespace-nowrap">
            {botLink}
          </code>
          <button
            onClick={() => copyLink(botLink, 'bot')}
            className="btn-secondary px-3 py-2"
          >
            {copied === 'bot' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="glass-card p-4 space-y-3">
        <p className="text-sm font-medium">Реферальная ссылка (Сайт)</p>
        <div className="flex gap-2">
          <code className="flex-1 bg-surface-800 rounded-lg px-3 py-2.5 text-xs text-surface-300 overflow-hidden text-ellipsis whitespace-nowrap">
            {webLink}
          </code>
          <button
            onClick={() => copyLink(webLink, 'web')}
            className="btn-secondary px-3 py-2"
          >
            {copied === 'web' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bonuses */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-surface-400" />
          <p className="text-sm font-medium">Бонусы</p>
        </div>
        <div className="space-y-2 text-sm text-surface-400">
          <p>Ваш друг оплатит подписку:</p>
          <div className="space-y-1.5 pl-2">
            <p>+15 дней — другу</p>
            <p>+30 дней — вам</p>
          </div>
        </div>
      </div>

      {/* Referral list */}
      {data.referrals && data.referrals.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-surface-400 font-medium">Ваши рефералы</p>
          <div className="glass-card divide-y divide-surface-800">
            {data.referrals.map((ref) => (
              <div key={ref.telegram_id} className="flex items-center gap-3 p-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  ref.has_paid ? 'bg-emerald-500/15' : 'bg-surface-800'
                }`}>
                  <User className={`w-4 h-4 ${ref.has_paid ? 'text-emerald-400' : 'text-surface-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {ref.username ? `@${ref.username}` : `ID: ${ref.telegram_id}`}
                  </p>
                  {ref.plan && (
                    <p className="text-xs text-surface-500">{TARIFF_NAMES[ref.plan] || ref.plan}</p>
                  )}
                </div>
                {ref.has_paid ? (
                  <span className="badge-active flex items-center gap-1 text-xs">
                    <CircleDollarSign className="w-3 h-3" />
                    Оплатил
                  </span>
                ) : (
                  <span className="text-xs text-surface-500">Не оплатил</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="space-y-2">
        <p className="text-sm text-surface-400 font-medium">Достижения</p>
        {MILESTONES.map(({ count, reward }) => {
          const achieved = data.payed_refs >= count
          return (
            <div
              key={count}
              className={`glass-card p-4 flex items-center gap-3 ${
                achieved ? 'border-emerald-500/20' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                achieved ? 'bg-emerald-500/15 text-emerald-400' : 'bg-surface-800 text-surface-500'
              }`}>
                {achieved ? <Check className="w-4 h-4" /> : count}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {count} оплативших рефералов
                </p>
                <p className="text-xs text-surface-500">{reward}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
