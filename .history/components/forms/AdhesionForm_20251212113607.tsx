"use client";

import { useState } from "react";

const FORMULES = [
    {
        id: "trimestrielle",
        title: "Adhésion trimestrielle",
        amount: "30 €",
        duration: "3 mois",
    },
    {
        id: "annuelle",
        title: "Adhésion annuelle",
        amount: "140 €",
        duration: "12 mois",
    },
];

export default function AdhesionForm() {
    const [isSending, setIsSending] = useState(false);
    const [hasSent, setHasSent] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setHasSent(false);
        setIsSending(true);

        // Ici plus tard : appel API / backend
        await new Promise((resolve) => setTimeout(resolve, 900));

        setIsSending(false);
        setHasSent(true);
        e.currentTarget.reset();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl bg-white/95 px-5 py-6 shadow-[0_18px_55px_rgba(28,22,18,0.14)] border border-vwa-background/80 backdrop-blur-sm"
        >
            {/* Infos perso */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">Nom*</label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                        placeholder="Ex : MARTIN"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">Prénom*</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                        placeholder="Ex : Annie"
                    />
                </div>
            </div>

            {/* Adresse */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-vwa-dark/80">Adresse*</label>
                <input
                    type="text"
                    name="address"
                    required
                    className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                    placeholder="N° et rue"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">
                        Code postal*
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        required
                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                        placeholder="Ex : 37100"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">Ville*</label>
                    <input
                        type="text"
                        name="city"
                        required
                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                        placeholder="Ex : Tours"
                    />
                </div>
            </div>

            {/* Contact */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">
                        Téléphone*
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                        placeholder="Pour vous joindre si besoin"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">Email*</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                        placeholder="vous@example.com"
                    />
                </div>
            </div>

            {/* Date de naissance + profession */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">
                        Date de naissance*
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        required
                        className="w-full rounded-2xl border border-vwa-background px-3 py-2 text-sm text-vwa-dark outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">
                        Profession (facultatif)
                    </label>
                    <input
                        type="text"
                        name="job"
                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                        placeholder="Si vous souhaitez le renseigner"
                    />
                </div>
            </div>

            {/* Formule d’adhésion */}
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    Formule d’adhésion*
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {FORMULES.map((f) => (
                        <label
                            key={f.id}
                            className="flex items-center gap-2 rounded-2xl border border-vwa-background px-3.5 py-2 text-xs sm:text-sm text-vwa-dark/80 cursor-pointer transition-all duration-200 hover:border-vwa-accent/60 hover:shadow-[0_0_0_1px_rgba(199,140,59,0.35)]"
                        >
                            <input
                                type="radio"
                                name="formula"
                                value={f.id}
                                className="h-3.5 w-3.5 text-vwa-accent"
                                required
                            />
                            <span>
                                <span className="font-semibold">{f.title}</span> – {f.amount} (
                                {f.duration})
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Mode de règlement (indicatif) */}
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    Mode de règlement (indicatif)
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                    {["Espèces", "Chèque", "Virement"].map((m) => (
                        <label
                            key={m}
                            className="flex items-center gap-2 rounded-2xl border border-vwa-background px-3.5 py-2 text-xs sm:text-sm text-vwa-dark/80 cursor-pointer transition-all hover:border-vwa-accent/60"
                        >
                            <input
                                type="radio"
                                name="paymentMode"
                                value={m}
                                className="h-3.5 w-3.5 text-vwa-accent"
                            />
                            <span>{m}</span>
                        </label>
                    ))}
                </div>
                <p className="text-[11px] text-vwa-dark/60">
                    Le paiement en ligne (HelloAsso) pourra être proposé pour simplifier
                    l’adhésion.
                </p>
            </div>

            {/* Message */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-vwa-dark/80">
                    Message (optionnel)
                </label>
                <textarea
                    name="message"
                    rows={3}
                    className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                    placeholder="Ex : Je souhaite aussi être informé·e des possibilités de bénévolat…"
                />
            </div>

            {/* CTA + message de feedback */}
            <div className="space-y-2 pt-2">
                <button
                    type="submit"
                    disabled={isSending}
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(28,22,18,0.45)] transition-all duration-200 hover:shadow-[0_20px_55px_rgba(28,22,18,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className="absolute inset-0 opacity-40">
                        <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
                    </span>
                    <span className="relative">
                        {isSending
                            ? "Envoi en cours…"
                            : "Envoyer ma demande d’adhésion"}
                    </span>
                </button>

                <p className="text-[11px] text-vwa-dark/60">
                    En envoyant ce formulaire, vous déclarez accepter les statuts et le
                    règlement intérieur de l’association Vwa Kiltirèl.
                </p>

                <p className="text-[11px] text-vwa-dark/60">
                    NB : Les membres ont la possibilités de faire des dons en plus de leurs cotisations.
                </p>

                {hasSent && (
                    <div className="mt-2 rounded-2xl bg-vwa-dark text-vwa-background px-3 py-2 text-[11px] animate-[fadeInUp_220ms_ease-out]">
                        Votre demande d’adhésion a bien été enregistrée côté interface.
                        <br />
                        Le traitement (validation + paiement) sera bientôt automatisé par
                        l’équipe Vwa Kiltirèl.
                    </div>
                )}
            </div>
        </form>
    );
}