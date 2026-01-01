export const AVATAR_ASSETS = {
    // --- Silhouetten (Körperbasis) ---
    bases: {
        // Standard Rider Silhouette (Schultern + Halsansatz)
        standard: `
      <g id="base-standard">
        <!-- Schultern/Torso -->
        <path d="M2,24 Q2,20 6,18 L8,17 Q12,16 16,17 L18,18 Q22,20 22,24 Z" fill="#222" opacity="0.9"/>
        <!-- Hals Overlay für Tiefe -->
        <path d="M9,16 L15,16 L15,18 Q12,19 9,18 Z" fill="#151515" opacity="0.6"/>
      </g>
    `,
    },

    // --- Helme (Detailliert) ---
    helmets: {
        // Moderner Downhill Helm
        fullface_pro: `
      <g id="helmet-downhill-pro">
        <!-- Hauptschale -->
        <path d="M12,2 
                 Q17,2 19,6 
                 L19,13 
                 Q19,16 20,18
                 L16,21
                 Q12,22 8,21
                 L4,18
                 Q5,16 5,13
                 L5,6
                 Q7,2 12,2 Z" fill="currentColor"/>
        
        <!-- Kinnschutz (Chin Bar) -->
        <path d="M5,15 L19,15 L18,19 Q12,21 6,19 Z" fill="#111" opacity="0.3"/>
        
        <!-- Visier -->
        <path d="M5,4 L19,4 L20,3 L4,3 Z" fill="#000" opacity="0.5"/>
        
        <!-- Kinn-Vent -->
        <path d="M10,17 L14,17 L13,19 L11,19 Z" fill="#000" opacity="0.6"/>
      </g>
    `,

        // Klassischer Fullface
        fullface_basic: `
      <g id="helmet-downhill-basic">
        <path d="M12,3 Q18,3 18,9 L18,15 Q18,20 12,20 Q6,20 6,15 L6,9 Q6,3 12,3 Z" fill="currentColor"/>
        <!-- Öffnung -->
        <path d="M7,9 Q12,8 17,9 L17,14 Q12,15 7,14 Z" fill="#111" opacity="0.8"/>
        <!-- Mundschutz -->
        <path d="M8,15 L16,15 L15,18 L9,18 Z" fill="currentColor" opacity="0.9"/>
      </g>
    `,

        // Enduro Halbschale
        halfshell_trail: `
      <g id="helmet-enduro">
        <!-- Schale -->
        <path d="M12,4 Q18,4 18,10 L18,13 L17,15 L7,15 L6,13 L6,10 Q6,4 12,4 Z" fill="currentColor"/>
        <!-- Visier -->
        <path d="M5,6 L19,6 L18,5 L6,5 Z" fill="#000" opacity="0.4"/>
        <!-- Riemen -->
        <path d="M7,15 L8,18 M17,15 L16,18" stroke="#111" stroke-width="0.5" opacity="0.7"/>
      </g>
    `,

        // Skate / Dirt Style
        dirt_bowl: `
      <g id="helmet-bowl">
        <path d="M12,5 Q18,5 18,11 L18,14 Q18,15 17,16 L7,16 Q6,15 6,14 L6,11 Q6,5 12,5 Z" fill="currentColor"/>
        <!-- Lüftungsschlitze -->
        <ellipse cx="9" cy="8" rx="0.5" ry="1.5" fill="#000" opacity="0.3"/>
        <ellipse cx="12" cy="7" rx="0.5" ry="1.5" fill="#000" opacity="0.3"/>
        <ellipse cx="15" cy="8" rx="0.5" ry="1.5" fill="#000" opacity="0.3"/>
      </g>
    `
    },

    // --- Brillen / Gesichts-Details ---
    accessories: {
        goggles: `
      <g id="acc-goggles">
        <!-- Rahmen -->
        <path d="M7,9 Q12,8 17,9 L17,13 Q12,14 7,13 Z" fill="#222"/>
        <!-- Glas -->
        <path d="M8,10 Q12,9 16,10 L16,12 Q12,13 8,12 Z" fill="url(#goggle-reflection)" opacity="0.9"/>
      </g>
    `,
        sunglasses: `
      <g id="acc-shades">
        <path d="M7,11 L17,11 L16,13 L8,13 Z" fill="#111"/>
      </g>
    `,
        none: ''
    }
};
