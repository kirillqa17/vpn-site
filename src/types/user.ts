export interface User {
  telegram_id: number
  uuid: string
  subscription_end: string
  is_active: number
  created_at: string
  referrals: number[]
  referral_id: number
  is_used_trial: boolean
  is_used_ref_bonus: boolean
  username: string
  plan: string
  sub_link: string
  payed_refs: number
  device_limit: number
  auto_renew: boolean
  payment_method_id: string
  auto_renew_plan: string
  auto_renew_duration: string
  is_pro: boolean
}

export interface Device {
  hwid: string
  platform?: string
  osVersion?: string
  deviceModel?: string
  userAgent?: string
  createdAt?: string
}

export interface TariffPrices {
  base: { '1m': number; '3m': number; '1y': number }
  family: { '1m': number; '3m': number; '1y': number }
  bsbase: { '1m': number; '3m': number; '1y': number }
  bsfamily: { '1m': number; '3m': number; '1y': number }
}

export interface PromoValidation {
  valid: boolean
  discount_percent: number
  reason?: string
}

export interface PaymentResult {
  payment_url: string
  payment_id: string
}

export interface Referral {
  telegram_id: number
  username: string
  is_active: boolean
  has_paid: boolean
  plan: string
}

export interface ReferralInfo {
  invite_link: string
  referrals_count: number
  payed_refs: number
  referrals: Referral[]
}
