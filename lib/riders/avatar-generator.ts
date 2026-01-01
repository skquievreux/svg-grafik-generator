import { AVATAR_ASSETS } from './avatar-assets';

export interface RiderAvatarConfig {
  riderName: string;
  level: number;
  backgroundShape: 'circle' | 'octagon' | 'hexagon' | 'diamond';
  helmetStyle: keyof typeof AVATAR_ASSETS.helmets;
  glassesStyle?: keyof typeof AVATAR_ASSETS.accessories;
  colorScheme: 'primary' | 'team' | 'premium' | 'custom';
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  size: number;
  showLevel?: boolean;
  animated?: boolean;
  elementId?: string; // Optionaler Deterministic ID für SSR Sicherheit
}

const COLOR_SCHEMES = {
  primary: { primary: '#FF6600', secondary: '#1A1A1A', accent: '#FFFFFF' },
  team: { primary: '#2196F3', secondary: '#FFFFFF', accent: '#FF6600' },
  premium: { primary: '#FFD700', secondary: '#1A1A1A', accent: '#FF6600' },
  custom: { primary: '#FF6600', secondary: '#1A1A1A', accent: '#FFFFFF' },
};

function createBackground(shape: string, size: number, color: string): string {
  const center = size / 2;
  const radius = size * 0.48; // Etwas größerer Hintergrund

  const points = {
    octagon: Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4 - Math.PI / 2;
      return `${center + radius * Math.cos(a)},${center + radius * Math.sin(a)}`;
    }).join(' '),
    hexagon: Array.from({ length: 6 }, (_, i) => {
      const a = (i * Math.PI) / 3 - Math.PI / 2;
      return `${center + radius * Math.cos(a)},${center + radius * Math.sin(a)}`;
    }).join(' '),
    diamond: [
      `${center},${size * 0.05}`,
      `${size * 0.95},${center}`,
      `${center},${size * 0.95}`,
      `${size * 0.05},${center}`
    ].join(' '),
  };

  if (shape === 'circle') return `<circle cx="${center}" cy="${center}" r="${radius}" fill="${color}"/>`;
  return `<polygon points="${points[shape as keyof typeof points] || ''}" fill="${color}"/>`;
}

function createLevelBadge(level: number, size: number): string {
  const badgeSize = size * 0.18;
  const x = size * 0.82;
  const y = size * 0.82; // Badge unten rechts für bessere Balance

  return `
    <g id="level-badge">
      <circle cx="${x}" cy="${y}" r="${badgeSize}" fill="#FF6600" stroke="#FFF" stroke-width="3"/>
      <text x="${x}" y="${y + size * 0.01}" font-family="Arial, sans-serif" font-size="${badgeSize}" font-weight="900" text-anchor="middle" dominant-baseline="middle" fill="#FFF">${level}</text>
    </g>
  `;
}

export class RiderAvatarGenerator {
  static generateSVG(config: RiderAvatarConfig): string {
    const colors = config.colorScheme === 'custom' && config.customColors ? config.customColors : COLOR_SCHEMES[config.colorScheme];
    const { size } = config;
    const center = size / 2;

    // Deterministic ID for SSR consistency
    // Use config.elementId if provided, otherwise create a simple hash from properties
    const uid = config.elementId || `${config.riderName.replace(/\s+/g, '')}-${config.level}-${config.helmetStyle}`;

    // Tier-Logik
    const tier = config.level >= 10 ? 'ELITE' : config.level >= 6 ? 'PRO' : config.level >= 3 ? 'AMATEUR' : 'ROOKIE';

    // Assets holen
    const background = createBackground(config.backgroundShape, size, colors.secondary);
    const bodyBase = AVATAR_ASSETS.bases.standard;
    const helmet = AVATAR_ASSETS.helmets[config.helmetStyle].replace(/currentColor/g, colors.primary);

    // Accessoires: Erst ab Amateur (Level 3+)
    let glasses = '';
    if (tier !== 'ROOKIE' && config.glassesStyle && config.glassesStyle !== 'none') {
      glasses = AVATAR_ASSETS.accessories[config.glassesStyle];

      // ID Replacement für Assets (da diese statisch definiert sind)
      // Wir müssen die statische ID im Asset durch unsere unique ID ersetzen, falls Assets IDs nutzen
      // Hier nutzen wir aber globale IDs in Defs.
      // WICHTIG: Die Assets referenzieren 'url(#goggle-reflection)'. Wir müssen das im String ersetzen.
      glasses = glasses.replace(/url\(#goggle-reflection\)/g, `url(#goggle-reflection-${uid})`);

      // Pro+Features: Reflexionen entfernen wenn nicht Pro (oder einfache Farbe nutzen)
      if (tier === 'AMATEUR') {
        // Im Amateur-Modus ersetzen wir das Gradient-Fill durch solides Grau
        // Da wir oben schon ersetzt haben, suchen wir nun nach der unique ID
        glasses = glasses.replace(new RegExp(`url\\(#goggle-reflection-${uid}\\)`, 'g'), '#444');
      }
    }

    const levelBadge = config.showLevel ? createLevelBadge(config.level, size) : '';

    // Defs & Filter - Conditional Construction
    const defsArr = ['<defs>'];

    // Pro+: Goggle Reflection Gradient
    if (tier === 'PRO' || tier === 'ELITE') {
      defsArr.push(`
        <linearGradient id="goggle-reflection-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#333" stop-opacity="1"/>
          <stop offset="50%" stop-color="#666" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#333" stop-opacity="1"/>
        </linearGradient>`);
    }

    // Amateur+: Drop Shadow
    let filterAttr = '';
    if (tier !== 'ROOKIE') {
      defsArr.push(`
        <filter id="shadow-${uid}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.5)"/>
        </filter>`);
      filterAttr = `filter="url(#shadow-${uid})"`;
    }

    // Elite: Glow Aura
    if (tier === 'ELITE') {
      defsArr.push(`
        <filter id="elite-glow-${uid}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`);
    }

    defsArr.push('</defs>');
    const defs = defsArr.join('\n');

    // Elite Animation vs Standard Animation
    let animationStyle = '';
    if (config.animated) {
      // Standard Hover
      animationStyle = `<style> @keyframes hover-${uid} { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-${size * 0.02}px); } } #avatar-composite-${uid} { animation: hover-${uid} 4s ease-in-out infinite; } </style>`;
    }

    // Elite Wrapper: Zusätzlicher Glow um den gesamten Avatar
    const compositeFilter = tier === 'ELITE' ? `url(#elite-glow-${uid})` : filterAttr;

    const scale = size / 24 * 0.65;
    const transform = `translate(${center}, ${center}) scale(${scale}) translate(-12, -11)`;

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
        ${defs}
        ${animationStyle}
        <g id="scene">
          ${background}
          <g id="avatar-composite-${uid}" filter="${compositeFilter}" transform="${transform}">
            ${bodyBase}
            ${helmet}
            ${glasses}
          </g>
          ${levelBadge}
        </g>
      </svg>
    `;

    // Minify SVG to ensure clean base64 encoding
    return svgString.trim();
  }

  static getRandomConfig(level: number, riderName: string): RiderAvatarConfig {
    const helmets = Object.keys(AVATAR_ASSETS.helmets) as Array<keyof typeof AVATAR_ASSETS.helmets>;
    const shapes = ['circle', 'octagon', 'hexagon', 'diamond'] as const;
    const schemes = ['primary', 'team', 'premium'] as const;
    const glasses = ['none', 'goggles', 'sunglasses'] as const;

    return {
      riderName,
      level,
      backgroundShape: shapes[Math.floor(Math.random() * shapes.length)] as RiderAvatarConfig['backgroundShape'],
      helmetStyle: helmets[Math.floor(Math.random() * helmets.length)] as RiderAvatarConfig['helmetStyle'],
      glassesStyle: glasses[Math.floor(Math.random() * glasses.length)] as RiderAvatarConfig['glassesStyle'],
      colorScheme: schemes[Math.floor(Math.random() * schemes.length)] as RiderAvatarConfig['colorScheme'],
      size: 256,
      showLevel: true,
    };
  }

  static getStarterPresets(riderName: string): RiderAvatarConfig[] {
    return [
      { riderName, level: 1, backgroundShape: 'circle', helmetStyle: 'fullface_pro', glassesStyle: 'goggles', colorScheme: 'primary', size: 256, showLevel: true },
      { riderName, level: 5, backgroundShape: 'octagon', helmetStyle: 'dirt_bowl', glassesStyle: 'sunglasses', colorScheme: 'team', size: 256, showLevel: true },
      { riderName, level: 10, backgroundShape: 'hexagon', helmetStyle: 'fullface_basic', glassesStyle: 'none', colorScheme: 'premium', size: 256, showLevel: true },
      { riderName, level: 20, backgroundShape: 'diamond', helmetStyle: 'halfshell_trail', glassesStyle: 'goggles', colorScheme: 'custom', customColors: { primary: '#E91E63', secondary: '#111', accent: '#FFF' }, size: 256, showLevel: true },
    ];
  }
}
