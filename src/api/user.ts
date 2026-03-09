import api from './client'
import type { User, Device, ReferralInfo } from '../types/user'

export async function getMe(): Promise<User> {
  const { data } = await api.get('/web/me')
  return data
}

export async function getDevices(): Promise<Device[]> {
  const { data } = await api.get('/web/me/devices')
  return data.devices ?? []
}

export async function deleteDevice(hwid: string): Promise<void> {
  await api.delete(`/web/me/devices/${encodeURIComponent(hwid)}`)
}

export async function checkConnection(): Promise<boolean> {
  const { data } = await api.get('/web/me/connection')
  return data.connected
}

export async function getReferralInfo(): Promise<ReferralInfo> {
  const { data } = await api.get('/web/referral/info')
  return data
}
