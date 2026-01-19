---
title: "Tailwind Dark Mode Debug Guide"
type: "operations"
audience: "developer"
status: "approved"
priority: "medium"
version: "1.9.0"
created: "2025-12-30"
updated: "2026-01-01"
reviewers: ["@steff"]
related: ["docs/03-operations/adr-001-tailwind-hydration.md"]
tags: ["tailwind", "dark-mode", "debugging", "nextjs"]
---

# Tailwind Dark Mode Debug Guide

## Problem
Die `dark:` Klassen scheinen nicht zu funktionieren. Icon-Cards bleiben weiß im Dark Mode.

## Checkliste

### 1. ✅ Tailwind Config prüfen
```typescript
// tailwind.config.ts
darkMode: ["class"], // ✅ Korrekt - verwendet class-based dark mode
```

### 2. ✅ HTML Element prüfen
Die `dark` Klasse muss auf dem `<html>` Element sein:
```tsx
// In IconGallery.tsx
useEffect(() => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  
  if (theme === 'dark') {
    root.classList.add('dark'); // ✅ Wird gesetzt
  } else {
    root.classList.add('light');
  }
}, [theme]);
```

### 3. ⚠️ Mögliches Problem: Tailwind Purging
Wenn Tailwind die `dark:` Varianten nicht generiert, könnte es an der Content-Konfiguration liegen.

**Prüfen Sie:**
```typescript
// tailwind.config.ts
content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
],
```

### 4. 🔍 Browser DevTools Debug
Öffnen Sie die Browser DevTools (F12) und:

1. **Inspect das `<html>` Element**
   - Sollte `class="dark"` haben wenn Dark Mode aktiv
   
2. **Inspect eine Icon-Card**
   - Prüfen Sie die computed styles
   - Suchen Sie nach `bg-white` und `dark:bg-space-950`
   
3. **Console Log**
   ```javascript
   console.log('HTML classes:', document.documentElement.className);
   console.log('Theme state:', theme);
   ```

### 5. ⚠️ Mögliche Ursachen

#### A) Tailwind generiert dark: Varianten nicht
**Lösung**: Rebuild mit gelöschtem `.next` Ordner
```bash
rm -rf .next
npm run dev
```

#### B) CSS Spezifität-Problem
Andere Styles überschreiben die dark: Klassen.

**Test**: Fügen Sie `!important` hinzu:
```tsx
className="bg-white dark:!bg-space-950"
```

#### C) Tailwind v4 vs v3 Konflikt
Sie haben `@tailwindcss/postcss` (v4) aber `tailwindcss` v3 installiert.

**Prüfen**:
```bash
npm list tailwindcss
npm list @tailwindcss/postcss
```

### 6. 🛠️ Schnelltest
Fügen Sie diese Test-Komponente ein:

```tsx
<div className="p-4 bg-white dark:bg-black text-black dark:text-white">
  Dark Mode Test: Dieser Text sollte weiß auf schwarz sein im Dark Mode
</div>
```

Wenn dieser Test NICHT funktioniert → Tailwind Dark Mode ist komplett kaputt
Wenn dieser Test funktioniert → Problem ist spezifisch bei den Icon-Cards

## Aktuelle Vermutung
Basierend auf den Screenshots: Die `dark:` Klassen werden **nicht angewendet**.

**Wahrscheinlichste Ursache**: 
- Tailwind CSS wird nicht neu kompiliert
- `.next` Cache enthält alte Styles ohne dark: Varianten

**Empfohlene Lösung**:
1. Dev-Server stoppen
2. `.next` Ordner löschen
3. `npm run dev` neu starten
4. Hard-Refresh im Browser (Ctrl+Shift+R)
