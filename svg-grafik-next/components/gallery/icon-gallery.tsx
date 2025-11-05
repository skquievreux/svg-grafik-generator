'use client';

import { useState, useEffect, useMemo } from 'react';
import { DynamicIcon } from '@/components/icons/dynamic-icon';
import { Button } from '@/components/ui/button';
import { cn, formatCategoryName, copyToClipboard, downloadSVG } from '@/lib/utils';
import { Search, Grid, List, Download, Copy, Heart } from 'lucide-react';

interface Icon {
  name: string;
  category: string;
}

interface GalleryData {
  icons: Icon[];
  categories: Record<string, { count: number; icons: string[] }>;
  metadata: {
    total: number;
    categories: string[];
    generated: string;
  };
}

const ITEMS_PER_PAGE = 24;

export function IconGallery() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Daten laden
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setGalleryData(data);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  // Gefilterte und sortierte Icons
  const filteredIcons = useMemo(() => {
    if (!galleryData) return [];

    let filtered = galleryData.icons;

    // Nach Suchbegriff filtern
    if (searchTerm) {
      filtered = filtered.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Nach Kategorie filtern
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(icon => icon.category === selectedCategory);
    }

    return filtered;
  }, [galleryData, searchTerm, selectedCategory]);

  // Paginierte Icons
  const paginatedIcons = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredIcons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredIcons, currentPage]);

  const totalPages = Math.ceil(filteredIcons.length / ITEMS_PER_PAGE);

  // Favoriten verwalten
  const toggleFavorite = (iconName: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(iconName)) {
      newFavorites.delete(iconName);
    } else {
      newFavorites.add(iconName);
    }
    setFavorites(newFavorites);
    localStorage.setItem('iconFavorites', JSON.stringify(Array.from(newFavorites)));
  };

  // Icon-Aktionen
  const copyIconCode = async (icon: Icon) => {
    try {
      const response = await fetch(
        `/api/icons?name=${encodeURIComponent(icon.name)}&category=${icon.category}`
      );
      const svgCode = await response.text();
      await copyToClipboard(svgCode);
      // Hier könnte eine Toast-Benachrichtigung hinzugefügt werden
    } catch (error) {
      console.error('Failed to copy icon:', error);
    }
  };

  const downloadIcon = async (icon: Icon) => {
    try {
      const response = await fetch(
        `/api/icons?name=${encodeURIComponent(icon.name)}&category=${icon.category}`
      );
      const svgCode = await response.text();
      const filename = `${icon.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
      downloadSVG(svgCode, filename);
    } catch (error) {
      console.error('Failed to download icon:', error);
    }
  };

  // Favoriten beim Laden wiederherstellen
  useEffect(() => {
    const savedFavorites = localStorage.getItem('iconFavorites');
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-600 mx-auto animate-spin animation-delay-300"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Icons werden geladen</h3>
          <p className="text-gray-600">Bitte warten Sie einen Moment...</p>
        </div>
      </div>
    );
  }

  if (!galleryData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Fehler beim Laden der Galerie.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in-up">
      {/* Suchleiste und Filter */}
      <div className="bg-white rounded-xl card-shadow border border-gray-200 p-8 mb-8 slide-in">
        <div className="flex flex-col xl:flex-row gap-6 mb-6">
          {/* Suche */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Icons suchen..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Zurück zur ersten Seite bei Suche
              }}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 placeholder-gray-400"
            />
          </div>

          {/* Kategorie-Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 min-w-[250px] cursor-pointer"
          >
            <option value="all">Alle Kategorien ({galleryData.metadata.total})</option>
            {galleryData.metadata.categories.map(category => (
              <option key={category} value={category}>
                {formatCategoryName(category)} ({galleryData.categories[category]?.count || 0})
              </option>
            ))}
          </select>

          {/* Ansichtsmodus */}
          <div className="flex gap-4">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="lg"
              onClick={() => setViewMode('grid')}
              className="px-6 py-4 text-lg font-medium"
            >
              <Grid className="h-5 w-5 mr-3" />
              Raster
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="lg"
              onClick={() => setViewMode('list')}
              className="px-6 py-4 text-lg font-medium"
            >
              <List className="h-5 w-5 mr-3" />
              Liste
            </Button>
          </div>
        </div>

        {/* Statistiken */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-base text-gray-600 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">
              {filteredIcons.length} von {galleryData.metadata.total} Icons angezeigt
            </span>
            {selectedCategory !== 'all' && (
              <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                Filter: {formatCategoryName(selectedCategory)}
              </span>
            )}
          </div>
          {favorites.size > 0 && (
            <span className="text-red-600 font-medium bg-red-100 px-3 py-1 rounded-full">
              ❤️ {favorites.size} Favoriten gespeichert
            </span>
          )}
        </div>
      </div>

      {/* Icon-Galerie */}
      <div className={cn(
        'gallery-grid',
        viewMode === 'grid'
          ? 'grid gap-6'
          : 'flex flex-col gap-4'
      )}>
        {paginatedIcons.map((icon) => (
          <div
            key={icon.name}
            className={cn(
              'group bg-white rounded-lg card-shadow border border-gray-200 transition-all duration-300 hover:card-shadow-hover hover:scale-105',
              viewMode === 'grid' && 'p-6',
              viewMode === 'list' && 'flex items-center gap-6 p-6'
            )}
          >
            <div className={cn(
              'icon-container',
              viewMode === 'grid' && 'mb-4',
              viewMode === 'list' && 'mb-0 flex-shrink-0'
            )}>
              <div className="relative">
                <DynamicIcon
                  name={icon.name}
                  category={icon.category}
                  size={viewMode === 'grid' ? 64 : 48}
                  className="w-full h-full"
                />
                {favorites.has(icon.name) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="h-3 w-3 text-white fill-current" />
                  </div>
                )}
              </div>
            </div>

            <div className={cn(
              'text-center',
              viewMode === 'list' && 'flex-1'
            )}>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg leading-tight">{icon.name}</h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-4">
                {formatCategoryName(icon.category)}
              </div>

              {/* Aktionen */}
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyIconCode(icon)}
                  title="SVG-Code kopieren"
                  className="btn-hover-lift hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadIcon(icon)}
                  title="SVG herunterladen"
                  className="btn-hover-lift hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant={favorites.has(icon.name) ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => toggleFavorite(icon.name)}
                  title="Als Favorit markieren"
                  className={cn(
                    'btn-hover-lift transition-all duration-200',
                    favorites.has(icon.name)
                      ? 'bg-red-500 hover:bg-red-600 text-white border-red-500 shadow-lg'
                      : 'hover:bg-red-50 hover:border-red-300'
                  )}
                >
                  <Heart className={cn(
                    'h-4 w-4 transition-all',
                    favorites.has(icon.name) && 'fill-current animate-pulse'
                  )} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-6 py-3 text-base font-medium btn-hover-lift"
          >
            ← Vorherige
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 6, currentPage - 3)) + i;
              if (pageNum > totalPages) return null;

              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? 'primary' : 'outline'}
                  size="lg"
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    'px-4 py-3 text-base font-medium min-w-[50px]',
                    pageNum === currentPage && 'shadow-lg'
                  )}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-6 py-3 text-base font-medium btn-hover-lift"
          >
            Nächste →
          </Button>
        </div>
      )}

      {/* Seitenzähler */}
      {totalPages > 1 && (
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            Seite {currentPage} von {totalPages}
          </span>
        </div>
      )}

      {/* Leere Zustand */}
      {filteredIcons.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Keine Icons gefunden</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Es wurden keine Icons gefunden, die Ihren Suchkriterien entsprechen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              className="px-6 py-3"
            >
              Alle Filter zurücksetzen
            </Button>
            <Button
              variant="primary"
              onClick={() => setSearchTerm('')}
              className="px-6 py-3"
            >
              Suche löschen
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}