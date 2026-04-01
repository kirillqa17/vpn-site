import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import SupportChatModal from './SupportChatModal'

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-40 w-13 h-13 rounded-full bg-white text-black shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          style={{ width: 52, height: 52 }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat modal */}
      {isOpen && <SupportChatModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
