/**
 * Rider Avatar Generator für Bikepark Okarben
 * Generiert stylische SVG-Avatare im Orange/Schwarz Design
 */

export interface RiderAvatarConfig {
  // Basis-Info
  riderName: string;
  level: number;

  // Visuelle Komponenten
  backgroundShape: 'circle' | 'octagon' | 'hexagon' | 'diamond';
  helmetStyle: keyof typeof HELMET_LIBRARY;
  glassesStyle?: keyof typeof GLASSES_LIBRARY;
  beardStyle?: keyof typeof BEARD_LIBRARY;

  // Farben
  colorScheme: 'primary' | 'team' | 'premium' | 'custom';
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };

  // Optionen
  size: number;
  showLevel?: boolean;
  animated?: boolean;
}

// Bikepark Okarben Farbpalette
const COLOR_SCHEMES = {
  primary: {
    primary: '#FF6600',    // Orange
    secondary: '#1A1A1A',  // Schwarz
    accent: '#FFFFFF',     // Weiß
  },
  team: {
    primary: '#2196F3',    // Blau
    secondary: '#FFFFFF',
    accent: '#FF6600',
  },
  premium: {
    primary: '#FFD700',    // Gold
    secondary: '#1A1A1A',
    accent: '#FF6600',
  },
  custom: {
    primary: '#FF6600',
    secondary: '#1A1A1A',
    accent: '#FFFFFF',
  },
};

// Helm-Bibliothek (Downhill-fokussiert)
const HELMET_LIBRARY = {
  // Downhill Fullface
  fullface_basic: `
    <g id="helmet-fullface-basic">
      <path d="M12,4 Q8,4 6,7 L6,14 Q6,18 12,20 Q18,18 18,14 L18,7 Q16,4 12,4 Z" fill="currentColor"/>
      <path d="M8,10 L16,10 L16,11 L8,11 Z" fill="#333" opacity="0.8"/>
      <ellipse cx="12" cy="13" rx="3" ry="2" fill="#333" opacity="0.5"/>
    </g>
  `,
  fullface_pro: `
    <g id="helmet-fullface-pro">
      <path d="M12,3 Q7,3 5,7 L5,14 Q5,19 12,21 Q19,19 19,14 L19,7 Q17,3 12,3 Z" fill="currentColor"/>
      <path d="M12,3 L14,5 L12,7 L10,5 Z" fill="#333" opacity="0.6"/>
      <path d="M7,9 L17,9 L17,11 L7,11 Z" fill="#222" opacity="0.7"/>
      <path d="M8,12 L16,12 L15,14 L9,14 Z" fill="#333" opacity="0.5"/>
      <circle cx="9" cy="10" r="1" fill="#FF0000" opacity="0.8"/>
    </g>
  `,

  // Trail/Enduro Half-Shell
  halfshell_basic: `
    <g id="helmet-halfshell">
      <path d="M12,5 Q9,5 7,7 L7,12 Q7,14 12,15 Q17,14 17,12 L17,7 Q15,5 12,5 Z" fill="currentColor"/>
      <path d="M8,9 L16,9 Q16,10 12,11 Q8,10 8,9 Z" fill="#333" opacity="0.3"/>
    </g>
  `,

  // BMX/Dirt Jump
  bmx_classic: `
    <g id="helmet-bmx">
      <ellipse cx="12" cy="10" rx="7" ry="6" fill="currentColor"/>
      <rect x="10" y="14" width="4" height="2" fill="currentColor"/>
      <path d="M6,10 Q6,8 8,8 L16,8 Q18,8 18,10" fill="none" stroke="#333" opacity="0.4"/>
    </g>
  `,

  // Champion (Unlock bei Level 50)
  champion_gold: `
    <g id="helmet-champion">
      <path d="M12,2 L14,4 L16,3 L17,5 L19,5 L18,7 L20,9 L18,10 L18,13 Q18,17 12,19 Q6,17 6,13 L6,10 L4,9 L6,7 L5,5 L7,5 L8,3 L10,4 Z" fill="currentColor"/>
      <path d="M9,8 L15,8 L14,10 L10,10 Z" fill="#FFD700" opacity="0.8"/>
      <circle cx="12" cy="11" r="2" fill="#FFD700"/>
    </g>
  `,
};

// Brillen-Bibliothek
const GLASSES_LIBRARY = {
  none: '',
  sporty_basic: `<rect x="7" y="11" width="10" height="2" rx="1" fill="#333" opacity="0.8"/>`,
  goggles_mx: `
    <g id="goggles">
      <path d="M6,10 Q6,9 7,9 L11,9 M13,9 L17,9 Q18,9 18,10 L18,12 Q18,13 17,13 L7,13 Q6,13 6,12 Z"
            fill="none" stroke="#333" stroke-width="1.5" opacity="0.7"/>
      <ellipse cx="9" cy="11" rx="2" ry="1.5" fill="#444" opacity="0.6"/>
      <ellipse cx="15" cy="11" rx="2" ry="1.5" fill="#444" opacity="0.6"/>
    </g>
  `,
  aviator_cool: `
    <g id="aviator">
      <path d="M7,11 Q7,10 8,10 L10,10 M14,10 L16,10 Q17,10 17,11"
            fill="none" stroke="#333" stroke-width="1.5" opacity="0.7"/>
      <ellipse cx="9" cy="11" rx="2" ry="1" fill="#444" opacity="0.5"/>
      <ellipse cx="15" cy="11" rx="2" ry="1" fill="#444" opacity="0.5"/>
    </g>
  `,
  visor_futuristic: `
    <path d="M7,10 L17,10 Q19,10 19,11 L5,11 Q5,10 7,10 Z"
          fill="#444" opacity="0.7"/>
  `,
};

// Bart-Bibliothek (optional)
const BEARD_LIBRARY = {
  none: '',
  stubble: `
    <g id="stubble" opacity="0.3">
      <circle cx="10" cy="15" r="0.3" fill="#333"/>
      <circle cx="11" cy="15.5" r="0.3" fill="#333"/>
      <circle cx="12" cy="16" r="0.3" fill="#333"/>
      <circle cx="13" cy="15.5" r="0.3" fill="#333"/>
      <circle cx="14" cy="15" r="0.3" fill="#333"/>
    </g>
  `,
  goatee: `
    <path d="M11,15 Q11,17 12,17 Q13,17 13,15"
          fill="none" stroke="#333" stroke-width="1" opacity="0.6"/>
  `,
  full: `
    <path d="M8,14 Q8,17 12,18 Q16,17 16,14 L16,13 L8,13 Z"
          fill="#333" opacity="0.5"/>
  `,
};

// Shape-Generatoren
function createBackground(
  shape: RiderAvatarConfig['backgroundShape'],
  size: number,
  color: string
): string {
  const center = size / 2;
  const radius = size * 0.45;

  switch (shape) {
    case 'circle':
      return `<circle cx="${center}" cy="${center}" r="${radius}" fill="${color}"/>`;

    case 'octagon': {
      const points = Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI) / 4 - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');
      return `<polygon points="${points}" fill="${color}"/>`;
    }

    case 'hexagon': {
      const points = Array.from({ length: 6 }, (_, i) => {
        const angle = (i * Math.PI) / 3 - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');
      return `<polygon points="${points}" fill="${color}"/>`;
    }

    case 'diamond': {
      const points = [
        `${center},${size * 0.1}`,
        `${size * 0.9},${center}`,
        `${center},${size * 0.9}`,
        `${size * 0.1},${center}`,
      ].join(' ');
      return `<polygon points="${points}" fill="${color}"/>`;
    }

    default:
      return `<circle cx="${center}" cy="${center}" r="${radius}" fill="${color}"/>`;
  }
}

function createLevelBadge(level: number, size: number): string {
  const badgeSize = size * 0.2;
  const x = size * 0.75;
  const y = size * 0.15;

  return `
    <g id="level-badge">
      <circle cx="${x}" cy="${y}" r="${badgeSize}" fill="#FF6600" stroke="#FFFFFF" stroke-width="2"/>
      <text x="${x}" y="${y + 2}"
            font-family="Arial, sans-serif"
            font-size="${badgeSize * 0.8}"
            font-weight="bold"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#FFFFFF">
        ${level}
      </text>
    </g>
  `;
}

/**
 * Rider Avatar Generator Hauptklasse
 */
export class RiderAvatarGenerator {
  /**
   * Generiert einen SVG-Avatar basierend auf der Konfiguration
   */
  static generateSVG(config: RiderAvatarConfig): string {
    const colors =
      config.colorScheme === 'custom' && config.customColors
        ? config.customColors
        : COLOR_SCHEMES[config.colorScheme];

    const { size } = config;
    const center = size / 2;

    // Hintergrund
    const background = createBackground(config.backgroundShape, size, colors.secondary);

    // Helm (mit Farbe)
    const helmet = HELMET_LIBRARY[config.helmetStyle].replace(/currentColor/g, colors.primary);

    // Brille (optional)
    const glasses = config.glassesStyle ? GLASSES_LIBRARY[config.glassesStyle] : '';

    // Bart (optional)
    const beard = config.beardStyle ? BEARD_LIBRARY[config.beardStyle] : '';

    // Level-Badge (optional)
    const levelBadge = config.showLevel ? createLevelBadge(config.level, size) : '';

    // Drop-Shadow-Filter
    const defs = `
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;

    // Animation (optional)
    const animation = config.animated
      ? `
      <style>
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        #rider-avatar { animation: float 3s ease-in-out infinite; }
      </style>
    `
      : '';

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  ${defs}
  ${animation}
  <g id="rider-avatar" filter="url(#shadow)">
    ${background}
    <g transform="translate(${center}, ${center}) scale(0.8) translate(-${center}, -${center})">
      ${helmet}
      ${glasses}
      ${beard}
    </g>
    ${levelBadge}
  </g>
</svg>`.trim();
  }

  /**
   * Generiert eine zufällige Konfiguration basierend auf Level
   */
  static getRandomConfig(level: number, riderName: string): RiderAvatarConfig {
    const availableHelmets: Array<keyof typeof HELMET_LIBRARY> =
      level >= 50
        ? ['fullface_basic', 'fullface_pro', 'halfshell_basic', 'bmx_classic', 'champion_gold']
        : level >= 10
          ? ['fullface_basic', 'fullface_pro', 'halfshell_basic', 'bmx_classic']
          : ['fullface_basic', 'halfshell_basic', 'bmx_classic'];

    const shapes: Array<RiderAvatarConfig['backgroundShape']> = [
      'circle',
      'octagon',
      'hexagon',
      'diamond',
    ];

    const schemes: Array<RiderAvatarConfig['colorScheme']> = ['primary', 'team', 'premium'];

    return {
      riderName,
      level,
      backgroundShape: shapes[Math.floor(Math.random() * shapes.length)] ?? 'circle',
      helmetStyle: availableHelmets[Math.floor(Math.random() * availableHelmets.length)] ?? 'fullface_basic',
      glassesStyle:
        Math.random() > 0.5
          ? (['sporty_basic', 'goggles_mx', 'aviator_cool', 'visor_futuristic'][
              Math.floor(Math.random() * 4)
            ] as keyof typeof GLASSES_LIBRARY)
          : undefined,
      beardStyle:
        Math.random() > 0.7
          ? (['stubble', 'goatee', 'full'][
              Math.floor(Math.random() * 3)
            ] as keyof typeof BEARD_LIBRARY)
          : undefined,
      colorScheme: schemes[Math.floor(Math.random() * schemes.length)] ?? 'primary',
      size: 256,
      showLevel: true,
    };
  }

  /**
   * Liefert vordefinierte Starter-Avatare
   */
  static getStarterPresets(riderName: string): RiderAvatarConfig[] {
    return [
      {
        riderName,
        level: 1,
        backgroundShape: 'circle',
        helmetStyle: 'fullface_basic',
        glassesStyle: 'goggles_mx',
        colorScheme: 'primary',
        size: 256,
        showLevel: true,
      },
      {
        riderName,
        level: 1,
        backgroundShape: 'octagon',
        helmetStyle: 'halfshell_basic',
        glassesStyle: 'sporty_basic',
        colorScheme: 'team',
        size: 256,
        showLevel: true,
      },
      {
        riderName,
        level: 1,
        backgroundShape: 'hexagon',
        helmetStyle: 'bmx_classic',
        colorScheme: 'premium',
        size: 256,
        showLevel: true,
      },
      {
        riderName,
        level: 1,
        backgroundShape: 'diamond',
        helmetStyle: 'fullface_pro',
        glassesStyle: 'visor_futuristic',
        colorScheme: 'primary',
        size: 256,
        showLevel: true,
      },
      {
        riderName,
        level: 1,
        backgroundShape: 'circle',
        helmetStyle: 'halfshell_basic',
        glassesStyle: 'aviator_cool',
        beardStyle: 'stubble',
        colorScheme: 'team',
        size: 256,
        showLevel: true,
      },
    ];
  }
}
