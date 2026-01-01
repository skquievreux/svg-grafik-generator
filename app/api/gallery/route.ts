import { NextResponse } from 'next/server';
import { galleryIcons } from './data';

/**
 * @swagger
 * /api/gallery:
 *   get:
 *     summary: Liste aller Galerie-Icons
 *     description: Gibt eine Liste aller verfügbaren Icons zurück, gruppiert nach Kategorien und mit Metadaten.
 *     responses:
 *       200:
 *         description: Erfolgreiche Rückgabe der Galerie-Daten
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 icons:
 *                   type: array
 *                   items:
 *                     type: object
 *                 categories:
 *                   type: object
 *                 metadata:
 *                   type: object
 *       500:
 *         description: Server-Fehler beim Abrufen der Daten
 */
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