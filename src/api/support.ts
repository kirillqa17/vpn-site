import api from './client'

export interface SupportMessage {
  role: 'user' | 'ai' | 'admin'
  content: string
  created_at: string
}

export async function getSupportHistory(): Promise<SupportMessage[]> {
  const { data } = await api.get<{ messages: SupportMessage[] }>('/web/support/history')
  return data.messages
}

export async function sendSupportMessage(message: string): Promise<string> {
  const { data } = await api.post<{ response: string }>('/web/support/chat', { message })
  return data.response
}

export async function escalateSupport(): Promise<void> {
  await api.post('/web/support/escalate')
}
