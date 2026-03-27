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
      <body className="bg-vwa-background text-vwa-dark antialiased relative">

        {/* --- FILIGRANE GLOBAL PREMIUM --- */}
        <div
          className="
            pointer-events-none 
            fixed inset-0 
            -z-10 
            opacity-[0.20] 
            flex 
            items-center 
            justify-center
          "
        >
          <img
            src="/logo-filigrane.png"
            alt="Filigrane Vwa Kiltirèl"
            className="
              w-[70vw] max-w-[600px]
              object-contain
              rotate-[-12deg]
              blur-[1px]
              select-none
              mix-blend-multiply
              animate-slowFloat
            "
          />
        </div>
        {/* --- FIN FILIGRANE --- */}

        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 px-4 pb-20 pt-6 mx-auto w-full max-w-5xl">
            {children}
          </main>

          <MobileBottomNav />
        </div>

      </body>
    </html>
  );
}
