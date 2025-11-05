/**
 * API Schema Validierungen mit Zod
 * Typsichere Validierung von API-Request und Response Daten
 */

import { z } from 'zod';

/**
 * Schema für Icon-Query-Parameter
 */
export const iconQuerySchema = z.object({
  name: z.string().min(1, 'Icon-Name ist erforderlich'),
  category: z.string().min(1, 'Kategorie ist erforderlich'),
  shape: z
    .enum(['octagon', 'circle', 'square', 'hexagon'])
    .optional()
    .default('octagon'),
  size: z.coerce.number().min(24).max(512).default(40),
});

export type IconQuery = z.infer<typeof iconQuerySchema>;

/**
 * Schema für API-Error-Response
 */
export const apiErrorSchema = z.object({
  error: z.string(),
  details: z.any().optional(),
  code: z.string().optional(),
});

export type APIError = z.infer<typeof apiErrorSchema>;

/**
 * Helper-Funktion für sichere Schema-Validierung
 */
export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}
