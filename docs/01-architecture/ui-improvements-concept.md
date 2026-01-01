---
title: "Konzept: UI-Optimierung, Kontrast & Features"
type: "architecture"
audience: "developer"
status: "approved"
priority: "high"
version: "1.9.0"
created: "2025-12-28"
updated: "2026-01-01"
reviewers: ["@steff"]
related: ["docs/01-architecture/ui-overhaul-concept.md"]
tags: ["ui", "ux", "dark-mode", "contrast", "pagination"]
---

# Konzept: UI-Optimierung, Kontrast & Features

## 1. Problemstellung
Aktuell existiert eine Diskrepanz zwischen der neu eingeführten "Cosmic"-Designsprache (Global CSS) und den existierenden Komponenten (`IconGallery`), die noch auf `bg-white` (Light Mode) hardcodiert sind. Dies führt zu:
-   **Lesbarkeitsproblemen**: Weißer Text auf weißem Grund (Dropdowns).
-   **Stilbruch**: Der Hintergrund ist dunkel ("Space"), aber die Karten sind strahlend weiß.
-   **Performance/Übersicht**: Zu viele Icons pro Seite.

## 2. Lösungsstrategie

### 2.1. Theme-Engine & Hell/Dunkel-Modus
Wir implementieren einen **echten Theme-Switch**, der es erlaubt, Icons in beiden Umgebungen zu testen.

*   **Toggle-Funktion**: Ein Switch im Header ("☀️ / 🌙").
*   **Modi**:
    *   **Light (Standard/Clean)**: Neutraler grauer Hintergrund, weiße Karten, dunkler Text. (Gut für Kontrast-Checks).
    *   **Dark (Cosmic)**: Der neue "Space"-Look. Dunkelblauer Hintergrund, Glassmorphism-Karten, leuchtende Akzente.

**Technische Umsetzung**:
*   Wir nutzen Tailwind's `darkMode: 'class'`.
*   Der `body` und alle Container erhalten dynamische Klassen: `bg-white dark:bg-space-950`.
*   Die `IconCards` werden von `bg-white` auf `bg-white dark:bg-glass-panel` umgestellt.

### 2.2. Dropdown UI ("Glass Select")
Das native HTML `<select>` Tag ist schwer zu stylen und verursacht die Kontrastprobleme.
*   **Lösung**: Wir ersetzen das native Select durch eine **Custom Popover Component** (basierend auf `@radix-ui` oder `headlessui`, die wir bereits haben/nutzen können) oder stylen das native Select strikt:
    *   **Light**: Weißer Hintergrund, schwarzer Text, grauer Border.
    *   **Dark**: Transparenter/Dunkler Hintergrund (`space-800`), weißer Text, blauer Border.

### 2.3. Erweiterte Palette-Features
Der Nutzer möchte die Farben nicht nur sehen, sondern nutzen.
*   **Feature "Copy Palette"**:
    *   Neben den Farbwählern (Color Pickers) erscheint ein "Copy"-Button.
    *   **Funktion**: Kopiert ein JSON oder CSS-Snippet in die Zwischenablage:
        ```json
        {
          "background": "#050511",
          "border": "#BD00FF",
          "icon": "#FFD700"
        }
        ```

### 2.4. Pagination & Performance
60 Icons pro Seite sind zu viel für ein schnelles Scannen.
*   **Reduktion**: Standard auf **24 Icons** pro Seite.
*   **UI-Update**: Die Pagination-Controls werden prominenter (Glass-Style) und zeigen "Seite X von Y" sowie "Zeige 1-24 von 150 Icons".
*   **Scroll-Behavior**: Automatisches Scrollen nach oben beim Seitenwechsel.

## 3. Umsetzungsschritte
1.  **Refactoring `IconGallery.tsx`**: Entfernen der hardcodierten `bg-white` Klassen zugunsten von Tailwind Dark-Mode Klassen.
2.  **Dropdown Fix**: Styling der `<select>` Elemente mit `dark:bg-space-800 dark:text-white`.
3.  **State Management**: Hinzufügen des `theme` States (persistiert im localStorage).
4.  **Pagination Tuning**: Anpassung der `itemsPerPage` und Verbesserung der Controls.

Dieses Konzept stellt sicher, dass die App sowohl ästhetisch ansprechend ("Cosmic") als auch funktional ("High Contrast Testing") ist.
