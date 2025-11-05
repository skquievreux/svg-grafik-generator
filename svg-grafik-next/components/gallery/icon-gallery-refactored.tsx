'use client';

import { useState } from 'react';
import { cn, copyToClipboard, downloadSVG } from '@/lib/utils';
import { useGalleryData, useIconSearch, usePagination, useFavorites } from '@/hooks';
import { GalleryHeader } from './gallery-header';
import { GalleryPagination } from './gallery-pagination';
import { GalleryEmptyState } from './gallery-empty-state';
import { GalleryLoading } from './gallery-loading';
import { IconCard } from '@/components/icon-card/icon-card';

interface Icon {
  name: string;
  category: string;
}

export function IconGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Custom Hooks
  const { data: galleryData, loading, error } = useGalleryData();
  const { favorites, favoritesCount, toggleFavorite, isFavorite } = useFavorites();

  // Gefilterte Icons
  const filteredIcons = useIconSearch(
    galleryData?.icons || [],
    searchTerm,
    selectedCategory
  );

  // Pagination
  const {
    paginatedItems,
    currentPage,
    totalPages,
    setCurrentPage,
    nextPage,
    previousPage,
    resetPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredIcons, 24);

  // Handler
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    resetPage();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    resetPage();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    resetPage();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    resetPage();
  };

  const copyIconCode = async (icon: Icon) => {
    try {
      const response = await fetch(
        `/api/icons?name=${encodeURIComponent(icon.name)}&category=${icon.category}`
      );
      const svgCode = await response.text();
      await copyToClipboard(svgCode);
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

  // Loading State
  if (loading) {
    return <GalleryLoading />;
  }

  // Error State
  if (error || !galleryData) {
    return (
      <div className="text-center py-12" role="alert">
        <p className="text-red-600">
          {error?.message || 'Fehler beim Laden der Galerie.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in-up">
      <GalleryHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={galleryData.metadata.categories}
        categoryCounts={Object.fromEntries(
          Object.entries(galleryData.categories).map(([key, val]) => [key, val.count])
        )}
        totalIcons={galleryData.metadata.total}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filteredCount={filteredIcons.length}
        favoritesCount={favoritesCount}
      />

      {/* Icon-Galerie */}
      {filteredIcons.length > 0 ? (
        <>
          <div
            className={cn(
              'gallery-grid',
              viewMode === 'grid' ? 'grid gap-6' : 'flex flex-col gap-4'
            )}
          >
            {paginatedItems.map((icon) => (
              <IconCard
                key={icon.name}
                icon={icon}
                viewMode={viewMode}
                isFavorite={isFavorite(icon.name)}
                onToggleFavorite={toggleFavorite}
                onCopy={copyIconCode}
                onDownload={downloadIcon}
              />
            ))}
          </div>

          <GalleryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onPreviousPage={previousPage}
            onNextPage={nextPage}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
          />
        </>
      ) : (
        <GalleryEmptyState onResetFilters={handleResetFilters} onClearSearch={handleClearSearch} />
      )}
    </div>
  );
}
