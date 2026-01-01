'use client';

export default function SimpleDarkTest() {
    return (
        <div className="min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Simple Dark Mode Test</h1>

            {/* This should work if Tailwind dark: works */}
            <div className="p-6 mb-4 bg-white dark:bg-black text-black dark:text-white border-2">
                <p>Dieser Text sollte im Dark Mode weiß auf schwarz sein.</p>
                <p className="mt-2 text-sm opacity-70">
                    Wenn Sie das NICHT sehen können, funktionieren die dark: Klassen nicht.
                </p>
            </div>

            {/* Manual toggle */}
            <button
                onClick={() => {
                    const html = document.documentElement;
                    html.classList.toggle('dark');
                    console.log('Toggled! Classes:', html.className);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
            >
                Toggle Dark Mode
            </button>

            {/* Show current state */}
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    Wenn diese Box im Dark Mode NICHT dunkel wird, ist Tailwind kaputt.
                </p>
            </div>
        </div>
    );
}
