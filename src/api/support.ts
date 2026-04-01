import api from './client'

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

export async function getSupportHistory(): Promise<SupportHistory> {
  const { data } = await api.get<SupportHistory>('/web/support/history')
  return data
}

export async function sendSupportMessage(message: string): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>('/web/support/chat', { message })
  return data
}

export async function escalateSupport(): Promise<void> {
  await api.post('/web/support/escalate')
}
