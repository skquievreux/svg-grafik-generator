import { getApiDocs } from '@/lib/swagger';
import { ApiReference } from '@scalar/nextjs-api-reference';

export default async function IndexPage() {
    const spec = await getApiDocs() as any;

    return (
        <ApiReference
            spec={spec}
            configuration={{
                layout: 'modern',
                theme: 'bluePlanet',
                showSidebar: true,
            }}
        />
    );
}
