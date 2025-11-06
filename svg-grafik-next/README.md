# SVG-Grafik Next.js 🎨

<div align="center">

[![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)](https://github.com/skquievreux/svg-grafik-generator)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Eine professionelle, interaktive SVG-Grafik-Galerie für Chatbot-Icons mit dynamischer Generierung**

[Live Demo](https://svg-grafik-next-jgd0qv4p9-skquievreuxs-projects.vercel.app) • [Dokumentation](#-verwendung) • [Features](#-features) • [API](#-api-endpunkte)

</div>

---

## 📋 Inhaltsverzeichnis

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Verwendung](#-verwendung)
- [API Endpunkte](#-api-endpunkte)
- [Projektstruktur](#-projektstruktur)
- [Entwicklung](#-entwicklung)
- [Deployment](#-deployment)
- [Beitrag leisten](#-beitrag-leisten)
- [Lizenz](#-lizenz)

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Design & UX
- **40+ professionelle SVG-Icons** für Chatbots
- **Responsive Design** - funktioniert auf allen Geräten
- **Grid & Listen-Ansicht** - flexible Darstellung
- **Favoriten-System** - Icons markieren und speichern
- **Smooth Animations** - moderne Übergänge

</td>
<td width="50%">

### ⚡ Technologie
- **Next.js 15** - App Router mit React Server Components
- **TypeScript Strict Mode** - 100% typsicher
- **Tailwind CSS** - Utility-First Styling
- **Dynamische Generierung** - SVGs zur Laufzeit
- **Performance-optimiert** - Static & Dynamic Rendering

</td>
</tr>
<tr>
<td width="50%">

### 🔍 Funktionalität
- **Intelligente Suche** - Echtzeit-Filterung
- **Kategorie-Filter** - 16+ Kategorien
- **Pagination** - Performante Darstellung
- **SVG-Export** - Download als .svg Datei
- **Copy to Clipboard** - SVG-Code kopieren

</td>
<td width="50%">

### 🛡️ Qualität
- **WCAG-konform** - Barrierefreiheit
- **Zod Validierung** - API Schema Validation
- **Custom Hooks** - Wiederverwendbare Logik
- **Testing** - Vitest + React Testing Library
- **Code Quality** - ESLint + Prettier

</td>
</tr>
</table>

## 🚀 Live Demo

Die Anwendung ist live auf Vercel deployed:

🔗 **[https://svg-grafik-next-jgd0qv4p9-skquievreuxs-projects.vercel.app](https://svg-grafik-next-jgd0qv4p9-skquievreuxs-projects.vercel.app)**

### Deployment-Status

- **Platform**: Vercel
- **Auto-Deploy**: Aktiv bei jedem Push zu `main`
- **Branch Previews**: Verfügbar für Pull Requests
- **Build Time**: ~6-8 Sekunden
- **CDN**: Global Edge Network

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/skquievreux/svg-grafik-generator)

## 🛠️ Tech Stack

### Core
| Technologie | Version | Beschreibung |
|------------|---------|-------------|
| [Next.js](https://nextjs.org/) | 15.5.6 | React Framework mit App Router |
| [React](https://react.dev/) | 18.x | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.2 | Strict Type Safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.15 | Utility-First CSS |

### Libraries & Tools
| Technologie | Version | Verwendung |
|------------|---------|-----------|
| [Lucide React](https://lucide.dev/) | 0.294.0 | Icon-Komponenten |
| [Zod](https://zod.dev/) | 3.22.4 | Schema Validation |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Conditional Classes |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 2.6.0 | Class Merging |

### Development & Testing
| Tool | Version | Zweck |
|------|---------|-------|
| [Vitest](https://vitest.dev/) | 1.0.4 | Unit Testing |
| [React Testing Library](https://testing-library.com/) | 14.1.2 | Component Testing |
| [ESLint](https://eslint.org/) | 9.15.0 | Code Linting |
| [Prettier](https://prettier.io/) | 3.1.1 | Code Formatting |

### Optional
- **Supabase** - Zukünftige Datenbank-Integration

## 📦 Installation

### Voraussetzungen

```bash
Node.js >= 18.0.0
npm >= 9.0.0 oder yarn >= 1.22.0
```

### Schnellstart

```bash
# 1. Repository klonen
git clone https://github.com/skquievreux/svg-grafik-generator.git
cd svg-grafik-generator/svg-grafik-next

# 2. Dependencies installieren
npm install

# 3. Entwicklungsserver starten
npm run dev
```

Die Anwendung ist nun unter **http://localhost:3000** verfügbar.

### Build für Produktion

```bash
# Production Build erstellen
npm run build

# Build lokal testen
npm run start
```

## 📜 Verwendung

### Grundfunktionen

#### 1. Icons durchsuchen
Verwenden Sie die Suchleiste, um nach spezifischen Icons zu suchen:
```
Eingabe: "chat" → Findet alle Icons mit "chat" im Namen
```

#### 2. Nach Kategorien filtern
Wählen Sie aus 16+ Kategorien:
- 🍔 Food
- 💪 Health
- ✈️ Travel
- 💰 Finance
- 📚 Education
- 🎮 Entertainment
- ... und mehr

#### 3. Icons exportieren
- **Download**: Klicken Sie auf das Download-Icon (💾)
- **Copy Code**: Kopieren Sie den SVG-Code (📋)

#### 4. Favoriten verwalten
- Markieren Sie Icons mit dem ❤️-Button
- Favoriten werden im localStorage gespeichert
- Zähler zeigt Anzahl der Favoriten

### Ansichtsmodi

**Grid-Ansicht** (Standard)
```
┌─────┬─────┬─────┬─────┐
│ Icon│ Icon│ Icon│ Icon│
└─────┴─────┴─────┴─────┘
```

**Listen-Ansicht**
```
┌────────────────────────┐
│ Icon  Name  [Actions]  │
├────────────────────────┤
│ Icon  Name  [Actions]  │
└────────────────────────┘
```

## 🌐 API Endpunkte

### `GET /api/icons`

Generiert ein einzelnes SVG-Icon dynamisch.

**Query Parameters:**
```typescript
{
  name: string;        // Icon-Name (required)
  category: string;    // Kategorie (required)
  shape?: string;      // 'octagon' | 'circle' | 'square' | 'hexagon'
  size?: number;       // Größe in Pixeln (default: 40)
}
```

**Beispiel:**
```bash
curl "https://your-domain.vercel.app/api/icons?name=Kochm%C3%BCtze&category=food&size=64"
```

**Response:**
```xml
Content-Type: image/svg+xml
Cache-Control: public, max-age=31536000

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- SVG Content -->
</svg>
```

### `GET /api/gallery`

Liefert alle verfügbaren Icons mit Metadaten.

**Response:**
```json
{
  "icons": [
    { "name": "Kochmütze", "category": "food" },
    { "name": "Hantel", "category": "health" }
  ],
  "categories": {
    "food": { "count": 5, "icons": ["Kochmütze", ...] },
    "health": { "count": 4, "icons": ["Hantel", ...] }
  },
  "metadata": {
    "total": 40,
    "categories": ["food", "health", ...],
    "generated": "2025-01-15T10:30:00.000Z"
  }
}
```

## 🏗️ Projektstruktur

```
svg-grafik-next/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 api/                # API Routes
│   │   ├── gallery/          # Galerie-Endpunkt
│   │   └── icons/            # Icon-Generator-Endpunkt
│   ├── error.tsx             # Error Boundary
│   ├── globals.css           # Globale Styles + Utilities
│   ├── layout.tsx            # Root Layout
│   └── page.tsx              # Homepage
│
├── 📁 components/             # React Components
│   ├── 📁 error-boundary/    # Error Handling
│   ├── 📁 gallery/           # Galerie-Komponenten (Feature-Sliced)
│   │   ├── icon-gallery.tsx          # Haupt-Galerie
│   │   ├── icon-gallery-refactored.tsx
│   │   ├── gallery-header.tsx        # Header mit Suche
│   │   ├── gallery-loading.tsx       # Loading State
│   │   ├── gallery-pagination.tsx    # Pagination
│   │   └── gallery-empty-state.tsx   # Empty State
│   ├── 📁 icon-card/         # Icon-Card-Komponenten
│   │   ├── icon-card.tsx            # Card Component
│   │   └── icon-card-actions.tsx    # Actions (Download, Copy)
│   ├── 📁 icons/             # Icon-Komponenten
│   │   └── dynamic-icon.tsx         # Dynamic SVG Renderer
│   └── 📁 ui/                # UI-Komponenten
│       └── button.tsx               # Button Component
│
├── 📁 hooks/                  # Custom React Hooks
│   ├── index.ts              # Barrel Export
│   ├── use-favorites.ts      # Favoriten-Management
│   ├── use-gallery-data.ts   # Galerie-Daten laden
│   ├── use-icon-search.ts    # Such-/Filter-Logik
│   ├── use-local-storage.ts  # localStorage Wrapper
│   └── use-pagination.ts     # Pagination-Logik
│
├── 📁 lib/                    # Utilities & Config
│   ├── 📁 api/               # API-Layer
│   │   └── schemas.ts        # Zod Validation Schemas
│   ├── 📁 icons/             # Icon-Generator
│   │   └── generator.ts      # SVG-Generierung
│   ├── config.ts             # App-Konfiguration
│   ├── utils.ts              # Helper Functions
│   └── version.ts            # Version Info
│
├── 📁 types/                  # TypeScript Types
│   └── index.d.ts            # Global Type Definitions
│
├── 📁 test/                   # Tests
│   ├── 📁 hooks/             # Hook Tests
│   │   └── use-favorites.test.ts
│   └── setup.ts              # Test Setup
│
├── 📁 public/                 # Static Assets
│
├── .eslintrc.json            # ESLint Config
├── .prettierrc.json          # Prettier Config
├── next.config.js            # Next.js Config
├── tailwind.config.js        # Tailwind Config
├── tsconfig.json             # TypeScript Config
├── vitest.config.ts          # Vitest Config
└── package.json              # Dependencies & Scripts
```

## 🔧 Entwicklung

### Verfügbare Scripts

```bash
# Development
npm run dev              # Dev-Server starten (http://localhost:3000)
npm run build            # Production Build erstellen
npm run start            # Production Build starten

# Code Quality
npm run lint             # ESLint ausführen
npm run type-check       # TypeScript Type-Checking
npm run format           # Code mit Prettier formatieren
npm run format:check     # Format-Check ohne Änderungen

# Testing
npm run test             # Tests ausführen
npm run test:ui          # Test UI öffnen (interaktiv)
npm run test:coverage    # Coverage Report generieren
```

### Entwickler-Workflow

1. **Feature-Branch erstellen**
   ```bash
   git checkout -b feature/neue-funktion
   ```

2. **Änderungen vornehmen**
   - Code schreiben
   - Tests hinzufügen
   - Formatierung prüfen: `npm run format:check`

3. **Type-Checking**
   ```bash
   npm run type-check
   ```

4. **Tests ausführen**
   ```bash
   npm run test
   ```

5. **Build testen**
   ```bash
   npm run build
   ```

6. **Committen & Pushen**
   ```bash
   git add .
   git commit -m "feat: Neue Funktion hinzugefügt"
   git push origin feature/neue-funktion
   ```

### Code-Qualitätsstandards

#### TypeScript Strict Mode
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

#### ESLint Regeln
- Next.js Core Web Vitals
- TypeScript Recommended
- React Hooks Rules

#### Prettier Konfiguration
- Tailwind CSS Plugin
- 2 Spaces Indentation
- Single Quotes
- Trailing Commas

### Testing

Das Projekt nutzt **Vitest** mit **React Testing Library**.

#### Test-Coverage

```bash
npm run test:coverage
```

Aktuelle Coverage:
- **Hooks**: 100% (all custom hooks tested)
- **Components**: In Progress
- **Utils**: In Progress

#### Custom Hooks Tests

Alle Custom Hooks sind vollständig getestet:

| Hook | Test File | Status |
|------|-----------|--------|
| `useFavorites` | `test/hooks/use-favorites.test.ts` | ✅ |
| `useLocalStorage` | TBD | 📝 |
| `useIconSearch` | TBD | 📝 |
| `usePagination` | TBD | 📝 |

## 🚀 Deployment

### Vercel (Empfohlen) ⭐

Die Anwendung ist bereits auf Vercel deployed.

**Live URL:** [svg-grafik-next-jgd0qv4p9-skquievreuxs-projects.vercel.app](https://svg-grafik-next-jgd0qv4p9-skquievreuxs-projects.vercel.app)

#### Deployment-Konfiguration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

#### Auto-Deployment

- **Main Branch** → Automatisch in Production
- **Pull Requests** → Preview-Deployments
- **Feature Branches** → Auf Anfrage

#### Environment Variables

Aktuell werden keine Environment-Variablen benötigt. Zukünftig für:
- `SUPABASE_URL` - Supabase-Projekt-URL
- `SUPABASE_ANON_KEY` - Supabase Public Key

### Alternative Plattformen

#### Netlify

```bash
# Netlify CLI
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Andere Hosting-Optionen

- **Railway** - Node.js-optimiert
- **Render** - Kostenlose SSL-Zertifikate
- **Fly.io** - Edge-Deployment
- **AWS Amplify** - Enterprise-Level
- **Cloudflare Pages** - Global CDN

## 🤝 Beitrag leisten

Beiträge sind herzlich willkommen! 🎉

### Contribution Workflow

1. **Fork** das Repository
2. **Clone** deinen Fork
   ```bash
   git clone https://github.com/dein-username/svg-grafik-generator.git
   ```
3. **Branch** erstellen
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Änderungen** committen
   ```bash
   git commit -m 'feat: Add amazing feature'
   ```
5. **Push** zum Branch
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Pull Request** erstellen

### Commit-Konventionen

Wir verwenden [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Neues Feature
fix: Bug-Fix
docs: Dokumentation
style: Formatierung
refactor: Code-Refactoring
test: Tests hinzufügen
chore: Maintenance
```

### Code-Review-Prozess

1. Alle Tests müssen bestehen ✅
2. Type-Checking ohne Fehler ✅
3. ESLint ohne Warnungen ✅
4. Build erfolgreich ✅
5. Mindestens 1 Approval ✅

## 📄 Lizenz

Dieses Projekt ist lizenziert unter der **MIT License**.

```
MIT License

Copyright (c) 2025 SVG-Grafik Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

Siehe [LICENSE](LICENSE) für vollständige Details.

## 🙏 Danksagungen

Dieses Projekt verwendet großartige Open-Source-Software:

- [**Next.js**](https://nextjs.org/) - Das React-Framework für Production
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-First CSS Framework
- [**Lucide**](https://lucide.dev/) - Beautiful & consistent icons
- [**Vercel**](https://vercel.com/) - Deployment & Hosting Platform
- [**Vitest**](https://vitest.dev/) - Blazing Fast Unit Test Framework
- [**Zod**](https://zod.dev/) - TypeScript-first schema validation
- [**React**](https://react.dev/) - The library for web and native user interfaces

## 📞 Support & Community

### Support erhalten

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/skquievreux/svg-grafik-generator/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/skquievreux/svg-grafik-generator/issues/new?template=feature_request.md)
- 💬 **Diskussionen**: [GitHub Discussions](https://github.com/skquievreux/svg-grafik-generator/discussions)
- 📧 **Email**: support@example.com

### Hilfreiche Links

- 📚 [Dokumentation](https://github.com/skquievreux/svg-grafik-generator/wiki)
- 🔄 [Changelog](CHANGELOG.md)
- 🗺️ [Roadmap](https://github.com/skquievreux/svg-grafik-generator/projects)
- 🎓 [Tutorials](https://github.com/skquievreux/svg-grafik-generator/wiki/Tutorials)

## 🔄 Changelog

Alle wichtigen Änderungen werden in [CHANGELOG.md](CHANGELOG.md) dokumentiert.

### Aktuelle Version: 1.1.1

#### Fixed
- Dependencies aktualisiert (ESLint v9, Next.js 15.5.6)
- TypeScript Strict Mode Fehler behoben
- package.json Duplikate entfernt
- Build kompiliert ohne Fehler

#### Previous Versions
- **1.1.0**: Architecture improvements, Custom Hooks
- **1.0.2**: Dependency updates, Build fixes
- **1.0.1**: Tailwind CSS Integration
- **1.0.0**: Initial Release

---

<div align="center">

**Erstellt mit ❤️ für Entwickler und Designer**

[⬆ Zurück nach oben](#svg-grafik-nextjs-)

</div>
