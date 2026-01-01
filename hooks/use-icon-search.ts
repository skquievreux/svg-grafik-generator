import { useMemo } from 'react';

interface Icon {
  name: string;
  category: string;
}

/**
 * Custom Hook für Icon-Suche und Filterung
 * @param icons - Array von Icons
 * @param searchTerm - Suchbegriff
 * @param selectedCategory - Ausgewählte Kategorie
 */
export function useIconSearch(
  icons: Icon[],
  searchTerm: string,
  selectedCategory: string
) {
  return useMemo(() => {
    let filtered = icons;

    // Nach Suchbegriff filtern
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (icon) =>
          icon.name.toLowerCase().includes(term) ||
          icon.category.toLowerCase().includes(term)
      );
    }

    // Nach Kategorie filtern
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter((icon) => icon.category === selectedCategory);
    }

    return filtered;
  }, [icons, searchTerm, selectedCategory]);
}
