"use client";

import React from "react";
import { useColor } from "@/context/ColorContext";

const explanationsMap: Record<string, string> = {
    analogous:
        "Les couleurs analogues sont proches sur la roue chromatique. Elles créent une harmonie douce.",
    complementary:
        "Les couleurs complémentaires sont opposées. Elles offrent un contraste fort.",
    split:
        "Le split complementary donne un contraste équilibré, moins agressif que le complémentaire pur.",
    triadic:
        "La palette triadique utilise trois couleurs équidistantes. Très dynamique.",
    tetradic:
        "La palette tétradique combine deux paires complémentaires. Très riche mais difficile à maîtriser.",
    monochromatic:
        "La palette monochromatique joue sur les variations de luminosité. Très élégante et minimaliste.",
};

export default function Explanation() {
    const { mode, hex, hue, saturation, lightness } = useColor();

    // Normalisation : accepte 'mono' ou 'monochromatic', 'split' ou 'split-complementary'
    const normalizedMode =
    (mode as string) === "monochromatic"
    ? "monochromatic"
    : (mode as string) === "split"
    ? "split"
    : mode;

    const text = explanationsMap[normalizedMode] ?? explanationsMap["analogous"];

    return (
        <div className="p-4 sm:p-6 bg-white/5 rounded-xl">
            <p className="text-sm text-white/60">Explication</p>

            <p className="text-white/80 mt-2">{text}</p>

            <div className="mt-3 text-sm text-text-dim">
                <div>HSL: Hue Saturation Lightness</div>
                <div>Hue (Teinte) — H : position sur la roue chromatique, valeur de 0 à 360 degrés.</div>
                <div>Saturation (Saturation) — S : intensité de la couleur, valeur de 0% à 100%.</div>
                <div>Lightness (Luminosité) — L : clarté de la couleur, valeur de 0% à 100%.</div>
                <div>Couleur de base : <span className="font-mono">{hex}</span></div>
                <div>H: {hue} • S: {saturation}% • L: {lightness}%</div>
                <div className="mt-2 text-xs text-text-faint">
                    Cliquez sur une couleur pour la copier.
                </div>
            </div>
        </div>
    );
}
