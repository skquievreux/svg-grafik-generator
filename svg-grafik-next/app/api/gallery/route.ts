import { NextResponse } from 'next/server';

// Temporäre Daten - später durch Supabase ersetzen
const mockIcons = [
  // Food (20)
  { name: 'Kochmütze', category: 'food' }, { name: 'Rezept', category: 'food' }, { name: 'Burger', category: 'food' }, { name: 'Pizza', category: 'food' }, { name: 'Apfel', category: 'food' },
  { name: 'Karotte', category: 'food' }, { name: 'Brot', category: 'food' }, { name: 'Kaffee', category: 'food' }, { name: 'Tee', category: 'food' }, { name: 'Eis', category: 'food' },
  { name: 'Kuchen', category: 'food' }, { name: 'Fisch', category: 'food' }, { name: 'Fleisch', category: 'food' }, { name: 'Salat', category: 'food' }, { name: 'Suppe', category: 'food' },
  { name: 'Getränk', category: 'food' }, { name: 'Besteck', category: 'food' }, { name: 'Teller', category: 'food' }, { name: 'Grill', category: 'food' }, { name: 'Sushi', category: 'food' },

  // Health (20)
  { name: 'Hantel', category: 'health' }, { name: 'Herz', category: 'health' }, { name: 'Doktor', category: 'health' }, { name: 'Pille', category: 'health' }, { name: 'Spritze', category: 'health' },
  { name: 'Krankenwagen', category: 'health' }, { name: 'Pflaster', category: 'health' }, { name: 'Zahn', category: 'health' }, { name: 'Augen', category: 'health' }, { name: 'Gehirn', category: 'health' },
  { name: 'Lunge', category: 'health' }, { name: 'Virus', category: 'health' }, { name: 'Maske', category: 'health' }, { name: 'Thermometer', category: 'health' }, { name: 'Rollstuhl', category: 'health' },
  { name: 'Yoga', category: 'health' }, { name: 'Impfung', category: 'health' }, { name: 'Blutdruck', category: 'health' }, { name: 'Erste Hilfe', category: 'health' }, { name: 'Vitamine', category: 'health' },

  // Travel (20)
  { name: 'Karte', category: 'travel' }, { name: 'Flugzeug', category: 'travel' }, { name: 'Schiff', category: 'travel' }, { name: 'Zug', category: 'travel' }, { name: 'Koffer', category: 'travel' },
  { name: 'Pass', category: 'travel' }, { name: 'Ticket', category: 'travel' }, { name: 'Kompass', category: 'travel' }, { name: 'Hotel', category: 'travel' }, { name: 'Strand', category: 'travel' },
  { name: 'Berg', category: 'travel' }, { name: 'Zelt', category: 'travel' }, { name: 'Rucksack', category: 'travel' }, { name: 'Bus', category: 'travel' }, { name: 'Taxi', category: 'travel' },
  { name: 'Globus', category: 'travel' }, { name: 'Wegweiser', category: 'travel' }, { name: 'Insel', category: 'travel' }, { name: 'Denkmal', category: 'travel' }, { name: 'Brücke', category: 'travel' },

  // Finance (20)
  { name: 'Geldbeutel', category: 'finance' }, { name: 'Münze', category: 'finance' }, { name: 'Schein', category: 'finance' }, { name: 'Kreditkarte', category: 'finance' }, { name: 'Bank', category: 'finance' },
  { name: 'Sparschwein', category: 'finance' }, { name: 'Diagramm', category: 'finance' }, { name: 'Aktie', category: 'finance' }, { name: 'Rechner', category: 'finance' }, { name: 'Tresor', category: 'finance' },
  { name: 'Währung', category: 'finance' }, { name: 'Dollar', category: 'finance' }, { name: 'Euro', category: 'finance' }, { name: 'Bitcoin', category: 'finance' }, { name: 'Rechnung', category: 'finance' },
  { name: 'Steuer', category: 'finance' }, { name: 'Gewinn', category: 'finance' }, { name: 'Verlust', category: 'finance' }, { name: 'Investition', category: 'finance' }, { name: 'Börse', category: 'finance' },

  // Utility (20)
  { name: 'Wolke', category: 'utility' }, { name: 'Schraubenschlüssel', category: 'utility' }, { name: 'Hammer', category: 'utility' }, { name: 'Zange', category: 'utility' }, { name: 'Säge', category: 'utility' },
  { name: 'Bohrer', category: 'utility' }, { name: 'Leiter', category: 'utility' }, { name: 'Pinsel', category: 'utility' }, { name: 'Eimer', category: 'utility' }, { name: 'Besen', category: 'utility' },
  { name: 'Schaufel', category: 'utility' }, { name: 'Axt', category: 'utility' }, { name: 'Zollstock', category: 'utility' }, { name: 'Klebeband', category: 'utility' }, { name: 'Nagel', category: 'utility' },
  { name: 'Schraube', category: 'utility' }, { name: 'Stecker', category: 'utility' }, { name: 'Kabel', category: 'utility' }, { name: 'Batterie', category: 'utility' }, { name: 'Glühbirne', category: 'utility' },

  // Shopping (20)
  { name: 'Einkaufswagen', category: 'shopping' }, { name: 'Tasche', category: 'shopping' }, { name: 'Korb', category: 'shopping' }, { name: 'Barcode', category: 'shopping' }, { name: 'Preisschild', category: 'shopping' },
  { name: 'Rabatt', category: 'shopping' }, { name: 'Geschenk', category: 'shopping' }, { name: 'Laden', category: 'shopping' }, { name: 'Kasse', category: 'shopping' }, { name: 'Quittung', category: 'shopping' },
  { name: 'Kunde', category: 'shopping' }, { name: 'Verkäufer', category: 'shopping' }, { name: 'Lieferung', category: 'shopping' }, { name: 'Paket', category: 'shopping' }, { name: 'Karton', category: 'shopping' },
  { name: 'Marke', category: 'shopping' }, { name: 'Sale', category: 'shopping' }, { name: 'Gutschein', category: 'shopping' }, { name: 'Bestellung', category: 'shopping' }, { name: 'Rückgabe', category: 'shopping' },

  // Education (20)
  { name: 'Buch', category: 'education' }, { name: 'Stift', category: 'education' }, { name: 'Heft', category: 'education' }, { name: 'Tafel', category: 'education' }, { name: 'Lehrer', category: 'education' },
  { name: 'Schüler', category: 'education' }, { name: 'Schule', category: 'education' }, { name: 'Universität', category: 'education' }, { name: 'Diplom', category: 'education' }, { name: 'Hut', category: 'education' },
  { name: 'Rucksack', category: 'education' }, { name: 'Computer', category: 'education' }, { name: 'Mikroskop', category: 'education' }, { name: 'Reagenzglas', category: 'education' }, { name: 'Atom', category: 'education' },
  { name: 'Formel', category: 'education' }, { name: 'Zahlen', category: 'education' }, { name: 'Buchstaben', category: 'education' }, { name: 'Bibliothek', category: 'education' }, { name: 'Globus', category: 'education' },

  // Entertainment (20)
  { name: 'Noten', category: 'entertainment' }, { name: 'Kamera', category: 'entertainment' }, { name: 'Film', category: 'entertainment' }, { name: 'Ticket', category: 'entertainment' }, { name: 'Popcorn', category: 'entertainment' },
  { name: 'Mikrofon', category: 'entertainment' }, { name: 'Gitarre', category: 'entertainment' }, { name: 'Klavier', category: 'entertainment' }, { name: 'Schlagzeug', category: 'entertainment' }, { name: 'Controller', category: 'entertainment' },
  { name: 'Fernseher', category: 'entertainment' }, { name: 'Radio', category: 'entertainment' }, { name: 'Kopfhörer', category: 'entertainment' }, { name: 'Lautsprecher', category: 'entertainment' }, { name: 'Bühne', category: 'entertainment' },
  { name: 'Maske', category: 'entertainment' }, { name: 'Zauberstab', category: 'entertainment' }, { name: 'Würfel', category: 'entertainment' }, { name: 'Schach', category: 'entertainment' }, { name: 'Karte', category: 'entertainment' },

  // Productivity (20)
  { name: 'Aktenordner', category: 'productivity' }, { name: 'Kalender', category: 'productivity' }, { name: 'Uhr', category: 'productivity' }, { name: 'Checkliste', category: 'productivity' }, { name: 'Notiz', category: 'productivity' },
  { name: 'Stift', category: 'productivity' }, { name: 'Papier', category: 'productivity' }, { name: 'Drucker', category: 'productivity' }, { name: 'Tacker', category: 'productivity' }, { name: 'Schere', category: 'productivity' },
  { name: 'Büroklammer', category: 'productivity' }, { name: 'Brief', category: 'productivity' }, { name: 'Email', category: 'productivity' }, { name: 'Telefon', category: 'productivity' }, { name: 'Meeting', category: 'productivity' },
  { name: 'Ziel', category: 'productivity' }, { name: 'Erfolg', category: 'productivity' }, { name: 'Plan', category: 'productivity' }, { name: 'Strategie', category: 'productivity' }, { name: 'Fokus', category: 'productivity' },

  // Social (20)
  { name: 'Handy', category: 'social' }, { name: 'Chat', category: 'social' }, { name: 'Benutzer', category: 'social' }, { name: 'Gruppe', category: 'social' }, { name: 'Herz', category: 'social' },
  { name: 'Daumen hoch', category: 'social' }, { name: 'Teilen', category: 'social' }, { name: 'Kommentar', category: 'social' }, { name: 'Hinzufügen', category: 'social' }, { name: 'Blockieren', category: 'social' },
  { name: 'Benachrichtigung', category: 'social' }, { name: 'Profil', category: 'social' }, { name: 'Netzwerk', category: 'social' }, { name: 'Verbindung', category: 'social' }, { name: 'Freunde', category: 'social' },
  { name: 'Familie', category: 'social' }, { name: 'Geburtstag', category: 'social' }, { name: 'Feier', category: 'social' }, { name: 'Einladung', category: 'social' }, { name: 'Geschenk', category: 'social' },

  // Technology (20)
  { name: 'Computer', category: 'technology' }, { name: 'Laptop', category: 'technology' }, { name: 'Tablet', category: 'technology' }, { name: 'Im Server', category: 'technology' }, { name: 'Datenbank', category: 'technology' },
  { name: 'Chip', category: 'technology' }, { name: 'Code', category: 'technology' }, { name: 'Roboter', category: 'technology' }, { name: 'Netzwerk', category: 'technology' }, { name: 'WLAN', category: 'technology' },
  { name: 'Bluetooth', category: 'technology' }, { name: 'USB', category: 'technology' }, { name: 'Festplatte', category: 'technology' }, { name: 'Maus', category: 'technology' }, { name: 'Tastatur', category: 'technology' },
  { name: 'Bildschirm', category: 'technology' }, { name: 'Drucker', category: 'technology' }, { name: 'Scanner', category: 'technology' }, { name: 'Kamera', category: 'technology' }, { name: 'Drohne', category: 'technology' },

  // Home (20)
  { name: 'Blume', category: 'home' }, { name: 'Haus', category: 'home' }, { name: 'Schlüssel', category: 'home' }, { name: 'Tür', category: 'home' }, { name: 'Fenster', category: 'home' },
  { name: 'Bett', category: 'home' }, { name: 'Sofa', category: 'home' }, { name: 'Stuhl', category: 'home' }, { name: 'Tisch', category: 'home' }, { name: 'Lampe', category: 'home' },
  { name: 'Teppich', category: 'home' }, { name: 'Bild', category: 'home' }, { name: 'Pflanze', category: 'home' }, { name: 'Garten', category: 'home' }, { name: 'Küche', category: 'home' },
  { name: 'Bad', category: 'home' }, { name: 'Dusche', category: 'home' }, { name: 'Toilette', category: 'home' }, { name: 'Waschmaschine', category: 'home' }, { name: 'Staubsauger', category: 'home' },

  // Pets (20)
  { name: 'Hund', category: 'pets' }, { name: 'Katze', category: 'pets' }, { name: 'Vogel', category: 'pets' }, { name: 'Fisch', category: 'pets' }, { name: 'Hase', category: 'pets' },
  { name: 'Maus', category: 'pets' }, { name: 'Hamster', category: 'pets' }, { name: 'Pferd', category: 'pets' }, { name: 'Kuh', category: 'pets' }, { name: 'Schwein', category: 'pets' },
  { name: 'Huhn', category: 'pets' }, { name: 'Schaf', category: 'pets' }, { name: 'Ente', category: 'pets' }, { name: 'Knochen', category: 'pets' }, { name: 'Napf', category: 'pets' },
  { name: 'Leine', category: 'pets' }, { name: 'Spielzeug', category: 'pets' }, { name: 'Käfig', category: 'pets' }, { name: 'Aquarium', category: 'pets' }, { name: 'Pfote', category: 'pets' },

  // Transport (20)
  { name: 'Auto', category: 'transport' }, { name: 'Fahrrad', category: 'transport' }, { name: 'Bus', category: 'transport' }, { name: 'LKW', category: 'transport' }, { name: 'Motorrad', category: 'transport' },
  { name: 'Roller', category: 'transport' }, { name: 'Zug', category: 'transport' }, { name: 'Straßenbahn', category: 'transport' }, { name: 'U-Bahn', category: 'transport' }, { name: 'Flugzeug', category: 'transport' },
  { name: 'Hubschrauber', category: 'transport' }, { name: 'Schiff', category: 'transport' }, { name: 'Boot', category: 'transport' }, { name: 'Rakete', category: 'transport' }, { name: 'Ampel', category: 'transport' },
  { name: 'Schild', category: 'transport' }, { name: 'Straße', category: 'transport' }, { name: 'Tankstelle', category: 'transport' }, { name: 'Parkplatz', category: 'transport' }, { name: 'Garage', category: 'transport' },
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