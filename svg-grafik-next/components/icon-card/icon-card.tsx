'use client';

import { Heart } from 'lucide-react';
import { DynamicIcon } from '@/components/icons/dynamic-icon';
import { IconCardActions } from './icon-card-actions';
import { cn, formatCategoryName } from '@/lib/utils';

interface Icon {
  name: string;
  category: string;
}

interface IconCardProps {
  icon: Icon;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: (iconName: string) => void;
  onCopy: (icon: Icon) => void;
  onDownload: (icon: Icon) => void;
}

export function IconCard({
  icon,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onCopy,
  onDownload,
}: IconCardProps) {
  return (
    <article
      className={cn(
        'group bg-white rounded-lg card-shadow border border-gray-200 transition-all duration-300 hover:card-shadow-hover hover:scale-105',
        viewMode === 'grid' && 'p-6',
        viewMode === 'list' && 'flex items-center gap-6 p-6'
      )}
      aria-labelledby={`icon-title-${icon.name}`}
    >
      <div
        className={cn(
          'icon-container',
          viewMode === 'grid' && 'mb-4',
          viewMode === 'list' && 'mb-0 flex-shrink-0'
        )}
      >
        <div className="relative">
          <DynamicIcon
            name={icon.name}
            category={icon.category}
            size={viewMode === 'grid' ? 64 : 48}
            className="w-full h-full"
          />
          {isFavorite && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="h-3 w-3 text-white fill-current" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      <div className={cn('text-center', viewMode === 'list' && 'flex-1 text-left')}>
        <h3
          id={`icon-title-${icon.name}`}
          className="font-semibold text-gray-900 mb-2 text-lg leading-tight"
        >
          {icon.name}
        </h3>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-4">
          {formatCategoryName(icon.category)}
        </div>

        <IconCardActions
          icon={icon}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onCopy={onCopy}
          onDownload={onDownload}
        />
      </div>
    </article>
  );
}
