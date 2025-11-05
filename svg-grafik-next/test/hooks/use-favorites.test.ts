import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useFavorites } from '@/hooks/use-favorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favoritesCount).toBe(0);
    expect(result.current.isFavorite('test')).toBe(false);
  });

  it('should toggle favorite on', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite('icon1');
    });

    expect(result.current.favoritesCount).toBe(1);
    expect(result.current.isFavorite('icon1')).toBe(true);
  });

  it('should toggle favorite off', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite('icon1');
      result.current.toggleFavorite('icon1');
    });

    expect(result.current.favoritesCount).toBe(0);
    expect(result.current.isFavorite('icon1')).toBe(false);
  });

  it('should clear all favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite('icon1');
      result.current.toggleFavorite('icon2');
      result.current.clearFavorites();
    });

    expect(result.current.favoritesCount).toBe(0);
  });
});
