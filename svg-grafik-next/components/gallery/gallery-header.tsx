'use client';

import { Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCategoryName } from '@/lib/utils';

interface GalleryHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  categoryCounts: Record<string, number>;
  totalIcons: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  filteredCount: number;
  favoritesCount: number;
}

export function GalleryHeader({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  categoryCounts,
  totalIcons,
  viewMode,
  onViewModeChange,
  filteredCount,
  favoritesCount,
}: GalleryHeaderProps) {
  return (
    <div className="bg-white rounded-xl card-shadow border border-gray-200 p-8 mb-8 slide-in">
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        {/* Suche */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Icons suchen..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 placeholder-gray-400"
            aria-label="Icons durchsuchen"
          />
        </div>

        {/* Kategorie-Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 min-w-[250px] cursor-pointer"
          aria-label="Kategorie filtern"
        >
          <option value="all">Alle Kategorien ({totalIcons})</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatCategoryName(category)} ({categoryCounts[category] || 0})
            </option>
          ))}
        </select>

        {/* Ansichtsmodus */}
        <div className="flex gap-4" role="group" aria-label="Ansichtsmodus">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="lg"
            onClick={() => onViewModeChange('grid')}
            className="px-6 py-4 text-lg font-medium"
            aria-label="Rasteransicht"
            aria-pressed={viewMode === 'grid'}
          >
            <Grid className="h-5 w-5 mr-3" aria-hidden="true" />
            Raster
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="lg"
            onClick={() => onViewModeChange('list')}
            className="px-6 py-4 text-lg font-medium"
            aria-label="Listenansicht"
            aria-pressed={viewMode === 'list'}
          >
            <List className="h-5 w-5 mr-3" aria-hidden="true" />
            Liste
          </Button>
        </div>
      </div>

      {/* Statistiken */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-base text-gray-600 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <span className="font-medium" aria-live="polite">
            {filteredCount} von {totalIcons} Icons angezeigt
          </span>
          {selectedCategory !== 'all' && (
            <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
              Filter: {formatCategoryName(selectedCategory)}
            </span>
          )}
        </div>
        {favoritesCount > 0 && (
          <span className="text-red-600 font-medium bg-red-100 px-3 py-1 rounded-full">
            ❤️ {favoritesCount} Favoriten gespeichert
          </span>
        )}
      </div>
    </div>
  );
}
