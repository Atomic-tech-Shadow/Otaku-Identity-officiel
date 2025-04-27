import React from "react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Carte d'Identité Otaku © {new Date().getFullYear()} - Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
