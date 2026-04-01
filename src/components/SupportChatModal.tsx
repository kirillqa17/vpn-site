import { useState, useEffect, useRef } from 'react'
import { X, Send, AlertTriangle, Bot, User, ShieldCheck } from 'lucide-react'
import { getSupportHistory, sendSupportMessage, escalateSupport, type SupportMessage } from '../api/support'

interface Props {
  onClose: () => void
}

export default function SupportChatModal({ onClose }: Props) {
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [escalated, setEscalated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    loadHistory()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadHistory = async () => {
    try {
      const history = await getSupportHistory()
      setMessages(history)
    } catch {
      // No history yet
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || sending) return

    setInput('')
    setSending(true)

    // Add user message immediately
    const userMsg: SupportMessage = { role: 'user', content: text, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])

    try {
      const response = await sendSupportMessage(text)
      if (response) {
        const aiMsg: SupportMessage = { role: 'ai', content: response, created_at: new Date().toISOString() }
        setMessages(prev => [...prev, aiMsg])
      }
    } catch {
      const errMsg: SupportMessage = { role: 'ai', content: 'Не удалось получить ответ. Попробуйте позже.', created_at: new Date().toISOString() }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

  const handleEscalate = async () => {
    if (escalated) return
    try {
      await escalateSupport()
      setEscalated(true)
      const sysMsg: SupportMessage = { role: 'ai', content: 'Оператор подключится в ближайшее время. Ожидайте ответа.', created_at: new Date().toISOString() }
      setMessages(prev => [...prev, sysMsg])
    } catch {
      // ignore
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const roleIcon = (role: string) => {
    if (role === 'user') return <User className="w-3 h-3" />
    if (role === 'admin') return <ShieldCheck className="w-3 h-3" />
    return <Bot className="w-3 h-3" />
  }

  const roleLabel = (role: string) => {
    if (role === 'user') return 'Вы'
    if (role === 'admin') return 'Оператор'
    return 'AI'
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-surface-950">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-surface-800">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">Поддержка</span>
        </div>
        <div className="flex items-center gap-2">
          {!escalated && (
            <button
              onClick={handleEscalate}
              className="flex items-center gap-1 text-xs text-surface-400 hover:text-orange-400 transition-colors px-2 py-1 rounded-lg hover:bg-surface-800"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Оператор
            </button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-800 text-surface-400">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-surface-600 border-t-white rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-surface-500 text-sm">
            <Bot className="w-10 h-10 mx-auto mb-3 text-surface-600" />
            <p>Напишите ваш вопрос</p>
            <p className="text-xs mt-1">AI-ассистент ответит мгновенно</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isUser = msg.role === 'user'
            return (
              <div key={i} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}>
                <div className={`flex items-center gap-1 text-[10px] text-surface-500 ${isUser ? 'flex-row-reverse' : ''}`}>
                  {roleIcon(msg.role)}
                  <span>{roleLabel(msg.role)}</span>
                </div>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-white text-black rounded-tr-md'
                    : msg.role === 'admin'
                      ? 'bg-blue-500/15 text-surface-200 rounded-tl-md'
                      : 'bg-surface-800 text-surface-200 rounded-tl-md'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            )
          })
        )}
        {sending && (
          <div className="flex items-start gap-1">
            <div className="text-[10px] text-surface-500 flex items-center gap-1">
              <Bot className="w-3 h-3" />
              AI
            </div>
            <div className="bg-surface-800 rounded-2xl rounded-tl-md px-4 py-3 mt-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-surface-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-surface-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-surface-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-surface-800 px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напишите сообщение..."
            rows={1}
            className="flex-1 bg-surface-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-surface-500 resize-none outline-none max-h-32 min-h-[40px]"
            onInput={(e) => {
              const t = e.target as HTMLTextAreaElement
              t.style.height = 'auto'
              t.style.height = Math.min(t.scrollHeight, 128) + 'px'
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
              input.trim() && !sending ? 'bg-white active:bg-surface-200' : 'bg-surface-800'
            }`}
          >
            <Send className={`w-4.5 h-4.5 ${input.trim() && !sending ? 'text-black' : 'text-surface-500'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
