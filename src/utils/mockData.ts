import type { User, Device, TariffPrices, ReferralInfo } from '../types/user'

export const MOCK_USER: User = {
  telegram_id: 123456789,
  uuid: '550e8400-e29b-41d4-a716-446655440000',
  subscription_end: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  is_active: 1,
  created_at: '2024-06-01T00:00:00Z',
  referrals: [111, 222, 333],
  referral_id: 0,
  is_used_trial: true,
  is_used_ref_bonus: false,
  username: 'demo_user',
  plan: 'base',
  sub_link: 'https://sub.svoivpn.online/api/sub/example-uuid/happ',
  payed_refs: 2,
  device_limit: 2,
  auto_renew: true,
  payment_method_id: 'pm_test123',
  auto_renew_plan: 'base',
  auto_renew_duration: '1m',
  is_pro: false,
  card_last4: '4276',
}

export const MOCK_DEVICES: Device[] = [
  { hwid: 'abc123', platform: 'iOS', deviceModel: 'iPhone 15 Pro', createdAt: '2024-12-01T10:00:00Z' },
  { hwid: 'def456', platform: 'Android', deviceModel: 'Samsung Galaxy S24', createdAt: '2025-01-15T14:30:00Z' },
]

export const MOCK_PRICES: TariffPrices = {
  base: { '1m': 150, '3m': 430, '1y': 1500 },
  family: { '1m': 200, '3m': 570, '1y': 1800 },
  bsbase: { '1m': 250, '3m': 720, '1y': 2500 },
  bsfamily: { '1m': 300, '3m': 850, '1y': 2700 },
}

export const MOCK_REFERRAL: ReferralInfo = {
  invite_link: 'https://t.me/svoivless_bot?start=123456789',
  referrals_count: 3,
  payed_refs: 2,
  referrals: [
    { telegram_id: 111, username: 'alex_vpn', is_active: true, has_paid: true, plan: 'base' },
    { telegram_id: 222, username: 'maria_k', is_active: true, has_paid: true, plan: 'family' },
    { telegram_id: 333, username: '', is_active: false, has_paid: false, plan: '' },
  ],
}
