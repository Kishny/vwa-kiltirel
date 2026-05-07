"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { isValidEmail } from "@/lib/validators/email";

type NewsletterResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

type FormData = {
  email: string;
  firstName: string;
  consent: boolean;
};

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Auto-clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto-clear error messages after 5 seconds
  useEffect(() => {
    if (feedback && !success) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback, success]);

  const canSubmit = useMemo(() => {
    return !loading && email.trim().length > 0 && consent;
  }, [loading, email, consent]);

  function scrollToFeedback() {
    requestAnimationFrame(() => {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }

  function resetMessages() {
    setFeedback(null);
    setEmailError(null);
    setConsentError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    resetMessages();
    setSuccess(false);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedFirstName = firstName.trim();

    if (!trimmedEmail) {
      setEmailError("L’adresse e-mail est requise.");
      emailInputRef.current?.focus();
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError("Veuillez entrer une adresse e-mail valide.");
      emailInputRef.current?.focus();
      return;
    }

    if (!consent) {
      setConsentError("Vous devez accepter de recevoir nos actualités.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: trimmedFirstName,
          source: "newsletter_form_site",
          consent: true,
        }),
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "Le serveur a renvoyé une réponse inattendue. Vérifie la route /api/newsletter."
        );
      }

      const result: NewsletterResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            "Une erreur est survenue pendant l’inscription."
        );
      }

      setSubmittedData({ email: trimmedEmail, firstName: trimmedFirstName, consent: true });
      setSuccess(true);
      setFeedback(
        result.message ||
          "Merci ! Votre inscription à la newsletter a bien été prise en compte."
      );
      setEmail("");
      setFirstName("");
      setConsent(false);
      scrollToFeedback();

      // Tracking analytics
      console.log("TRACK_NEWSLETTER_SUBSCRIPTION", {
        email: trimmedEmail,
        hasFirstName: !!trimmedFirstName,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue.";
      setFeedback(message);
      scrollToFeedback();
    } finally {
      setLoading(false);
    }
  }

  const inputBaseClass =
    "w-full rounded-2xl border border-vwa-background/80 bg-white px-4 py-3 text-sm text-vwa-dark placeholder:text-vwa-dark/35 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)] disabled:opacity-70";

  const emailInputClass = [
    inputBaseClass,
    emailError
      ? "border-red-400/60 bg-red-50/60 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.25)]"
      : "",
  ].join(" ");

  // Données structurées JSON-LD enrichies
  const newsletterSchema = {
    "@context": "https://schema.org",
    "@type": "Newsletter",
    name: "Newsletter Vwa Kiltirèl",
    description:
      "Inscription à la newsletter de Vwa Kiltirèl pour recevoir les prochains événements, ateliers et actualités culturelles afro-descendantes, créoles et caribéennes à Tours.",
    publisher: {
      "@type": "Organization",
      name: "Vwa Kiltirèl",
      url: "https://vwakiltirel-asso.org",
      email: "vwakiltirel.asso@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "55 Rue Daniel Mayer",
        addressLocality: "Tours",
        postalCode: "37100",
        addressCountry: "FR",
      },
    },
    audience: {
      "@type": "Audience",
      name: "Personnes intéressées par les cultures afro-descendantes, créoles et caribéennes",
    },
    availableLanguage: "French",
    keywords: "newsletter, événements, ateliers, culture afro-caribéenne, Tours",
  };

  const subscribeActionSchema = {
    "@context": "https://schema.org",
    "@type": "SubscribeAction",
    name: "Inscription à la newsletter Vwa Kiltirèl",
    description:
      "Formulaire d’inscription à la newsletter de Vwa Kiltirèl pour recevoir les prochains événements, ateliers et actualités culturelles.",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://vwakiltirel-asso.org/api/newsletter",
      httpMethod: "POST",
      encodingType: "application/json",
      contentType: "application/json",
    },
    agent: {
      "@type": "Organization",
      name: "Vwa Kiltirèl",
      url: "https://vwakiltirel-asso.org",
    },
    expectsAcceptanceOf: {
      "@type": "Offer",
      name: "Newsletter Vwa Kiltirèl",
      availability: "https://schema.org/OnlineOnly",
    },
  };

  return (
    <>
      {/* JSON-LD Schema.org pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsletterSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(subscribeActionSchema),
        }}
      />

      <section
        aria-labelledby="newsletter-title"
        className="relative overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 px-5 py-6 shadow-[0_22px_60px_rgba(28,22,18,0.10)] backdrop-blur-sm sm:px-6"
      >
        {/* Effets d'ambiance */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-vwa-accent/10 blur-3xl opacity-80" />
          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-vwa-primary/10 blur-3xl opacity-70" />
          <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vwa-accent/5 blur-3xl opacity-50" />
        </div>

        <div className="relative z-10">
          <div className="mb-5 space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
              <span className="h-1.5 w-1.5 rounded-full bg-vwa-accent animate-pulse" />
              Newsletter
            </p>

            <h2
              id="newsletter-title"
              className="text-xl font-extrabold text-vwa-dark sm:text-2xl"
            >
              Restez au rythme de Vwa Kiltirèl
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-vwa-dark/72">
              Recevez les prochains événements, ateliers, actualités et appels à
              participation directement dans votre boîte mail.
            </p>
          </div>

          {/* Messages de feedback */}
          <div ref={feedbackRef} className="space-y-3">
            {success && feedback && (
              <div className="rounded-2xl border border-emerald-300/40 bg-gradient-to-r from-emerald-50 to-emerald-100/60 px-4 py-4 shadow-sm animate-[fadeIn_0.35s_ease]">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      Inscription confirmée !
                    </p>
                    <p className="text-sm text-emerald-700 mt-0.5">{feedback}</p>
                    {submittedData?.firstName && (
                      <p className="text-xs text-emerald-600 mt-2">
                        Bienvenue {submittedData.firstName} ! 🎉
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!success && feedback && (
              <div className="rounded-2xl border border-red-400/40 bg-gradient-to-r from-red-50 to-red-100/60 px-4 py-4 shadow-sm animate-[fadeIn_0.35s_ease]">
                <div className="flex items-start gap-2">
                  <span className="text-base">❌</span>
                  <p className="flex-1 font-medium">{feedback}</p>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_auto]"
          >
            {/* Prénom (optionnel) */}
            <div className="space-y-1.5">
              <label
                htmlFor="newsletter-firstName"
                className="text-xs font-semibold text-vwa-dark/80"
              >
                Prénom <span className="text-vwa-accent/60 text-[10px]">(optionnel)</span>
              </label>
              <input
                id="newsletter-firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                disabled={loading}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputBaseClass}
                placeholder="Ex : Maud"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="newsletter-email"
                className="text-xs font-semibold text-vwa-dark/80 flex items-center justify-between"
              >
                <span>Adresse e-mail</span>
                <span className="text-[10px] text-vwa-accent/80">Obligatoire</span>
              </label>
              <div className="relative">
                <input
                  ref={emailInputRef}
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "newsletter-email-error" : undefined}
                  className={emailInputClass}
                  placeholder="vous@example.com"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-vwa-dark/30 text-sm pointer-events-none">
                  ✉️
                </span>
              </div>
              {emailError && (
                <p
                  id="newsletter-email-error"
                  className="text-[11px] text-red-600 flex items-center gap-1"
                >
                  <span>⚠️</span> {emailError}
                </p>
              )}
            </div>

            {/* Bouton d'inscription */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_45px_rgba(28,22,18,0.35)] transition-all duration-200 lg:w-auto ${
                  !canSubmit
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-gradient-to-r from-vwa-primary to-vwa-dark hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(28,22,18,0.45)]"
                }`}
              >
                {!loading && canSubmit && (
                  <span className="absolute inset-0 opacity-40">
                    <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
                  </span>
                )}

                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                      Inscription...
                    </>
                  ) : (
                    <>
                      <span>📧</span>
                      S’inscrire
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Consentement RGPD */}
          <div className="mt-4">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (consentError) setConsentError(null);
                }}
                className="mt-0.5 h-4 w-4 rounded border-vwa-background/60 text-vwa-accent focus:ring-vwa-accent/30"
                aria-invalid={Boolean(consentError)}
                aria-describedby={consentError ? "consent-error" : undefined}
              />
              <span className="text-[11px] leading-relaxed text-vwa-dark/60">
                J’accepte de recevoir les actualités de Vwa Kiltirèl par email. 
                Je peux me désinscrire à tout moment via le lien présent dans 
                chaque newsletter. Conformément au{" "}
                <a href="/rgpd" className="text-vwa-primary hover:underline">
                  RGPD
                </a>
                , vos données ne sont jamais partagées.
              </span>
            </label>
            {consentError && (
              <p id="consent-error" className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <span>⚠️</span> {consentError}
              </p>
            )}
          </div>

          {/* Footer avec informations supplémentaires */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-vwa-background/50">
            <div className="flex flex-wrap gap-3 text-[10px] text-vwa-dark/45">
              <span className="inline-flex items-center gap-1">
                <span>📊</span> 1 email par mois environ
              </span>
              <span className="inline-flex items-center gap-1">
                <span>🔒</span> Données sécurisées
              </span>
              <span className="inline-flex items-center gap-1">
                <span>🚀</span> Événements exclusifs
              </span>
            </div>

            <div className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-vwa-dark/55">
              Événements • Ateliers • Actualités
            </div>
          </div>

          {/* Micro-données de confiance */}
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-[9px] text-vwa-dark/35">
            <span>✓ Newsletter non spamming</span>
            <span>✓ Désinscription facile</span>
            <span>✓ Conforme RGPD</span>
          </div>
        </div>
      </section>
    </>
  );
}