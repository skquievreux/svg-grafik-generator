import { IconData } from '@/app/api/gallery/data';
import * as LucideIcons from 'lucide-react';

export interface IconMapping {
  iconName: string;
  lucideIcon: keyof typeof LucideIcons | null;
  confidence: number; // 0-1
  source: 'primary' | 'tag-based' | 'fallback';
}

export class IconMapper {
  // Primary Mappings: Direct name → Lucide icon assignments
  // Based on our cleaned icon data (307 icons across 13 categories)
  private static PRIMARY_MAPPINGS: Record<string, any> = {
    // Food (20 icons)
    'Kochmütze': 'ChefHat',
    'Rezept': 'BookOpen',
    'Burger': 'Beef',
    'Pizza': 'Pizza',
    'Apfel': 'Apple',
    'Karotte': 'Carrot',
    'Brot': 'Wheat',
    'Kaffee': 'Coffee',
    'Tee': 'Coffee',
    'Eis': 'IceCream',
    'Kuchen': 'Cake',
    'Fischgericht': 'Fish',
    'Fleisch': 'Beef',
    'Salat': 'Salad',
    'Suppe': 'Soup',
    'Getränk': 'Wine',
    'Besteck': 'Utensils',
    'Teller': 'UtensilsCrossed',
    'Grill': 'Flame',
    'Sushi': 'Fish',

    // Health (19 icons)
    'Hantel': 'Dumbbell',
    'Herz (Organ)': 'HeartPulse',
    'Arzt': 'Stethoscope',
    'Pille': 'Pill',
    'Spritze': 'Syringe',
    'Krankenwagen': 'Ambulance',
    'Pflaster': 'Bandage',
    'Zahn': 'Tooth',
    'Augen': 'Eye',
    'Gehirn': 'Brain',
    'Lunge': 'Lung',
    'Virus': 'Bug',
    'Medizinische Maske': 'ShieldPlus',
    'Thermometer': 'Thermometer',
    'Rollstuhl': 'Accessibility',
    'Yoga': 'PersonStanding',
    'Blutdruck': 'Activity',
    'Erste Hilfe': 'Cross',
    'Vitamine': 'Pill',

    // Travel (14 icons)
    'Landkarte': 'Map',
    'Koffer': 'Luggage',
    'Reisepass': 'BookKey',
    'Reiseticket': 'Ticket',
    'Kompass': 'Compass',
    'Hotel': 'Hotel',
    'Strand': 'Palmtree',
    'Berg': 'Mountain',
    'Zelt': 'Tent',
    'Wanderrucksack': 'Backpack',
    'Wegweiser': 'Signpost',
    'Insel': 'Palmtree',
    'Sehenswürdigkeit': 'Landmark',
    'Brücke': 'Bridge',

    // Finance (20 icons)
    'Geldbeutel': 'Wallet',
    'Münze': 'Coins',
    'Geldschein': 'Banknote',
    'Kreditkarte': 'CreditCard',
    'Bank': 'Landmark',
    'Sparschwein': 'PiggyBank',
    'Diagramm': 'TrendingUp',
    'Aktie': 'CandlestickChart',
    'Taschenrechner': 'Calculator',
    'Tresor': 'Vault',
    'Währungstausch': 'ArrowLeftRight',
    'Dollar': 'DollarSign',
    'Euro': 'Euro',
    'Bitcoin': 'Bitcoin',
    'Rechnung': 'Receipt',
    'Steuer': 'FileText',
    'Gewinn': 'TrendingUp',
    'Verlust': 'TrendingDown',
    'Investition': 'Sprout',
    'Börse': 'Building2',

    // Utility (20 icons)
    'Wolke': 'Cloud',
    'Schraubenschlüssel': 'Wrench',
    'Hammer': 'Hammer',
    'Zange': 'Wrench',
    'Säge': 'Saw',
    'Bohrmaschine': 'Drill',
    'Leiter': 'Ladder',
    'Pinsel': 'PaintBrush',
    'Eimer': 'Container',
    'Besen': 'Broom',
    'Schaufel': 'Shovel',
    'Axt': 'Axe',
    'Zollstock': 'Ruler',
    'Klebeband': 'Tape',
    'Nagel': 'Pin',
    'Schraube': 'Bolt',
    'Stecker': 'Plug',
    'Kabel': 'Cable',
    'Batterie': 'Battery',
    'Glühbirne': 'Lightbulb',

    // Shopping (20 icons)
    'Einkaufswagen': 'ShoppingCart',
    'Einkaufstasche': 'ShoppingBag',
    'Einkaufskorb': 'ShoppingBasket',
    'Barcode': 'Barcode',
    'Preisschild': 'Tag',
    'Rabatt': 'Percent',
    'Geschenk': 'Gift',
    'Laden': 'Store',
    'Kasse': 'CreditCard',
    'Quittung': 'Receipt',
    'Kunde': 'UserCircle',
    'Verkäufer': 'UserCheck',
    'Lieferung': 'Truck',
    'Versandpaket': 'Package',
    'Versandkarton': 'Box',
    'Marke': 'Award',
    'Sale': 'BadgePercent',
    'Gutschein': 'TicketPercent',
    'Bestellung': 'ClipboardList',
    'Rückgabe': 'Undo2',

    // Education (19 icons)
    'Buch': 'Book',
    'Stift': 'Pen',
    'Heft': 'NotebookPen',
    'Schultafel': 'PresentationChart',
    'Lehrer': 'UserCog',
    'Schüler': 'GraduationCap',
    'Schule': 'School',
    'Universität': 'Building2',
    'Diplom': 'ScrollText',
    'Doktorhut': 'GraduationCap',
    'Schulrucksack': 'Backpack',
    'Mikroskop': 'Microscope',
    'Reagenzglas': 'TestTube',
    'Atom': 'Atom',
    'Mathematische Formel': 'SquareFunction',
    'Zahlen': 'Hash',
    'Buchstaben': 'AlphaA',
    'Bibliothek': 'Library',
    'Globus': 'Globe',

    // Entertainment (20 icons)
    'Musiknoten': 'Music',
    'Fotokamera': 'Camera',
    'Film': 'Film',
    'Eventticket': 'Ticket',
    'Popcorn': 'Popcorn',
    'Mikrofon': 'Mic',
    'Gitarre': 'Guitar',
    'Klavier': 'Piano',
    'Schlagzeug': 'Drum',
    'Game Controller': 'Gamepad2',
    'Fernseher': 'Tv',
    'Radio': 'Radio',
    'Kopfhörer': 'Headphones',
    'Lautsprecher': 'Speaker',
    'Bühne': 'Theater',
    'Theatermaske': 'Drama',
    'Zauberstab': 'Wand',
    'Spielwürfel': 'Dices',
    'Schachfigur': 'Castle',
    'Spielkarte': 'Spade',

    // Productivity (18 icons)
    'Aktenordner': 'FolderOpen',
    'Kalender': 'Calendar',
    'Uhr': 'Clock',
    'Checkliste': 'ListChecks',
    'Notizzettel': 'StickyNote',
    'Papier': 'FileText',
    'Tacker': 'Paperclip',
    'Schere': 'Scissors',
    'Büroklammer': 'Paperclip',
    'Brief': 'Mail',
    'E-Mail': 'AtSign',
    'Telefon': 'Phone',
    'Meeting': 'Users',
    'Zielscheibe': 'Target',
    'Erfolgspokal': 'Trophy',
    'Projektplan': 'Map',
    'Strategie': 'Lightbulb',
    'Fokus': 'Focus',

    // Social (19 icons)
    'Smartphone': 'Smartphone',
    'Chat': 'MessageCircle',
    'Benutzerprofil': 'User',
    'Benutzergruppe': 'Users',
    'Herz (Like)': 'Heart',
    'Daumen hoch': 'ThumbsUp',
    'Teilen': 'Share2',
    'Kommentar': 'MessageSquare',
    'Freund hinzufügen': 'UserPlus',
    'Blockieren': 'Ban',
    'Benachrichtigung': 'Bell',
    'Soziales Netzwerk': 'Network',
    'Verbindung': 'Link',
    'Freunde': 'Users',
    'Familie': 'Home',
    'Geburtstagsfeier': 'PartyPopper',
    'Party': 'PartyPopper',
    'Einladung': 'Mail',
    'Geschenkbox': 'Gift',

    // Technology (20 icons)
    'Desktop Computer': 'Monitor',
    'Laptop': 'Laptop',
    'Tablet': 'Tablet',
    'Server': 'Server',
    'Datenbank': 'Database',
    'Prozessor': 'Cpu',
    'Programmcode': 'Code',
    'Roboter': 'Bot',
    'Computernetzwerk': 'Network',
    'WLAN': 'Wifi',
    'Bluetooth': 'Bluetooth',
    'USB-Stick': 'Usb',
    'Festplatte': 'HardDrive',
    'Computermaus': 'Mouse',
    'Tastatur': 'Keyboard',
    'Monitor': 'Monitor',
    'Drucker': 'Printer',
    'Scanner': 'ScanLine',
    'Webcam': 'Video',
    'Drohne': 'Plane',

    // Home (20 icons)
    'Blume': 'Flower',
    'Haus': 'Home',
    'Schlüssel': 'Key',
    'Tür': 'DoorOpen',
    'Fenster': 'SquareStack',
    'Bett': 'Bed',
    'Sofa': 'Sofa',
    'Stuhl': 'Armchair',
    'Tisch': 'Table',
    'Lampe': 'Lamp',
    'Teppich': 'SquareStack',
    'Wandbild': 'Frame',
    'Zimmerpflanze': 'Sprout',
    'Garten': 'TreePine',
    'Küche': 'UtensilsCrossed',
    'Badezimmer': 'Bath',
    'Dusche': 'ShowerHead',
    'Toilette': 'Toilet',
    'Waschmaschine': 'WashingMachine',
    'Staubsauger': 'Vacuum',

    // Pets (20 icons)
    'Hund': 'Dog',
    'Katze': 'Cat',
    'Vogel': 'Bird',
    'Aquariumfisch': 'Fish',
    'Hase': 'Rabbit',
    'Hausmaus': 'Rat',
    'Hamster': 'Squirrel',
    'Pferd': 'Horse',
    'Kuh': 'Cow',
    'Schwein': 'Pig',
    'Huhn': 'Egg',
    'Schaf': 'Sheep',
    'Ente': 'Bird',
    'Hundeknochen': 'Bone',
    'Futternapf': 'UtensilsCrossed',
    'Hundeleine': 'Link',
    'Tierspielzeug': 'Ball',
    'Tierkäfig': 'Box',
    'Aquarium': 'Box',
    'Pfote': 'Footprints',

    // Transport (22 icons)
    'Auto': 'Car',
    'Fahrrad': 'Bike',
    'Bus': 'Bus',
    'LKW': 'Truck',
    'Motorrad': 'Bike',
    'Motorroller': 'Bike',
    'Tretroller': 'Bike',
    'E-Scooter': 'Bike',
    'Zug': 'Train',
    'Strassenbahn': 'Tram',
    'U-Bahn': 'TrainTrack',
    'Flugzeug': 'Plane',
    'Hubschrauber': 'Plane',
    'Schiff': 'Ship',
    'Boot': 'Sailboat',
    'Rakete': 'Rocket',
    'Ampel': 'TrafficCone',
    'Verkehrsschild': 'OctagonAlert',
    'Strasse': 'Route',
    'Tankstelle': 'Fuel',
    'Parkplatz': 'ParkingSquare',
    'Garage': 'Warehouse',
  };

  // Tag-based scoring rules for fallback matching
  private static TAG_RULES: Record<string, any[]> = {
    // Food-related tags
    'kochen': ['ChefHat', 'CookingPot', 'Utensils'],
    'essen': ['Utensils', 'UtensilsCrossed', 'Apple'],
    'getränk': ['Coffee', 'Wine', 'Cup'],
    'fastfood': ['Beef', 'Pizza'],
    'gesund': ['Apple', 'Salad', 'Heart'],

    // Health-related tags
    'medizin': ['Pill', 'Syringe', 'Cross'],
    'sport': ['Dumbbell', 'Activity', 'PersonStanding'],
    'fitness': ['Dumbbell', 'Activity', 'Heart'],
    'organ': ['Heart', 'Brain', 'Eye'],

    // Travel-related tags
    'reise': ['Plane', 'Luggage', 'Map'],
    'urlaub': ['Palmtree', 'Luggage', 'Hotel'],
    'orientierung': ['Compass', 'Map', 'Signpost'],

    // Finance-related tags
    'geld': ['Wallet', 'Coins', 'Banknote'],
    'bezahlen': ['CreditCard', 'Wallet', 'Coins'],
    'business': ['TrendingUp', 'Building2', 'Award'],

    // Technology-related tags
    'computer': ['Monitor', 'Laptop', 'Cpu'],
    'digital': ['Smartphone', 'Monitor', 'Code'],
    'internet': ['Wifi', 'Network', 'Cloud'],

    // Transport-related tags
    'fahren': ['Car', 'Bike', 'Bus'],
    'zweirad': ['Bike', 'Bike', 'Bike'],
    'motor': ['Car', 'Truck', 'Bike'],
    'öpnv': ['Bus', 'Train', 'Tram'],

    // Social-related tags
    'person': ['User', 'Users', 'UserCircle'],
    'kommunikation': ['MessageCircle', 'Phone', 'Mail'],
    'social-media': ['Heart', 'Share2', 'MessageSquare'],

    // General tags
    'werkzeug': ['Wrench', 'Hammer', 'Drill'],
    'tier': ['Dog', 'Cat', 'Bird'],
    'haustier': ['Dog', 'Cat', 'Fish'],
  };

  /**
   * Find the best icon match for a given icon data
   */
  static findBestMatch(icon: IconData): IconMapping {
    // 1. Check PRIMARY_MAPPINGS first (highest priority)
    if (this.PRIMARY_MAPPINGS[icon.name]) {
      return {
        iconName: icon.name,
        lucideIcon: this.PRIMARY_MAPPINGS[icon.name],
        confidence: 1.0,
        source: 'primary',
      };
    }

    // 2. Tag-based scoring
    const scores: Record<string, number> = {};

    for (const tag of icon.tags) {
      const candidates = this.TAG_RULES[tag] || [];
      for (const candidate of candidates) {
        scores[candidate] = (scores[candidate] || 0) + 1;
      }
    }

    // 3. Find best match
    const sortedCandidates = Object.entries(scores)
      .sort(([, a], [, b]) => b - a);

    if (sortedCandidates.length === 0) {
      return {
        iconName: icon.name,
        lucideIcon: null,
        confidence: 0,
        source: 'fallback',
      };
    }

    const bestMatch = sortedCandidates[0];
    if (!bestMatch) {
      return {
        iconName: icon.name,
        lucideIcon: null,
        confidence: 0,
        source: 'fallback',
      };
    }

    const [bestCandidate, score] = bestMatch;

    return {
      iconName: icon.name,
      lucideIcon: bestCandidate as any,
      confidence: score / icon.tags.length,
      source: 'tag-based',
    };
  }

  /**
   * Map all icons and return a Map of mappings
   */
  static mapAllIcons(icons: IconData[]): Map<string, IconMapping> {
    const mappings = new Map<string, IconMapping>();

    for (const icon of icons) {
      const mapping = this.findBestMatch(icon);
      mappings.set(icon.name, mapping);
    }

    return mappings;
  }

  /**
   * Identify icons that need AI generation (low confidence)
   */
  static identifyMissingIcons(
    mappings: Map<string, IconMapping>,
    threshold = 0.6
  ): string[] {
    const missing: string[] = [];

    for (const [name, mapping] of mappings) {
      if (mapping.confidence < threshold || mapping.lucideIcon === null) {
        missing.push(name);
      }
    }

    return missing;
  }

  /**
   * Generate coverage report
   */
  static generateCoverageReport(mappings: Map<string, IconMapping>): {
    total: number;
    primaryMapped: number;
    tagBased: number;
    missing: number;
    coveragePercentage: number;
    missingIcons: string[];
  } {
    let primaryMapped = 0;
    let tagBased = 0;
    let missing = 0;
    const missingIcons: string[] = [];

    for (const [name, mapping] of mappings) {
      if (mapping.source === 'primary') {
        primaryMapped++;
      } else if (mapping.source === 'tag-based' && mapping.confidence >= 0.6) {
        tagBased++;
      } else {
        missing++;
        missingIcons.push(name);
      }
    }

    const total = mappings.size;
    const coveragePercentage = ((primaryMapped + tagBased) / total) * 100;

    return {
      total,
      primaryMapped,
      tagBased,
      missing,
      coveragePercentage,
      missingIcons,
    };
  }
}
