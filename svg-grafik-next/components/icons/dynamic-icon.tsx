'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DynamicIconProps {
  name: string;
  category: string;
  size?: number;
  className?: string;
  showLoading?: boolean;
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
}

export function DynamicIcon({
  name,
  category,
  size = 40,
  className,
  showLoading = true,
  bgColor,
  borderColor,
  iconColor
}: DynamicIconProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          name,
          category,
          size: size.toString(),
        });

        // Auto-adjust colors based on theme if not explicitly set
        if (bgColor) {
          params.append('bgColor', bgColor);
        } else {
          // Default: white in light mode, black in dark mode
          params.append('bgColor', isDark ? '#000000' : '#FFFFFF');
        }

        if (borderColor) {
          params.append('borderColor', borderColor);
        } else {
          // Default: light gray in light mode, dark gray in dark mode
          params.append('borderColor', isDark ? '#1a1a1a' : '#e5e7eb');
        }

        if (iconColor) {
          params.append('iconColor', iconColor);
        } else {
          // Default: dark in light mode, white in dark mode
          params.append('iconColor', isDark ? '#FFFFFF' : '#000000');
        }

        const response = await fetch(`/api/icons?${params.toString()}`);

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
  }, [name, category, size, bgColor, borderColor, iconColor, isDark]);

  if (error) {
    return (
      <div
        className={cn('flex items-center justify-center bg-red-100 text-red-600 rounded', className)}
        style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }}
      >
        <span className="text-xs">!</span>
      </div>
    );
  }

  if (loading && showLoading) {
    return (
      <div
        className={cn('animate-pulse bg-gray-200 rounded', className)}
        style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }}
      />
    );
  }

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}