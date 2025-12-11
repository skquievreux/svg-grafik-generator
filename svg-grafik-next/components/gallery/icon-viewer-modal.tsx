'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DynamicIcon } from '@/components/icons/dynamic-icon';
import { HarmonyEngine, type ColorPalette } from '@/lib/colors/harmony-engine';
import { Check, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this exists from previous steps

interface IconViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    iconName: string | null;
    category: string | null;
    onApplyPalette: (palette: ColorPalette['colors']) => void;
}

export function IconViewerModal({ isOpen, onClose, iconName, category, onApplyPalette }: IconViewerModalProps) {
    const [palettes, setPalettes] = useState<ColorPalette[]>([]);
    const [selectedPaletteId, setSelectedPaletteId] = useState<string | null>(null);

    // Generate palettes when modal opens or icon changes
    useEffect(() => {
        if (isOpen && iconName) {
            regeneratePalettes();
        }
    }, [isOpen, iconName]);

    const regeneratePalettes = () => {
        const newPalettes = HarmonyEngine.generateSuggestions();
        setPalettes(newPalettes);
        setSelectedPaletteId(null);
    };

    const handleApply = (palette: ColorPalette) => {
        setSelectedPaletteId(palette.id);
        onApplyPalette(palette.colors);
        // Optional: Close automatically after short delay or let user close
        setTimeout(() => {
            onClose();
        }, 500);
    };

    if (!iconName || !category) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Smart Design: {iconName}
                        </DialogTitle>
                        <Button variant="ghost" size="icon" onClick={regeneratePalettes} title="Neue Vorschläge generieren">
                            <Wand2 className="h-5 w-5 text-purple-500 hover:rotate-12 transition-transform" />
                        </Button>
                    </div>
                    <DialogDescription className="text-gray-500">
                        Wähle ein intelligentes Farbschema. Deine Auswahl wird <strong>automatisch auf alle Icons</strong> angewendet.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                    {palettes.map((palette) => (
                        <div
                            key={palette.id}
                            className={cn(
                                "group relative flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105",
                                selectedPaletteId === palette.id
                                    ? "border-blue-500 bg-blue-50/50 shadow-lg scale-105"
                                    : "border-transparent bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-200"
                            )}
                            onClick={() => handleApply(palette)}
                        >
                            {selectedPaletteId === palette.id && (
                                <div className="absolute top-2 right-2 p-1 bg-blue-500 rounded-full animate-in fade-in zoom-in">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                            )}

                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                <DynamicIcon
                                    name={iconName}
                                    category={category}
                                    size={80}
                                    bgColor={palette.colors.background}
                                    borderColor={palette.colors.border}
                                    iconColor={palette.colors.icon}
                                />
                            </div>

                            <div className="text-center w-full">
                                <h3 className="font-semibold text-gray-900 mb-1">{palette.name}</h3>
                                <p className="text-xs text-gray-400 capitalize mb-3">{palette.type}</p>

                                {/* Color Swatches */}
                                <div className="flex justify-center gap-2 mt-2">
                                    <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm tooltip" title="Background" style={{ backgroundColor: palette.colors.background }} />
                                    <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm tooltip" title="Border" style={{ backgroundColor: palette.colors.border }} />
                                    <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm tooltip" title="Icon" style={{ backgroundColor: palette.colors.icon }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3 mt-2 border-t pt-4 border-gray-100">
                    <Button variant="outline" onClick={onClose}>
                        Schließen
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
