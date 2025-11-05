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
      const newFavorites = new Set(favoritesArray);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      setFavoritesArray(Array.from(newFavorites));
    },
    [favoritesArray, setFavoritesArray]
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
