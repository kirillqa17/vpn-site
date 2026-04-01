import api from './client'
import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

export interface SupportMessage {
  role: 'user' | 'ai' | 'admin'
  content: string
  created_at: string
}

export interface SupportHistory {
  messages: SupportMessage[]
  escalated: boolean
}

export interface ChatResponse {
  response: string | null
  escalated?: boolean
}

function getSessionId(): string {
  let id = localStorage.getItem('support_session_id')
  if (!id) {
    id = 'anon_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem('support_session_id', id)
  }
  return id
}

function isAuthenticated(): boolean {
  return !!useAuthStore.getState().token
}

export async function getSupportHistory(): Promise<SupportHistory> {
  if (isAuthenticated()) {
    const { data } = await api.get<SupportHistory>('/web/support/history')
    return data
  } else {
    const { data } = await axios.get<SupportHistory>('/api/web/support/public/history', {
      params: { session_id: getSessionId() }
    })
    return data
  }
}

export async function sendSupportMessage(message: string): Promise<ChatResponse> {
  if (isAuthenticated()) {
    const { data } = await api.post<ChatResponse>('/web/support/chat', { message })
    return data
  } else {
    const { data } = await axios.post<ChatResponse>('/api/web/support/public/chat', {
      session_id: getSessionId(),
      message,
    })
    return data
  }
}

export async function escalateSupport(): Promise<void> {
  if (isAuthenticated()) {
    await api.post('/web/support/escalate')
  }
  // No escalation for anonymous users — they can use TG bot
}
