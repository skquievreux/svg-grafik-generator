'use client';

import { Copy, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Icon {
  name: string;
  category: string;
}

interface IconCardActionsProps {
  icon: Icon;
  isFavorite: boolean;
  onToggleFavorite: (iconName: string) => void;
  onCopy: (icon: Icon) => void;
  onDownload: (icon: Icon) => void;
}

export function IconCardActions({
  icon,
  isFavorite,
  onToggleFavorite,
  onCopy,
  onDownload,
}: IconCardActionsProps) {
  return (
    <div className="flex justify-center gap-2" role="group" aria-label="Icon-Aktionen">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onCopy(icon)}
        title="SVG-Code kopieren"
        aria-label={`${icon.name} SVG-Code kopieren`}
        className="btn-hover-lift hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
      >
        <Copy className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Code kopieren</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDownload(icon)}
        title="SVG herunterladen"
        aria-label={`${icon.name} SVG herunterladen`}
        className="btn-hover-lift hover:bg-green-50 hover:border-green-300 transition-all duration-200"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Herunterladen</span>
      </Button>
      <Button
        variant={isFavorite ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onToggleFavorite(icon.name)}
        title={isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
        aria-label={
          isFavorite
            ? `${icon.name} aus Favoriten entfernen`
            : `${icon.name} zu Favoriten hinzufügen`
        }
        aria-pressed={isFavorite}
        className={cn(
          'btn-hover-lift transition-all duration-200',
          isFavorite
            ? 'bg-red-500 hover:bg-red-600 text-white border-red-500 shadow-lg'
            : 'hover:bg-red-50 hover:border-red-300'
        )}
      >
        <Heart
          className={cn('h-4 w-4 transition-all', isFavorite && 'fill-current animate-pulse')}
          aria-hidden="true"
        />
        <span className="sr-only">Favorit</span>
      </Button>
    </div>
  );
}
