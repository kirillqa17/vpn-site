import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, Tag, CreditCard, Bitcoin, Loader2 } from 'lucide-react'
import { getPrices, createPayment, createCryptoPayment, validatePromo, activateTrial } from '../api/subscription'
import { getMe } from '../api/user'
import { TARIFF_NAMES, TARIFF_FEATURES, DURATION_LABELS } from '../utils/constants'
import { useTelegram } from '../hooks/useTelegram'
import Modal from '../components/ui/Modal'

const TARIFFS = ['base', 'family', 'bsbase', 'bsfamily'] as const
const DURATIONS = ['1m', '3m', '1y'] as const
const CRYPTO_CURRENCIES = ['TON', 'USDT', 'TRON', 'SOL', 'ETH', 'BNB'] as const

export default function BuyPage() {
  const { haptic, tg, isMiniApp } = useTelegram()
  const queryClient = useQueryClient()

  const [tariff, setTariff] = useState<string>('base')
  const [duration, setDuration] = useState<string>('1m')
  const [promo, setPromo] = useState('')
  const [promoResult, setPromoResult] = useState<{ valid: boolean; discount_percent: number } | null>(null)
  const [showCrypto, setShowCrypto] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)

  const { data: prices } = useQuery({ queryKey: ['prices'], queryFn: getPrices })
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: getMe })

  const promoMutation = useMutation({
    mutationFn: () => validatePromo(promo, tariff),
    onSuccess: (data) => setPromoResult(data),
  })

  const trialMutation = useMutation({
    mutationFn: activateTrial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      haptic?.notificationOccurred('success')
    },
  })

  const price = prices?.[tariff as keyof typeof prices]?.[duration as '1m' | '3m' | '1y'] ?? 0
  const discount = promoResult?.valid ? promoResult.discount_percent : 0
  const finalPrice = Math.round(price * (1 - discount / 100))

  async function handleCardPayment() {
    setPaymentLoading(true)
    try {
      const { payment_url } = await createPayment({
        tariff,
        duration,
        promo_code: promoResult?.valid ? promo : undefined,
        save_payment_method: true,
      })
      if (isMiniApp && tg) {
        tg.openLink(payment_url)
      } else {
        window.open(payment_url, '_blank')
      }
    } catch {
      haptic?.notificationOccurred('error')
    } finally {
      setPaymentLoading(false)
    }
  }

  async function handleCryptoPayment(currency: string) {
    setPaymentLoading(true)
    try {
      const { invoice_url } = await createCryptoPayment({
        tariff,
        duration,
        currency,
        promo_code: promoResult?.valid ? promo : undefined,
      })
      setShowCrypto(false)
      if (isMiniApp && tg) {
        tg.openLink(invoice_url)
      } else {
        window.open(invoice_url, '_blank')
      }
    } catch {
      haptic?.notificationOccurred('error')
    } finally {
      setPaymentLoading(false)
    }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-xl font-bold">Тарифы</h1>

      {/* Trial */}
      {user && !user.is_used_trial && (
        <div className="glass-card p-4 border-surface-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Пробный период</p>
              <p className="text-sm text-surface-400">7 дней бесплатно</p>
            </div>
            <button
              onClick={() => { haptic?.selectionChanged(); trialMutation.mutate() }}
              disabled={trialMutation.isPending}
              className="btn-secondary text-sm px-4 py-2"
            >
              {trialMutation.isPending ? 'Активация...' : 'Активировать'}
            </button>
          </div>
          {trialMutation.isSuccess && (
            <p className="text-sm text-emerald-400 mt-2">Пробный период активирован!</p>
          )}
        </div>
      )}

      {/* Tariff selection */}
      <div className="space-y-2">
        <p className="text-sm text-surface-400 font-medium">Тариф</p>
        <div className="grid grid-cols-2 gap-2">
          {TARIFFS.map((t) => (
            <button
              key={t}
              onClick={() => { haptic?.selectionChanged(); setTariff(t) }}
              className={`glass-card p-3 text-left transition-all ${
                tariff === t ? 'border-white/30 bg-surface-800/90' : ''
              }`}
            >
              <p className="font-medium text-sm">{TARIFF_NAMES[t]}</p>
              <div className="mt-2 space-y-0.5">
                {TARIFF_FEATURES[t]?.slice(0, 2).map((f) => (
                  <p key={f} className="text-[11px] text-surface-400 flex items-center gap-1">
                    <Check className="w-3 h-3 text-surface-500" />
                    {f}
                  </p>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <p className="text-sm text-surface-400 font-medium">Период</p>
        <div className="flex gap-2">
          {DURATIONS.map((d) => {
            const p = prices?.[tariff as keyof typeof prices]?.[d] ?? 0
            return (
              <button
                key={d}
                onClick={() => { haptic?.selectionChanged(); setDuration(d) }}
                className={`flex-1 glass-card p-3 text-center transition-all ${
                  duration === d ? 'border-white/30 bg-surface-800/90' : ''
                }`}
              >
                <p className="text-sm font-medium">{DURATION_LABELS[d]}</p>
                <p className="text-xs text-surface-400 mt-1">{p} ₽</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Promo */}
      <div className="space-y-2">
        <p className="text-sm text-surface-400 font-medium">Промокод</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={promo}
            onChange={(e) => { setPromo(e.target.value); setPromoResult(null) }}
            placeholder="Введите промокод"
            className="input-field flex-1"
          />
          <button
            onClick={() => promoMutation.mutate()}
            disabled={!promo || promoMutation.isPending}
            className="btn-secondary px-4 py-2 text-sm"
          >
            {promoMutation.isPending ? '...' : 'Применить'}
          </button>
        </div>
        {promoResult && (
          <p className={`text-xs ${promoResult.valid ? 'text-emerald-400' : 'text-red-400'}`}>
            {promoResult.valid
              ? `Скидка ${promoResult.discount_percent}% применена`
              : 'Промокод недействителен'}
          </p>
        )}
      </div>

      {/* Price summary */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-surface-400">Итого</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{finalPrice} ₽</span>
              {discount > 0 && (
                <span className="text-sm text-surface-500 line-through">{price} ₽</span>
              )}
            </div>
          </div>
          {discount > 0 && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <Tag className="w-3 h-3" /> -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Payment buttons */}
      <div className="space-y-2">
        <button
          onClick={handleCardPayment}
          disabled={paymentLoading || !price}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {paymentLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CreditCard className="w-4 h-4" />
          )}
          Оплатить картой
        </button>
        <button
          onClick={() => setShowCrypto(true)}
          disabled={paymentLoading || !price}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <Bitcoin className="w-4 h-4" />
          Оплатить криптой
        </button>
      </div>

      {/* Crypto currency modal */}
      <Modal open={showCrypto} onClose={() => setShowCrypto(false)} title="Выберите валюту">
        <div className="grid grid-cols-3 gap-2">
          {CRYPTO_CURRENCIES.map((c) => (
            <button
              key={c}
              onClick={() => handleCryptoPayment(c)}
              disabled={paymentLoading}
              className="glass-card-hover p-3 text-center"
            >
              <p className="font-medium text-sm">{c}</p>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}
