import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";


export const metadata: Metadata = {
  title: "Vwa Kiltirèl",
  description:
    "Association Vwa Kiltirèl – événements, ateliers et actions culturelles à Tours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="min-h-screen flex flex-col">
          {/* Header fixe en haut */}
          <Header />

          {/* Contenu principal centré, mobile-first */}
          <main className="flex-1 pb-16 px-4 max-w-xl mx-auto w-full">
            {children}
          </main>

          {/* Barre d’actions en bas (mobile uniquement) */}
          <MobileBottomNav />
        </div>
      </body>
    </html>
  );
}

