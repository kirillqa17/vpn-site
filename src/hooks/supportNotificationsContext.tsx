import { createContext, useContext, type ReactNode } from 'react'
import {
  useSupportNotifications,
  type SupportNotificationsState,
} from './useSupportNotifications'

const Ctx = createContext<SupportNotificationsState | null>(null)

export function SupportNotificationsProvider({ children }: { children: ReactNode }) {
  const value = useSupportNotifications()
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSupportNotificationsCtx(): SupportNotificationsState {
  const v = useContext(Ctx)
  if (!v) {
    // Fallback: no provider mounted (shouldn't happen if AppShell wraps)
    return { unreadCount: 0, totalCount: 0, markAllRead: () => {} }
  }
  return v
}
