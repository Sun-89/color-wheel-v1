"use client";

import { useColor } from "@/context/ColorContext";

export default function ColorSliders() {
    const { saturation, lightness, setSaturation, setLightness } = useColor();

    return (
        <div className="p-4 sm:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <div>
                <label className="text-sm text-white/60">Saturation</label>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <div>
                <label className="text-sm text-white/60">Luminosité</label>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={lightness}
                    onChange={(e) => setLightness(Number(e.target.value))}
                    className="w-full"
                />
            </div>
        </div>
    );
}
