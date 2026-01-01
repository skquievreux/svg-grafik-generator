---
title: "Konzept: Smart Icon Viewer & Harmonischer Paletten-Generator"
type: "architecture"
audience: "developer"
status: "approved"
priority: "high"
version: "1.9.0"
created: "2025-12-23"
updated: "2026-01-01"
reviewers: ["@steff"]
related: ["lib/colors/harmony-engine.ts", "components/gallery/icon-viewer-modal.tsx"]
tags: ["colors", "palette-generation", "design-system", "hsl"]
---

# Konzept: Smart Icon Viewer & Harmonischer Paletten-Generator

## 1. Zielsetzung
Dem Nutzer soll ein intuitives Werkzeug an die Hand gegeben werden, um konsistente Icon-Sets zu erstellen. Durch die Auswahl einer automatisch generierten, harmonischen Farbvariante eines einzelnen Icons soll sich das gesamte Design-System der Anwendung anpassen.

## 2. User Journey
1.  **Aktivierung**: Der Nutzer klickt auf ein beliebiges Icon im Raster (z.B. "Kochmütze").
2.  **Viewer-Ansicht**: Ein Modal/Overlay öffnet sich. Das gewählte Icon wird groß in der Mitte angezeigt, flankiert von 3 verschiedenen Farbvarianten (Optionen).
3.  **Auswahl**: Der Nutzer sieht drei "Vorschläge" (z.B. "Fresh", "Elegant", "Bold"), die algorithmisch generiert wurden.
4.  **Anwendung**: Ein Klick auf eine Variante übernimmt dieses Farbschema (Hintergrund, Rahmen, Icon-Farbe) für **alle** Icons in der Galerie.
5.  **Persistenz**: Das gewählte Schema bleibt auch nach einem Reload erhalten.
6.  **Export**: Ein "Download Set" Button ermöglicht das Herunterladen der aktuell gefilterten oder aller Icons im gewählten Design.

## 3. Technische Architektur

### 3.1. Harmony Color Engine (`lib/colors/harmony-engine.ts`)
Wir entwickeln einen Algorithmus, der nicht einfach zufällige RGB-Werte würfelt, sondern auf **HSL (Hue, Saturation, Lightness)** basiert, um Harmonien zu garantieren.

*   **Generierungs-Modi**:
    *   *Monochromatisch*: Variationen in Helligkeit/Sättigung desselben Basistons.
    *   *Komplementär*: Nutzung des gegenüberliegenden Farbwinkels (+180°).
    *   *Analog*: Nutzung benachbarter Farbwinkel (+/- 30°).
    *   *Triadisch*: Drei Farben im 120°-Abstand.
*   **Kontrast-Check**: Der Algorithmus stellt sicher, dass `Icon Color` auf `Background Color` lesbar ist (WCAG AA Standard Annäherung).

**Datenstruktur einer Palette:**
```typescript
interface ColorPalette {
  id: string;
  name: string; // z.B. "Ocean Breeze"
  colors: {
    background: string; // Hex
    border: string;     // Hex
    icon: string;       // Hex
  };
}
```

### 3.2. Neue Komponenten

*   **`IconViewerModal.tsx`**:
    *   Nimmt das ausgewählte Icon entgegen.
    *   Nutzt die `HarmonyEngine`, um 3 Vorschläge on-the-fly zu generieren.
    *   Zeigt die Vorschläge interaktiv an.
*   **`IconGallery.tsx` Update**:
    *   Integration des Modals.
    *   `onClick` Handler für die Grid-Items ändern (nicht mehr Kopieren, sondern Öffnen).
    *   Kopieren/Download wandern in kleine Action-Buttons auf der Karte oder in das Modal.

### 3.3. State Management & Persistenz
Wir nutzen einen React Context oder einen Hook (`useDesignSystem`), der auf `sessionStorage` (oder `localStorage`) zugreift.

*   **Key**: `svg-icon-theme`
*   **Value**: `{ background: string, border: string, icon: string }`

Beim Laden der Seite wird geprüft, ob Werte im Storage liegen. Wenn ja, werden diese initial gesetzt.

### 3.4. Smart Download (`lib/utils/download-zip.ts`)
Um das ganze Set herunterzuladen, nutzen wir `jszip` (muss ggf. installiert werden, sonst multiple Downloads).
*   Der User klickt "Set herunterladen".
*   Das System iteriert über alle (oder gefilterte) Icons.
*   Jedes Icon wird mit den *aktuellen* globalen Farbeinstellungen neu generiert.
*   Dateiname: `[kategorie]_[name].svg` (Bsp: `food_pizza.svg`).

## 4. Implementierungs-Plan

### Schritt 1: Die Harmony Engine (Core Logic)
Implementierung der Farblogik. Funktionen wie `generateHarmoniousPalette(baseHue: number)`.

### Schritt 2: Viewer Komponente (UI)
Erstellung des Modals mit der 3-Spalten-Ansicht für die Varianten.

### Schritt 3: Integration & Wiring
Verbindung von Galerie, Modal und dem globalen State.

### Schritt 4: Export Logik
Implementierung der Batch-Generierung und des Downloads.

## 5. UI/UX Design Ideen (Aesthetics)
*   **Glassmorphism**: Das Modal schwebt über der Galerie mit einem Weichzeichner-Hintergrund.
*   **Micro-Animations**: Beim Hovern über eine Farbvariante wendet das große Vorschau-Icon in der Mitte bereits temporär diese Farben an ("Live Preview").
*   **Magic Wand**: Ein "Zauberstab"-Button im Modal generiert 3 komplett neue Vorschläge, falls die aktuellen nicht gefallen.
