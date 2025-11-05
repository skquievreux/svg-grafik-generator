import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SVG-Grafik - Chatbot Icon Galerie',
  description: 'Eine interaktive Galerie von SVG-Grafiken für Chatbots mit dynamischer Generierung',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}