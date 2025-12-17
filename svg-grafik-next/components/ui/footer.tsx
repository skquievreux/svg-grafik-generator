'use client';

export function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-200 dark:border-space-800 bg-white dark:bg-space-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left: Developed by */}
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Entwickelt von{' '}
                        <a
                            href="mailto:quievreux.consulting@gmail.com"
                            className="font-semibold text-blue-600 dark:text-neon-gold hover:underline transition-colors"
                        >
                            Quievreux Consulting
                        </a>
                    </div>

                    {/* Right: Copyright */}
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                        © 2025 SVG Galerie. Alle Rechte vorbehalten.
                    </div>
                </div>
            </div>
        </footer>
    );
}
