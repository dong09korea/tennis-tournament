// Tennis Tournament - Service Worker for Push Notifications
const CACHE_NAME = 'tennis-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Handle push events (for future FCM integration)
self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};
    const title = data.title || '🎾 코트 배정 알림';
    const options = {
        body: data.body || '다음 경기 준비해주세요!',
        icon: '/tennis-icon.png',
        badge: '/tennis-badge.png',
        vibrate: [300, 100, 300, 100, 300],
        requireInteraction: true,
        data: { url: data.url || '/' }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// When user taps the notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (const client of windowClients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
