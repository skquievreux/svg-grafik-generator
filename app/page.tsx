'use client';

import { IconGallery } from '@/components/gallery/icon-gallery';
import { APP_VERSION } from '@/lib/version';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50/50 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[100px] animate-float delay-1000" />
      </div>

      {/* Main Container - Centered with margins */}
      <div className="relative z-10 max-w-[1600px] mx-auto min-h-screen flex flex-col shadow-2xl bg-white/80 backdrop-blur-xl my-0 sm:my-4 sm:rounded-3xl border border-white/50 overflow-hidden">

        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-white/20">
          <div className="container-padding py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

              {/* Logo Area */}
              <div className="flex items-center gap-4 animate-pop-in delay-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
                    SVG Galerie
                  </h1>
                  <p className="text-sm font-medium text-gray-500">v{APP_VERSION} • Pro Edition</p>
                </div>
              </div>

              {/* Stats / Badges */}
              <div className="flex flex-wrap justify-center gap-3 animate-pop-in delay-100">
                <div className="flex items-center gap-2 text-xs font-semibold bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100 shadow-sm hover:shadow-md transition-all cursor-default">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  40+ Premium Icons
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-default">
                  <span className="bg-blue-200 p-0.5 rounded-full">⬇️</span>
                  Free Download
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Start Hero Section Content */}
        <div className="text-center pt-10 pb-6 px-4 animate-pop-in delay-200">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight animate-title-glow">
            Entdecke dein perfektes Icon.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Eine kuratierte Sammlung für Designer und Entwickler. Wähle eine Kategorie und starte deine kreative Reise.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 container-padding pb-20">
          <IconGallery />
        </div>

        {/* Footer */}
        <footer className="glass border-t border-white/20 mt-auto">
          <div className="container-padding py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <p>&copy; 2025 Chatbot SVG Galerie. Made with ❤️.</p>
              <div className="flex gap-6">
                <p className="hover:text-blue-600 transition-colors cursor-pointer">Support</p>
                <p className="hover:text-blue-600 transition-colors cursor-pointer">Lizenz</p>
                <p className="hover:text-blue-600 transition-colors cursor-pointer">Impressum</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}