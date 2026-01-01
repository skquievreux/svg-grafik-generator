import { ApiReference } from '@scalar/nextjs-api-reference';

export const GET = ApiReference({
    isEditable: false,
    spec: {
        url: '/openapi.json',
    },
    layout: 'modern',
    theme: 'bluePlanet',
    showSidebar: true,
} as any);
