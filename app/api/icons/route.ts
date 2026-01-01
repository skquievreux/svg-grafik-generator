import { NextRequest, NextResponse } from 'next/server';
import { IconGenerator } from '@/lib/icons/generator';
import { iconQuerySchema } from '@/lib/api/schemas';

/**
 * @swagger
 * /api/icons:
 *   get:
 *     summary: Generiert ein dynamisches SVG-Icon
 *     description: Erstellt ein personalisiertes SVG-Icon basierend auf Name, Kategorie und Styling-Parametern.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name des Icons oder Suchbegriff (z.B. "Kochmütze")
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Kategorie zur Bestimmung der Standardfarben
 *       - in: query
 *         name: shape
 *         schema:
 *           type: string
 *           enum: [octagon, circle, square, hexagon]
 *         description: Form des Icons
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 200
 *         description: Größe des SVGs
 *       - in: query
 *         name: bgColor
 *         schema:
 *           type: string
 *         description: Hex-Code für den Hintergrund
 *       - in: query
 *         name: borderColor
 *         schema:
 *           type: string
 *         description: Hex-Code für den Rahmen
 *       - in: query
 *         name: iconColor
 *         schema:
 *           type: string
 *         description: Hex-Code für das Symbol
 *     responses:
 *       200:
 *         description: SVG-Grafik
 *         content:
 *           image/svg+xml:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Ungültige Parameter
 *       500:
 *         description: Fehler bei der Generierung
 */
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
      // Food
      'Kochmütze': 'chef-hat', 'Rezept': 'book', 'Burger': 'burger', 'Pizza': 'pizza', 'Apfel': 'apple',
      'Karotte': 'carrot', 'Brot': 'bread', 'Kaffee': 'coffee', 'Tee': 'tea', 'Eis': 'ice-cream',
      'Kuchen': 'cake', 'Fisch': 'fish', 'Fleisch': 'beef', 'Salat': 'salad', 'Suppe': 'soup',
      'Getränk': 'cup', 'Besteck': 'utensils', 'Teller': 'plate', 'Grill': 'fire', 'Sushi': 'sushi',

      // Health
      'Hantel': 'dumbbell', 'Herz': 'heart', 'Doktor': 'doctor', 'Pille': 'pill', 'Spritze': 'syringe',
      'Krankenwagen': 'ambulance', 'Pflaster': 'band-aid', 'Zahn': 'tooth', 'Augen': 'eye', 'Gehirn': 'brain',
      'Lunge': 'lungs', 'Virus': 'virus', 'Maske': 'doctor', 'Thermometer': 'thermometer', 'Rollstuhl': 'wheelchair',
      'Yoga': 'lotus', 'Impfung': 'syringe', 'Blutdruck': 'activity', 'Erste Hilfe': 'ambulance', 'Vitamine': 'pill',

      // Travel
      'Karte': 'map', 'Flugzeug': 'plane', 'Schiff': 'ship', 'Zug': 'train', 'Koffer': 'briefcase',
      'Pass': 'book', 'Ticket': 'tag', 'Kompass': 'compass', 'Hotel': 'hotel', 'Strand': 'island',
      'Berg': 'mountain', 'Zelt': 'tent', 'Rucksack': 'backpack', 'Bus': 'bus', 'Taxi': 'taxi',
      'Globus': 'globe', 'Wegweiser': 'signpost', 'Insel': 'island', 'Denkmal': 'landmark', 'Brücke': 'landmark',

      // Finance
      'Geldbeutel': 'wallet', 'Münze': 'coin', 'Schein': 'banknote', 'Kreditkarte': 'credit-card', 'Bank': 'bank',
      'Sparschwein': 'bank', 'Diagramm': 'bar-chart', 'Aktie': 'trending-up', 'Rechner': 'calculator', 'Tresor': 'safe',
      'Währung': 'euro', 'Dollar': 'dollar', 'Euro': 'euro', 'Bitcoin': 'bitcoin', 'Rechnung': 'receipt',
      'Steuer': 'percent', 'Gewinn': 'trending-up', 'Verlust': 'bar-chart', 'Investition': 'trending-up', 'Börse': 'bank',

      // Utility
      'Wolke': 'cloud', 'Schraubenschlüssel': 'wrench', 'Hammer': 'hammer', 'Zange': 'pliers', 'Säge': 'saw',
      'Bohrer': 'drill', 'Leiter': 'ladder', 'Pinsel': 'palette', 'Eimer': 'cup', 'Besen': 'wrench',
      'Schaufel': 'hammer', 'Axt': 'saw', 'Zollstock': 'wrench', 'Klebeband': 'tag', 'Nagel': 'hammer',
      'Schraube': 'wrench', 'Stecker': 'plug', 'Kabel': 'plug', 'Batterie': 'battery', 'Glühbirne': 'lightbulb',

      // Shopping
      'Einkaufswagen': 'shopping-cart', 'Tasche': 'bag', 'Korb': 'basket', 'Barcode': 'barcode', 'Preisschild': 'tag',
      'Rabatt': 'percent', 'Geschenk': 'gift', 'Laden': 'store', 'Kasse': 'store', 'Quittung': 'receipt',
      'Kunde': 'user', 'Verkäufer': 'user', 'Lieferung': 'bus', 'Paket': 'gift', 'Karton': 'gift',
      'Marke': 'tag', 'Sale': 'percent', 'Gutschein': 'tag', 'Bestellung': 'checklist', 'Rückgabe': 'checklist',

      // Education (Removed duplicates: Buch, Stift, Rucksack, Computer, Globus checked)
      'Buch': 'book', 'Stift': 'feather', 'Heft': 'book', 'Tafel': 'monitor', 'Lehrer': 'user',
      'Schüler': 'child', 'Schule': 'store', 'Universität': 'landmark', 'Diplom': 'certificate', 'Hut': 'graduation-cap',
      'Mikroskop': 'microscope', 'Reagenzglas': 'flask', 'Atom': 'atom', 'Formel': 'calculator', 'Zahlen': 'calculator',
      'Buchstaben': 'book', 'Bibliothek': 'book',

      // Entertainment (Removed duplicates: Kamera)
      'Noten': 'music', 'Kamera': 'camera', 'Film': 'camera', 'Popcorn': 'cup',
      'Mikrofon': 'microphone', 'Gitarre': 'music', 'Klavier': 'music', 'Schlagzeug': 'music', 'Controller': 'controller',
      'Fernseher': 'monitor', 'Radio': 'wifi', 'Kopfhörer': 'music', 'Lautsprecher': 'music', 'Bühne': 'landmark',
      'Zauberstab': 'feather', 'Würfel': 'controller', 'Schach': 'controller',

      // Productivity
      'Aktenordner': 'folder', 'Kalender': 'checklist', 'Uhr': 'checklist', 'Checkliste': 'checklist', 'Notiz': 'book',
      'Papier': 'book', 'Drucker': 'printer', 'Tacker': 'briefcase', 'Schere': 'saw', 'Büroklammer': 'tag',
      'Brief': 'book', 'Email': 'book', 'Telefon': 'phone', 'Meeting': 'users', 'Ziel': 'tag',
      'Erfolg': 'trending-up', 'Plan': 'map', 'Strategie': 'map', 'Fokus': 'eye',

      // Social (Removed duplicates: Geschenk used elsewhere? No, kept here. Geschenk is in Shopping too! Removed here.)
      'Handy': 'phone', 'Chat': 'speech-bubble', 'Benutzer': 'user', 'Gruppe': 'users',
      'Daumen hoch': 'thumbs-up', 'Teilen': 'share', 'Kommentar': 'speech-bubble', 'Hinzufügen': 'plus', 'Blockieren': 'minus',
      'Benachrichtigung': 'bell', 'Profil': 'user', 'Netzwerk': 'users', 'Verbindung': 'wifi', 'Freunde': 'users',
      'Familie': 'users', 'Geburtstag': 'cake', 'Feier': 'cup', 'Einladung': 'book',

      // Technology (Removed duplicates: Computer, Kamera)
      'Computer': 'computer', 'Laptop': 'laptop', 'Tablet': 'tablet', 'Im Server': 'computer', 'Datenbank': 'computer',
      'Chip': 'computer', 'Code': 'code', 'Roboter': 'computer', 'WLAN': 'wifi',
      'Bluetooth': 'bluetooth', 'USB': 'usb', 'Festplatte': 'computer', 'Maus': 'mouse', 'Tastatur': 'keyboard',
      'Bildschirm': 'monitor', 'Scanner': 'printer', 'Drohne': 'plane',

      // Home
      'Blume': 'flower', 'Haus': 'home', 'Schlüssel': 'key', 'Tür': 'door', 'Fenster': 'window',
      'Bett': 'bed', 'Sofa': 'sofa', 'Stuhl': 'chair', 'Tisch': 'table', 'Lampe': 'lightbulb',
      'Teppich': 'map', 'Bild': 'image', 'Pflanze': 'flower', 'Garten': 'flower', 'Küche': 'plate',
      'Bad': 'tub', 'Dusche': 'shower', 'Toilette': 'tub', 'Waschmaschine': 'printer', 'Staubsauger': 'broom',

      // Pets
      'Hund': 'dog', 'Katze': 'cat', 'Vogel': 'bird', 'Hase': 'dog', 'Hamster': 'dog',
      'Pferd': 'dog', 'Kuh': 'dog', 'Schwein': 'dog', 'Huhn': 'bird', 'Schaf': 'dog',
      'Ente': 'bird', 'Knochen': 'bone', 'Napf': 'plate', 'Leine': 'dog', 'Spielzeug': 'bone',
      'Käfig': 'home', 'Aquarium': 'fish', 'Pfote': 'paw',

      // Transport
      'Auto': 'car', 'Fahrrad': 'bicycle', 'LKW': 'truck', 'Motorrad': 'bicycle', 'Roller': 'bicycle',
      'Straßenbahn': 'train', 'U-Bahn': 'train', 'Hubschrauber': 'plane', 'Boot': 'ship', 'Rakete': 'plane',
      'Ampel': 'signpost', 'Schild': 'signpost', 'Straße': 'map', 'Tankstelle': 'car', 'Parkplatz': 'car', 'Garage': 'home'
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