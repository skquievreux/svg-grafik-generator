---
title: "UI-Design & UX-Konzept: 'Cosmic Glass' Overhaul"
type: "architecture"
audience: "developer"
status: "approved"
priority: "high"
version: "1.9.0"
created: "2025-12-28"
updated: "2026-01-01"
reviewers: ["@steff"]
related: ["docs/01-architecture/ui-improvements-concept.md"]
tags: ["ui", "ux", "cosmic-glass", "design-system", "glassmorphism"]
---

# UI-Design & UX-Konzept: "Cosmic Glass" Overhaul

## 1. Vision & Ästhetik
Das Ziel ist die Transformation der aktuellen, konservativen Oberfläche in ein immersives, hochmodernes Interface, inspiriert von "Aetheria". Wir bewegen uns weg vom klassischen "Webseite"-Look hin zu einem **Desktop-App-Feeling** mit Gaming-Charakter.

### Design-Säulen: "Cosmic Glass"
1.  **Deep Immersion (Hintergrund)**:
    *   Statt weißem Hintergrund nutzen wir tiefes Weltraum-Blau/Lila (`#090919` bis `#16162d`).
    *   Atmosphärische, animierte Hintergrund-Elemente (langsam schwebende Orbs oder Partikel), die durch die Glas-Elemente hindurchscheinen.
2.  **Ultra-Glassmorphism (Container)**:
    *   Panels sind halbtransparent mit starkem `backdrop-blur`.
    *   Feine, leuchtende Ränder (1px Border mit geringer Opazität, die bei Hover aufleuchtet).
    *   Schatten sind farbig und diffus ("Neon Glow"), nicht schwarz/hart.
3.  **Neon Accents (Interaktion)**:
    *   Primärfarben: "Cyber Yellow" (#FFD700) und "Electric Purple" (#BD00FF) für Call-to-Actions.
    *   Aktive Elemente leuchten.

## 2. Benutzerführung (UX) Verbesserungen

### Die Galerie: "Holographic Grid"
*   **Karten-Design**: Die Icon-Karten schweben losgelöst. Kein platter weißer Hintergrund mehr.
*   **Interaktion**:
    *   **Hover**: Die Karte hebt sich leicht an, der Rand beginnt in der Akzentfarbe zu pulsieren (Glow-Effekt).
    *   **Klick**: Öffnet das "Smart Viewer" Modal nicht als Pop-up, sondern als "Overlay", das den Hintergrund abdunkelt und fokussiert.
*   **HUD-Controls**: Die Suchleiste und Filter schweben als "Head-Up Display" (HUD) über dem Grid. Eingabefelder haben keinen weißen Hintergrund, sondern sind dunkle Glasflächen.

### Der Smart Viewer & Export
*   **Visualisierung**: Das "Magic Wand"-Feature (Generierung von Farbpaletten) wird durch eine visuelle "Beschwörungs-Animation" begleitet (Partikel-Explosion beim Klick).
*   **Export-Flow**:
    *   Der "Download"-Button ist kein langweiliges Icon, sondern ein prominenter, leuchtender Button ("Generate Artifact").
    *   Ein Ladebalken im Neon-Stil visualisiert den "Bau"-Prozess des ZIP-Archivs.

## 3. Technische Umsetzung (Tailwind Reboot)

Wir werden die `tailwind.config.ts` komplett bereinigen und ein striktes Design-System definieren.

### Neues Farbschema (Tokens)
```js
colors: {
  space: {
    950: '#050511', // Deepest Background
    900: '#0a0b1e', // Panel Background
    800: '#141428', // Lighter Panel
  },
  glass: {
    10: 'rgba(255, 255, 255, 0.05)',
    20: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.15)',
  },
  neon: {
    gold: '#FFC857', // Warm Gold/Yellow
    purple: '#A855F7', // Vibrant Purple
    cyan: '#06b6d4', // Tech Blue
  }
}
```

### Effekte
*   **Glow-Utilities**: Eigene `drop-shadow` Klassen für Neon-Effekte.
*   **Animationen**: `float`, `pulse-glow`, `slide-up-fade`.

## 4. Nächste Schritte
1.  **Tailwind Config Reset**: Alte Farben entfernen, "Cosmic"-Palette einfügen.
2.  **Global CSS**: Hintergründe und Font-Settings (z.B. 'Outfit' oder 'Inter') global setzen.
3.  **Component Refactoring**: Die `IconGallery` und `IconViewerModal` auf das neue `glass`-System umstellen.
