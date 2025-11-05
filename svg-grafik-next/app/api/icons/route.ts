import { NextRequest, NextResponse } from 'next/server';
import { IconGenerator } from '@/lib/icons/generator';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const category = searchParams.get('category');
  const shape = searchParams.get('shape') || 'octagon';
  const size = parseInt(searchParams.get('size') || '40');

  if (!name || !category) {
    return NextResponse.json(
      { error: 'Name and category are required' },
      { status: 400 }
    );
  }

  try {
    // Kategorie-Farben definieren
    const categoryColors: Record<string, { background: string; border: string; icon: string }> = {
      food: { background: '#FF6B6B', border: '#FFFFFF', icon: '#FFFFFF' },
      health: { background: '#4CAF50', border: '#FFFFFF', icon: '#FFFFFF' },
      travel: { background: '#2196F3', border: '#FFFFFF', icon: '#FFFFFF' },
      finance: { background: '#FF9800', border: '#FFFFFF', icon: '#FFFFFF' },
      utility: { background: '#9E9E9E', border: '#FFFFFF', icon: '#FFFFFF' },
      shopping: { background: '#E91E63', border: '#FFFFFF', icon: '#FFFFFF' },
      education: { background: '#3F51B5', border: '#FFFFFF', icon: '#FFFFFF' },
      entertainment: { background: '#9C27B0', border: '#FFFFFF', icon: '#FFFFFF' },
      productivity: { background: '#607D8B', border: '#FFFFFF', icon: '#FFFFFF' },
      social: { background: '#00BCD4', border: '#FFFFFF', icon: '#FFFFFF' },
      technology: { background: '#795548', border: '#FFFFFF', icon: '#FFFFFF' },
      home: { background: '#8BC34A', border: '#FFFFFF', icon: '#FFFFFF' },
      pets: { background: '#FF5722', border: '#FFFFFF', icon: '#FFFFFF' },
      transport: { background: '#CDDC39', border: '#FFFFFF', icon: '#FFFFFF' },
      language: { background: '#FFC107', border: '#FFFFFF', icon: '#FFFFFF' },
      news: { background: '#F44336', border: '#FFFFFF', icon: '#FFFFFF' },
      misc: { background: '#9E9E9E', border: '#FFFFFF', icon: '#FFFFFF' }
    };

    const colors = categoryColors[category] || categoryColors.misc;

    // Symbol-Namen normalisieren
    const symbolMap: Record<string, string> = {
      'Kochmütze': 'chef-hat',
      'Hantel': 'dumbbell',
      'Karte': 'map',
      'Geldbeutel': 'wallet',
      'Wolke': 'cloud',
      'Einkaufswagen': 'shopping-cart',
      'Buch': 'book',
      'Herz': 'heart',
      'Noten': 'music',
      'Kamera': 'camera',
      'Aktenordner': 'folder',
      'Handy': 'phone',
      'Computer': 'computer',
      'Blume': 'flower',
      'Hund': 'dog',
      'Auto': 'car',
      'Flugzeug': 'plane',
      'Schiff': 'ship',
      'Zug': 'train',
      'Fahrrad': 'bicycle',
      'Übersetzungs-Assistent': 'speech-bubble',
      'Programmier-Tutor': 'code',
      'Meditations-Guide': 'lotus',
      'Ernährungsberater': 'apple',
      'Spiele-Begleiter': 'controller',
      'Nachrichten-Aggregator': 'newspaper',
      'Produktivitäts-Coach': 'checklist',
      'Sprach-Lehrer': 'speech-bubble',
      'Kreativ-Berater': 'code',
      'Wissenschafts-Erklärer': 'book',
      'Geschichten-Erzähler': 'book',
      'Psychologie-Berater': 'heart',
      'Kunst-Kritiker': 'flower',
      'Mathematik-Tutor': 'code',
      'Astronomie-Guide': 'book',
      'Geschichts-Experte': 'book',
      'Mode-Berater': 'heart',
      'Handwerks-Helfer': 'folder',
      'Eltern-Ratgeber': 'heart',
      'Umwelt-Berater': 'flower'
    };

    const symbol = symbolMap[name] || name.toLowerCase().replace(/\s+/g, '-');

    const config = {
      name,
      category,
      shape: shape as 'octagon' | 'circle' | 'square' | 'hexagon',
      symbol,
      colors,
      size
    };

    const svg = IconGenerator.generateSVG(config);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Icon generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate icon' },
      { status: 500 }
    );
  }
}