import Link from "next/link";
import NextEventsCarousel from "@/components/Home/NextEventsCarousel";


export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-6">

      {/* HERO */}
      <section className="text-center flex flex-col items-center gap-3 mt-2">
        <h1 className="text-xl font-bold leading-tight">
          🎭 Vwa Kiltirèl
        </h1>
        <p className="text-sm text-slate-600 max-w-xs">
          L’association qui fait vibrer la culture, le partage et le vivre ensemble à Tours.
        </p>

        <div className="flex gap-3 mt-2">
          <Link
            href="/evenements"
            className="px-4 py-2 text-sm rounded-full bg-slate-900 text-white"
          >
            Événements
          </Link>

          <Link
            href="/devenir-membre"
            className="px-4 py-2 text-sm rounded-full border border-slate-300"
          >
            Adhésion
          </Link>
        </div>
      </section>

      {/* PROCHAIN ÉVÉNEMENT */}
      {/* PROCHAINS ÉVÉNEMENTS (CARROUSEL) */}
      <NextEventsCarousel />


      {/* VALEURS */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Nos valeurs</h2>

        <div className="flex flex-col gap-3">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold">Culture</h3>
            <p className="text-xs text-slate-600">
              Ateliers, découvertes, événements artistiques.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold">Familles</h3>
            <p className="text-xs text-slate-600">
              Activités pour les enfants, parents et futures mamans.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold">Plein air</h3>
            <p className="text-xs text-slate-600">
              Activités extérieures, sport, bien-être, cohésion.
            </p>
          </div>
        </div>
      </section>

      {/* MOMENTS FORTS */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Moments forts</h2>

        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 w-48 rounded-xl bg-slate-200 flex items-center justify-center text-xs text-slate-600"
            >
              Photo {i}
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Restez informé</h2>

        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-sm"
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm"
          >
            OK
          </button>
        </form>
      </section>
    </div>
  );
}

