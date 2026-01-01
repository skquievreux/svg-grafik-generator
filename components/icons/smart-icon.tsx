'use client';

import { IconData } from '@/app/api/gallery/data';
import { IconMapper } from '@/lib/icons/icon-mapper';
import * as LucideIcons from 'lucide-react';
import { memo } from 'react';
import { LucideProps } from 'lucide-react';

interface SmartIconProps extends Omit<LucideProps, 'ref'> {
  icon: IconData | string; // Accept IconData object or icon name
  size?: number;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * SmartIcon - Intelligently selects and renders the best Lucide icon
 * based on icon data and tags.
 *
 * Features:
 * - Automatic icon selection via IconMapper
 * - Tag-based fallback matching
 * - Customizable styling
 * - Memoized for performance
 *
 * @example
 * ```tsx
 * // With IconData object
 * <SmartIcon icon={{name: 'Auto', category: 'transport', tags: ['fahren']}} />
 *
 * // With icon name (uses mapper to find IconData)
 * <SmartIcon icon="Auto" size={32} className="text-blue-500" />
 * ```
 */
export const SmartIcon = memo<SmartIconProps>(({
  icon,
  size = 24,
  className,
  fallback,
  ...props
}) => {
  // Convert string to IconData if necessary
  const iconData = typeof icon === 'string'
    ? { name: icon, category: '', tags: [] } as IconData
    : icon;

  // Find best icon match
  const mapping = IconMapper.findBestMatch(iconData);

  // If no icon found, show fallback
  if (!mapping.lucideIcon) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // Default fallback: HelpCircle
    const FallbackIcon = LucideIcons.HelpCircle;
    return (
      <FallbackIcon
        size={size}
        className={className}
        {...props}
      />
    );
  }

  // Render the matched Lucide icon
  const LucideIcon = (LucideIcons as any)[mapping.lucideIcon];

  if (!LucideIcon) {
    const FallbackIcon = LucideIcons.HelpCircle;
    return (
      <FallbackIcon
        size={size}
        className={className}
        {...props}
      />
    );
  }

  return (
    <LucideIcon
      size={size}
      className={className}
      {...props}
    />
  );
});

SmartIcon.displayName = 'SmartIcon';

/**
 * IconWithLabel - SmartIcon with a label below it
 *
 * @example
 * ```tsx
 * <IconWithLabel icon={{name: 'Auto', category: 'transport', tags: []}} />
 * ```
 */
interface IconWithLabelProps extends SmartIconProps {
  showLabel?: boolean;
  labelClassName?: string;
}

export const IconWithLabel = memo<IconWithLabelProps>(({
  icon,
  showLabel = true,
  labelClassName = 'text-sm text-gray-600 mt-2',
  ...iconProps
}) => {
  const iconData = typeof icon === 'string'
    ? { name: icon, category: '', tags: [] } as IconData
    : icon;

  return (
    <div className="flex flex-col items-center">
      <SmartIcon icon={iconData} {...iconProps} />
      {showLabel && (
        <span className={labelClassName}>
          {iconData.name}
        </span>
      )}
    </div>
  );
});

IconWithLabel.displayName = 'IconWithLabel';
