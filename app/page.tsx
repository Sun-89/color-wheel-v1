"use client";

import { useState } from "react";
import { useColor } from "@/context/ColorContext";
import ColorWheel from "@/components/ColorWheel";
import ColorSliders from "@/components/ColorSliders";
import PalettePreview from "@/components/PalettePreview";
import Explanation from "@/components/Explanation";
import PaletteModeSelector from "@/components/PaletteModeSelector";


export default function Home() {
  const { palette } = useColor();
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1500);
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center space-y-4 fade-in">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Créez des palettes parfaites
        </h2>
        <p className="text-text-dim max-w-xl mx-auto">
          Ajustez la teinte, la saturation et la luminosité pour générer des
          palettes harmonieuses adaptées à vos interfaces.
        </p>
      </section>

      {/* Main UI */}
      <section className="grid lg:grid-cols-2 gap-10">
        <div className="panel p-6 space-y-6">
          <ColorWheel />
          <ColorSliders />
        </div>

        <div className="panel p-6 space-y-6">
          <PaletteModeSelector />
          <PalettePreview colors={palette} onCopy={showToast} />
          <Explanation />
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-xl shadow-strong fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
