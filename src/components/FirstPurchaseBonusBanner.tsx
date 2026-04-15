import { Gift, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props {
  eligible: boolean | undefined
  daysLeft: number | null | undefined
  variant?: 'full' | 'compact'
}

export default function FirstPurchaseBonusBanner({ eligible, daysLeft, variant = 'full' }: Props) {
  if (!eligible) return null

  const days = daysLeft ?? 0
  const daysText = days === 1 ? '1 день' : days < 5 ? `${days} дня` : `${days} дней`

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2.5 text-xs">
        <Gift className="w-4 h-4 text-accent shrink-0" />
        <span className="text-text flex-1">
          <span className="font-semibold text-accent">+14 дней в подарок</span> при первой оплате
        </span>
        <span className="text-accent-dim whitespace-nowrap">осталось {daysText}</span>
      </div>
    )
  }

  return (
    <Link
      to="/buy"
      className="block rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-4 active:scale-[0.99] transition-transform"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0">
          <Gift className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text">
            Бонус новичка: <span className="text-accent">+14 дней подписки</span>
          </p>
          <p className="text-xs text-surface-500 mt-0.5">
            Начислим подарком при первой оплате после пробного периода
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-accent-dim">
        <Clock className="w-3 h-3" />
        <span>Осталось {daysText} до окончания предложения</span>
      </div>
    </Link>
  )
}
