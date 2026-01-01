import { ApiReference } from '@scalar/nextjs-api-reference';

export const GET = ApiReference({
    spec: {
        url: '/api/openapi.json',
    },
    layout: 'modern',
    theme: 'bluePlanet',
    showSidebar: true,
} as any);
