---
title: "ADR 001: Tailwind CSS v4 vs v3 Integration"
type: "architecture"
audience: "developer"
status: "approved"
priority: "high"
version: "1.9.0"
created: "2025-12-30"
updated: "2026-01-01"
reviewers: ["@steff"]
related: ["docs/03-operations/tailwind-debugging.md"]
tags: ["tailwind", "nextjs", "turbopack", "adr"]
---

# 🔍 Tailwind CSS Problem-Analyse

## Aktueller Status

### ✅ Was funktioniert:
1. **Next.js 16.0.8** läuft ohne Fehler
2. **React Components** rendern korrekt
3. **Pure CSS** (inline styles) funktioniert perfekt
4. **Dark Mode Toggle** setzt die `dark` Klasse auf `<html>` korrekt

### ❌ Was NICHT funktioniert:
1. **Tailwind CSS Klassen werden NICHT angewendet**
   - `bg-white`, `p-6`, `rounded-lg` etc. haben KEINE Wirkung
   - Elemente mit Tailwind-Klassen sind unsichtbar/unstyled
2. **`dark:` Varianten funktionieren nicht**
   - `dark:bg-black`, `dark:text-white` werden ignoriert
3. **Tailwind CSS wird nicht in den `<style>` Tags geladen**

## Technische Details

### Aktuelle Konfiguration:

**package.json:**
```json
{
  "dependencies": {
    "tailwindcss": "^4.1.17" // v4 (next)
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.17"
  }
}
```

**app/globals.css:**
```css
@import "tailwindcss";  // v4 Syntax

@layer base {
  :root { /* CSS Variables */ }
  .dark { /* Dark mode variables */ }
}
```

**postcss.config.mjs:**
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

**tailwind.config.ts:**
```ts
const config: Config = {
  // darkMode: ["class"], // ENTFERNT für v4
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: { /* Custom colors */ } },
  plugins: [ /* Custom utilities */ ]
};
```

## 🚨 Das Kernproblem

**Tailwind CSS v4 + Next.js 16 (Turbopack) = Inkompatibilität**

### Warum es nicht funktioniert:

1. **Turbopack versteht `@import "tailwindcss"` nicht**
   - Turbopack ist der neue Bundler in Next.js 16
   - Er hat eine andere PostCSS-Integration als Webpack
   - `@import "tailwindcss"` wird nicht aufgelöst

2. **@tailwindcss/postcss Plugin wird nicht ausgeführt**
   - Turbopack lädt PostCSS-Plugins anders
   - Das Plugin generiert kein CSS

3. **Keine Tailwind-Styles im Output**
   - Im Browser: Keine `<style>` Tags mit Tailwind CSS
   - Nur custom CSS aus `globals.css` wird geladen

## 🔍 Mögliche Lösungen

### Option 1: Zurück zu Tailwind v3 (EMPFOHLEN)

**Warum:**
- Tailwind v3 ist stabil und gut getestet
- Funktioniert mit Next.js 16 + Turbopack
- `@tailwind` Direktiven werden verstanden

**Schritte:**
```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
```

**globals.css ändern:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**postcss.config.js (nicht .mjs!):**
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**tailwind.config.ts:**
```ts
const config: Config = {
  darkMode: ["class"], // WIEDER HINZUFÜGEN
  content: [ /* ... */ ],
  theme: { /* ... */ },
  plugins: [ /* ... */ ]
};
```

### Option 2: Webpack statt Turbopack verwenden

**next.config.ts:**
```ts
const nextConfig: NextConfig = {
  // Turbopack deaktivieren, Webpack verwenden
  webpack: (config) => config,
};
```

**Dann:** Tailwind v4 könnte funktionieren

### Option 3: Warten auf Tailwind v4 Stable

Tailwind v4 ist noch in **Alpha/Beta**. Die Integration mit Next.js 16 ist nicht ausgereift.

## 🎯 Empfohlene Vorgehensweise

### Schritt 1: Zurück zu Tailwind v3

```bash
# 1. Alte Versionen entfernen
npm uninstall tailwindcss @tailwindcss/postcss

# 2. Tailwind v3 installieren
npm install -D tailwindcss@^3.4.0 postcss@^8.4.31 autoprefixer@^10.4.16
```

### Schritt 2: Konfiguration wiederherstellen

**app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 93%;
    --foreground: 222 47% 11%;
    /* ... */
  }

  .dark {
    --background: 240 10% 4%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

**postcss.config.js:** (WICHTIG: .js nicht .mjs!)
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**tailwind.config.ts:**
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // WICHTIG: Wieder hinzufügen!
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#050511',
          900: '#0a0b1e',
          800: '#141428',
          light: '#2a2b4a'
        },
        // ... rest of colors
      }
    }
  },
  plugins: []
};

export default config;
```

### Schritt 3: Cache löschen und neu starten

```bash
# Cache löschen
Remove-Item -Recurse -Force .next

# Dev-Server starten
npm run dev
```

### Schritt 4: Testen

Öffnen Sie: `http://localhost:3000/minimal-test`

**Erwartetes Ergebnis:**
- ✅ Alle 3 Boxen sind sichtbar
- ✅ Tailwind-Klassen funktionieren
- ✅ Dark Mode Toggle macht die 3. Box schwarz

## 📚 Recherche-Keywords für Sie

Falls Sie selbst recherchieren möchten:

1. **"Next.js 16 Turbopack Tailwind CSS not working"**
2. **"Tailwind v4 @import not loading Next.js"**
3. **"@tailwindcss/postcss Turbopack compatibility"**
4. **"Next.js 16 Tailwind dark mode class not applied"**
5. **"Turbopack PostCSS plugin not executing"**

## 🔗 Hilfreiche Links

- [Tailwind CSS v4 Alpha Docs](https://tailwindcss.com/docs/v4-beta)
- [Next.js 16 Turbopack Docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack)
- [Tailwind + Next.js Setup Guide](https://tailwindcss.com/docs/guides/nextjs)
- [GitHub: Tailwind CSS Issues](https://github.com/tailwindlabs/tailwindcss/issues)

## 💡 Warum v3 die beste Lösung ist

1. **Stabil und getestet** - Millionen von Projekten nutzen es
2. **Volle Next.js 16 Kompatibilität** - Funktioniert mit Turbopack
3. **Alle Features verfügbar** - `dark:` Varianten, JIT, etc.
4. **Keine Breaking Changes** - Ihre bestehende Config funktioniert
5. **Produktionsreif** - Keine Alpha/Beta-Probleme

## ⚠️ Warum v4 aktuell nicht funktioniert

1. **Alpha-Status** - Noch nicht für Production gedacht
2. **Turbopack-Inkompatibilität** - PostCSS-Integration anders
3. **Breaking Changes** - `@import` statt `@tailwind`
4. **Fehlende Dokumentation** - Wenig Infos zu Next.js 16 Integration
5. **Community-Support** - Wenige Lösungen für Probleme

## 🎯 Nächste Schritte

**Ich empfehle:**

1. **Zurück zu Tailwind v3** (siehe Schritt 1-4 oben)
2. **Testen ob es funktioniert**
3. **Wenn JA:** Dark Mode in der Hauptanwendung aktivieren
4. **Wenn NEIN:** Webpack statt Turbopack probieren

Möchten Sie, dass ich die Migration zu v3 durchführe?
