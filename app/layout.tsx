import React from "react";
import "./globals.css";
import { ColorProvider } from "@/context/ColorContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-bg text-text font-sans antialiased">
        <ColorProvider>
          <header className="panel border-b border-white/10 py-6 mb-10">
            <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight text-primary">
                UI ColorWheel
              </h1>
              <span className="text-sm text-text-dim">UI Palette Generator</span>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-6 fade-in">{children}</main>

          <footer className="panel border-t border-white/10 py-6 mt-16 text-center text-sm text-text-faint">
            © {new Date().getFullYear()} UI ColorWheel — conçu par Sun
          </footer>
        </ColorProvider>
      </body>
    </html>
  );
}
