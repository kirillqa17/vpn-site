import api from './client'
import type { TariffPrices, PromoValidation, PaymentResult } from '../types/user'
import { MOCK_PRICES } from '../utils/mockData'

const isDev = import.meta.env.DEV

export async function getPrices(): Promise<TariffPrices> {
  if (isDev) return MOCK_PRICES
  const { data } = await api.get('/web/subscription/prices')
  return data
}

export async function activateTrial(): Promise<void> {
  if (isDev) return
  await api.post('/web/subscription/trial')
}

export async function createPayment(params: {
  tariff: string
  duration: string
  promo_code?: string
  save_payment_method?: boolean
}): Promise<PaymentResult> {
  if (isDev) return { payment_url: '#', payment_id: 'demo' }
  const { data } = await api.post('/web/payment/create', params)
  return data
}

export async function getPaymentStatus(paymentId: string): Promise<string> {
  if (isDev) return 'pending'
  const { data } = await api.get(`/web/payment/${paymentId}/status`)
  return data.status
}

export async function createCryptoPayment(params: {
  tariff: string
  duration: string
  currency: string
  promo_code?: string
}): Promise<{ invoice_url: string; invoice_id: string }> {
  if (isDev) return { invoice_url: '#', invoice_id: 'demo' }
  const { data } = await api.post('/web/payment/crypto/create', params)
  return data
}

export async function validatePromo(
  code: string,
  tariff: string,
): Promise<PromoValidation> {
  if (isDev) return { valid: true, discount_percent: 10 }
  const { data } = await api.post('/web/promo/validate', { code, tariff })
  return data
}

export async function toggleAutoRenew(params: {
  auto_renew: boolean
  plan?: string
  duration?: string
}): Promise<void> {
  if (isDev) return
  await api.patch('/web/settings/auto-renew', params)
}

export async function togglePro(is_pro: boolean): Promise<void> {
  if (isDev) return
  await api.patch('/web/settings/pro', { is_pro })
}

export async function unbindCard(): Promise<void> {
  if (isDev) return
  await api.delete('/web/settings/payment-method')
}
