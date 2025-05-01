// Ajouter un cache pour stocker les ressources
const CACHE_NAME = 'otaku-id-card-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon.svg',
  '/src/main.tsx',
  '/src/index.css',
  '/src/App.tsx',
  '/src/pages/home.tsx',
  '/src/components/otaku-card/id-card-preview.tsx',
  '/src/components/otaku-card/id-card-form.tsx',
  '/api/cards'
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Récupération des ressources
self.addEventListener('fetch', event => {
  // Pour gérer les appels API
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          // En cas d'échec, on essaie le cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Stratégie cache first pour les autres ressources
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retourner la réponse
        if (response) {
          return response;
        }
        
        // Cloner la requête car elle ne peut être utilisée qu'une fois
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Vérifier que la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cloner la réponse car elle ne peut être utilisée qu'une fois
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                // Ajouter la réponse au cache
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
  );
});