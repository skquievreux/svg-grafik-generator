import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SVG-Grafik - Chatbot Icon Galerie',
  description: 'Eine interaktive Galerie von SVG-Grafiken für Chatbots mit dynamischer Generierung',
};

import { VersionLogger } from '@/components/ui/version-logger';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Check for saved theme preference or default to 'light'
                  const theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.classList.add(theme);
                  console.log('[Theme Init] Applied theme:', theme);
                } catch (e) {
                  console.error('[Theme Init] Error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <VersionLogger />
        {children}
      </body>
    </html>
  );
}