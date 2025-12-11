import { NextRequest, NextResponse } from 'next/server';
import { IconGenerator } from '@/lib/icons/generator';
import { iconQuerySchema } from '@/lib/api/schemas';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Validierung mit Zod
  // Validierung mit Zod: Null-Werte zu undefined konvertieren, damit Defaults greifen
  const validation = iconQuerySchema.safeParse({
    name: searchParams.get('name') || undefined,
    category: searchParams.get('category') || undefined,
    shape: searchParams.get('shape') || undefined,
    size: searchParams.get('size') || undefined,
    bgColor: searchParams.get('bgColor') || undefined,
    borderColor: searchParams.get('borderColor') || undefined,
    iconColor: searchParams.get('iconColor') || undefined,
  });

  if (!validation.success) {
    return NextResponse.json(
      {
        error: 'Ungültige Parameter',
        details: validation.error.format(),
      },
      { status: 400 }
    );
  }

  const { name, category, shape, size, bgColor, borderColor, iconColor } = validation.data;

  try {
    // Kategorie-Farben definieren (Defaults)
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

    const fallback = { background: '#9E9E9E', border: '#FFFFFF', icon: '#FFFFFF' };
    const defaultColors = (category ? categoryColors[category] : undefined) || categoryColors.misc || fallback;

    // Custom Colors haben Vorrang
    const colors = {
      background: bgColor || defaultColors.background,
      border: borderColor || defaultColors.border,
      icon: iconColor || defaultColors.icon
    };

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
      'Uebersetzungs-Assistent': 'speech-bubble',
      'Programmier-Tutor': 'code',
      'Meditations-Guide': 'lotus',
      'Ernaehrungsberater': 'apple',
      'Spiele-Begleiter': 'controller',
      'Nachrichten-Aggregator': 'newspaper',
      'Produktivitaets-Coach': 'checklist',
      'Sprach-Lehrer': 'child',
      'Kreativ-Berater': 'palette',
      'Wissenschafts-Erklaerer': 'atom',
      'Geschichten-Erzaehler': 'feather',
      'Psychologie-Berater': 'brain',
      'Kunst-Kritiker': 'palette',
      'Mathematik-Tutor': 'calculator',
      'Astronomie-Guide': 'globe',
      'Geschichts-Experte': 'hourglass',
      'Mode-Berater': 'shirt',
      'Handwerks-Helfer': 'folder',
      'Eltern-Ratgeber': 'child',
      'Umwelt-Berater': 'flower',
      'Tasche': 'bag',
      'Korb': 'basket',
      'Barcode': 'barcode',
      'Preisschild': 'tag',
      'Rabatt': 'percent',
      'Geschenk': 'gift',
      'Laden': 'store',
      'Lehrer': 'checklist',
      'Schueler': 'child',
      'Universitaet': 'store',
      'Diplom': 'checklist',
      'Hut': 'graduation-cap',
      'Mikroskop': 'microscope',
      'Atom': 'atom',
      'Globus': 'globe',
      'Reagenzglas': 'flask',
      'Formel': 'calculator',
      'Zahlen': 'calculator',
      'Buchstaben': 'book',
      'Bibliothek': 'book',
      'Rechner': 'calculator',
      'Kreditkarte': 'credit-card',
      'Muenze': 'circle',
      'Schein': 'dollar',
      'Koffer': 'briefcase',
      'Pass': 'book',
      'Ticket': 'tag',
      'Kompass': 'compass',
      'Berg': 'mountain'
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
  } catch (error: any) {
    console.error('Icon generation error:', error);

    // Return an error SVG so the user sees what happened
    const errorColor = '#FF5252';
    const errorSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#FFE5E5" stroke="${errorColor}" stroke-width="2"/>
        <text x="50%" y="50%" font-family="Arial" font-size="14" fill="${errorColor}" text-anchor="middle" dy="-10">Icon Error</text>
        <text x="50%" y="50%" font-family="Arial" font-size="10" fill="${errorColor}" text-anchor="middle" dy="15">${error.message || 'Unknown Error'}</text>
      </svg>
    `;

    return new NextResponse(errorSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}