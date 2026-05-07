"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { isValidEmail } from "@/lib/validators/email";

type ContactFormState = {
  fullName: string;
  email: string;
  subjectType: string;
  subject: string;
  message: string;
  consent: boolean;
};

const subjectOptions = [
  "Question générale",
  "Partenariat / collaboration",
  "Proposition d’atelier",
  "Privatisation / prestation",
];

const initialState: ContactFormState = {
  fullName: "",
  email: "",
  subjectType: "",
  subject: "",
  message: "",
  consent: false,
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");

  const messageLength = useMemo(() => form.message.trim().length, [form.message]);

  function updateField<K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setError("");
    setServerMessage("");
    setSuccess(false);

    if (!form.fullName.trim()) {
      setError("Merci de renseigner votre nom et prénom.");
      return;
    }

    if (!form.email.trim() || !isValidEmail(form.email)) {
      setError("Merci de renseigner une adresse e-mail valide.");
      return;
    }

    if (!form.subjectType.trim()) {
      setError("Merci de sélectionner l’objet principal de votre demande.");
      return;
    }

    if (!form.subject.trim()) {
      setError("Merci de renseigner le sujet de votre message.");
      return;
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      setError("Merci de détailler un peu plus votre message.");
      return;
    }

    if (!form.consent) {
      setError("Vous devez accepter la politique de confidentialité.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("Réponse serveur invalide.");
      }

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.error || "Une erreur est survenue lors de l’envoi."
        );
      }

      setSuccess(true);
      setServerMessage(
        result?.message ||
          "Votre message a bien été envoyé. Nous vous répondrons rapidement."
      );
      setForm(initialState);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur inconnue est survenue.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <div className="absolute -inset-[1px] rounded-[1.75rem] bg-[conic-gradient(from_120deg_at_50%_50%,rgba(199,140,59,0.45),rgba(20,20,20,0.85),rgba(199,140,59,0.16),rgba(20,20,20,0.85),rgba(199,140,59,0.45))] opacity-55 blur-[2px] animate-[spinBorder_16s_linear_infinite]" />

      <form
        onSubmit={handleSubmit}
        className="relative space-y-6 rounded-[1.6rem] bg-white/95 px-5 py-6 shadow-[0_22px_70px_rgba(28,22,18,0.25)] border border-vwa-background/80 backdrop-blur-md"
        noValidate
      >
        {success && (
          <div className="rounded-2xl border border-emerald-300/50 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">
            ✅ {serverMessage}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-300/50 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
            ❌ {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label
              htmlFor="fullName"
              className="text-xs font-medium text-vwa-dark/80"
            >
              Nom & prénom*
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
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
            <label
              htmlFor="email"
              className="text-xs font-medium text-vwa-dark/80"
            >
              Email*
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
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

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
            Objet de votre message
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {subjectOptions.map((label, idx) => {
              const id = `subject-type-${idx}`;
              const checked = form.subjectType === label;

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
                    checked={checked}
                    onChange={(e) => updateField("subjectType", e.target.value)}
                    className="h-3.5 w-3.5 accent-vwa-accent"
                  />
                  <span className="relative flex-1">
                    <span
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-vwa-primary/0 via-vwa-accent/5 to-vwa-primary/0 transition-opacity duration-200 ${
                        checked ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="relative">{label}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="subject"
            className="text-xs font-medium text-vwa-dark/80"
          >
            Sujet du message*
          </label>
          <div className="relative">
            <input
              id="subject"
              type="text"
              name="subject"
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
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

        <div className="space-y-1">
          <label
            htmlFor="message"
            className="text-xs font-medium text-vwa-dark/80"
          >
            Message*
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              required
              className="w-full rounded-2xl border border-vwa-background px-3.5 py-3 text-sm text-vwa-dark bg-white/90 placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/80 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.55)]"
              placeholder="Détaillez votre demande, vos idées, vos besoins…"
            />
          </div>
          <div className="flex items-center justify-between gap-3 text-[11px] text-vwa-dark/55">
            <p>
              N’hésitez pas à préciser le contexte, les dates envisagées, le
              public concerné, etc.
            </p>
            <span>{messageLength} caractères</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <label className="flex items-start gap-2 text-[11px] text-vwa-dark/70">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={(e) => updateField("consent", e.target.checked)}
              required
              className="mt-[2px] h-3.5 w-3.5 accent-vwa-accent"
            />
            <span>
              J’accepte que mes données soient utilisées par Vwa Kiltirèl pour
              traiter ma demande, conformément à la{" "}
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

        <div className="space-y-2 pt-1">
          <button
            type="submit"
            disabled={loading}
            className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(28,22,18,0.55)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70 ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-gradient-to-r from-vwa-primary to-vwa-dark hover:-translate-y-[1px] hover:shadow-[0_22px_70px_rgba(28,22,18,0.7)]"
            }`}
          >
            <span className="absolute inset-0 opacity-40">
              <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
            </span>
            <span className="relative">
              {loading
                ? "Envoi en cours..."
                : "Envoyer mon message à Vwa Kiltirèl"}
            </span>
          </button>

          <p className="text-[11px] text-vwa-dark/60">
            Une copie de votre message pourra vous être envoyée si nécessaire.
          </p>
        </div>
      </form>
    </div>
  );
}