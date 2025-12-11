# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.1] - 2025-12-11

### 🐛 Bug Fixes
- **Dark Mode Implementation**: Fixed CSS variables architecture to properly support light/dark toggling. Global styles now correctly utilize CSS variables for background and foreground colors instead of hardcoded values.
- **Theme Transitions**: Added smooth transitions for background and color changes.

## [1.5.0] - 2025-12-11

### 🎉 Major Update: Cosmic UI & Dark Mode
- **Cosmic Theme Engine**: Vollständige Implementierung des Dark Mode mit "Space"-Ästhetik.
- **Contrast Fixes**: Optimierte Lesbarkeit für Dropdowns und Inputs in beiden Modi.
- **Color Palette Features**: "Copy Palette" Button hinzugefügt zum direkten Kopieren der JSON-Konfiguration.
- **Performance**: Pagination auf 24 Items pro Seite optimiert.
- **UI Architecture**: Refactoring der `IconGallery` Komponente für bessere Wartbarkeit und Theme-Support.

## [1.1.1] - 2025-12-11

### 🎉 Added (Hinzugefügt)

#### Icon System Upgrade
- **Umfassende Icon-Erweiterung**: Über 80 neue, hochwertige SVG-Pfade hinzugefügt.
  - Abdeckung aller Kategorien: Essen, Gesundheit, Reise, Finanzen, Werkzeuge, Technik, Zuhause, Haustiere, UI.
  - Spezifische Icons für bisher fehlende Begriffe wie "Pizza", "Eis", "Krankenwagen", "Geldbeutel" etc.
- **Intelligentes Mapping**:
  - Vollständige Überarbeitung der `symbolMap` in der API.
  - Direkte Zuordnung aller deutschen Begriffe aus der Galerie zu den passenden englischen Icon-Keys.
  - Fallback-Strategie auf generische "Sterne" eliminiert.
- **Konzept-Dokumentation**: `ICON_GENERATION_CONCEPT.md` erstellt für zukünftige Skalierung (KI-Generierung).

## [1.1.0] - 2025-11-05

### 🎉 Added (Hinzugefügt)

#### Architektur & Code-Qualität
- **Custom Hooks** für bessere Code-Organisation:
  - `useLocalStorage` - Typsichere localStorage-Verwaltung
  - `useFavorites` - Zentrale Favoriten-Logik
  - `useIconSearch` - Optimierte Such- und Filterlogik
  - `usePagination` - Wiederverwendbare Pagination-Logik
  - `useGalleryData` - Strukturiertes Data-Fetching

#### Komponenten-Architektur
- **Feature-Sliced Design** Implementierung:
  - `GalleryHeader` - Suchleiste, Filter und Ansichtsmodus
  - `GalleryPagination` - Wiederverwendbare Pagination-Komponente
  - `GalleryEmptyState` - Benutzerfreundlicher Empty-State
  - `GalleryLoading` - Konsistenter Loading-State
  - `IconCard` - Modulare Icon-Card-Komponente
  - `IconCardActions` - Ausgelagerte Action-Buttons

#### Testing & Quality Assurance
- **Vitest** Testing-Setup mit React Testing Library
- Beispiel-Tests für Custom Hooks
- Test Coverage Konfiguration
- Test UI für interaktives Testing (\`npm run test:ui\`)

#### API & Validierung
- **Zod Schema Validierung** für API-Endpoints
- Typsichere Request-Parameter-Validierung
- Strukturierte Fehlerbehandlung mit Details

#### Developer Experience
- **Prettier** Konfiguration mit Tailwind CSS Plugin
- Erweiterte **TypeScript Strict Checks**:
  - \`noUncheckedIndexedAccess\`
  - \`noImplicitOverride\`
  - \`noFallthroughCasesInSwitch\`
  - \`noUnusedLocals\` und \`noUnusedParameters\`
- Neue NPM Scripts:
  - \`npm run format\` - Code formatieren
  - \`npm run format:check\` - Format-Check
  - \`npm run test\` - Tests ausführen
  - \`npm run test:ui\` - Test UI öffnen
  - \`npm run test:coverage\` - Coverage Report

#### Accessibility
- **Screen-Reader-Only** CSS Utility (\`.sr-only\`)
- Verbesserte ARIA-Labels für alle interaktiven Elemente
- \`aria-pressed\` States für Toggle-Buttons
- \`aria-live\` Regionen für dynamische Inhalte
- Semantische HTML-Struktur mit \`<article>\`, \`role="group"\`, etc.

#### Konfiguration
- Zentrale **Config-Datei** (\`lib/config.ts\`)
- Environment-basierte Konfiguration
- Feature-Flags für einfaches An-/Ausschalten von Features

#### Error Handling
- **Error Boundary** Component für React Errors
- Next.js 15 \`error.tsx\` für globales Error Handling
- Strukturierte Fehleranzeige mit Details

### 🔧 Changed (Geändert)

- **Refactored** \`IconGallery\` von 400+ Zeilen auf ~150 Zeilen
- **Verbesserte** TypeScript-Konfiguration mit strengeren Checks
- **Optimierte** Code-Organisation durch Feature-Slicing
- **Aktualisiert** \`globals.css\` mit Accessibility-Utilities

### 📚 Dependencies

#### Neue Dependencies
- \`zod\` ^3.22.4 - Schema-Validierung

#### Neue Dev Dependencies
- \`@testing-library/jest-dom\` ^6.1.5
- \`@testing-library/react\` ^14.1.2
- \`@testing-library/user-event\` ^14.5.1
- \`@vitejs/plugin-react\` ^4.2.1
- \`@vitest/ui\` ^1.0.4
- \`jsdom\` ^23.0.1
- \`prettier\` ^3.1.1
- \`prettier-plugin-tailwindcss\` ^0.5.9
- \`vitest\` ^1.0.4

### 📖 Documentation

- Erweiterte README mit neuen Features
- CHANGELOG hinzugefügt
- Inline-Dokumentation in allen Custom Hooks
- JSDoc-Kommentare für öffentliche APIs

### 🏗️ Technical Improvements

- **Bessere Testbarkeit** durch Komponenten-Aufteilung
- **Reduzierte Komplexität** durch Custom Hooks
- **Type-Safety** durch Zod-Validierung
- **Wartbarkeit** durch kleinere, fokussierte Komponenten
- **Performance** durch useMemo in Custom Hooks

---

## [1.0.0] - 2025-11-04

### 🎉 Initial Release

- Next.js 15 Setup mit App Router
- TypeScript Konfiguration
- SVG Icon Generator mit 40+ Icons
- Dynamische Icon-Galerie mit Suche und Filter
- Responsive Design (Mobile, Tablet, Desktop)
- Favoriten-System mit localStorage
- Download und Copy-to-Clipboard Funktionen
- Pagination (24 Icons pro Seite)
- Grid/List View Toggle
- 16 Kategorien
- Tailwind CSS Styling
- Lucide React Icons
- Supabase Integration (vorbereitet)

---

## Legende

- 🎉 **Added** - Neue Features
- 🔧 **Changed** - Änderungen an bestehenden Features
- 🐛 **Fixed** - Bug Fixes
- 🗑️ **Removed** - Entfernte Features
- 🔒 **Security** - Sicherheits-Fixes
- 📚 **Dependencies** - Dependency Updates
# Changelog

Alle wichtigen Änderungen an der SVG-Grafik Next.js Applikation werden in diesem Dokument dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
und dieses Projekt hält sich an [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-11-05

### Fixed
- Dependencies aktualisiert (ESLint, Tailwind CSS, PostCSS, TypeScript)
- Deprecated npm warnings behoben
- Build-Prozess stabilisiert
- Lockfile-Konflikte aufgelöst

## [1.0.1] - 2025-11-05

### Fixed
- Tailwind CSS Integration und Material Symbols Font
- Vollständige Tailwind CSS Konfiguration implementiert
- PostCSS Konfiguration hinzugefügt
- Material Symbols Font Integration
- Verbesserte .gitignore mit umfassenden Ausschlüssen
- Dokumentation aktualisiert

## [1.0.0] - 2025-11-05

### 🎉 Added - Neue Features

- **Erstmalige Veröffentlichung** der SVG-Grafik-Galerie
- **40+ professionelle SVG-Icons** für Chatbots
- **Intelligente Suchfunktion** mit Filtermöglichkeiten
- **Responsive Design** - funktioniert auf allen Geräten
- **Barrierefreiheit** - WCAG-konforme Implementierung
- **Dynamische SVG-Generierung** zur Laufzeit
- **Download-Funktionalität** für alle Icons
- **Kategorien-Filter** für bessere Navigation
- **Favoriten-System** für häufig verwendete Icons

### 🔧 Changed - Änderungen

- **Next.js Upgrade**: Von Version 14 auf 15 aktualisiert
- **TypeScript**: Vollständige Typisierung implementiert
- **Tailwind CSS**: Moderne Styling-Lösung eingeführt
- **Build-System**: Optimierte Build-Konfiguration

### 🛠️ Technical - Technische Verbesserungen

- **App Router**: Vollständige Migration zu Next.js App Router
- **API Routes**: RESTful API für Icon-Daten implementiert
- **Component Architecture**: Modulare Komponenten-Struktur
- **Performance**: Optimierte Ladezeiten und Rendering
- **SEO**: Meta-Tags und strukturierte Daten hinzugefügt

### 📚 Documentation - Dokumentation

- **Professionelle README.md** mit vollständiger Anleitung
- **API-Dokumentation** für alle Endpunkte
- **Entwicklungs-Setup** beschrieben
- **Deployment-Anleitungen** für verschiedene Plattformen

### 🚀 Deployment

- **Vercel Integration**: Automatische Deployments
- **Production Ready**: Vollständig produktionsreif
- **Environment Management**: Versionsbasierte Konfiguration

---

## Version History

### Version Numbering

Dieses Projekt verwendet [Semantic Versioning](https://semver.org/):

- **MAJOR.MINOR.PATCH** (z.B. 1.0.0)
- **MAJOR**: Breaking Changes
- **MINOR**: Neue Features (backward compatible)
- **PATCH**: Bug Fixes (backward compatible)

### Types of Changes

- **Added**: Neue Features
- **Changed**: Änderungen an bestehenden Features
- **Deprecated**: Bald entfernte Features
- **Removed**: Entfernte Features
- **Fixed**: Bug Fixes
- **Security**: Sicherheitsrelevante Änderungen

---

## Contributing to Changelog

Bei Beiträgen zu diesem Projekt bitte die folgenden Richtlinien beachten:

1. **Pull Requests** sollten Änderungen am Changelog enthalten
2. **Neue Features** in der nächsten Version dokumentieren
3. **Breaking Changes** als Major-Version markieren
4. **Bug Fixes** als Patch-Version dokumentieren

### Changelog Format

```markdown
## [Version] - YYYY-MM-DD

### Added
- Neue Features

### Changed
- Änderungen

### Fixed
- Bug Fixes
```

---

## Links

- [GitHub Repository](https://github.com/your-repo/svg-grafik-next)
- [Live Demo](https://svg-grafik-next-jgd0qv4p9-skquievreuxs-projects.vercel.app)
- [Issues](https://github.com/your-repo/svg-grafik-next/issues)
- [Discussions](https://github.com/your-repo/svg-grafik-next/discussions)
