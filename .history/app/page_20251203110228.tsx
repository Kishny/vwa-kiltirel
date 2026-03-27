import HeroSection from "@/components/Home/HeroSection";
import NextEventsCarousel from "@/components/Home/NextEventsCarousel";
import MomentsFortsCarousel from "@/components/Home/MomentsFortsCarousel";
import ValeursSection from "@/components/Home/ValeursSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <HeroSection />
      <NextEventsCarousel />

      {/* Section valeurs premium */}
      <ValeursSection />

      {/* Moments forts */}
      <MomentsFortsCarousel />

      {/* Newsletter */}
      <section className="mb-8 mt-2">
        <h2 className="text-lg font-semibold text-vwa-dark mb-2">
          Restez informé·e
        </h2>
        <p className="text-xs text-vwa-dark/70 mb-3 max-w-md">
          Recevez nos prochains événements, ateliers et appels à participation
          directement dans votre boîte mail.
        </p>

        <form className="flex gap-2 max-w-md">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 px-3 py-2 rounded-xl border border-vwa-background bg-white text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-vwa-primary text-white text-sm font-medium shadow-[0_10px_22px_-12px_rgba(29,91,107,0.9)] md:hover:-translate-y-[2px] md:hover:shadow-[0_16px_34px_-16px_rgba(29,91,107,0.95)] transition-transform duration-200 pressable"
          >
            OK
          </button>
        </form>
      </section>
    </div>
  );
}

