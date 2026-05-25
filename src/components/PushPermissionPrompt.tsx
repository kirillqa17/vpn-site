// /Users/kirill/SvoiVPN/vpn-web/src/components/PushPermissionPrompt.tsx
import { useState } from 'react'
import { Bell, X } from 'lucide-react'
import { enableWebPush, setPushPromptStatus } from '../lib/webPush'

interface Props {
  onClose: () => void
}

export default function PushPermissionPrompt({ onClose }: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEnable = async () => {
    setBusy(true)
    setError(null)
    const res = await enableWebPush()
    setBusy(false)
    if (res.ok) {
      setPushPromptStatus('granted')
      onClose()
    } else {
      const map: Record<string, string> = {
        unsupported: 'Браузер не поддерживает уведомления',
        denied: 'Разрешение не выдано',
        no_key: 'Сервис временно недоступен',
        error: 'Не получилось включить, попробуйте позже',
      }
      setError(map[res.reason ?? 'error'])
      if (res.reason === 'denied') setPushPromptStatus('denied')
    }
  }

  const handleSkip = () => {
    setPushPromptStatus('shown')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4">
      <div className="bg-surface-900 rounded-2xl p-6 max-w-sm w-full text-white shadow-2xl">
        <div className="flex items-start gap-3 mb-3">
          <Bell className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-lg">Уведомления в браузере?</h3>
            <p className="text-sm text-surface-300 mt-1">
              Мы пришлём уведомление, когда оператор ответит. Сможете получить даже когда сайт закрыт.
            </p>
          </div>
          <button onClick={handleSkip} className="text-surface-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm px-3 py-2 rounded-lg mb-3">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleEnable}
            disabled={busy}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl disabled:opacity-50"
          >
            {busy ? 'Включаем...' : 'Включить'}
          </button>
          <button
            onClick={handleSkip}
            className="px-4 py-2.5 text-surface-300 hover:text-white"
          >
            Позже
          </button>
        </div>
      </div>
    </div>
  )
}
