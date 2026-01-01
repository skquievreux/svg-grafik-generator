import { NextRequest, NextResponse } from 'next/server';
import { RiderAvatarGenerator } from '@/lib/riders/avatar-generator';
import type { RiderAvatarConfig } from '@/lib/riders/avatar-generator';

/**
 * GET /api/riders/avatar - Rider-Avatar generieren
 *
 * Query Parameters:
 * - name: string (required) - Rider-Name (z.B. "Sendit_76")
 * - level: number (optional, default: 1) - Rider-Level (1-100)
 * - helmet: string (optional) - Helm-Style
 * - shape: string (optional) - Hintergrund-Form
 * - scheme: string (optional, default: "primary") - Farbschema
 * - glasses: string (optional) - Brillen-Style
 * - beard: string (optional) - Bart-Style
 * - size: number (optional, default: 256) - Größe in Pixel
 * - showLevel: boolean (optional, default: true) - Level-Badge anzeigen
 * - animated: boolean (optional, default: false) - Animation aktivieren
 * - preset: number (optional, 0-4) - Starter-Preset verwenden
 * - random: boolean (optional) - Zufälligen Avatar generieren
 *
 * Beispiele:
 * /api/riders/avatar?name=Sendit_76&level=1&helmet=fullface_pro&scheme=primary
 * /api/riders/avatar?name=Sendit_76&preset=0
 * /api/riders/avatar?name=Sendit_76&random=true&level=25
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Required Parameter
  const name = searchParams.get('name');
  if (!name) {
    return NextResponse.json({ error: 'Parameter "name" ist erforderlich' }, { status: 400 });
  }

  // Optional Parameters
  const level = parseInt(searchParams.get('level') || '1', 10);
  const size = parseInt(searchParams.get('size') || '256', 10);
  const showLevel = searchParams.get('showLevel') !== 'false';
  const animated = searchParams.get('animated') === 'true';

  // Preset oder Random?
  const presetParam = searchParams.get('preset');
  const randomParam = searchParams.get('random') === 'true';

  let config: RiderAvatarConfig;

  if (presetParam !== null) {
    // Starter-Preset verwenden
    const presetIndex = parseInt(presetParam, 10);
    const presets = RiderAvatarGenerator.getStarterPresets(name);

    if (presetIndex < 0 || presetIndex >= presets.length) {
      return NextResponse.json(
        { error: `Preset ${presetIndex} nicht verfügbar. Verfügbare Presets: 0-${presets.length - 1}` },
        { status: 400 }
      );
    }

    const selectedPreset = presets[presetIndex];
    if (!selectedPreset) {
      return NextResponse.json({ error: 'Preset nicht gefunden' }, { status: 500 });
    }

    config = {
      ...selectedPreset,
      riderName: name,
      level: level,
      size,
      showLevel,
      animated,
    };
  } else if (randomParam) {
    // Zufälligen Avatar generieren
    config = RiderAvatarGenerator.getRandomConfig(level, name);
    config.size = size;
    config.showLevel = showLevel;
    config.animated = animated;
  } else {
    // Custom Konfiguration aus Query-Parametern
    config = {
      riderName: name,
      level,
      backgroundShape: (searchParams.get('shape') as any) || 'circle',
      helmetStyle: (searchParams.get('helmet') as any) || 'fullface_basic',
      glassesStyle: searchParams.get('glasses') as any,
      beardStyle: searchParams.get('beard') as any,
      colorScheme: (searchParams.get('scheme') as any) || 'primary',
      size,
      showLevel,
      animated,
    };

    // Custom Colors (optional)
    const customPrimary = searchParams.get('colorPrimary');
    const customSecondary = searchParams.get('colorSecondary');
    const customAccent = searchParams.get('colorAccent');

    if (customPrimary && customSecondary && customAccent) {
      config.colorScheme = 'custom';
      config.customColors = {
        primary: customPrimary,
        secondary: customSecondary,
        accent: customAccent,
      };
    }
  }

  try {
    const svg = RiderAvatarGenerator.generateSVG(config);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Avatar-Config': JSON.stringify(config),
      },
    });
  } catch (error) {
    console.error('Avatar generation error:', error);
    return NextResponse.json(
      {
        error: 'Fehler bei Avatar-Generierung',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/riders/avatar - Batch-Generierung
 *
 * Body: {
 *   riders: Array<{ name: string, level: number, ...config }>
 * }
 *
 * Response: Array<{ name: string, avatarUrl: string, config: RiderAvatarConfig }>
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { riders } = body;

    if (!Array.isArray(riders)) {
      return NextResponse.json({ error: 'Body muss "riders" Array enthalten' }, { status: 400 });
    }

    const results = riders.map((rider) => {
      const config: RiderAvatarConfig = {
        riderName: rider.name,
        level: rider.level || 1,
        backgroundShape: rider.backgroundShape || 'circle',
        helmetStyle: rider.helmetStyle || 'fullface_basic',
        glassesStyle: rider.glassesStyle,
        beardStyle: rider.beardStyle,
        colorScheme: rider.colorScheme || 'primary',
        customColors: rider.customColors,
        size: rider.size || 256,
        showLevel: rider.showLevel !== false,
        animated: rider.animated === true,
      };

      const svg = RiderAvatarGenerator.generateSVG(config);

      // Base64-encoded SVG für direkte Verwendung
      const base64 = Buffer.from(svg).toString('base64');
      const dataUrl = `data:image/svg+xml;base64,${base64}`;

      return {
        name: rider.name,
        avatarUrl: `/api/riders/avatar?${new URLSearchParams({
          name: rider.name,
          level: config.level.toString(),
          helmet: config.helmetStyle,
          shape: config.backgroundShape,
          scheme: config.colorScheme,
        }).toString()}`,
        avatarDataUrl: dataUrl,
        config,
      };
    });

    return NextResponse.json(
      {
        success: true,
        count: results.length,
        avatars: results,
      },
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Batch avatar generation error:', error);
    return NextResponse.json(
      {
        error: 'Fehler bei Batch-Generierung',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
