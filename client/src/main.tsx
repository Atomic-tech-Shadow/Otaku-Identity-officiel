import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from './components/ui/toaster';

// Enregistrement du service worker pour la PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker enregistré avec succès:', registration);
        
        // Vérifier les mises à jour du Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Service Worker mise à jour trouvée:', newWorker);
          
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Nouveau contenu disponible, veuillez rafraîchir la page.');
              if (confirm('Une mise à jour est disponible. Souhaitez-vous rafraîchir pour utiliser la dernière version?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
      });
    
    // Détection d'une mise à jour par un autre onglet
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Un nouveau Service Worker contrôle la page.');
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
  </QueryClientProvider>
);
