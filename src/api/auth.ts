import api from './client'

export async function loginWithTelegram(initData: string) {
  const { data } = await api.post<{ token: string; telegram_id: number }>(
    '/web/auth/telegram',
    { initData },
  )
  return data
}

export async function registerWithEmail(email: string, password: string, referralId?: number) {
  const { data } = await api.post<{ token: string; telegram_id: number }>(
    '/web/auth/register',
    { email, password, referral_id: referralId || undefined },
  )
  return data
}

export async function loginWithEmail(email: string, password: string) {
  const { data } = await api.post<{ token: string; telegram_id: number }>(
    '/web/auth/login',
    { email, password },
  )
  return data
}

export async function linkEmail(email: string, password: string) {
  await api.post('/web/auth/link-email', { email, password })
}

