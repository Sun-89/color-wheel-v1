"use client";

import { useEffect, useRef, useState } from "react";
import { hslToHex } from "@/utils/color";
import { useColor } from "@/context/ColorContext";

const getSize = () => {
    if (typeof window === "undefined") return 280;
    if (window.innerWidth < 480) return 240;     // mobile
    if (window.innerWidth < 1024) return 300;    // tablette
    return 340;                                  // desktop
};

export default function ColorWheel() {
    const [size, setSize] = useState(280);
    const radius = size / 2;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { hue, saturation, lightness, setHue, setSaturation } = useColor();
    const [isDragging, setIsDragging] = useState(false);

    // Resize responsive
    useEffect(() => {
        const handleResize = () => setSize(getSize());
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Draw wheel
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const image = ctx.createImageData(size, size);
        const data = image.data;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const dx = x - radius;
                const dy = y - radius;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const index = (y * size + x) * 4;

                if (distance > radius) {
                    data[index + 3] = 0;
                    continue;
                }

                const angle = Math.atan2(dy, dx);
                const deg = ((angle * 180) / Math.PI + 360) % 360;

                const sat = (distance / radius) * 100;
                const { r, g, b } = hslToRgbInternal(deg, sat, 50);

                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
                data[index + 3] = 255;
            }
        }

        ctx.putImageData(image, 0, 0);
    }, [size]);

    // Pointer events
    const handlePointer = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = x - radius;
        const dy = y - radius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > radius) return;

        const angle = Math.atan2(dy, dx);
        const deg = ((angle * 180) / Math.PI + 360) % 360;
        const sat = Math.min(100, (distance / radius) * 100);

        setHue(deg);
        setSaturation(sat);
    };

    const hex = hslToHex(hue, saturation, lightness);

    return (
        <div className="p-6 bg-white/5 rounded-xl flex flex-col items-center gap-4 shadow-lg shadow-black/30">
            <div className="w-full flex justify-between items-center mb-2">
                <div>
                    <p className="text-sm text-white/60 uppercase tracking-[0.2em]">
                        Color Picker
                    </p>
                    <p className="text-lg font-medium">Roue chromatique</p>
                </div>
                <div
                    className="w-10 h-10 rounded-md border border-white/20"
                    style={{ backgroundColor: hex }}
                />
            </div>

            <div className="flex justify-center w-full">
                <canvas
                    ref={canvasRef}
                    width={size}
                    height={size}
                    className="rounded-full cursor-crosshair select-none"
                    onMouseDown={(e) => {
                        setIsDragging(true);
                        handlePointer(e);
                    }}
                    onMouseMove={(e) => isDragging && handlePointer(e)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                />
            </div>

            <div className="flex gap-6 text-sm text-white/70">
                <div>
                    <span className="text-white/40 text-xs">HEX</span>
                    <div className="font-mono">{hex}</div>
                </div>
                <div>
                    <span className="text-white/40 text-xs">HSL</span>
                    <div className="font-mono">
                        {`hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${lightness}%)`}
                    </div>
                </div>
            </div>
        </div>
    );
}

function hslToRgbInternal(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4)),
    };
}
