'use client';

export default function MinimalTest() {
    return (
        <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#111' }}>
            <h1 style={{ color: 'white', marginBottom: '2rem' }}>Minimal Test - NO Tailwind</h1>

            {/* Pure CSS - should ALWAYS work */}
            <div style={{
                padding: '1.5rem',
                marginBottom: '1rem',
                backgroundColor: 'white',
                color: 'black',
                border: '2px solid #ccc',
                borderRadius: '8px'
            }}>
                <p>✅ Diese Box verwendet PURE CSS (kein Tailwind)</p>
                <p>Sie sollte IMMER weiß sein.</p>
            </div>

            {/* Tailwind classes */}
            <div className="p-6 mb-4 bg-white text-black border-2 rounded-lg">
                <p>❓ Diese Box verwendet TAILWIND Klassen</p>
                <p>Wenn Sie das NICHT sehen können, ist Tailwind komplett kaputt.</p>
            </div>

            {/* Dark mode test */}
            <div className="p-6 mb-4 bg-white dark:bg-black text-black dark:text-white border-2">
                <p>❓ Diese Box sollte im Dark Mode schwarz werden</p>
                <p>Wenn nicht, funktionieren dark: Klassen nicht.</p>
            </div>

            <button
                onClick={() => {
                    document.documentElement.classList.toggle('dark');
                    console.log('HTML classes:', document.documentElement.className);
                }}
                style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                }}
            >
                Toggle Dark Mode
            </button>

            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#333', color: 'white', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                    Debug: Öffnen Sie die Console und klicken Sie den Button.
                </p>
                <p style={{ fontSize: '0.875rem', fontFamily: 'monospace', marginTop: '0.5rem' }}>
                    Prüfen Sie: Hat das HTML Element die Klasse "dark"?
                </p>
            </div>
        </div>
    );
}
