# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.9.0] - 2025-12-11

### 🎉 Feature: Footer & Hydration Fix
- **Footer Component**: Professioneller Footer mit Developer Credit und Copyright
  - Link zu Quievreux Consulting (mailto)
  - Copyright © 2025 SVG Galerie
  - Dark Mode Support
- **Hydration Warning Fix**: `suppressHydrationWarning` auf `<body>` Element
  - Behebt Browser-Extension-Konflikte (z.B. cz-shortcut-listen)
- **Layout Verbesserung**: Flexbox-Layout für sticky Footer
  - `min-h-screen` auf body
  - `flex-1` auf main content
  - Footer bleibt am unteren Rand

## [1.8.2] - 2025-12-11

### 🎨 Feature: Automatische Icon-Farbanpassung
- **Theme-Detection**: Icons erkennen automatisch Dark/Light Mode
- **Auto Background**: 
  - Light Mode: Weißer Hintergrund (#FFFFFF)
  - Dark Mode: Schwarzer Hintergrund (#000000)
- **Auto Icon Color**:
  - Light Mode: Schwarze Icons (#000000)
  - Dark Mode: Weiße Icons (#FFFFFF)
- **MutationObserver**: Reagiert sofort auf Theme-Wechsel
- **Custom Colors**: Manuelle Farben überschreiben Auto-Anpassung

**Jetzt sind Icons in beiden Modi perfekt sichtbar!**

## [1.8.1] - 2025-12-11

### 🐛 Bug Fix: Icon Viewer Modal Dark Mode
- **Modal Background**: Jetzt dunkel im Dark Mode (`dark:bg-space-900/95`)
- **Palette Cards**: Dunkler Hintergrund im Dark Mode
- **Text Colors**: Besserer Kontrast für Titel und Beschreibungen
- **Border Colors**: Angepasst für Dark Mode (`dark:border-space-light/20`)

**Jetzt können Sie Icons im Dark Mode korrekt in der Vorschau sehen!**

## [1.8.0] - 2025-12-11

### 🎉 MAJOR: Tailwind CSS v4 Migration - ERFOLGREICH!

**Das Problem war gelöst!** Nach intensivem Debugging haben wir die korrekte Tailwind v4 Konfiguration implementiert.

#### ✅ Was funktioniert jetzt:
- **Tailwind CSS v4** mit `@import "tailwindcss"` Syntax
- **Dark Mode** via `@custom-variant dark (&:where(.dark, .dark *))`
- **Custom Colors** via `@theme { --color-space-950: #050511; }`
- **Custom Utilities** via `@utility glass-card { }`
- **Alle Tailwind-Klassen** werden korrekt angewendet
- **`dark:` Varianten** funktionieren perfekt

#### 🔧 Technische Änderungen:
- **globals.css**: Komplett neu strukturiert mit v4-Syntax
  - `@custom-variant dark` für Dark Mode Support
  - `@theme` für Custom Colors (space-*, neon-*, etc.)
  - `@utility` für Custom Utilities (glass-card)
- **postcss.config.mjs**: Verwendet `@tailwindcss/postcss` Plugin
- **tailwind.config.ts**: `darkMode` Option entfernt (wird via CSS gesteuert)
- **package.json**: Tailwind v4.1.17 + @tailwindcss/postcss v4.1.17

#### 📚 Dokumentation:
- `TAILWIND_PROBLEM_ANALYSIS.md`: Vollständige Problem-Analyse
- `TAILWIND_DEBUG.md`: Debug-Guide für zukünftige Probleme

#### 🚀 Nächste Schritte:
- Icon Gallery auf Dark Mode umstellen
- Test-Seiten entfernen
- Production Build testen

**Warum es vorher nicht funktionierte:**
Tailwind v4 hat eine komplett neue CSS-first Konfiguration. Die `dark:` Varianten benötigen `@custom-variant dark` in der CSS-Datei, nicht mehr `darkMode: ["class"]` in der Config!

## [1.7.2] - 2025-12-11

### 🐛 Critical Fix: Dark Mode Hydration
- **Hydration Mismatch behoben**: `suppressHydrationWarning` auf `<html>` Element hinzugefügt
- **Blocking Script**: Theme-Klasse wird jetzt VOR React-Hydration gesetzt
- **LocalStorage Persistenz**: Theme-Präferenz wird gespeichert und beim Laden wiederhergestellt
- **Keine Flash mehr**: Dark Mode wird sofort angewendet, kein Flackern beim Laden
- **Console Logs**: Debug-Logs zeigen Theme-Initialisierung und -Wechsel

### 🔧 Technical Details
- Inline `<script>` im `<head>` setzt Theme-Klasse synchron
- Theme wird in `localStorage` unter dem Key `'theme'` gespeichert
- React State synchronisiert sich mit localStorage beim Mount

**Warum das wichtig ist**: 
Vorher wurde die `dark` Klasse nur clientseitig gesetzt, was zu einem Hydration Mismatch führte. 
Tailwind's `dark:` Varianten funktionierten nicht, weil React die Klasse beim Hydration entfernte.

## [1.7.1] - 2025-12-11

### 🐛 Bug Fixes: Dark Mode Kontrast
- **Maximaler Kontrast**: Icon-Cards verwenden jetzt `space-950` (tiefster Schwarz-Ton) im Dark Mode
- **Automatische Icon-Farben**: Icons sind jetzt automatisch **weiß im Dark Mode** und **schwarz im Light Mode** für optimalen Kontrast
- **Verbesserte Hover-Effekte**: Gold-Neon-Glow bei Hover im Dark Mode für bessere Sichtbarkeit
- **Stärkere Schatten**: Dark Mode Cards haben jetzt deutlichere Schatten für bessere Tiefe

### 🎨 Design Improvements
- Hellere Border-Farben für bessere Abgrenzung
- Optimierte Shadow-Werte für beide Modi

## [1.7.0] - 2025-12-11

### 🎉 New Features: Multi-Tag Search & Complete Dark Mode
- **Multi-Tag-Suche mit OR-Verknüpfung**: Tags können jetzt kombiniert werden - Icons werden angezeigt, wenn sie MINDESTENS EINEN der ausgewählten Tags enthalten
- **Tag-Chips Management**: Ausgewählte Tags werden als entfernbare Chips über der Galerie angezeigt
- **Keine Duplikate**: Tags werden nur einmal hinzugefügt, auch bei mehrfachem Klick
- **Vollständiger Dark Mode**: Alle UI-Elemente (Cards, Panels, Inputs) passen sich jetzt korrekt an den Dark Mode an
- **Glass-Card Effekt**: Glassmorphism-Effekt funktioniert jetzt in beiden Modi

### 🔧 Technical Improvements
- `selectedTags` State-Array für Multi-Tag-Filterung
- Optimierte Filter-Logik mit OR-Verknüpfung
- Dark-Mode-spezifische Styles für `.glass-card` Utility-Klasse

## [1.6.0] - 2025-12-11

### 🎉 New Features: Smart Tagging System
- **Icon Tags**: Jedes Icon hat nun 2-5 semantische Tags für bessere Auffindbarkeit
- **Tag-basierte Suche**: Die Suche durchsucht nun Name, Kategorie UND alle Tags
- **Klickbare Tag-Chips**: Unter jedem Icon werden die ersten 3 Tags als anklickbare Chips angezeigt
- **Sofortige Tag-Suche**: Klick auf einen Tag startet automatisch eine Suche nach diesem Begriff
- **280 Icons vollständig getaggt**: Alle Icons in allen Kategorien (Food, Health, Travel, Finance, etc.) haben jetzt aussagekräftige Tags

### 🔧 Technical Improvements
- Neue Datenstruktur mit `IconData` Interface inkl. Tags
- Optimierte Filterlogik für Multi-Kriterien-Suche
- API Route nutzt jetzt zentrale Datendatei (`data.ts`)

## [1.5.2] - 2025-12-11

### 🐛 Bug Fixes
- **Search Input Contrast**: Fixed invisible text in search field by enforcing dark text color in light mode.

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
