import { ApiReference } from '@scalar/nextjs-api-reference';
import { getApiDocs } from '@/lib/swagger';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const spec = await getApiDocs();

    // Create the handler with dynamic spec
    const handler = ApiReference({
        spec: {
            content: spec,
        },
        layout: 'modern',
        theme: 'bluePlanet',
        showSidebar: true,
    });

    return handler(req);
}
