import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCategoryName(category: string): string {
  const categoryNames: Record<string, string> = {
    food: 'Essen',
    health: 'Gesundheit',
    travel: 'Reisen',
    finance: 'Finanzen',
    utility: 'Dienstprogramme',
    shopping: 'Einkaufen',
    education: 'Bildung',
    entertainment: 'Unterhaltung',
    productivity: 'Produktivität',
    social: 'Sozial',
    technology: 'Technologie',
    home: 'Zuhause',
    pets: 'Haustiere',
    transport: 'Transport',
    language: 'Sprache',
    news: 'Nachrichten',
    misc: 'Sonstiges',
    creativity: 'Kreativität',
    art: 'Kunst',
    science: 'Wissenschaft',
    family: 'Familie',
    diy: 'DIY',
    fashion: 'Mode',
    environment: 'Umwelt'
  };

  return categoryNames[category] || category;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadSVG(svgContent: string, filename: string): void {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}