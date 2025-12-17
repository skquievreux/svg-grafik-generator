# Rider-Avatar-Generator - Konzept für Bikepark Okarben

**Version:** 1.0
**Datum:** 2025-01-16
**Projekt:** SVG-Grafik-Generator → Rider-Avatar-Extension

---

## 🎯 **Zielsetzung**

Entwicklung eines Avatar-Generierungssystems für Rider-Profile der Bikepark Okarben App mit:
- **Stylisches Design** passend zum Orange/Schwarz Farbschema
- **Schnelle Generierung** (< 100ms)
- **Personalisierungsoptionen** aus größerer Auswahl
- **Optionale RP-Service Integration** für Premium-Features

---

## 🎨 **Design-Prinzipien**

### Farbpalette (aus App-Screenshots)
```css
--primary-orange: #FF6600
--dark-bg: #1A1A1A
--light-text: #FFFFFF
--gray-accent: #808080
--highlight: #FF8833
```

### Stil-Richtung
- **Flat Design** mit modernem Look
- **Geometrische Formen** (passend zu bestehendem Icon-Generator)
- **Sport-/Action-Fokus** (Helm, Bike-Elemente)
- **Unterscheidbare Silhouetten** für schnelle Erkennbarkeit

---

## 📦 **Avatar-Komponenten-System**

### Basis-Struktur
Jeder Avatar besteht aus kombinierbaren Elementen:

1. **Hintergrund-Shape**
   - Kreis (Standard)
   - Oktagon (Athletic)
   - Sechseck (Tech)
   - Diamant (Premium)

2. **Helm-Styles** (20 Varianten)
   - Fullface (Downhill)
   - Half-Shell (Trail)
   - Enduro
   - BMX
   - Custom Designs

3. **Gesichts-Features** (Silhouetten)
   - Brille-Types (10 Varianten)
   - Bart-Styles (8 Varianten)
   - Gesichtsformen (5 Varianten)

4. **Accessoires** (optional)
   - Goggles
   - Nackenschutz
   - Kamera (GoPro-Style)
   - Sponsor-Logos

5. **Farb-Schemas** (vordefiniert)
   - Primary: Orange/Schwarz
   - Team: Blau/Weiß
   - Premium: Gold/Schwarz
   - Custom: Frei wählbar

---

## 🔧 **Technische Architektur**

### **Option 1: SVG-Generator-Erweiterung** (Empfohlen)

#### Vorteile
✅ Nutzt bestehende Infrastruktur
✅ Schnell (< 100ms Generierung)
✅ Kostenlos (keine API-Kosten)
✅ Offline-fähig
✅ Konsistentes Design
✅ Einfache Anpassung

#### Nachteile
⚠️ Kein Photorealismus
⚠️ Begrenzte Detail-Tiefe
⚠️ Manuelle Design-Arbeit nötig

#### Implementierung
```typescript
// lib/riders/avatar-generator.ts
interface RiderAvatarConfig {
  // Basis
  riderName: string;
  level: number; // 1-100

  // Visuals
  backgroundShape: 'circle' | 'octagon' | 'hexagon' | 'diamond';
  helmetStyle: string;
  faceFeatures: {
    glasses: string;
    beard?: string;
    faceShape: string;
  };
  accessories: string[];

  // Farben
  colorScheme: 'primary' | 'team' | 'premium' | 'custom';
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };

  // Metadata
  size: number; // 64, 128, 256, 512
  animated?: boolean; // Für spätere Erweiterung
}

class RiderAvatarGenerator {
  generateSVG(config: RiderAvatarConfig): string {
    // Generiert SVG-Avatar basierend auf Konfiguration
  }

  getRandomConfig(level: number): RiderAvatarConfig {
    // Generiert zufällige, aber level-angemessene Konfiguration
  }

  getPresetConfigs(): RiderAvatarConfig[] {
    // Vordefinierte "Starter-Avatare"
  }
}
```

#### API-Endpunkt
```typescript
// app/api/riders/avatar/route.ts
GET /api/riders/avatar?
  name=Sendit_76
  &level=1
  &helmet=fullface
  &scheme=primary
  &size=256

Response: SVG mit Cache-Headers (1 Jahr)
```

---

### **Option 2: Replicate API Integration** (Premium-Feature)

#### Vorteile
✅ Fotorealistische Portraits
✅ Hochwertige, einzigartige Bilder
✅ KI-generiert (moderne Tech)
✅ Automatische Variation

#### Nachteile
⚠️ API-Kosten (~$0.002-0.01 pro Bild)
⚠️ Längere Generierung (5-30 Sekunden)
⚠️ Internet-Abhängigkeit
⚠️ Schwieriger zu kontrollieren

#### Implementierung
```typescript
// lib/riders/ai-avatar-generator.ts
import Replicate from 'replicate';

interface AIAvatarConfig {
  riderName: string;
  prompt: string; // Auto-generiert basierend auf Preferences
  style: 'realistic' | 'artistic' | 'cartoon' | 'cyberpunk';
  seed?: number; // Für Reproduzierbarkeit
}

class AIAvatarGenerator {
  private replicate: Replicate;

  async generateAvatar(config: AIAvatarConfig): Promise<string> {
    const prompt = this.buildPrompt(config);

    const output = await this.replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt,
          negative_prompt: "blurry, low quality, distorted",
          width: 512,
          height: 512,
        }
      }
    );

    return output as string; // URL zum generierten Bild
  }

  private buildPrompt(config: AIAvatarConfig): string {
    return `professional mountain bike rider portrait,
            wearing ${config.style} helmet,
            orange and black color scheme,
            action sports aesthetic,
            high quality, 4k`;
  }
}
```

#### API-Endpunkt
```typescript
// app/api/riders/ai-avatar/route.ts
POST /api/riders/ai-avatar
Body: {
  "riderName": "Sendit_76",
  "style": "realistic",
  "preferences": {
    "helmetColor": "orange",
    "background": "dark"
  }
}

Response: {
  "url": "https://replicate.delivery/...",
  "jobId": "abc123",
  "estimatedTime": 15
}
```

---

## 🎮 **User Experience Flow**

### Szenario 1: Neue User-Registrierung
```
1. User erstellt Account
2. System generiert 5 Starter-Avatare (SVG)
   → Verschiedene Helm-Styles
   → Level 1 angepasst
   → Orange/Schwarz Scheme
3. User wählt Favoriten aus
4. Avatar wird gespeichert & angezeigt
```

### Szenario 2: Level-Up & Customization
```
1. User erreicht Level 10
2. Unlock: Neue Helm-Styles + Accessories
3. User öffnet Avatar-Editor
4. Wählt neue Komponenten
5. Preview in Echtzeit
6. Speichern → Neuer Avatar
```

### Szenario 3: Premium AI-Avatar (Optional)
```
1. User mit Premium-Account
2. Klick auf "AI Avatar erstellen"
3. Wählt Style (Realistic/Artistic/Cyberpunk)
4. Gibt Präferenzen an
5. Generierung (15-30 Sek Loading)
6. 4 Varianten zur Auswahl
7. Auswahl → Download als High-Res PNG
```

---

## 📊 **Datenbank-Schema**

```sql
-- Rider Profiles
CREATE TABLE rider_profiles (
  id UUID PRIMARY KEY,
  rider_name VARCHAR(50) UNIQUE NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Avatar Configurations
CREATE TABLE rider_avatars (
  id UUID PRIMARY KEY,
  rider_id UUID REFERENCES rider_profiles(id),
  avatar_type VARCHAR(20) CHECK (avatar_type IN ('svg', 'ai')),

  -- SVG Config (JSON)
  svg_config JSONB,

  -- AI Config
  ai_image_url TEXT,
  ai_prompt TEXT,
  ai_seed INTEGER,

  -- Metadata
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Avatar Components (für SVG)
CREATE TABLE avatar_components (
  id UUID PRIMARY KEY,
  category VARCHAR(50), -- 'helmet', 'glasses', 'background', etc.
  name VARCHAR(100),
  svg_path TEXT,
  unlock_level INTEGER DEFAULT 1,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Unlocks
CREATE TABLE rider_unlocks (
  rider_id UUID REFERENCES rider_profiles(id),
  component_id UUID REFERENCES avatar_components(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (rider_id, component_id)
);
```

---

## 🖼️ **Avatar-Komponenten-Bibliothek**

### Helm-Designs (Beispiele)

```typescript
const helmetLibrary = {
  // Downhill
  fullface_basic: {
    svg: '<path d="M12,4 L18,10 L18,16 L12,20 L6,16 L6,10 Z"/>',
    color: 'primary',
    unlockLevel: 1
  },
  fullface_pro: {
    svg: '<path d="M12,3 L20,8 L20,16 L12,21 L4,16 L4,8 Z"><path d="M8,10 h8 v2 h-8 z"/>',
    color: 'primary',
    unlockLevel: 10
  },

  // Trail/Enduro
  halfshell_basic: {
    svg: '<path d="M12,5 L17,9 L17,13 L12,15 L7,13 L7,9 Z"/>',
    color: 'secondary',
    unlockLevel: 1
  },

  // BMX/Dirt
  bmx_classic: {
    svg: '<circle cx="12" cy="10" r="8"/><rect x="10" y="14" width="4" height="2"/>',
    color: 'accent',
    unlockLevel: 5
  },

  // Special Events
  champion_gold: {
    svg: '<path d="...crown shape..."/>',
    color: 'gold',
    unlockLevel: 50,
    isPremium: true
  }
};
```

### Brillen-Designs
```typescript
const glassesLibrary = {
  sporty_basic: '<rect x="6" y="11" width="12" height="2" rx="1"/>',
  goggles_mx: '<path d="M5,10 Q5,8 7,8 L17,8 Q19,8 19,10 L19,12 Q19,14 17,14 L7,14 Q5,14 5,12 Z"/>',
  aviator_cool: '<path d="M6,11 Q6,9 8,9 L10,9 M14,9 L16,9 Q18,9 18,11"/>',
  visor_futuristic: '<path d="M6,10 L18,10 Q20,10 20,12 L4,12 Q4,10 6,10"/>',
};
```

---

## 🔄 **RP-Service Integration (Externe App)**

Falls du eine separate App für Rider-Profile hast:

### Webhook-basiert
```typescript
// app/api/riders/webhook/route.ts
POST /api/riders/webhook/avatar-request
Headers: {
  'X-RP-Service-Key': 'secret_key_here'
}
Body: {
  "riderId": "uuid",
  "riderName": "Sendit_76",
  "action": "generate_avatar",
  "preferences": {
    "style": "downhill_pro",
    "colors": ["#FF6600", "#1A1A1A"]
  }
}

Response: {
  "avatarUrl": "https://your-domain.com/api/riders/avatar/uuid.svg",
  "configId": "config-uuid",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

### REST API für externe App
```typescript
// Externe App → SVG Generator
GET https://svg-generator.com/api/v1/riders/avatar/generate
Query Params:
  - riderId: uuid
  - apiKey: your_api_key
  - preset: downhill_pro
  - level: 15
  - format: svg|png

Response: SVG-Datei oder PNG (Base64)
```

---

## 💰 **Monetarisierungs-Optionen**

### Free Tier
- 5 Starter-Avatare (SVG)
- Basis-Komponenten (Level 1-20)
- Standard-Farbschemas

### Premium Tier ($2.99/Monat)
- Alle SVG-Komponenten
- Custom Farben
- Animated Avatare (später)
- 5 AI-Generierungen/Monat

### Pro Tier ($9.99/Monat)
- Unlimited AI-Generierungen
- High-Res Exports (4K)
- Custom Component Upload
- API-Zugriff

---

## 📈 **Roadmap**

### Phase 1: MVP (Woche 1-2)
- [ ] SVG-Avatar-Generator-Klasse
- [ ] 20 Basis-Komponenten (Helme, Brillen)
- [ ] API-Endpunkt `/api/riders/avatar`
- [ ] Datenbank-Schema
- [ ] 5 Starter-Presets

### Phase 2: UI & Personalization (Woche 3-4)
- [ ] Avatar-Editor-Interface
- [ ] Component-Unlock-System
- [ ] Level-basierte Freischaltungen
- [ ] Save/Load Avatar-Configs

### Phase 3: AI-Integration (Woche 5-6)
- [ ] Replicate API Setup
- [ ] AI-Avatar-Generator
- [ ] Job-Queue für Generierung
- [ ] Image-Storage (S3/Cloudinary)

### Phase 4: Advanced Features (Woche 7-8)
- [ ] Animated SVG-Avatare
- [ ] 3D-Rotation-Effect
- [ ] Social Sharing
- [ ] Rider-Leaderboard mit Avataren

---

## 🎨 **Design-Mockup-Ideen**

### Avatar-Gallery-View
```
┌─────────────────────────────────────────┐
│  Wähle deinen Rider-Avatar              │
├─────────┬─────────┬─────────┬───────────┤
│  [🏍️]  │  [🚴]  │  [⛷️]  │  [🏂]    │
│ Downhill│ Trail   │ Enduro  │  BMX      │
│  LVL 1  │  LVL 1  │ LVL 10  │ LVL 5    │
└─────────┴─────────┴─────────┴───────────┘
```

### Avatar-Editor-Interface
```
┌──────────────────────────────────────────┐
│            Avatar-Editor                  │
├──────────────┬───────────────────────────┤
│              │  Komponenten               │
│              │  ├─ Helm: Fullface Pro    │
│   [PREVIEW]  │  ├─ Brille: Sport Goggles │
│     512x512  │  ├─ Bart: Keiner          │
│              │  └─ Farbe: Orange/Schwarz │
│              │                            │
│              │  [Randomize] [Save]       │
└──────────────┴───────────────────────────┘
```

---

## 🔒 **Sicherheit & Performance**

### Caching-Strategie
```typescript
// Cache-Control für generierte Avatare
headers: {
  'Cache-Control': 'public, max-age=31536000, immutable',
  'ETag': generateETag(config),
}

// Redis-Cache für häufig angeforderte Avatare
const cacheKey = `avatar:${riderId}:${configHash}`;
await redis.set(cacheKey, svgContent, 'EX', 86400); // 24h
```

### Rate-Limiting
```typescript
// AI-Generierung Rate-Limit
const limit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Stunde
  max: isPremium ? 20 : 5,   // Premium: 20, Free: 5
});
```

### CDN-Integration
```typescript
// Cloudflare/Vercel Edge für globale Verfügbarkeit
const avatarUrl = `https://cdn.bikeparkokarben.com/avatars/${riderId}/${hash}.svg`;
```

---

## 📝 **Zusammenfassung**

### Empfohlener Ansatz: **Hybrid-System**

1. **Primär: SVG-Generator** (95% der Use-Cases)
   - Schnell, kostenlos, konsistent
   - Perfekt für Gaming-Style
   - Passt zum Flat-Design der App

2. **Optional: AI-Generator** (Premium-Feature)
   - Für besondere Anlässe
   - Premium-User-Benefit
   - Marketing-Tool ("Dein realistisches Rider-Portrait!")

### Nächste Schritte

1. **Du entscheidest:**
   - SVG-Only oder Hybrid?
   - Welche Komponenten-Styles prioritär?
   - Integration-Methode (Webhook/REST API)?

2. **Ich implementiere:**
   - Avatar-Generator-Klasse
   - API-Endpunkte
   - Datenbank-Migration
   - Beispiel-Frontend

---

**Erstellt von:** Claude (Anthropic)
**Für Projekt:** Bikepark Okarben Rider-Avatar-System
**Kontakt:** [Deine Kontaktinfo]
