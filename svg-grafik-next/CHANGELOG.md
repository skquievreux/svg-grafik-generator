# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
