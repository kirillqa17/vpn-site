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
  const [showConfirm, setShowConfirm] = useState(false)
  const [viewportHeight, setViewportHeight] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sendingRef = useRef(false)

  // Track sending state in ref for polling
  useEffect(() => {
    sendingRef.current = sending
  }, [sending])

  // Load history on mount
  useEffect(() => {
    loadHistory()
  }, [])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle mobile keyboard via visualViewport
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const handleResize = () => {
      setViewportHeight(vv.height)
    }

    vv.addEventListener('resize', handleResize)
    vv.addEventListener('scroll', handleResize)
    handleResize()

    return () => {
      vv.removeEventListener('resize', handleResize)
      vv.removeEventListener('scroll', handleResize)
    }
  }, [])

  // Polling for new messages (admin replies)
  useEffect(() => {
    pollRef.current = setInterval(async () => {
      if (sendingRef.current) return
      try {
        const history = await getSupportHistory()
        setEscalated(history.escalated)
        // Only update if server has more messages (avoid overwriting optimistic updates)
        setMessages(prev => {
          if (history.messages.length > prev.length) {
            return history.messages
          }
          return prev
        })
      } catch {
        // ignore polling errors
      }
    }, 5000)

    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  const loadHistory = async () => {
    try {
      const history = await getSupportHistory()
      setMessages(history.messages)
      setEscalated(history.escalated)
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

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    // Add user message immediately
    const userMsg: SupportMessage = { role: 'user', content: text, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])

    try {
      const result = await sendSupportMessage(text)
      if (result.escalated) {
        setEscalated(true)
        // No AI response when escalated
      } else if (result.response) {
        const aiMsg: SupportMessage = { role: 'ai', content: result.response, created_at: new Date().toISOString() }
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
    setShowConfirm(false)
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

  // Use visualViewport height if available (fixes mobile keyboard)
  const containerStyle: React.CSSProperties = viewportHeight
    ? { position: 'fixed', top: 0, left: 0, right: 0, height: viewportHeight, zIndex: 60 }
    : {}

  return (
    <div
      className={`flex flex-col bg-surface-950 ${!viewportHeight ? 'fixed inset-0 z-[60]' : ''}`}
      style={containerStyle}
    >
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-surface-800">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">Поддержка</span>
          {escalated && (
            <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full">
              Ожидание оператора
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!escalated && (
            <button
              onClick={() => setShowConfirm(true)}
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

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="shrink-0 px-4 py-3 bg-orange-500/10 border-b border-orange-500/20">
          <p className="text-sm text-orange-300 mb-2">Позвать оператора?</p>
          <p className="text-xs text-surface-400 mb-3">AI-ассистент перестанет отвечать. Оператор подключится в ближайшее время.</p>
          <div className="flex gap-2">
            <button
              onClick={handleEscalate}
              className="flex-1 bg-orange-500 text-white text-sm py-2 rounded-lg active:bg-orange-600 transition-colors"
            >
              Да, позвать
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 bg-surface-800 text-surface-300 text-sm py-2 rounded-lg active:bg-surface-700 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

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
        {sending && !escalated && (
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
            placeholder={escalated ? 'Сообщение оператору...' : 'Напишите сообщение...'}
            rows={1}
            autoComplete="off"
            autoCorrect="off"
            enterKeyHint="send"
            className="flex-1 bg-surface-800 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-surface-500 resize-none outline-none max-h-32 min-h-[40px]"
            onInput={(e) => {
              const t = e.target as HTMLTextAreaElement
              t.style.height = 'auto'
              t.style.height = Math.min(t.scrollHeight, 128) + 'px'
            }}
            onFocus={() => {
              // Scroll input into view on mobile
              setTimeout(() => {
                inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
              }, 300)
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
