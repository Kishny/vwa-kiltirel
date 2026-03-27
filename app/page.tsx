import HeroSection from "@/components/Home/HeroSection";
import NextEventsCarousel from "@/components/Home/NextEventsCarousel";
import MomentsFortsCarousel from "@/components/Home/MomentsFortsCarousel";
import ValeursSection from "@/components/Home/ValeursSection";
import NewsletterForm from "@/components/Home/NewsletterForm";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <HeroSection />
      <NextEventsCarousel />

      {/* Section valeurs premium */}
      <ValeursSection />

      {/* Moments forts */}
      <MomentsFortsCarousel />

      {/* Newsletter (version simple) */}
      <section className="mb-8 mt-2">
        <h2 className="text-lg font-semibold text-vwa-dark mb-2">
          Restez informé·e
        </h2>

        <p className="text-xs text-vwa-dark/70 mb-3 max-w-md">
          Recevez nos prochains événements, ateliers et appels à participation
          directement dans votre boîte mail.
        </p>

        <NewsletterForm />
      </section>
    </div>
  );
}

