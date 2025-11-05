'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DynamicIconProps {
  name: string;
  category: string;
  size?: number;
  className?: string;
  showLoading?: boolean;
}

export function DynamicIcon({
  name,
  category,
  size = 40,
  className,
  showLoading = true
}: DynamicIconProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/icons?name=${encodeURIComponent(name)}&category=${category}&size=${size}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const svg = await response.text();
        setSvgContent(svg);
      } catch (err) {
        console.error('Failed to load icon:', err);
        setError('Icon konnte nicht geladen werden');
      } finally {
        setLoading(false);
      }
    };

    loadIcon();
  }, [name, category, size]);

  if (error) {
    return (
      <div
        className={cn('flex items-center justify-center bg-red-100 text-red-600 rounded', className)}
        style={{ width: size, height: size }}
      >
        <span className="text-xs">!</span>
      </div>
    );
  }

  if (loading && showLoading) {
    return (
      <div
        className={cn('animate-pulse bg-gray-200 rounded', className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={cn('icon-container', className)}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}