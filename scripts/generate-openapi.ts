import { getApiDocs } from '../lib/swagger';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

async function generate() {
    try {
        console.log('Generating OpenAPI specification...');
        const spec = await getApiDocs();

        // Ensure public directory exists
        const publicDir = join(process.cwd(), 'public');
        if (!existsSync(publicDir)) {
            mkdirSync(publicDir, { recursive: true });
        }

        const outputPath = join(publicDir, 'openapi.json');
        writeFileSync(outputPath, JSON.stringify(spec, null, 2));
        console.log(`OpenAPI specification generated at ${outputPath}`);
    } catch (error) {
        console.error('Error generating OpenAPI spec:', error);
        // Don't fail the build, but log error. 
        // In production build, we might want to ensure a fallback exists or fail.
        process.exit(1);
    }
}

generate();
