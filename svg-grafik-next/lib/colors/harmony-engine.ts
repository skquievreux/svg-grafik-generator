export interface ColorPalette {
    id: string;
    name: string;
    type: 'monochromatic' | 'complementary' | 'analogous' | 'triadic' | 'pastel' | 'vibrant';
    colors: {
        background: string;
        border: string;
        icon: string;
    };
}

export class HarmonyEngine {
    private static hsiToHex(h: number, s: number, l: number): string {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color)
                .toString(16)
                .padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    static generatePalette(baseHue?: number): ColorPalette {
        const hue = baseHue ?? Math.floor(Math.random() * 360);
        const strategies = [
            this.generateMonochromatic,
            this.generateComplementary,
            this.generateAnalogous,
            this.generatePastel,
            this.generateVibrant
        ];

        const strategy = strategies[Math.floor(Math.random() * strategies.length)];
        if (strategy) {
            return strategy.call(this, hue);
        }
        return this.generateMonochromatic(hue);
    }

    static generateSuggestions(): ColorPalette[] {
        const palettes: ColorPalette[] = [];
        const baseHue = Math.floor(Math.random() * 360);

        // Ensure we have variety
        // 1. One monochromatic/subtle (Professional)
        palettes.push(this.generateMonochromatic(baseHue));

        // 2. One high contrast/complementary (Bold)
        palettes.push(this.generateComplementary((baseHue + 90) % 360));

        // 3. One vibrant/fun (Playful)
        palettes.push(this.generateVibrant((baseHue + 180) % 360));

        return palettes;
    }

    private static generateMonochromatic(hue: number): ColorPalette {
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Professional',
            type: 'monochromatic',
            colors: {
                background: this.hsiToHex(hue, 20, 95), // Very light
                border: this.hsiToHex(hue, 30, 80),     // Light border
                icon: this.hsiToHex(hue, 60, 45)        // Darker icon
            }
        };
    }

    private static generateComplementary(hue: number): ColorPalette {
        const complementaryHue = (hue + 180) % 360;
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Dynamic',
            type: 'complementary',
            colors: {
                background: this.hsiToHex(hue, 80, 96),      // Light Base
                border: this.hsiToHex(hue, 60, 85),          // Medium Base
                icon: this.hsiToHex(complementaryHue, 80, 50) // Contrast Icon
            }
        };
    }

    private static generateAnalogous(hue: number): ColorPalette {
        const neighbor = (hue + 30) % 360;
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Harmonic',
            type: 'analogous',
            colors: {
                background: this.hsiToHex(hue, 15, 97),
                border: this.hsiToHex(hue, 40, 90),
                icon: this.hsiToHex(neighbor, 70, 50)
            }
        };
    }

    private static generatePastel(hue: number): ColorPalette {
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Soft',
            type: 'pastel',
            colors: {
                background: this.hsiToHex(hue, 40, 94),
                border: '#FFFFFF',
                icon: this.hsiToHex((hue + 45) % 360, 50, 60)
            }
        };
    }

    private static generateVibrant(hue: number): ColorPalette {
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Bold',
            type: 'vibrant',
            colors: {
                background: this.hsiToHex(hue, 90, 96),
                border: this.hsiToHex(hue, 80, 90),
                icon: this.hsiToHex(hue, 100, 45)
            }
        };
    }
}
