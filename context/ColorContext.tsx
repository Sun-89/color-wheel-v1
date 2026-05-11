"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { hslToHex } from "@/utils/color";
import { generatePalette } from "@/utils/palettes";

type PaletteMode =
  | "analogous"
  | "complementary"
  | "triadic"
  | "tetradic"
  | "monochromatic";

type ColorState = {
  hue: number;
  saturation: number;
  lightness: number;
  hex: string;
  palette: { h: number; s: number; l: number; hex: string }[];
  mode: PaletteMode;
  setHue: (h: number) => void;
  setSaturation: (s: number) => void;
  setLightness: (l: number) => void;
  setMode: (m: PaletteMode) => void;
};

const ColorContext = createContext<ColorState | null>(null);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [hue, setHue] = useState(210);
  const [saturation, setSaturation] = useState(80);
  const [lightness, setLightness] = useState(50);

  const [mode, setMode] = useState<PaletteMode>("analogous");

  const hex = hslToHex(hue, saturation, lightness);

  const palette = useMemo(() => {
    const base = generatePalette(hue, saturation, lightness, mode);
    return base.map((c) => ({
      ...c,
      hex: hslToHex(c.h, c.s, c.l),
    }));
  }, [hue, saturation, lightness, mode]);

  return (
    <ColorContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        hex,
        palette,
        mode,
        setHue,
        setSaturation,
        setLightness,
        setMode,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error("useColor must be used inside <ColorProvider>");
  return ctx;
}
