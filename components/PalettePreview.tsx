"use client";

import React from "react";
import { useColor } from "@/context/ColorContext";

type ColorItem = { h: number; s: number; l: number; hex?: string };

export default function PalettePreview({
    colors,
    onCopy,
}: {
    colors?: ColorItem[];
    onCopy?: (msg: string) => void;
}) {
    // Si pas de prop, récupère depuis le contexte (Option A compat)
    let paletteFromContext;
    try {
        const ctx = useColor();
        paletteFromContext = ctx?.palette;
    } catch {
        paletteFromContext = undefined;
    }

    const palette: ColorItem[] = colors && colors.length > 0 ? colors : paletteFromContext ?? [];

    if (!palette || palette.length === 0) {
        return (
            <div className="p-4 bg-white/3 rounded-xl">
                <p className="text-sm text-text-dim">Aucune couleur générée pour le moment.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <p className="text-sm text-text-dim">Palette générée</p>

            <div className="flex flex-wrap gap-4 items-center">
                {palette.map((c, i) => {
                    const hex = c.hex ?? `hsl(${c.h} ${c.s}% ${c.l}%)`;
                    return (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                            onClick={() => {
                                try {
                                    navigator.clipboard.writeText(hex);
                                    onCopy?.(`Couleur ${hex} copiée !`);
                                } catch {
                                    onCopy?.("Impossible de copier");
                                }
                            }}
                        >
                            <div
                                aria-label={`color-${i}`}
                                className="w-16 h-16 rounded-xl border border-white/10 group-hover:scale-110 transition-transform shadow-strong"
                                style={{ background: hex }}
                            />
                            <span className="text-xs text-text-dim font-mono group-hover:text-text">
                                {hex}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
