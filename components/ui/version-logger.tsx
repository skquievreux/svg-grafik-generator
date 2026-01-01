'use client';

import { useEffect } from 'react';
import { APP_VERSION, APP_NAME } from '@/lib/version';

export function VersionLogger() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const style = 'background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;';
            const versionStyle = 'background: #4f46e5; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; margin-left: 5px;';

            console.groupCollapsed(`%c${APP_NAME}%c v${APP_VERSION}`, style, versionStyle);
            console.log(`%c Environment: ${process.env.NODE_ENV}`, 'color: #6b7280');
            console.log(`%c Build Time: ${new Date().toISOString()}`, 'color: #6b7280');
            console.log('✨ SVG Grafik Next is running!');
            console.groupEnd();
        }
    }, []);

    return null;
}
