const { IconGenerator } = require('./lib/icons/generator.ts');

try {
    const svg = IconGenerator.generateSVG({
        name: 'Hantel',
        category: 'health',
        shape: 'octagon',
        symbol: 'dumbbell',
        colors: { background: '#000', border: '#fff', icon: '#fff' },
        size: 40
    });
    console.log('SVG GENERATED:', svg);
} catch (e) {
    console.error('ERROR:', e);
}
