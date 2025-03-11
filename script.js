/**
 * SVG-Galerie für Chatbot-Icons
 *
 * Dieses Skript generiert SVG-Grafiken für Chatbots basierend auf Markdown-Dateien.
 * Jede Grafik zeigt ein Icon in einem anpassbaren Rahmen.
 */

// Standardwerte für SVG-Attribute
let svgConfig = {
    bgColor: "#000000",
    borderColor: "#ffffff",
    iconColor: "#ffffff",
    shape: "octagon", // octagon, circle, square, hexagon
    iconSize: 40,
    iconX: 30,
    iconY: 30
};

// Kategorien für Chatbots
const categories = {
    "Kochen-Assistent": "food",
    "Fitness-Trainer": "health",
    "Reiseplaner": "travel",
    "Finanzberater": "finance",
    "Wettervorhersage": "utility",
    "Einkaufen": "shopping",
    "Lernen": "education",
    "Gesundheit": "health",
    "Musik": "entertainment",
    "Film": "entertainment",
    "Büro": "productivity",
    "Soziale Medien": "social",
    "Technologie": "technology",
    "Garten": "home",
    "Haustier": "pets",
    "Auto": "transport",
    "Flug": "travel",
    "Schiff": "travel",
    "Zug": "travel",
    "Fahrrad": "transport",
    "Übersetzungs-Assistent": "language",
    "Programmier-Tutor": "education",
    "Meditations-Guide": "health",
    "Ernährungsberater": "health",
    "Spiele-Begleiter": "entertainment",
    "Nachrichten-Aggregator": "news",
    "Produktivitäts-Coach": "productivity",
    "Sprach-Lehrer": "education",
    "Kreativ-Berater": "creativity",
    "Wissenschafts-Erklärer": "education",
    "Geschichten-Erzähler": "entertainment",
    "Psychologie-Berater": "health",
    "Kunst-Kritiker": "art",
    "Mathematik-Tutor": "education",
    "Astronomie-Guide": "science",
    "Geschichts-Experte": "education",
    "Mode-Berater": "fashion",
    "Handwerks-Helfer": "diy",
    "Eltern-Ratgeber": "family",
    "Umwelt-Berater": "environment"
};

// Favoriten im localStorage speichern
let favorites = JSON.parse(localStorage.getItem('chatbotFavorites')) || [];

// SVG-Icons für verschiedene Chatbot-Typen
const icons = {
    // Ursprüngliche Icons
    "Kochmütze": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zm0 15.92L5.51 6.36C7.32 4.85 9.62 4 12 4s4.68.85 6.49 2.36L12 17.92z"/></svg>',
    "Hantel": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>',
    "Karte": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>',
    "Geldbeutel": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>',
    "Wolke": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',
    "Einkaufswagen": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',
    "Buch": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>',
    "Herz": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    "Noten": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',
    "Kamera": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z"/></svg>',
    "Aktenordner": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',
    "Handy": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"/></svg>',
    "Computer": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>',
    "Blume": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/></svg>',
    "Hund": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M4.5 9.5m10.5 10.5c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h5.5v3H5v11h10V9.5h1.5v4c1.1 0 2 .9 2 2v4.5z M20 8h-3V5h3v3z M20 16h-3v-3h3v3z M10 8H7V5h3v3z M10 16H7v-3h3v3z"/></svg>',
    "Auto": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>',
    "Flugzeug": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
    "Schiff": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/></svg>',
    "Zug": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zm8 1.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7H6V5h12v5z"/></svg>',
    "Fahrrad": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>',
    
    // Neue Icons für die erweiterten Chatbots
    "Sprechblase": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
    "Code": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
    "Lotus": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M12,2C7.03,2 3,6.03 3,11c0,2.1 0.73,4.03 1.94,5.56C5.38,17.5 6,18.5 6,20c0,1.1 0.9,2 2,2h8c1.1,0 2-0.9 2-2c0-1.5 0.62-2.5 1.06-3.44C20.27,15.03 21,13.1 21,11C21,6.03 16.97,2 12,2z M12,4c3.86,0 7,3.14 7,7c0,1.92 -0.78,3.66 -2.04,4.93C15.71,17.24 15,18.83 15,20h-1.25v-6h-3.5v6H9c0,-1.17 -0.71,-2.76 -1.96,-4.07C5.78,14.66 5,12.92 5,11C5,7.14 8.14,4 12,4z"/></svg>',
    "Apfel": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M18 9h-1.5v-.5c0-2.5-2-4.5-4.5-4.5S7.5 6 7.5 8.5V9H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zM9 9V8.5c0-1.7 1.3-3 3-3s3 1.3 3 3V9H9zm9 11H6v-9h12v9zm-6-6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>',
    "Controller": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>',
    "Zeitung": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-6h11v6zm0-8H4V6h11v4zm5 8h-4V6h4v12z"/></svg>',
    "Checkliste": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    "Buch mit Flagge": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',
    "Glühbirne": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>',
    "Reagenzglas": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M6 22c-1.66 0-3-1.34-3-3V3h18v16c0 1.66-1.34 3-3 3H6zm3.84-8L8 9H7v10h2l1.84-5zM13 9h-1v5h1V9zm3 0h-1v5h1V9z"/></svg>',
    "Buch mit Stern": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>',
    "Gehirn": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M14 8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5S14 9.33 14 8.5zM8.5 6C7.67 6 7 6.67 7 7.5S7.67 9 8.5 9 10 8.33 10 7.5 9.33 6 8.5 6zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg>',
    "Pinsel": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/></svg>',
    "Pi-Symbol": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M4 7v2h3v10h2V9h3V7H4zm7.5 2h2v8h2v-8h2V7h-6v2z"/></svg>',
    "Teleskop": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm5-2c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm5 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>',
    "Pergament": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2z"/></svg>',
    "Kleiderbügel": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M21 12l-8-9v6H9V3L1 12h10v9h2v-9h8z"/></svg>',
    "Hammer": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M19.09 16.5l-5.01-5.01 1.41-1.41 5.01 5.01-1.41 1.41zM5.5 11c1.93 0 3.5-1.57 3.5-3.5S7.43 4 5.5 4 2 5.57 2 7.5 3.57 11 5.5 11zM5.5 6c.83 0 1.5.67 1.5 1.5S6.33 9 5.5 9 4 8.33 4 7.5 4.67 6 5.5 6zm13.91 10.5l-2.12 2.12-5.01-5.01 2.12-2.12 5.01 5.01z"/></svg>',
    "Familie": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63C19.68 7.55 18.92 7 18.06 7h-.12c-.86 0-1.63.55-1.9 1.37l-.86 2.58c1.08.6 1.82 1.73 1.82 3.05v8h3zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4zm6.5 0v-4h1v-4c0-.82-.68-1.5-1.5-1.5h-2c-.82 0-1.5.68-1.5 1.5v4h1v4h3z"/></svg>',
    "Blatt": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>'
};

/**
 * Erstellt eine SVG-Grafik basierend auf den übergebenen Parametern und aktuellen Einstellungen.
 *
 * @param {string} name - Der Name des Chatbots
 * @param {string} icon - Der Name des Icons
 * @param {string} shape - Die ursprüngliche Form (wird durch die aktuelle Einstellung überschrieben)
 * @param {string} color - Die ursprüngliche Farbe (wird durch die aktuelle Einstellung überschrieben)
 * @returns {string} HTML-Code für die Galerie-Item mit SVG und Einbindungscode
 */
function createSVG(name, icon, shape, color) {
    // Icon aus der Icons-Map holen oder leeren String verwenden
    let iconSvg = icons[icon] || "";
    
    // Icon-Farbe anpassen, wenn nicht weiß
    if (svgConfig.iconColor !== "#ffffff") {
        iconSvg = iconSvg.replace(/fill="white"/g, `fill="${svgConfig.iconColor}"`);
    }
    
    // Form-Parameter basierend auf der ausgewählten Form
    let rx = "25"; // Standard für Achteck
    if (svgConfig.shape === "circle") {
        rx = "50";
    } else if (svgConfig.shape === "square") {
        rx = "10";
    } else if (svgConfig.shape === "hexagon") {
        rx = "30";
    }
    
    // SVG-Code erstellen
    const svgCode = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <!-- Hintergrund -->
    <rect width="100" height="100" fill="${svgConfig.bgColor}" rx="${rx}" />
    
    <!-- Rand -->
    <rect width="96" height="96" x="2" y="2" fill="none" stroke="${svgConfig.borderColor}" stroke-width="2" rx="${rx}" />
    
    <!-- Icon Bereich (zentriert) -->
    <g transform="translate(${svgConfig.iconX},${svgConfig.iconY})">
        ${iconSvg}
    </g>
</svg>`;

    // Verschiedene Einbindungscodes erstellen
    const htmlEmbedCode = `<img src="data:image/svg+xml;base64,${btoa(svgCode)}" alt="${name}" width="100" height="100">`;
    const markdownEmbedCode = `![${name}](data:image/svg+xml;base64,${btoa(svgCode)})`;
    const urlEmbedCode = `data:image/svg+xml;base64,${btoa(svgCode)}`;
    
    // Kategorie des Chatbots ermitteln
    const category = categories[name] || "other";
    
    // Prüfen, ob der Chatbot ein Favorit ist
    const isFavorite = favorites.includes(name);
    
    // HTML für das Galerie-Item zurückgeben
    return `
<div class="gallery-item" data-name="${name}" data-category="${category}">
    ${svgCode}
    <h3>${name}</h3>
    
    <div class="gallery-item-actions">
        <button class="action-btn download" title="SVG herunterladen" onclick="downloadSVG('${name}', this.parentNode.parentNode)">
            <i class="fas fa-download"></i>
        </button>
        
        <button class="action-btn favorite ${isFavorite ? 'active' : ''}" title="Als Favorit markieren" onclick="toggleFavorite('${name}', this)">
            <i class="fas fa-star"></i>
        </button>
        
        <div class="tooltip">
            <button class="action-btn info" title="Info">
                <i class="fas fa-info-circle"></i>
            </button>
            <span class="tooltiptext">Kategorie: ${category}</span>
        </div>
    </div>
    
    <div class="embed-code">
        <h4>Einbindungscode:</h4>
        <div class="embed-tabs">
            <button class="tab-btn active" data-format="html" onclick="switchEmbedFormat('html', this.parentNode.parentNode)">HTML</button>
            <button class="tab-btn" data-format="markdown" onclick="switchEmbedFormat('markdown', this.parentNode.parentNode)">Markdown</button>
            <button class="tab-btn" data-format="url" onclick="switchEmbedFormat('url', this.parentNode.parentNode)">URL</button>
        </div>
        <textarea readonly data-html="${htmlEmbedCode}" data-markdown="${markdownEmbedCode}" data-url="${urlEmbedCode}">${htmlEmbedCode}</textarea>
        <div class="preview">
            <h4>Vorschau:</h4>
            <div id="embed-preview">${htmlEmbedCode}</div>
        </div>
        <button class="btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.previousElementSibling.value)">Kopieren</button>
    </div>
</div>`;
}

/**
 * Parst eine Markdown-Datei und extrahiert die Chatbot-Informationen.
 * 
 * @param {string} text - Der Inhalt der Markdown-Datei
 * @returns {Array} Ein Array von Chatbot-Objekten
 */
function parseChatbotMarkdown(text) {
    const lines = text.split('\n');
    const chatbots = [];
    
    let currentBot = {};
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Neuer Chatbot beginnt mit einer Nummer
        if (/^\d+\.\s\*\*(.+)\*\*$/.test(line)) {
            // Wenn wir bereits einen Chatbot haben, fügen wir ihn zur Liste hinzu
            if (currentBot.name && currentBot.icon) {
                chatbots.push(currentBot);
            }
            
            // Neuen Chatbot starten
            const name = line.match(/^\d+\.\s\*\*(.+)\*\*$/)[1];
            currentBot = { name };
        } 
        // Icon-Zeile
        else if (/^\s*-\s*Icon:\s*(.+)$/.test(line)) {
            currentBot.icon = line.match(/^\s*-\s*Icon:\s*(.+)$/)[1];
        }
        // Form-Zeile (ignorieren, da wir immer Achteck verwenden)
        else if (/^\s*-\s*Form:\s*(.+)$/.test(line)) {
            // Wir ignorieren die Form und verwenden immer Achteck
            currentBot.shape = "Achteck";
        }
        // Farbe-Zeile (ignorieren, da wir immer Schwarz/Weiß verwenden)
        else if (/^\s*-\s*Farbe:\s*(.+)$/.test(line)) {
            // Wir ignorieren die Farbe und verwenden immer Schwarz/Weiß
            currentBot.color = "Weiß";
        }
    }
    
    // Den letzten Chatbot hinzufügen
    if (currentBot.name && currentBot.icon) {
        chatbots.push(currentBot);
    }
    
    return chatbots;
}

/**
 * Wechselt das Einbindungsformat (HTML, Markdown, URL)
 *
 * @param {string} format - Das Format ('html', 'markdown', 'url')
 * @param {HTMLElement} container - Der Container mit den Tabs und dem Textarea
 */
function switchEmbedFormat(format, container) {
    const textarea = container.querySelector('textarea');
    const tabs = container.querySelectorAll('.tab-btn');
    const preview = container.querySelector('#embed-preview');
    
    // Aktiven Tab setzen
    tabs.forEach(tab => {
        if (tab.dataset.format === format) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Textarea-Inhalt aktualisieren
    textarea.value = textarea.dataset[format];
    
    // Vorschau aktualisieren (nur für HTML)
    if (format === 'html') {
        preview.innerHTML = textarea.dataset.html;
    } else {
        preview.textContent = textarea.dataset[format];
    }
}

/**
 * Lädt ein SVG als Datei herunter
 *
 * @param {string} name - Der Name des Chatbots
 * @param {HTMLElement} container - Der Container mit dem SVG
 */
function downloadSVG(name, container) {
    const svgElement = container.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-${name.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Fügt einen Chatbot zu den Favoriten hinzu oder entfernt ihn
 *
 * @param {string} name - Der Name des Chatbots
 * @param {HTMLElement} button - Der Favoriten-Button
 */
function toggleFavorite(name, button) {
    const index = favorites.indexOf(name);
    
    if (index === -1) {
        // Zu Favoriten hinzufügen
        favorites.push(name);
        button.classList.add('active');
    } else {
        // Aus Favoriten entfernen
        favorites.splice(index, 1);
        button.classList.remove('active');
    }
    
    // Im localStorage speichern
    localStorage.setItem('chatbotFavorites', JSON.stringify(favorites));
    
    // Wenn der Favoriten-Filter aktiv ist, die Galerie aktualisieren
    const activeFilter = document.querySelector('.filter-buttons .btn.active');
    if (activeFilter && activeFilter.dataset.category === 'favorites') {
        filterGallery('favorites');
    }
}

/**
 * Filtert die Galerie nach Kategorie
 *
 * @param {string} category - Die Kategorie oder 'all' für alle oder 'favorites' für Favoriten
 */
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-buttons .btn');
    
    // Aktiven Button setzen
    buttons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Items filtern
    items.forEach(item => {
        if (category === 'all') {
            item.style.display = '';
        } else if (category === 'favorites') {
            const name = item.dataset.name;
            item.style.display = favorites.includes(name) ? '' : 'none';
        } else {
            const itemCategory = item.dataset.category;
            item.style.display = itemCategory === category ? '' : 'none';
        }
    });
}

/**
 * Sucht nach Chatbots basierend auf dem Suchbegriff
 *
 * @param {string} query - Der Suchbegriff
 */
function searchGallery(query) {
    const items = document.querySelectorAll('.gallery-item');
    const normalizedQuery = query.toLowerCase().trim();
    
    items.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        const category = item.dataset.category.toLowerCase();
        
        if (normalizedQuery === '') {
            item.style.display = '';
        } else {
            const match = name.includes(normalizedQuery) || category.includes(normalizedQuery);
            item.style.display = match ? '' : 'none';
        }
    });
    
    // Wenn eine Suche aktiv ist, den aktiven Filter zurücksetzen
    if (normalizedQuery !== '') {
        const buttons = document.querySelectorAll('.filter-buttons .btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        buttons[0].classList.add('active'); // "Alle" Button aktivieren
    }
}

/**
 * Aktualisiert die SVG-Konfiguration und alle angezeigten SVGs
 *
 * @param {Object} newConfig - Die neue Konfiguration
 */
function updateSVGConfig(newConfig) {
    // Konfiguration aktualisieren
    Object.assign(svgConfig, newConfig);
    
    // Alle Chatbots neu laden
    loadAllChatbots();
}

/**
 * Lädt alle Chatbots aus den Markdown-Dateien und zeigt sie in der Galerie an.
 */
function loadAllChatbots() {
    const gallery = document.getElementById('gallery');
    
    // Galerie leeren
    gallery.innerHTML = '<div class="loading">SVGs werden geladen</div>';
    
    // Beide Markdown-Dateien laden
    Promise.all([
        fetch('chatbot-ideen.md').then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        }),
        fetch('chatbot-ideen-erweitert.md').then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
    ])
    .then(([text1, text2]) => {
        // Beide Dateien parsen
        const chatbots1 = parseChatbotMarkdown(text1);
        const chatbots2 = parseChatbotMarkdown(text2);
        
        // Alle Chatbots kombinieren
        const allChatbots = [...chatbots1, ...chatbots2];
        
        // Galerie leeren
        gallery.innerHTML = '';
        
        // Alle Chatbots zur Galerie hinzufügen
        allChatbots.forEach(bot => {
            const svg = createSVG(bot.name, bot.icon, bot.shape, bot.color);
            gallery.innerHTML += svg;
        });
        
        // Aktiven Filter anwenden, falls vorhanden
        const activeFilter = document.querySelector('.filter-buttons .btn.active');
        if (activeFilter) {
            filterGallery(activeFilter.dataset.category);
        }
        
        // Aktive Suche anwenden, falls vorhanden
        const searchInput = document.getElementById('search');
        if (searchInput.value.trim() !== '') {
            searchGallery(searchInput.value);
        }
    })
    .catch(error => {
        console.error('Fehler beim Laden der Chatbot-Ideen:', error);
        gallery.innerHTML = `
            <div class="error">
                <h2>Fehler beim Laden der Chatbot-Ideen</h2>
                <p>${error.message}</p>
                <p>Bitte überprüfen Sie, ob die Markdown-Dateien vorhanden sind.</p>
            </div>
        `;
    });
}

/**
 * Initialisiert die Benutzeroberfläche und Event-Listener
 */
function initUI() {
    // Suchfeld
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        searchGallery(searchInput.value);
    });
    
    // Filter-Buttons
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterGallery(button.dataset.category);
        });
    });
    
    // Ansichts-Umschalter (Raster/Liste)
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const gallery = document.getElementById('gallery');
    
    gridViewBtn.addEventListener('click', () => {
        gallery.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', () => {
        gallery.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
    
    // Größen-Schieberegler
    const sizeControl = document.getElementById('size-control');
    sizeControl.addEventListener('input', () => {
        const size = sizeControl.value;
        document.documentElement.style.setProperty('--icon-size', `${size}px`);
        
        // SVG-Größe in der Konfiguration aktualisieren
        svgConfig.iconSize = size * 0.4; // 40% der Anzeigegröße
        svgConfig.iconX = size * 0.3;    // 30% der Anzeigegröße
        svgConfig.iconY = size * 0.3;    // 30% der Anzeigegröße
    });
    
    // Theme-Umschalter (Hell/Dunkel)
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Icon aktualisieren
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Theme-Präferenz speichern
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
    
    // Gespeichertes Theme anwenden
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Anpassungs-Panel
    const customizeToggle = document.getElementById('customize-toggle');
    const customizer = document.querySelector('.customizer');
    
    customizeToggle.addEventListener('click', () => {
        customizer.classList.toggle('active');
        customizeToggle.classList.toggle('active');
    });
    
    // Anpassungs-Steuerelemente
    const bgColorInput = document.getElementById('bg-color');
    const borderColorInput = document.getElementById('border-color');
    const shapeSelect = document.getElementById('shape');
    const iconColorInput = document.getElementById('icon-color');
    
    bgColorInput.value = svgConfig.bgColor;
    borderColorInput.value = svgConfig.borderColor;
    shapeSelect.value = svgConfig.shape;
    iconColorInput.value = svgConfig.iconColor;
    
    bgColorInput.addEventListener('input', () => {
        updateSVGConfig({ bgColor: bgColorInput.value });
    });
    
    borderColorInput.addEventListener('input', () => {
        updateSVGConfig({ borderColor: borderColorInput.value });
    });
    
    shapeSelect.addEventListener('change', () => {
        updateSVGConfig({ shape: shapeSelect.value });
    });
    
    iconColorInput.addEventListener('input', () => {
        updateSVGConfig({ iconColor: iconColorInput.value });
    });
}

// Chatbots laden und UI initialisieren, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    loadAllChatbots();
    initUI();
    
    // Favoriten-Button zur Filterleiste hinzufügen
    const filterButtons = document.querySelector('.filter-buttons');
    const favoritesButton = document.createElement('button');
    favoritesButton.className = 'btn';
    favoritesButton.dataset.category = 'favorites';
    favoritesButton.innerHTML = '<i class="fas fa-star"></i> Favoriten';
    filterButtons.appendChild(favoritesButton);
    
    favoritesButton.addEventListener('click', () => {
        filterGallery('favorites');
    });
});