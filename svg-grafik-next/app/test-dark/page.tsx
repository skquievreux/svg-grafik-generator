'use client';

export default function DarkModeTest() {
    return (
        <div className="min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                Dark Mode Test
            </h1>

            <div className="space-y-4">
                {/* Test 1: Basic dark mode */}
                <div className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Test 1: Basic Dark Mode
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Dieser Hintergrund sollte im Dark Mode dunkel sein.
                    </p>
                </div>

                {/* Test 2: Space colors */}
                <div className="p-6 bg-white dark:bg-space-950 border-2 border-gray-200 dark:border-space-800 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Test 2: Space-950 Background
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Dieser Hintergrund sollte im Dark Mode TIEFSCHW ARZ (space-950) sein.
                    </p>
                </div>

                {/* Test 3: Manual toggle */}
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Test 3: Manual Toggle
                    </h2>
                    <button
                        onClick={() => {
                            const html = document.documentElement;
                            const isDark = html.classList.contains('dark');

                            if (isDark) {
                                html.classList.remove('dark');
                                html.classList.add('light');
                                console.log('Switched to LIGHT mode');
                            } else {
                                html.classList.remove('light');
                                html.classList.add('dark');
                                console.log('Switched to DARK mode');
                            }

                            console.log('HTML classes:', html.className);
                        }}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Toggle Dark Mode (Check Console)
                    </button>
                </div>

                {/* Current state display */}
                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Debug Info
                    </h2>
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        Öffnen Sie die Console (F12) und klicken Sie den Button oben.
                    </p>
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-2">
                        Prüfen Sie das HTML Element im Inspector - es sollte class="dark" oder class="light" haben.
                    </p>
                </div>
            </div>
        </div>
    );
}
