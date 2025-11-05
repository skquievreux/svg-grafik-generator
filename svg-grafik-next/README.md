# SVG-Grafik Next.js

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/your-repo/svg-grafik-next)
[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0.0-38B2AC.svg)](https://tailwindcss.com/)

Eine interaktive SVG-Grafik-Galerie für Chatbot-Icons mit dynamischer Generierung. Entdecken Sie eine umfangreiche Sammlung von professionellen SVG-Icons für Chatbots, filtern, suchen und laden Sie Ihre Lieblings-Icons herunter.

## ✨ Features

- 🎨 **40+ professionelle SVG-Icons** für Chatbots
- 🔍 **Intelligente Suche** und Filterfunktionen
- 📱 **Responsive Design** - funktioniert auf allen Geräten
- ♿ **Barrierefrei** - WCAG-konform mit ARIA-Labels
- ⚡ **Blitzschnell** - optimiert mit Next.js 15
- 🎯 **TypeScript** - vollständige Typisierung mit strict mode
- 🎨 **Tailwind CSS** - moderne Styling-Lösung
- 🔄 **Dynamische Generierung** - SVG-Icons werden zur Laufzeit erstellt
- 🧪 **Testing** - Vitest Setup mit React Testing Library
- 🛡️ **Validierung** - Zod Schema Validierung für APIs
- 🎨 **Code Quality** - Prettier & ESLint Konfiguration
- 🪝 **Custom Hooks** - Wiederverwendbare React Hooks

## 🚀 Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://svg-grafik-next-jgd0qv4p9-skquievreuxs-projects.vercel.app)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0.0 (App Router)
- **Sprache**: TypeScript 5.0.0 (Strict Mode)
- **Styling**: Tailwind CSS 3.0.0
- **Icons**: Lucide React
- **Validierung**: Zod 3.22.4
- **Testing**: Vitest + React Testing Library
- **Formatierung**: Prettier + Tailwind Plugin
- **Deployment**: Vercel
- **Datenbank**: Supabase (optional)

## 📦 Installation

### Voraussetzungen

- Node.js 18+
- npm oder yarn

### Lokale Installation

```bash
# Repository klonen
git clone https://github.com/your-repo/svg-grafik-next.git
cd svg-grafik-next

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist nun unter `http://localhost:3000` verfügbar.

## 📜 Verwendung

### Grundfunktionen

1. **Icons durchsuchen**: Verwenden Sie die Suchleiste, um nach spezifischen Icons zu suchen
2. **Nach Kategorien filtern**: Wählen Sie Kategorien aus, um die Ergebnisse einzugrenzen
3. **Icons herunterladen**: Klicken Sie auf ein Icon, um es als SVG-Datei herunterzuladen
4. **Favoriten speichern**: Markieren Sie Ihre Lieblings-Icons für später

### API-Endpunkte

#### Icons abrufen
```http
GET /api/icons?name=chat&category=communication&shape=circle
```

#### Galerie-Daten
```http
GET /api/gallery
```

## 🏗️ Projektstruktur

```
svg-grafik-next/
├── app/                    # Next.js App Router
│   ├── api/               # API-Routen mit Zod Validierung
│   ├── globals.css        # Globale Styles + Utilities
│   ├── layout.tsx         # Root-Layout
│   ├── page.tsx           # Startseite
│   └── error.tsx          # Error Boundary
├── components/            # React-Komponenten
│   ├── gallery/           # Galerie-Komponenten (Feature-Sliced)
│   ├── icon-card/         # Icon-Card-Komponenten
│   ├── ui/                # UI-Komponenten
│   └── error-boundary.tsx # React Error Boundary
├── hooks/                 # Custom React Hooks
│   ├── use-favorites.ts
│   ├── use-gallery-data.ts
│   ├── use-icon-search.ts
│   ├── use-local-storage.ts
│   └── use-pagination.ts
├── lib/                   # Hilfsfunktionen & Config
│   ├── api/              # API Schemas & Validierung
│   ├── icons/            # Icon-Generator
│   ├── config.ts         # App-Konfiguration
│   ├── utils.ts          # Utility-Funktionen
│   └── version.ts        # Versionsinformationen
├── types/                 # TypeScript-Typen
├── test/                  # Tests
│   ├── hooks/            # Hook-Tests
│   └── setup.ts          # Test-Setup
└── public/               # Statische Assets
```

## 🔧 Entwicklung

### Verfügbare Scripts

```bash
# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Build starten
npm run start

# Linting durchführen
npm run lint

# Type-Checking
npm run type-check

# Code formatieren
npm run format

# Format-Check
npm run format:check

# Tests ausführen
npm run test

# Test UI öffnen
npm run test:ui

# Test Coverage
npm run test:coverage
```

### Code-Qualität

Das Projekt verwendet strenge Code-Qualitätsstandards:

- **ESLint**: Code-Linting mit Next.js-Regeln
- **TypeScript**: Strenge Typisierung mit erweiterten Checks
  - `noUncheckedIndexedAccess`
  - `noImplicitOverride`
  - `noUnusedLocals`
  - `noUnusedParameters`
- **Prettier**: Automatische Code-Formatierung mit Tailwind Plugin
- **Zod**: Schema-Validierung für API-Endpoints

### Testing

Das Projekt nutzt **Vitest** mit React Testing Library:

```bash
# Unit-Tests ausführen
npm run test

# Test UI (interaktiv)
npm run test:ui

# Coverage Report
npm run test:coverage
```

#### Custom Hooks Testing

Alle Custom Hooks sind mit Unit Tests abgedeckt:
- `useFavorites` - Favoriten-Verwaltung
- `useLocalStorage` - localStorage Integration
- `useIconSearch` - Such-/Filter-Logik
- `usePagination` - Pagination-Logik

## 🚀 Deployment

### Vercel (Empfohlen)

1. Repository mit Vercel verbinden
2. Automatisches Deployment bei jedem Push
3. Environment-Variablen konfigurieren

### Andere Plattformen

Das Projekt kann auf jeder Node.js-kompatiblen Plattform deployed werden:

- **Netlify**
- **Railway**
- **Render**
- **Heroku**

## 🤝 Beitrag leisten

Beiträge sind willkommen! Bitte lesen Sie die [Contributing Guidelines](CONTRIBUTING.md) für Details.

### Entwicklungs-Workflow

1. Fork das Repository
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

## 🙏 Danksagungen

- [Next.js](https://nextjs.org/) - Das React-Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Vercel](https://vercel.com/) - Deployment-Plattform
- [Vitest](https://vitest.dev/) - Blazing Fast Unit Test Framework
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## 📞 Support

Bei Fragen oder Problemen:

- 🐛 [Issues](https://github.com/your-repo/svg-grafik-next/issues) erstellen
- 💬 [Discussions](https://github.com/your-repo/svg-grafik-next/discussions) starten
- 📧 [Email](mailto:support@example.com) senden

## 🔄 Changelog

Alle wichtigen Änderungen werden in der [CHANGELOG.md](CHANGELOG.md) dokumentiert.

---

**Erstellt mit ❤️ für Entwickler und Designer**
# SVG-Grafik Next.js

[![Version](https://img.shields.io/badge/version-1.0.2-blue.svg)](https://github.com/your-repo/svg-grafik-next)
[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0.0-38B2AC.svg)](https://tailwindcss.com/)

Eine interaktive SVG-Grafik-Galerie für Chatbot-Icons mit dynamischer Generierung. Entdecken Sie eine umfangreiche Sammlung von professionellen SVG-Icons für Chatbots, filtern, suchen und laden Sie Ihre Lieblings-Icons herunter.

## ✨ Features

- 🎨 **40+ professionelle SVG-Icons** für Chatbots
- 🔍 **Intelligente Suche** und Filterfunktionen
- 📱 **Responsive Design** - funktioniert auf allen Geräten
- ♿ **Barrierefrei** - WCAG-konform
- ⚡ **Blitzschnell** - optimiert mit Next.js 15
- 🎯 **TypeScript** - vollständige Typisierung
- 🎨 **Tailwind CSS** - moderne Styling-Lösung
- 🔄 **Dynamische Generierung** - SVG-Icons werden zur Laufzeit erstellt

## 🚀 Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://svg-grafik-next-jgd0qv4p9-skquievreuxs-projects.vercel.app)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0.0 (App Router)
- **Sprache**: TypeScript 5.0.0
- **Styling**: Tailwind CSS 3.0.0
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Datenbank**: Supabase (optional)

## 📦 Installation

### Voraussetzungen

- Node.js 18+
- npm oder yarn

### Lokale Installation

```bash
# Repository klonen
git clone https://github.com/your-repo/svg-grafik-next.git
cd svg-grafik-next

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist nun unter `http://localhost:3000` verfügbar.

## 📜 Verwendung

### Grundfunktionen

1. **Icons durchsuchen**: Verwenden Sie die Suchleiste, um nach spezifischen Icons zu suchen
2. **Nach Kategorien filtern**: Wählen Sie Kategorien aus, um die Ergebnisse einzugrenzen
3. **Icons herunterladen**: Klicken Sie auf ein Icon, um es als SVG-Datei herunterzuladen
4. **Favoriten speichern**: Markieren Sie Ihre Lieblings-Icons für später

### API-Endpunkte

#### Icons abrufen
```http
GET /api/icons?name=chat&category=communication&shape=circle
```

#### Galerie-Daten
```http
GET /api/gallery
```

## 🏗️ Projektstruktur

```
svg-grafik-next/
├── app/                    # Next.js App Router
│   ├── api/               # API-Routen
│   ├── gallery/           # Galerie-Seite
│   ├── globals.css        # Globale Styles
│   ├── layout.tsx         # Root-Layout
│   └── page.tsx           # Startseite
├── components/            # React-Komponenten
│   ├── gallery/           # Galerie-Komponenten
│   └── ui/                # UI-Komponenten
├── lib/                   # Hilfsfunktionen
│   ├── icons/            # Icon-Generator
│   ├── utils.ts          # Utility-Funktionen
│   └── version.ts        # Versionsinformationen
├── types/                 # TypeScript-Typen
└── public/               # Statische Assets
```

## 🔧 Entwicklung

### Verfügbare Scripts

```bash
# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Build starten
npm run start

# Linting durchführen
npm run lint

# Type-Checking
npm run type-check
```

### Code-Qualität

Das Projekt verwendet strenge Code-Qualitätsstandards:

- **ESLint**: Code-Linting mit Next.js-Regeln
- **TypeScript**: Strenge Typisierung
- **Prettier**: Code-Formatierung (empfohlen)

### Testing

```bash
# Unit-Tests (falls implementiert)
npm run test

# E2E-Tests (falls implementiert)
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Empfohlen)

1. Repository mit Vercel verbinden
2. Automatisches Deployment bei jedem Push
3. Environment-Variablen konfigurieren

### Andere Plattformen

Das Projekt kann auf jeder Node.js-kompatiblen Plattform deployed werden:

- **Netlify**
- **Railway**
- **Render**
- **Heroku**

## 🤝 Beitrag leisten

Beiträge sind willkommen! Bitte lesen Sie die [Contributing Guidelines](CONTRIBUTING.md) für Details.

### Entwicklungs-Workflow

1. Fork das Repository
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

## 🙏 Danksagungen

- [Next.js](https://nextjs.org/) - Das React-Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Vercel](https://vercel.com/) - Deployment-Plattform

## 📞 Support

Bei Fragen oder Problemen:

- 🐛 [Issues](https://github.com/your-repo/svg-grafik-next/issues) erstellen
- 💬 [Discussions](https://github.com/your-repo/svg-grafik-next/discussions) starten
- 📧 [Email](mailto:support@example.com) senden

## 🔄 Changelog

Alle wichtigen Änderungen werden in der [CHANGELOG.md](CHANGELOG.md) dokumentiert.

---

**Erstellt mit ❤️ für Entwickler und Designer**
