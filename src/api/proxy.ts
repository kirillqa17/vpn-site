import api from './client'

export interface ProxyInfo {
  active: boolean
  link: string | null
  expires: string | null
}

export async function getProxy(): Promise<ProxyInfo> {
  const { data } = await api.get('/web/me/proxy')
  return data
}
