# Konzept: Skalierbare Icon-Generierung und Qualitätssicherung

## 1. Problemstellung
Aktuell werden für viele Begriffe (z.B. "Pizza", "Eis", "Brot") generische Platzhalter-Grafiken (Sterne) angezeigt. Dies liegt daran, dass das System versucht, deutsche Begriffe direkt auf englische Icon-Schlüssel abzubilden, dabei aber scheitert, wenn keine explizite Zuordnung existiert.

## 2. Lösungsansatz: Hybrides Generierungssystem

Wir schlagen ein dreistufiges System vor, das Qualität mit Flexibilität verbindet.

### Stufe 1: Erweitertes Mapping (Sofortmaßnahmen)
Wir erweitern die statische Zuordnungstabelle (`symbolMap`) massiv. Dies ist die performanteste und qualitativ sicherste Methode.
*   **Vorteil**: Garantierte Qualität, keine Ladezeiten, funktioniert offline.
*   **Aktion**: Deutsche Begriffe werden auf etablierte Icon-Schlüssel (z.B. Lucide, Material Design) gemappt.
    *   `"Pizza"` -> `pizza`
    *   `"Eis"` -> `ice-cream`
    *   `"Fleisch"` -> `beef`

### Stufe 2: Intelligente Fallback-Logik (Algorithmisch)
Wenn ein Begriff nicht gefunden wird, greift eine "Fuzzy Search" Logik.
*   **Mechanism**:
    1.  Normalisierung des Begriffs (Kleinschreibung, Umlaute ersetzen).
    2.  Prüfung gegen eine Wörterbuch-Liste (z.B. einfaches De-En Dictionary).
    3.  Wenn Übersetzung vorhanden -> Prüfe ob Icon existiert.

### Stufe 3: AI-On-Demand Generierung (Zukunftsmusik)
Für völlig unbekannte Begriffe wird ein AI-Dienst (z.B. Gemini / Vertex AI) genutzt, um *on-the-fly* den passenden SVG-Pfad zu generieren.

1.  **Request**: User fragt nach Icon für "Weltraumaufzug".
2.  **Backend Check**: Kein Mapping gefunden.
3.  **AI Service**: 
    *   Prompt: *"Generate a simple, outline-style SVG path for a 'Space Elevator'. The path should fit in a 24x24 viewBox. Output ONLY the d attribute string."*
4.  **Validierung**: Das System prüft, ob der zurückgegebene String ein gültiger SVG-Pfad ist.
5.  **Caching**: Der neue Pfad wird in einer Datenbank (z.B. Supabase) unter "Weltraumaufzug" gespeichert.
6.  **Response**: Das Icon wird ausgeliefert.

## 3. Qualitätssicherung

Um sicherzustellen, dass unterschiedliche Grafiken entstehen und die Qualität hoch bleibt:

*   **Design-System-Token nutzen**: Farben und Strichstärken werden nicht vom Icon selbst, sondern vom umschließenden Code (`IconGenerator`) kontrolliert.
    *   *Alle* Icons bekommen dynamisch `fill`, `stroke` und `filter` zugewiesen.
    *   Dies garantiert, dass ein "AI-generiertes" Icon exakt so aussieht wie ein handgebautes.
*   **ViewBox-Standardisierung**: Alle Pfade werden auf eine `viewBox="0 0 24 24"` normiert.
*   **Blacklisting**: Fehlerhafte Pfade (Parsing-Fehler) fallen automatisch auf den "Stern" zurück, aber lösen einen Log-Eintrag aus.

## 4. Implementierungsschritte (Aktueller Task)

Wir setzen **Stufe 1** sofort um, um das akute Problem zu lösen.

1.  **Analyse der fehlenden Begriffe**: Identifikation der Begriffe aus `app/api/gallery/route.ts`, die aktuell fehlen.
2.  **Mapping-Update**: Erweiterung der `symbolMap` in `app/api/icons/route.ts`.
3.  **Asset-Erweiterung**: Hinzufügen der fehlenden SVG-Pfad-Daten in `lib/icons/generator.ts`.
