// SvoiVPN — support-chat push notifications service worker.
// Generated 2026-05-25, see .planning/specs/2026-05-25-support-chat-notifications-design.md
//
// On 'push' → show notification.
// On 'notificationclick' → focus existing tab or open '/' fresh.

self.addEventListener('install', (event) => {
  // Activate this version immediately (avoids stale SW after deploy).
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  let data = { title: 'SvoiVPN', body: 'Новое сообщение от поддержки', url: '/' }
  if (event.data) {
    try {
      data = { ...data, ...event.data.json() }
    } catch (e) {
      data.body = event.data.text() || data.body
    }
  }

  const opts = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: data.url || '/' },
    tag: 'svoivpn-support',
    renotify: true,
  }

  event.waitUntil(self.registration.showNotification(data.title, opts))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const targetUrl = (event.notification.data && event.notification.data.url) || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          try {
            const url = new URL(client.url)
            if (url.origin === self.location.origin) {
              return client.focus()
            }
          } catch (e) {}
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl)
      }
    }),
  )
})
