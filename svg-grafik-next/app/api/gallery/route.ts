import { NextResponse } from 'next/server';
import { galleryIcons } from './data';

export async function GET() {
  try {
    // Kategorien gruppieren
    const categories: Record<string, { count: number; icons: string[] }> = {};

    galleryIcons.forEach(icon => {
      if (!categories[icon.category]) {
        categories[icon.category] = { count: 0, icons: [] };
      }
      const category = categories[icon.category];
      if (category) {
        category.count++;
        category.icons.push(icon.name);
      }
    });

    const response = {
      icons: galleryIcons,
      categories,
      metadata: {
        total: galleryIcons.length,
        categories: Object.keys(categories),
        generated: new Date().toISOString()
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery data' },
      { status: 500 }
    );
  }
}