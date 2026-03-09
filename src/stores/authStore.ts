import { create } from 'zustand'

interface AuthState {
  token: string | null
  telegramId: number | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (token: string, telegramId: number) => void
  clearAuth: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  telegramId: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: (token, telegramId) =>
    set({ token, telegramId, isAuthenticated: true, isLoading: false }),
  clearAuth: () =>
    set({ token: null, telegramId: null, isAuthenticated: false, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}))
