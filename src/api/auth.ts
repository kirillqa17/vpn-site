import api from './client'

export async function loginWithTelegram(initData: string) {
  const { data } = await api.post<{ token: string; telegram_id: number }>(
    '/web/auth/telegram',
    { initData },
  )
  return data
}

export async function registerWithEmail(email: string, password: string, referralId?: number) {
  const { data } = await api.post<{ message: string }>(
    '/web/auth/register',
    { email, password, referral_id: referralId || undefined },
  )
  return data
}

export async function verifyEmail(email: string, code: string) {
  const { data } = await api.post<{ token: string; telegram_id: number }>(
    '/web/auth/verify-email',
    { email, code },
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

export async function forgotPassword(email: string) {
  const { data } = await api.post<{ message: string }>(
    '/web/auth/forgot-password',
    { email },
  )
  return data
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  const { data } = await api.post<{ message: string }>(
    '/web/auth/reset-password',
    { email, code, new_password: newPassword },
  )
  return data
}

export async function linkEmail(email: string, password: string) {
  await api.post('/web/auth/link-email', { email, password })
}

export async function telegramInit(): Promise<string> {
  const { data } = await api.post<{ code: string }>('/web/auth/telegram-init')
  return data.code
}

export async function telegramCheck(code: string): Promise<{ token: string; telegram_id: number } | null> {
  const { data } = await api.get<{ token?: string; telegram_id?: number; status?: string }>(`/web/auth/telegram-check/${code}`)
  if (data.token && data.telegram_id) {
    return { token: data.token, telegram_id: data.telegram_id }
  }
  return null
}

