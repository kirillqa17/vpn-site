import api from './client'
import type { User, Device, ReferralInfo } from '../types/user'
import { MOCK_USER, MOCK_DEVICES, MOCK_REFERRAL } from '../utils/mockData'

const isDev = import.meta.env.DEV

export async function getMe(): Promise<User> {
  if (isDev) return MOCK_USER
  const { data } = await api.get('/web/me')
  return data
}

export async function getDevices(): Promise<Device[]> {
  if (isDev) return MOCK_DEVICES
  const { data } = await api.get('/web/me/devices')
  return data.devices ?? []
}

export async function deleteDevice(hwid: string): Promise<void> {
  if (isDev) return
  await api.delete(`/web/me/devices/${encodeURIComponent(hwid)}`)
}

export async function checkConnection(): Promise<boolean> {
  if (isDev) return true
  const { data } = await api.get('/web/me/connection')
  return data.connected
}

export async function getReferralInfo(): Promise<ReferralInfo> {
  if (isDev) return MOCK_REFERRAL
  const { data } = await api.get('/web/referral/info')
  return data
}
