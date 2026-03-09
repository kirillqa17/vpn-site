import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Smartphone, Monitor, Trash2, Globe } from 'lucide-react'
import { getDevices, deleteDevice, getMe } from '../api/user'
import { useTelegram } from '../hooks/useTelegram'
import Spinner from '../components/ui/Spinner'
import { useState } from 'react'
import Modal from '../components/ui/Modal'

function deviceIcon(platform?: string) {
  if (!platform) return Smartphone
  const p = platform.toLowerCase()
  if (p.includes('windows') || p.includes('mac') || p.includes('linux') || p.includes('pc')) return Monitor
  if (p.includes('web') || p.includes('browser')) return Globe
  return Smartphone
}

function formatPlatform(device: { platform?: string; osVersion?: string; deviceModel?: string }) {
  if (device.deviceModel) return device.deviceModel
  if (device.platform && device.osVersion) return `${device.platform} ${device.osVersion}`
  if (device.platform) return device.platform
  return 'Неизвестное устройство'
}

export default function DevicesPage() {
  const { haptic } = useTelegram()
  const queryClient = useQueryClient()
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const { data: user } = useQuery({ queryKey: ['me'], queryFn: getMe })
  const { data: devices, isLoading } = useQuery({
    queryKey: ['devices'],
    queryFn: getDevices,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] })
      haptic?.notificationOccurred('success')
      setDeleteTarget(null)
    },
    onError: () => {
      haptic?.notificationOccurred('error')
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Устройства</h1>
        {user && (
          <span className="text-sm text-surface-400">
            {devices?.length ?? 0} / {user.device_limit}
          </span>
        )}
      </div>

      {(!devices || devices.length === 0) ? (
        <div className="glass-card p-8 text-center">
          <Smartphone className="w-10 h-10 text-surface-600 mx-auto mb-3" />
          <p className="text-surface-400">Нет подключённых устройств</p>
          <p className="text-sm text-surface-500 mt-1">Подключитесь через раздел «Установка»</p>
        </div>
      ) : (
        <div className="space-y-2">
          {devices.map((device) => {
            const Icon = deviceIcon(device.platform)
            return (
              <div key={device.hwid} className="glass-card p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-800 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-surface-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{formatPlatform(device)}</p>
                  {device.createdAt && (
                    <p className="text-xs text-surface-500">
                      {new Date(device.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => { haptic?.selectionChanged(); setDeleteTarget(device.hwid) }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-surface-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Delete confirmation */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Удалить устройство?"
      >
        <p className="text-sm text-surface-400 mb-4">
          Устройство будет отключено от VPN. Вы сможете подключить его заново.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setDeleteTarget(null)}
            className="btn-secondary flex-1"
          >
            Отмена
          </button>
          <button
            onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget)}
            disabled={deleteMutation.isPending}
            className="flex-1 bg-red-500/15 text-red-400 border border-red-500/20 font-semibold rounded-xl px-6 py-3 transition-all hover:bg-red-500/25 active:scale-[0.98]"
          >
            {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
