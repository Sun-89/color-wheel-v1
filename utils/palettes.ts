// utils/palettes.ts
export type PaletteMode =
    | "analogous"
    | "complementary"
    | "triadic"
    | "tetradic"
    | "monochromatic";

export function generatePalette(
    h: number,
    s: number,
    l: number,
    mode: PaletteMode = "analogous"
): { h: number; s: number; l: number }[] {
    // Exemple simple : retourne 5 couleurs selon le mode
    switch (mode) {
        case "complementary":
            return [
                { h, s, l },
                { h: (h + 180) % 360, s, l },
                { h: (h + 150) % 360, s: Math.max(10, s - 10), l },
                { h: (h + 210) % 360, s: Math.max(10, s - 10), l },
                { h: (h + 0) % 360, s: Math.max(10, s - 20), l: Math.max(10, l - 10) },
            ];
        case "triadic":
            return [
                { h, s, l },
                { h: (h + 120) % 360, s, l },
                { h: (h + 240) % 360, s, l },
                { h: (h + 60) % 360, s: Math.max(10, s - 10), l },
                { h: (h + 300) % 360, s: Math.max(10, s - 10), l },
            ];
        case "tetradic":
            return [
                { h, s, l },
                { h: (h + 90) % 360, s, l },
                { h: (h + 180) % 360, s, l },
                { h: (h + 270) % 360, s, l },
                { h: (h + 45) % 360, s: Math.max(10, s - 10), l },
            ];
        case "monochromatic":
            return [
                { h, s: Math.max(5, s - 30), l: Math.max(10, l - 30) },
                { h, s: Math.max(10, s - 15), l: Math.max(20, l - 15) },
                { h, s, l },
                { h, s: Math.min(100, s + 10), l: Math.min(90, l + 10) },
                { h, s: Math.min(100, s + 20), l: Math.min(95, l + 20) },
            ];
        case "analogous":
        default:
            return [
                { h: (h + 330) % 360, s, l },
                { h: (h + 345) % 360, s, l },
                { h, s, l },
                { h: (h + 15) % 360, s, l },
                { h: (h + 30) % 360, s, l },
            ];
    }
}
