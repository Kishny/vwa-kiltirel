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
      <body className="bg-vwa-background text-vwa-dark antialiased">
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
