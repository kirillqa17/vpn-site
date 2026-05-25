import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import SupportChatModal from './SupportChatModal'
import { useSupportNotificationsCtx } from '../hooks/supportNotificationsContext'

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { unreadCount, markAllRead } = useSupportNotificationsCtx()

  const handleOpen = () => {
    setIsOpen(true)
    markAllRead()
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-20 right-4 z-40 rounded-full bg-white text-black shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          style={{ width: 52, height: 52 }}
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center"
              aria-label={`${unreadCount} новых сообщений`}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {isOpen && <SupportChatModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
