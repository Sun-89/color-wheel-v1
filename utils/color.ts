// utils/color.ts
export function hslToHex(h: number, s: number, l: number): string {
    // Convert HSL (h in [0,360], s/l in [0,100]) to hex string "#rrggbb"
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const toHex = (x: number) =>
        Math.round(x * 255)
            .toString(16)
            .padStart(2, "0");

    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
