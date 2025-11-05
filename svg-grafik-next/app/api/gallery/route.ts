import { NextResponse } from 'next/server';

// Temporäre Daten - später durch Supabase ersetzen
const mockIcons = [
  { name: 'Kochmütze', category: 'food' },
  { name: 'Hantel', category: 'health' },
  { name: 'Karte', category: 'travel' },
  { name: 'Geldbeutel', category: 'finance' },
  { name: 'Wolke', category: 'utility' },
  { name: 'Einkaufswagen', category: 'shopping' },
  { name: 'Buch', category: 'education' },
  { name: 'Herz', category: 'health' },
  { name: 'Noten', category: 'entertainment' },
  { name: 'Kamera', category: 'entertainment' },
  { name: 'Aktenordner', category: 'productivity' },
  { name: 'Handy', category: 'social' },
  { name: 'Computer', category: 'technology' },
  { name: 'Blume', category: 'home' },
  { name: 'Hund', category: 'pets' },
  { name: 'Auto', category: 'transport' },
  { name: 'Flugzeug', category: 'travel' },
  { name: 'Schiff', category: 'travel' },
  { name: 'Zug', category: 'travel' },
  { name: 'Fahrrad', category: 'transport' },
  { name: 'Übersetzungs-Assistent', category: 'language' },
  { name: 'Programmier-Tutor', category: 'education' },
  { name: 'Meditations-Guide', category: 'health' },
  { name: 'Ernährungsberater', category: 'health' },
  { name: 'Spiele-Begleiter', category: 'entertainment' },
  { name: 'Nachrichten-Aggregator', category: 'news' },
  { name: 'Produktivitäts-Coach', category: 'productivity' },
  { name: 'Sprach-Lehrer', category: 'education' },
  { name: 'Kreativ-Berater', category: 'creativity' },
  { name: 'Wissenschafts-Erklärer', category: 'education' },
  { name: 'Geschichten-Erzähler', category: 'entertainment' },
  { name: 'Psychologie-Berater', category: 'health' },
  { name: 'Kunst-Kritiker', category: 'art' },
  { name: 'Mathematik-Tutor', category: 'education' },
  { name: 'Astronomie-Guide', category: 'science' },
  { name: 'Geschichts-Experte', category: 'education' },
  { name: 'Mode-Berater', category: 'fashion' },
  { name: 'Handwerks-Helfer', category: 'diy' },
  { name: 'Eltern-Ratgeber', category: 'family' },
  { name: 'Umwelt-Berater', category: 'environment' }
];

export async function GET() {
  try {
    // Kategorien gruppieren
    const categories: Record<string, { count: number; icons: string[] }> = {};

    mockIcons.forEach(icon => {
      if (!categories[icon.category]) {
        categories[icon.category] = { count: 0, icons: [] };
      }
      const category = categories[icon.category];
      if (category) {
        category.count++;
        category.icons.push(icon.name);
      }
    });

    const response = {
      icons: mockIcons,
      categories,
      metadata: {
        total: mockIcons.length,
        categories: Object.keys(categories),
        generated: new Date().toISOString()
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery data' },
      { status: 500 }
    );
  }
}