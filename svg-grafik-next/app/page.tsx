'use client';

import { IconGallery } from '@/components/gallery/icon-gallery';
import { APP_VERSION, APP_NAME } from '@/lib/version';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto container-padding py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              Chatbot SVG Galerie
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Entdecken Sie eine umfangreiche Sammlung von professionellen SVG-Icons für Chatbots.
              Filtern, suchen und laden Sie Ihre Lieblings-Icons herunter. Vollständig responsive und barrierefrei.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
               <div className="flex items-center gap-3 text-sm text-gray-600 bg-white/60 px-4 py-2 rounded-full shadow-sm">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                 40+ Icons verfügbar
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600 bg-white/60 px-4 py-2 rounded-full shadow-sm">
                 <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                 Kostenlos downloaden
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600 bg-white/60 px-4 py-2 rounded-full shadow-sm">
                 <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                 SVG-Format
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600 bg-white/60 px-4 py-2 rounded-full shadow-sm">
                 <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                 v{APP_VERSION}
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Hauptinhalt */}
      <div className="max-w-7xl mx-auto container-padding py-12">
        <IconGallery />
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto container-padding py-12">
          <div className="text-center text-gray-600">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technologien</h3>
                <p className="text-sm">Next.js 14, TypeScript, Tailwind CSS</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                <p className="text-sm">Dynamische Generierung, Responsive Design</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                <p className="text-sm">SVG-Export, Favoriten, Suche</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8">
              <p>&copy; 2025 Chatbot SVG Galerie. Alle Rechte vorbehalten.</p>
              <p className="mt-2 text-sm">
                Erstellt mit ❤️ für Entwickler und Designer
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}