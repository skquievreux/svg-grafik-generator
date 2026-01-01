'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryEmptyStateProps {
  onResetFilters: () => void;
  onClearSearch: () => void;
}

export function GalleryEmptyState({ onResetFilters, onClearSearch }: GalleryEmptyStateProps) {
  return (
    <div className="text-center py-16" role="status" aria-live="polite">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
        <Search className="w-12 h-12 text-gray-400" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Keine Icons gefunden</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Es wurden keine Icons gefunden, die Ihren Suchkriterien entsprechen.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onResetFilters} className="px-6 py-3">
          Alle Filter zurücksetzen
        </Button>
        <Button variant="primary" onClick={onClearSearch} className="px-6 py-3">
          Suche löschen
        </Button>
      </div>
    </div>
  );
}
