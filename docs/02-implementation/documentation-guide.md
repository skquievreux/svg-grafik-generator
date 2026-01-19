---
title: "SVG-Grafik Generator - Projektdokumentation"
type: "implementation"
audience: "all"
status: "approved"
priority: "high"
version: "1.9.0"
created: "2025-12-22"
updated: "2026-01-01"
reviewers: ["@steff"]
related: ["README.md"]
tags: ["documentation", "overview", "tech-stack"]
---

# SVG-Grafik Generator - Projektdokumentation (v1.9.0)

## 📌 Übersicht
Der SVG-Grafik Generator ist eine moderne Next.js-Anwendung zur Suche, Anpassung und Generierung von SVG-Icons. Die Version 1.5.0 führt eine vollständige Überarbeitung der Benutzeroberfläche ("Cosmic Theme") ein und optimiert die Developer Experience.

---

## 🎨 Design System & UI

### Cosmic Theme Engine
Seit Version 1.5.0 unterstützt die Anwendung ein vollwertiges Dark-Mode-System, das auf der "Cosmic Glass"-Ästhetik basiert.
-   **Light Mode**: Clean, hoher Kontrast, neutrale Farben (für Business-Kontext).
-   **Dark Mode**: Deep Space Blue (`#050511`), Neon-Akzente (Gold/Purple), Glassmorphism-Effekte.

**Implementierung**:
Die Steuerung erfolgt über eine Theme-Toggle-Komponente in der `IconGallery`, die die Klasse `dark` auf dem `<html>` Element setzt. Tailwind's `darkMode: 'class'` sorgt für die Anwendung der entsprechenden Styles.

### Komponenten

#### IconGallery
Die zentrale Komponente (`components/gallery/icon-gallery.tsx`).
-   **State Management**: Nutzt `useState` für Galerie-Daten, Suche, Filter, Pagination, Custom Colors und Theme.
-   **Performance**: `useMemo` cached Filter- und Paginierungs-Ergebnisse, um Rerenderings bei Dateneingabe zu minimieren.
-   **Features**:
    -   Suche & Kategoriefilter
    -   Live-Farbanpassung (Hintergrund, Rahmen, Icon)
    -   Copy Palette (JSON Export)
    -   Download & Copy SVG
    -   Responsives Grid/List Layout

#### HarmonyEngine
Das Herzstück der Farbgenerierung (`lib/colors/harmony-engine.ts`).
Generiert automatische Farbvorschläge basierend auf harmonischen Farbschemata (Monochromatisch, Komplementär, Analog).

---

## 🛠 Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Styling**: Tailwind CSS v3.4 + Tailwind Animate + Custom Utilities
-   **Icons**: Lucide React + Eigene SVG Pfade (`lib/icons/generator.ts`)
-   **State Persistence**: `localStorage` (Favoriten), `sessionStorage` (Theme Colors)

---

## 🚀 Entwickler-Guide

### Installation
```bash
npm install
npm run dev
```

### Build & Deployment
Der Build-Prozess nutzt Turbopack.
```bash
npm run build
```
Deployment erfolgt automatisch via Vercel bei Push auf `main` oder Feature-Branches.

### Versionierung
Das Projekt folgt Semantic Versioning (Major.Minor.Patch).
Alle Änderungen werden im [CHANGELOG.md](./CHANGELOG.md) festgehalten.

---

## 📝 Lizenz
MIT License. Copyright © 2025 SVG-Grafik Team.
