/**
 * Application Configuration
 * Zentrale Konfigurationsdatei für die Anwendung
 */

export const config = {
  app: {
    name: 'SVG-Grafik Next.js',
    version: '1.1.0',
    description: 'Eine interaktive SVG-Grafik-Galerie für Chatbot-Icons',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  gallery: {
    itemsPerPage: 24,
    defaultViewMode: 'grid' as const,
    enableFavorites: true,
  },
  cache: {
    ttl: 300, // 5 Minuten
    iconCacheDuration: 31536000, // 1 Jahr in Sekunden
  },
  features: {
    search: true,
    categoryFilter: true,
    viewModeToggle: true,
    favorites: true,
    download: true,
    copy: true,
  },
} as const;

export type AppConfig = typeof config;
