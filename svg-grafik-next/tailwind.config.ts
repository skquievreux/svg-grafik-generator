import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))", // Usually deep space
                foreground: "hsl(var(--foreground))", // Usually white/light

                // Cosmic Palette
                space: {
                    950: '#050511', // Deepest Void
                    900: '#0a0b1e', // Panel Base
                    800: '#141428', // Secondary Panel
                    light: '#2a2b4a' // Highlight
                },

                // Neon Accents
                neon: {
                    gold: '#FFD700',      // Primary Action / Attention
                    purple: '#BD00FF',    // Magic / AI / Generation
                    cyan: '#00F0FF',      // Tech / Info
                    pink: '#FF0055',      // Danger / Heart
                },

                // Legacy/Compat mappings (shadcn)
                primary: {
                    DEFAULT: "#FFD700", // Gold as primary
                    foreground: "#000000",
                },
                secondary: {
                    DEFAULT: "#141428", // Space 800
                    foreground: "#ffffff",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "rgba(255,255,255,0.1)",
                    foreground: "rgba(255,255,255,0.5)",
                },
                accent: {
                    DEFAULT: "rgba(255,255,255,0.1)",
                    foreground: "#ffffff",
                },
                popover: {
                    DEFAULT: "#0a0b1e",
                    foreground: "#ffffff",
                },
                card: {
                    DEFAULT: "rgba(20, 20, 40, 0.6)", // Glass card default
                    foreground: "#ffffff",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                'xl': "1rem",   // More generous rounding for glass cards
                '2xl': "1.5rem",
                '3xl': "2rem",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
                display: ["var(--font-display)", "sans-serif"], // For headings
            },
            backgroundImage: {
                'cosmic-gradient': 'linear-gradient(to bottom right, #050511, #1a1b3c)',
                'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                'neon-glow': 'radial-gradient(circle at center, rgba(189,0,255,0.15) 0%, transparent 70%)',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'neon-gold': '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
                'neon-purple': '0 0 10px rgba(189, 0, 255, 0.5), 0 0 20px rgba(189, 0, 255, 0.3)',
            },
            keyframes: {
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "1", boxShadow: "0 0 10px rgba(255,215,0,0.5)" },
                    "50%": { opacity: "0.8", boxShadow: "0 0 20px rgba(255,215,0,0.8)" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "float": "float 6s ease-in-out infinite",
                "float-slow": "float 10s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "pop-in": "fade-in-up 0.5s ease-out forwards",
            },
            backdropBlur: {
                'xs': '2px',
            }
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.glass-panel': {
                    'background': 'rgba(20, 20, 40, 0.6)',
                    'backdrop-filter': 'blur(16px)',
                    'border': '1px solid rgba(255, 255, 255, 0.1)',
                    'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                },
                '.text-glow': {
                    'text-shadow': '0 0 10px rgba(255,255,255,0.5)',
                }
            })
        })
    ],
};

export default config;
