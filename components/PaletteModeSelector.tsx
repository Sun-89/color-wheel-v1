"use client";

import { useColor } from "@/context/ColorContext";

export default function PaletteModeSelector() {
    const { mode, setMode } = useColor();

    const modes = [
        "analogous",
        "complementary",
        "triadic",
        "tetradic",
        "monochromatic",
    ] as const;

    return (
        <div className="panel p-4 space-y-3">
            <p className="text-sm text-text-dim">Type de palette</p>

            <div className="flex flex-wrap gap-2">
                {modes.map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                            ${mode === m
                                ? "bg-primary text-white shadow-soft"
                                : "bg-surface-strong text-text-dim hover:text-white"
                            }
            `}
                    >
                        {m}
                    </button>
                ))}
            </div>
        </div>
    );
}
