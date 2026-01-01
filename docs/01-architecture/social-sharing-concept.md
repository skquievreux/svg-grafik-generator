---
title: "Konzept: Social Sharing, Tagging & Sammlungen"
type: "architecture"
audience: "developer"
status: "draft"
priority: "medium"
version: "1.9.0"
created: "2025-12-23"
updated: "2026-01-01"
reviewers: ["@steff"]
related: ["docs/01-architecture/icon-generation-concept.md"]
tags: ["social-sharing", "tagging", "collections", "deeplinking"]
---

# Konzept: Social Sharing, Tagging & Sammlungen (v2.0)

Dieses Dokument beschreibt die Erweiterung der SVG-Grafik-Galerie um Social-Sharing-Funktionen, ein erweitertes Tagging-System und die Möglichkeit, individuelle Icon-Sammlungen zu erstellen und zu teilen.

---

## 1. Tagging-System ("Intelligente Suche")

### Zielsetzung
Verbesserung der Auffindbarkeit von Icons durch semantische Tags (2-5 pro Icon). Nutzer sollen nicht nur nach Kategorien, sondern nach Kontexten (z.B. "Business", "Verspielt", "Warnung") suchen können.

### Datenstruktur
Das `Icon` Interface wird erweitert:
```typescript
interface Icon {
  name: string;
  category: string;
  tags: string[]; // Neu: ["food", "italienisch", "fast-food"]
}
```

### UI-Integration
1.  **Icon Cards**:
    *   Beim Hover (oder permanent) werden kleine "Chips" unter dem Icon-Namen angezeigt.
    *   Klick auf einen Tag startet sofort eine Suche nach diesem Tag.
2.  **Such-Erweiterung**:
    *   Die Suche durchsucht nun Name, Kategorie UND Tags.
    *   Autocomplete-Vorschläge für Tags bei der Eingabe.

---

## 2. Icon-Sammlungen ("Icon-Warenkorb")

### Zielsetzung
Nutzer sollen Icons nicht nur einzeln herunterladen, sondern eine Auswahl ("Collection") zusammenstellen können, um diese als Paket (ZIP) herunterzuladen oder gemeinsam zu stylen.

### Workflow
1.  **Auswählen**:
    *   Icons erhalten eine Checkbox oder einen "Hinzufügen"-Button (+).
    *   Ausgewählte Icons landen in einer "Floating Bar" am unteren Bildschirmrand oder einer Sidebar.
2.  **Bearbeiten**:
    *   Farbänderungen (Palette) können global auf die gesamte Sammlung angewendet werden.
3.  **Aktion**:
    *   "Alle herunterladen" (als ZIP).
    *   "Auswahl teilen" (generiert Social Link).

---

## 3. Social Sharing & Deeplinking

### Zielsetzung
Der aktuelle Zustand der Anwendung (Suchbegriffe, ausgewählte Tags, aktive Farbpalette, kuratierte Sammlung) soll über eine URL teilbar sein. Dies generiert Traffic, da Nutzer ihre Konfigurationen in sozialen Netzwerken teilen können.

### URL-Struktur
Wir nutzen URL-Parameter für den State:
`https://svg-gallery.com/?tags=business,finance&bg=000000&border=FFD700&icon=FFFFFF&selection=icon1,icon2,icon3`

*   `tags`: Aktive Filter.
*   `bg`, `border`, `icon`: Hex-Codes der aktuellen Palette.
*   `selection`: Liste der Icon-IDs in der aktuellen Sammlung.

### Social Meta Tags (Open Graph)
Für Twitter/X, LinkedIn und Facebook werden dynamische Meta-Tags generiert:
*   **Title**: "Meine Icon-Sammlung (5 Icons) - Cosmic Theme"
*   **Description**: "Entdecke diese kuratierte SVG-Sammlung für dein nächstes Projekt."
*   **Image**: Ein dynamisch generiertes Vorschaubild (OG Image), das die Farben und die ersten 3 Icons zeigt (via `vercel/og` oder ähnlichem Service).

### UI-Komponenten
*   **Share Button**: Öffnet ein Modal mit:
    *   Direkt-Link zum Kopieren.
    *   Social Media Buttons (X, LinkedIn, WhatsApp).
    *   Optional: QR-Code.

---

## 4. Implementierungs-Roadmap

### Phase 1: Tagging & Daten (Backend/Data)
*   [ ] Erweiterung der `generator.ts` um Tags für alle bestehenden Icons.
*   [ ] Update der API `/api/icons`, um Tags auszuliefern.

### Phase 2: Collections & State (Frontend)
*   [ ] Implementierung eines `useCollection` Hooks (Persistenz via `localStorage`).
*   [ ] UI für die "Collection Bar" (Warenkorb).
*   [ ] Multi-Download Logik (JSZip).

### Phase 3: URL & Sharing
*   [ ] Synchronisation von State und URL (`useSearchParams`).
*   [ ] Implementierung des "Share" Buttons und Modals.
*   [ ] Setup der Open Graph Meta Tags.
