'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export function GalleryPagination({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage,
  hasPreviousPage,
  hasNextPage,
}: GalleryPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12">
      <div className="flex justify-center items-center gap-4" role="navigation" aria-label="Pagination">
        <Button
          variant="outline"
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          className="px-6 py-3 text-base font-medium btn-hover-lift"
          aria-label="Vorherige Seite"
        >
          ← Vorherige
        </Button>

        <div className="flex gap-2" role="group" aria-label="Seitennummern">
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 6, currentPage - 3)) + i;
            if (pageNum > totalPages) return null;

            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? 'primary' : 'outline'}
                size="lg"
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  'px-4 py-3 text-base font-medium min-w-[50px]',
                  pageNum === currentPage && 'shadow-lg'
                )}
                aria-label={`Seite ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          onClick={onNextPage}
          disabled={!hasNextPage}
          className="px-6 py-3 text-base font-medium btn-hover-lift"
          aria-label="Nächste Seite"
        >
          Nächste →
        </Button>
      </div>

      <div className="text-center mt-6">
        <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full" aria-live="polite">
          Seite {currentPage} von {totalPages}
        </span>
      </div>
    </div>
  );
}
