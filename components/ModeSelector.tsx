"use client";

import { useState } from "react";
import { PaletteMode } from "@/utils/palettes";

export default function ModeSelector({ onChange }: { onChange: (m: PaletteMode) => void }) {
    const [mode, setMode] = useState<PaletteMode>("analogous");

    const modes: { label: string; value: PaletteMode }[] = [
        { label: "Analogous", value: "analogous" },
        { label: "Complementary", value: "complementary" },
        { label: "Split Complementary", value: "split" },
        { label: "Triadic", value: "triadic" },
        { label: "Tetradic", value: "tetradic" },
        { label: "Monochromatic", value: "mono" },
    ];

    const handleSelect = (value: PaletteMode) => {
        setMode(value);
        onChange(value);
    };

    return (
        <div className="p-4 sm:p-6 bg-white/5 rounded-xl space-y-4">
            <p className="text-sm text-white/60">Type de palette</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {modes.map((m) => (
                    <button
                        key={m.value}
                        onClick={() => handleSelect(m.value)}
                        className={`px-3 py-2 rounded-md text-sm border transition-all duration-200
                            ${mode === m.value
                            ? "bg-white/20 border-white/30 scale-[1.02]"
                            : "border-white/10 hover:bg-white/10 hover:scale-[1.02]"}
                        `}

                    >
                        {m.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
