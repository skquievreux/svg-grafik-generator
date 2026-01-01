import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

/**
 * Custom Hook für Favoriten-Verwaltung
 */
export function useFavorites() {
  const [favoritesArray, setFavoritesArray] = useLocalStorage<string[]>(
    'iconFavorites',
    []
  );

  const favorites = new Set(favoritesArray);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavoritesArray((currentFavorites) => {
        const newFavorites = new Set(currentFavorites);
        if (newFavorites.has(id)) {
          newFavorites.delete(id);
        } else {
          newFavorites.add(id);
        }
        return Array.from(newFavorites);
      });
    },
    [setFavoritesArray]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavoritesArray([]);
  }, [setFavoritesArray]);

  return {
    favorites,
    favoritesCount: favorites.size,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}
