import HeroSection from "@/components/Home/HeroSection";
import NextEventsCarousel from "@/components/Home/NextEventsCarousel";
import MomentsFortsCarousel from "@/components/Home/MomentsFortsCarousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-4">
      <HeroSection />
      <NextEventsCarousel />

      {/* Valeurs */}
      <section className="mt-2">
        <h2 className="text-lg font-semibold text-vwa-dark mb-3">
          Nos valeurs
        </h2>

        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-white border border-vwa-background shadow-sm">
            <h3 className="text-sm font-semibold text-vwa-dark flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-vwa-terracotta" />
              Culture
            </h3>
            <p className="text-xs text-vwa-dark/70 mt-1">
              Ateliers, découvertes, événements artistiques qui mettent en
              avant les cultures afro-caribéennes et du monde.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-vwa-background shadow-sm">
            <h3 className="text-sm font-semibold text-vwa-dark flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-vwa-green" />
              Familles
            </h3>
            <p className="text-xs text-vwa-dark/70 mt-1">
              Espaces de rencontre et de soutien pour les enfants, les parents
              et les futures mamans.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-vwa-background shadow-sm">
            <h3 className="text-sm font-semibold text-vwa-dark flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-vwa-blueSoft" />
              Plein air & bien-être
            </h3>
            <p className="text-xs text-vwa-dark/70 mt-1">
              Sorties en plein air, mouvement, respiration, reconnexion à soi,
              aux autres et à la nature.
            </p>
          </div>
        </div>
      </section>

      <MomentsFortsCarousel />

      {/* Newsletter */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-vwa-dark mb-3">
          Restez informé·e
        </h2>
        <p className="text-xs text-vwa-dark/70 mb-2">
          Recevez nos prochains événements, ateliers et appels à participation
          directement dans votre boîte mail.
        </p>

        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 px-3 py-2 rounded-xl border border-vwa-background bg-white text-sm text-vwa-dark placeholder:text-vwa-dark/40 focus:outline-none focus:ring-2 focus:ring-vwa-accent/60"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-vwa-primary text-white text-sm font-medium shadow-sm hover:bg-vwa-dark transition"
          >
            OK
          </button>
        </form>
      </section>
    </div>
  );
}
