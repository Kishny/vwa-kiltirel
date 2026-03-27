// components/forms/EventInscriptionForm.tsx
// components/forms/EventInscriptionForm.tsx
"use client";

import { useMemo, useRef, useState } from "react";

type EventInscriptionFormProps = {
  event: {
    slug: string;
    title: string;
  };
  isPaid: boolean;
};

type FormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  message: string;
  eventSlug: string;
  eventTitle: string;
  isPaid: boolean;
};

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  adults?: string;
  children?: string;
  message?: string;
};

function getStringValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EventInscriptionForm({
  event,
  isPaid,
}: EventInscriptionFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Inscription enregistrée ! Vous recevrez un email de confirmation très bientôt.",
  );
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submittedData, setSubmittedData] = useState<FormPayload | null>(null);

  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const hasFieldErrors = useMemo(
    () => Object.keys(fieldErrors).length > 0,
    [fieldErrors],
  );

  function scrollToFeedback() {
    requestAnimationFrame(() => {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function validatePayload(data: FormPayload): FieldErrors {
    const errors: FieldErrors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "Le prénom est requis.";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Le nom est requis.";
    }

    if (!data.email.trim()) {
      errors.email = "L’adresse e-mail est requise.";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Veuillez entrer une adresse e-mail valide.";
    }

    if (data.phone.trim() && data.phone.trim().length < 8) {
      errors.phone = "Le numéro semble trop court.";
    }

    if (Number.isNaN(data.adults) || data.adults < 1) {
      errors.adults = "Il faut au moins 1 adulte.";
    }

    if (Number.isNaN(data.children) || data.children < 0) {
      errors.children = "Le nombre d’enfants ne peut pas être négatif.";
    }

    if (data.message.length > 1500) {
      errors.message = "Le message est trop long.";
    }

    return errors;
  }

  function trackInscriptionAttempt(data: FormPayload) {
    console.log("TRACK_EVENT_INSCRIPTION_ATTEMPT", {
      eventSlug: data.eventSlug,
      eventTitle: data.eventTitle,
      adults: data.adults,
      children: data.children,
      isPaid: data.isPaid,
      timestamp: new Date().toISOString(),
    });
  }

  function trackInscriptionSuccess(data: FormPayload) {
    console.log("TRACK_EVENT_INSCRIPTION_SUCCESS", {
      eventSlug: data.eventSlug,
      eventTitle: data.eventTitle,
      email: data.email,
      timestamp: new Date().toISOString(),
    });
  }

  function trackInscriptionError(data: Partial<FormPayload>, message: string) {
    console.error("TRACK_EVENT_INSCRIPTION_ERROR", {
      eventSlug: data.eventSlug,
      eventTitle: data.eventTitle,
      email: data.email,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  function handleNewInscription() {
    setSuccess(false);
    setError(null);
    setFieldErrors({});
    setSubmittedData(null);
    setSuccessMessage(
      "Inscription enregistrée ! Vous recevrez un email de confirmation très bientôt.",
    );
    formRef.current?.reset();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setSuccess(false);
    setError(null);
    setFieldErrors({});
    setSuccessMessage(
      "Inscription enregistrée ! Vous recevrez un email de confirmation très bientôt.",
    );

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: FormPayload = {
      firstName: getStringValue(formData.get("firstName")).trim(),
      lastName: getStringValue(formData.get("lastName")).trim(),
      email: getStringValue(formData.get("email")).trim(),
      phone: getStringValue(formData.get("phone")).trim(),
      adults: Number(getStringValue(formData.get("adults")) || 1),
      children: Number(getStringValue(formData.get("children")) || 0),
      message: getStringValue(formData.get("message")).trim(),
      eventSlug: event.slug,
      eventTitle: event.title,
      isPaid,
    };

    const validationErrors = validatePayload(data);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setError("Certaines informations sont à corriger avant de continuer.");
      setLoading(false);
      scrollToFeedback();
      return;
    }

    trackInscriptionAttempt(data);

    try {
      const response = await fetch("/api/event-inscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "Le serveur a renvoyé une réponse inattendue. Vérifiez la configuration de l’API.",
        );
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            result?.message ||
            "Une erreur est survenue pendant l’enregistrement.",
        );
      }

      setSubmittedData(data);
      setSuccess(true);
      setSuccessMessage(
        result?.mailWarning
          ? `Inscription enregistrée. ${result.mailWarning}`
          : result?.message ||
              "Inscription enregistrée ! Vous recevrez un email de confirmation très bientôt.",
      );

      form.reset();
      trackInscriptionSuccess(data);
      scrollToFeedback();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue.";
      setError(message);
      trackInscriptionError(data, message);
      scrollToFeedback();
    } finally {
      setLoading(false);
    }
  }

  function inputBaseClass(hasError?: boolean) {
    return [
      "w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200",
      hasError
        ? "border-red-400/60 bg-red-50/60 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.25)]"
        : "border-vwa-background bg-white focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]",
      loading ? "opacity-90" : "",
    ].join(" ");
  }

  return (
    <section className="space-y-4">
      <div ref={feedbackRef} className="space-y-3">
        {success && submittedData && (
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/40 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/70 px-6 py-6 shadow-[0_25px_60px_rgba(16,185,129,0.18)] animate-[fadeIn_0.45s_ease] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-12 right-0 h-32 w-32 rounded-full bg-emerald-400/25 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-vwa-accent/15 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/5 blur-2xl" />
            </div>

            <div className="relative flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_12px_35px_rgba(16,185,129,0.35)]">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
                      Inscription confirmée
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold text-vwa-dark">
                      Bienvenue à l'événement !
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-vwa-dark/75">
                    {successMessage}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-vwa-dark/80 ring-1 ring-emerald-200/80 shadow-sm">
                      📅 {event.title}
                    </span>

                    <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/80 shadow-sm">
                      ✉️ Confirmation envoyée
                    </span>
                  </div>
                </div>
              </div>

              {/* Carte récapitulative des données soumises */}
              <div className="mt-2 rounded-2xl border border-emerald-200/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-emerald-800">
                    Récapitulatif de votre inscription
                  </h4>
                </div>

                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <div className="flex items-baseline justify-between border-b border-emerald-100/80 pb-2">
                    <span className="font-medium text-vwa-dark/60">
                      Participant
                    </span>
                    <span className="font-semibold text-vwa-dark">
                      {submittedData.firstName} {submittedData.lastName}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-emerald-100/80 pb-2">
                    <span className="font-medium text-vwa-dark/60">
                      Email
                    </span>
                    <span className="font-semibold text-vwa-dark">
                      {submittedData.email}
                    </span>
                  </div>

                  {submittedData.phone && (
                    <div className="flex items-baseline justify-between border-b border-emerald-100/80 pb-2">
                      <span className="font-medium text-vwa-dark/60">
                        Téléphone
                      </span>
                      <span className="font-semibold text-vwa-dark">
                        {submittedData.phone}
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline justify-between border-b border-emerald-100/80 pb-2">
                    <span className="font-medium text-vwa-dark/60">
                      Participants
                    </span>
                    <span className="font-semibold text-vwa-dark">
                      {submittedData.adults} adulte
                      {submittedData.adults > 1 ? "s" : ""}
                      {submittedData.children > 0 &&
                        ` + ${submittedData.children} enfant${
                          submittedData.children > 1 ? "s" : ""
                        }`}
                    </span>
                  </div>

                  {submittedData.message && (
                    <div className="col-span-2 mt-1 rounded-xl bg-emerald-50/80 p-3">
                      <span className="block text-xs font-medium text-vwa-dark/60 mb-1">
                        💬 Message
                      </span>
                      <p className="text-sm text-vwa-dark/80 leading-relaxed">
                        {submittedData.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-200/50 pt-3">
                  <span className="text-[10px] font-medium text-emerald-600/70">
                    ✅ Inscription enregistrée le{" "}
                    {new Date().toLocaleDateString("fr-FR")}
                  </span>
                  {isPaid && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      Participation à prévoir
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:justify-end">
                <a
                  href="/evenements"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-vwa-dark/15 bg-white px-5 py-2.5 text-xs font-medium text-vwa-dark/80 shadow-sm transition-all hover:border-vwa-primary/40 hover:bg-vwa-primary/5 hover:text-vwa-primary"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Explorer les événements
                </a>

                <button
                  type="button"
                  onClick={handleNewInscription}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Nouvelle inscription
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-400/40 bg-gradient-to-r from-red-50 to-red-100/50 px-5 py-4 text-sm text-red-700 shadow-sm animate-[fadeIn_0.35s_ease] backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <span className="text-base">❌</span>
              <p className="flex-1 font-medium">{error}</p>
            </div>
          </div>
        )}

        {hasFieldErrors && !error && (
          <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-50 to-amber-100/50 px-5 py-4 text-sm text-amber-800 shadow-sm animate-[fadeIn_0.35s_ease] backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <span className="text-base">⚠️</span>
              <p className="flex-1 font-medium">
                Merci de corriger les champs indiqués avant validation.
              </p>
            </div>
          </div>
        )}
      </div>

      {!success && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 rounded-3xl border border-vwa-background/80 bg-white/95 px-6 py-7 shadow-[0_20px_65px_rgba(28,22,18,0.12)] backdrop-blur-sm animate-[fadeIn_0.35s_ease]"
        >
          {/* Identité */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="group space-y-1.5">
              <label className="flex items-center justify-between text-xs font-semibold text-vwa-dark/80">
                <span>Prénom</span>
                <span className="text-[10px] text-vwa-accent/80">Obligatoire</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  required
                  disabled={loading}
                  aria-invalid={Boolean(fieldErrors.firstName)}
                  className={inputBaseClass(Boolean(fieldErrors.firstName))}
                  placeholder="Ex : Annie"
                />
              </div>
              {fieldErrors.firstName && (
                <p className="text-[11px] text-red-600">
                  {fieldErrors.firstName}
                </p>
              )}
            </div>

            <div className="group space-y-1.5">
              <label className="text-xs font-semibold text-vwa-dark/80">
                Nom
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  required
                  disabled={loading}
                  aria-invalid={Boolean(fieldErrors.lastName)}
                  className={inputBaseClass(Boolean(fieldErrors.lastName))}
                  placeholder="Ex : DUPONT"
                />
              </div>
              {fieldErrors.lastName && (
                <p className="text-[11px] text-red-600">
                  {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="group space-y-1.5">
              <label className="text-xs font-semibold text-vwa-dark/80">
                Adresse e-mail
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  disabled={loading}
                  aria-invalid={Boolean(fieldErrors.email)}
                  className={inputBaseClass(Boolean(fieldErrors.email))}
                  placeholder="vous@example.com"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-[11px] text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div className="group space-y-1.5">
              <label className="text-xs font-semibold text-vwa-dark/80">
                Téléphone (optionnel)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  disabled={loading}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  className={inputBaseClass(Boolean(fieldErrors.phone))}
                  placeholder="Pour un rappel la veille"
                />
              </div>
              {fieldErrors.phone && (
                <p className="text-[11px] text-red-600">{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Participants */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="group space-y-1.5">
              <label className="text-xs font-semibold text-vwa-dark/80">
                Nombre d’adultes
              </label>
              <input
                type="number"
                name="adults"
                min={1}
                defaultValue={1}
                disabled={loading}
                aria-invalid={Boolean(fieldErrors.adults)}
                className={inputBaseClass(Boolean(fieldErrors.adults))}
              />
              {fieldErrors.adults && (
                <p className="text-[11px] text-red-600">{fieldErrors.adults}</p>
              )}
            </div>

            <div className="group space-y-1.5">
              <label className="text-xs font-semibold text-vwa-dark/80">
                Nombre d’enfants
              </label>
              <input
                type="number"
                name="children"
                min={0}
                defaultValue={0}
                disabled={loading}
                aria-invalid={Boolean(fieldErrors.children)}
                className={inputBaseClass(Boolean(fieldErrors.children))}
              />
              {fieldErrors.children && (
                <p className="text-[11px] text-red-600">
                  {fieldErrors.children}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="group space-y-1.5">
            <label className="text-xs font-semibold text-vwa-dark/80">
              Message (allergies, besoins particuliers, infos bébé…)
            </label>
            <textarea
              name="message"
              rows={3}
              disabled={loading}
              aria-invalid={Boolean(fieldErrors.message)}
              className={inputBaseClass(Boolean(fieldErrors.message))}
              placeholder="Dites-nous ce dont vous avez besoin pour être à l’aise…"
            />
            {fieldErrors.message && (
              <p className="text-[11px] text-red-600">{fieldErrors.message}</p>
            )}
          </div>

          {/* Paiement */}
          {isPaid && (
            <div className="rounded-2xl border border-vwa-primary/30 bg-gradient-to-r from-vwa-primary/5 to-transparent px-5 py-4 text-sm text-vwa-dark/80">
              <div className="flex items-start gap-2">
                <span className="text-lg">✨</span>
                <div>
                  <p className="mb-1 font-semibold text-vwa-primary">
                    Participation libre ou conseillée
                  </p>
                  <p className="text-xs leading-relaxed">
                    Pour cet événement, une participation pourra être demandée via
                    un lien de paiement sécurisé ou sur place. Tous les détails
                    seront précisés dans l’email de confirmation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-[0_20px_45px_rgba(28,22,18,0.4)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70 ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-gradient-to-r from-vwa-primary to-vwa-dark hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(28,22,18,0.5)]"
              }`}
            >
              {!loading && (
                <span className="absolute inset-0 opacity-40">
                  <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
                </span>
              )}

              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                    Envoi en cours...
                  </>
                ) : (
                  "Valider mon inscription"
                )}
              </span>
            </button>

            <p className="text-center text-[11px] text-vwa-dark/50">
              Après validation, vous recevrez un email de confirmation avec les
              informations pratiques.
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
