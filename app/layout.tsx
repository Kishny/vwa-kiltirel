// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Vwa Kiltirèl",
  description:
    "Association Vwa Kiltirèl – événements, ateliers et actions culturelles à Tours.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning
        className="bg-vwa-background text-vwa-dark antialiased relative overflow-x-hidden"
      >
        {/* --- FILIGRANE GLOBAL PREMIUM RESPONSIVE --- */}
        <div
          className="
            pointer-events-none 
            fixed inset-0 
            -z-10 
            flex items-center justify-center
            opacity-[0.25]
            sm:opacity-[0.20]
          "
        >
          <img
            src="/logo-filigrane.png"
            alt="Filigrane Vwa Kiltirèl"
            className="
              w-[120vw]
              sm:w-[90vw]
              max-w-[900px]
              object-contain
              opacity-30 sm:opacity-25
              rotate-[-10deg]
              blur-[0.5px]
              select-none
              mix-blend-multiply
              animate-[slowRotate_120s_linear_infinite]
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
          <Footer />
        </div>
      </body>
    </html>
  );
}
