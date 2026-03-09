import api from './client'

export async function loginWithTelegram(initData: string) {
  const { data } = await api.post<{ token: string; telegram_id: number }>(
    '/web/auth/telegram',
    { initData },
  )
  return data
}

export async function loginWithTelegramWidget(authData: Record<string, string>) {
  const { data } = await api.post<{ token: string; telegram_id: number }>(
    '/web/auth/telegram-login',
    authData,
  )
  return data
}
