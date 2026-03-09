export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Moscow',
  })
}

export function daysUntil(dateStr: string): number {
  const now = new Date()
  const end = new Date(dateStr)
  const diff = end.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function isExpired(dateStr: string): boolean {
  return new Date(dateStr) < new Date()
}

export function isExpiringSoon(dateStr: string, days = 3): boolean {
  return daysUntil(dateStr) <= days && !isExpired(dateStr)
}
