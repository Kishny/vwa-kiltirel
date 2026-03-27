// app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Vwa Kiltirèl",
  description:
    "Contacter l’association Vwa Kiltirèl pour une question, une proposition de partenariat ou une demande d’information.",
};

export default function ContactPage() {
  return (
    <main className="relative max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Halo / ambiance clean */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/70 to-vwa-background" />
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/22 blur-3xl opacity-75" />
        <div className="absolute bottom-[-4rem] right-[-3rem] h-60 w-60 rounded-full bg-vwa-primary/12 blur-3xl opacity-65" />
      </div>

      {/* Header */}
      <header className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-vwa-dark/60">
          <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
          Contact – Vwa Kiltirèl
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
              Une question, une idée, une envie de projet ?
            </h1>
            <p className="text-sm text-vwa-dark/75 max-w-2xl">
              Écrivez-nous pour toute demande d’information, un partenariat, une
              proposition d’atelier ou simplement pour entrer en contact avec
              l’équipe de Vwa Kiltirèl. On lit tout, vraiment.
            </p>
          </div>

          <div className="text-xs text-right space-y-2">
            <div className="inline-flex flex-col items-end rounded-2xl bg-vwa-dark text-vwa-background px-3 py-2 shadow-[0_16px_45px_rgba(28,22,18,0.6)]">
              <span className="text-[11px] uppercase tracking-[0.18em] text-vwa-background/70">
                Temps de réponse
              </span>
              <span className="text-sm font-semibold">Sous 48 heures</span>
            </div>
            <div className="space-y-0.5 text-vwa-dark/75">
              <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/60">
                Coordonnées
              </p>
              <p className="text-sm font-semibold text-vwa-dark">
                55 Rue Daniel Mayer
                <br />
                37100 Tours
              </p>
              <p className="text-[11px]">
                <a
                  href="mailto:vwakiltirel.asso@gmail.com"
                  className="underline underline-offset-2 hover:text-vwa-primary"
                >
                  vwakiltirel.asso@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Layout 2 colonnes : formulaire + infos pratiques */}
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-start">
        {/* FORMULAIRE */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
            Envoyer un message
          </h2>

          {/* Bandeau info */}
          <div className="rounded-2xl border border-vwa-background/80 bg-vwa-background/80 px-4 py-3 text-[11px] text-vwa-dark/85">
            Ce formulaire envoie votre message à l’équipe de Vwa Kiltirèl. Une
            réponse vous sera apportée par e-mail dès que possible.
          </div>

          {/* Card form */}
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-[1.75rem] bg-[conic-gradient(from_120deg_at_50%_50%,rgba(199,140,59,0.45),rgba(20,20,20,0.85),rgba(199,140,59,0.16),rgba(20,20,20,0.85),rgba(199,140,59,0.45))] opacity-55 blur-[2px] animate-[spinBorder_16s_linear_infinite]" />
            <form
              className="relative space-y-6 rounded-[1.6rem] bg-white/95 px-5 py-6 shadow-[0_22px_70px_rgba(28,22,18,0.25)] border border-vwa-background/80 backdrop-blur-md"
              action="#"
              method="post"
            >
              {/* Ligne nom + email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-vwa-dark/80">
                    Nom & prénom*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="peer w-full rounded-2xl border border-vwa-background px-3.5 py-3 text-sm text-vwa-dark bg-white/90 placeholder:text-transparent outline-none transition-all duration-200 focus:border-vwa-accent/80 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.55)]"
                      placeholder="Votre nom complet"
                    />
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-vwa-dark/40 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:text-[11px] peer-focus:text-vwa-accent peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:text-vwa-dark/70">
                      Votre nom complet
                    </span>
                    <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-vwa-primary via-vwa-accent to-vwa-primary opacity-0 transition-all duration-200 peer-focus:scale-x-100 peer-focus:opacity-100" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-vwa-dark/80">
                    Email*
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      className="peer w-full rounded-2xl border border-vwa-background px-3.5 py-3 text-sm text-vwa-dark bg-white/90 placeholder:text-transparent outline-none transition-all duration-200 focus:border-vwa-accent/80 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.55)]"
                      placeholder="vous@example.com"
                    />
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-vwa-dark/40 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:text-[11px] peer-focus:text-vwa-accent peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:text-vwa-dark/70">
                      vous@example.com
                    </span>
                    <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-vwa-primary via-vwa-accent to-vwa-primary opacity-0 transition-all duration-200 peer-focus:scale-x-100 peer-focus:opacity-100" />
                  </div>
                </div>
              </div>

              {/* Objet / type de demande */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                  Objet de votre message
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Question générale",
                    "Partenariat / collaboration",
                    "Proposition d’atelier",
                    "Privatisation / prestation",
                  ].map((label, idx) => {
                    const id = `objet-${idx}`;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="group flex cursor-pointer items-center gap-2 rounded-2xl border border-vwa-background px-3.5 py-2.5 text-xs sm:text-sm text-vwa-dark/80 transition-all duration-200 hover:border-vwa-accent/70 hover:shadow-[0_0_0_1px_rgba(199,140,59,0.4)]"
                      >
                        <input
                          id={id}
                          type="radio"
                          name="subjectType"
                          value={label}
                          className="peer h-3.5 w-3.5 accent-vwa-accent"
                          required={idx === 0}
                        />
                        <span className="relative flex-1">
                          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-vwa-primary/0 via-vwa-accent/5 to-vwa-primary/0 opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
                          <span className="relative">{label}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Sujet libre */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-vwa-dark/80">
                  Sujet du message*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    required
                    className="peer w-full rounded-2xl border border-vwa-background px-3.5 py-3 text-sm text-vwa-dark bg-white/90 placeholder:text-transparent outline-none transition-all duration-200 focus:border-vwa-accent/80 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.55)]"
                    placeholder="Sujet de votre demande"
                  />
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-vwa-dark/40 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:text-[11px] peer-focus:text-vwa-accent peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:text-vwa-dark/70">
                    Sujet de votre demande
                  </span>
                  <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-vwa-primary via-vwa-accent to-vwa-primary opacity-0 transition-all duration-200 peer-focus:scale-x-100 peer-focus:opacity-100" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-vwa-dark/80">
                  Message*
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-2xl border border-vwa-background px-3.5 py-3 text-sm text-vwa-dark bg-white/90 placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/80 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.55)]"
                    placeholder="Détaillez votre demande, vos idées, vos besoins…"
                  />
                  <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-vwa-primary via-vwa-accent to-vwa-primary opacity-0 transition-all duration-200 focus-within:scale-x-100 focus-within:opacity-100" />
                </div>
                <p className="text-[11px] text-vwa-dark/55">
                  N’hésitez pas à préciser le contexte, les dates envisagées, le
                  public concerné, etc.
                </p>
              </div>

              {/* RGPD / consentement */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2 text-[11px] text-vwa-dark/70">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-[2px] h-3.5 w-3.5 accent-vwa-accent"
                  />
                  <span>
                    J’accepte que mes données soient utilisées par Vwa Kiltirèl
                    pour traiter ma demande, conformément à la{" "}
                    <Link
                      href="/rgpd"
                      className="underline underline-offset-2 hover:text-vwa-primary"
                    >
                      politique de confidentialité
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* CTA */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(28,22,18,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_22px_70px_rgba(28,22,18,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70"
                >
                  <span className="absolute inset-0 opacity-40">
                    <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
                  </span>
                  <span className="relative">
                    Envoyer mon message à Vwa Kiltirèl
                  </span>
                </button>
                <p className="text-[11px] text-vwa-dark/60">
                  Une copie de votre message pourra vous être envoyée si
                  nécessaire.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* COLONNE DROITE : infos & vibes */}
        <aside className="space-y-6">
          <div className="rounded-3xl bg-white/95 border border-vwa-background/90 px-4 py-4 shadow-[0_16px_45px_rgba(28,22,18,0.14)] space-y-3 text-xs text-vwa-dark/80">
            <h2 className="text-sm font-semibold text-vwa-dark mb-1">
              Ce que vous pouvez nous proposer
            </h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                Une idée d’atelier ou de temps fort autour des cultures
                afro-descendantes.
              </li>
              <li>
                Un partenariat avec une structure, un lieu ou un événement
                existant.
              </li>
              <li>
                Une invitation pour intervenir dans un établissement ou une
                structure.
              </li>
              <li>
                Une suggestion pour la programmation ou la vie de l’association.
              </li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-vwa-dark text-vwa-background px-4 py-4 shadow-[0_20px_60px_rgba(28,22,18,0.8)]">
            <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_0%_0%,rgba(199,140,59,0.6),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.18),transparent_50%)] opacity-70" />
            <div className="relative space-y-2 text-xs">
              <p className="uppercase tracking-[0.18em] text-vwa-background/70">
                Esprit Vwa Kiltirèl
              </p>
              <p className="text-vwa-background/90">
                Une association ancrée à Tours, tournée vers les cultures
                créoles, afro-descendantes et caribéennes, avec une volonté :
                créer des espaces chaleureux, exigeants et joyeux.
              </p>
              <p className="text-vwa-background/85">
                Votre message contribue à construire les prochains chapitres de
                cette aventure. Merci d’avance pour votre confiance et vos
                idées.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white/95 border border-vwa-background/90 px-4 py-3 shadow-[0_14px_40px_rgba(28,22,18,0.14)] text-[11px] text-vwa-dark/75 space-y-1.5">
            <p>
              Pour toute question liée à vos données personnelles (accès,
              rectification, suppression), vous pouvez également nous écrire
              directement à{" "}
              <a
                href="mailto:vwakiltirel.asso@gmail.com"
                className="underline underline-offset-2 hover:text-vwa-primary"
              >
                vwakiltirel.asso@gmail.com
              </a>
              .
            </p>
            <p>
              Les informations saisies via ce formulaire ne sont jamais
              revendues ni utilisées à des fins commerciales extérieures à
              l’association.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}