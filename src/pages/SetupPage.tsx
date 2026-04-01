import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Apple, Smartphone, Monitor, ExternalLink, Copy, Check, HelpCircle, Clock, Send } from 'lucide-react'
import { getMe } from '../api/user'
// generateLinkCode removed
import { useTelegram } from '../hooks/useTelegram'
import Spinner from '../components/ui/Spinner'

type Platform = 'ios' | 'android' | 'pc' | null

const PLATFORMS = [
  { id: 'ios' as const, label: 'iOS', icon: Apple },
  { id: 'android' as const, label: 'Android', icon: Smartphone },
  { id: 'pc' as const, label: 'PC', icon: Monitor },
]

const APP_LINKS = {
  ios: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973',
  android: 'https://play.google.com/store/apps/details?id=com.happproxy&pli=1',
}

export default function SetupPage() {
  const [platform, setPlatform] = useState<Platform>(null)
  const [copied, setCopied] = useState(false)
  const { haptic, tg, isMiniApp } = useTelegram()
  const [searchParams] = useSearchParams()
  const isTrialRedirect = searchParams.get('trial') === '1'

  const { data: user, isLoading } = useQuery({ queryKey: ['me'], queryFn: getMe })
  const isEmailUser = user && user.telegram_id < 0

  // linkMutation removed (generateLinkCode no longer available)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  const subLink = user?.sub_link ?? ''

  function openLink(url: string) {
    if (isMiniApp && tg) {
      tg.openLink(url)
    } else {
      window.open(url, '_blank')
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(subLink)
      setCopied(true)
      haptic?.notificationOccurred('success')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      haptic?.notificationOccurred('error')
    }
  }

  function getImportUrl() {
    return `happ://add/${subLink}`
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold">Установка</h1>

      {/* Subscription link */}
      {subLink && (
        <div className="glass-card p-4">
          <p className="text-xs text-surface-400 mb-2">Ваша подписная ссылка</p>
          <div className="flex gap-2">
            <code className="flex-1 bg-surface-800 rounded-lg px-3 py-2 text-xs text-surface-300 overflow-hidden text-ellipsis whitespace-nowrap">
              {subLink}
            </code>
            <button
              onClick={copyLink}
              className="btn-secondary px-3 py-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Trial instructions banner */}
      {isTrialRedirect && (
        <div className="glass-card p-4 space-y-3 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400">
            <Clock className="w-4 h-4" />
            <p className="text-sm font-medium">Пробный период активирован (7 дней)</p>
          </div>
          <p className="text-xs text-surface-400">
            Установите VPN по инструкции ниже и подключайтесь
          </p>
        </div>
      )}

      {/* Platform selector */}
      <div className="grid grid-cols-3 gap-2">
        {PLATFORMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { haptic?.selectionChanged(); setPlatform(id) }}
            className={`glass-card p-4 flex flex-col items-center gap-2 transition-all ${
              platform === id ? 'border-white/30 bg-surface-800/90' : ''
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Instructions */}
      {platform && platform !== 'pc' && (
        <div className="space-y-3 animate-fade-in">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">1</div>
              <p className="font-medium">Установите приложение</p>
            </div>
            <p className="text-sm text-surface-400 mb-3">
              Скачайте Happ Proxy Utility Plus
            </p>
            <button
              onClick={() => openLink(APP_LINKS[platform])}
              className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              {platform === 'ios' ? 'Открыть App Store' : 'Открыть Google Play'}
            </button>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">2</div>
              <p className="font-medium">Импорт конфигурации</p>
            </div>
            <p className="text-sm text-surface-400 mb-3">
              Нажмите кнопку ниже для автоматического импорта
            </p>
            <button
              onClick={() => openLink(getImportUrl())}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
            >
              Импортировать конфиг
            </button>
          </div>
        </div>
      )}

      {platform === 'pc' && (
        <div className="space-y-3 animate-fade-in">
          <div className="glass-card p-4">
            <p className="font-medium mb-2">Ссылка на конфигурацию</p>
            <p className="text-sm text-surface-400 mb-3">
              Скопируйте и вставьте в VPN-клиент (Hiddify, v2rayN, Nekoray и др.)
            </p>
            <div className="flex gap-2">
              <code className="flex-1 bg-surface-800 rounded-lg px-3 py-2 text-xs text-surface-300 overflow-hidden text-ellipsis whitespace-nowrap">
                {subLink}
              </code>
              <button
                onClick={copyLink}
                className="btn-secondary px-3 py-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="glass-card p-4">
            <p className="font-medium mb-2">Подробная инструкция</p>
            <p className="text-sm text-surface-400 mb-3">
              Инструкция по установке и проксированию трафика на ПК
            </p>
            <button
              onClick={() => openLink('https://telegra.ph/Instrukciya-ustanovki-i-primeneniya-konfiga-SvoiVPN-dlya-PK-04-09')}
              className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Открыть инструкцию
            </button>
          </div>
        </div>
      )}

      {/* Help */}
      <a
        href="https://t.me/svoivpn_help_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card-hover p-4 flex items-center gap-3 w-full"
      >
        <HelpCircle className="w-5 h-5 text-surface-400" />
        <div className="flex-1 text-left">
          <p className="text-sm font-medium">Нужна помощь?</p>
          <p className="text-xs text-surface-500">Напишите в поддержку</p>
        </div>
        <ExternalLink className="w-4 h-4 text-surface-600" />
      </a>
    </div>
  )
}
