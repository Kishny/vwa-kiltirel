// components/forms/DonForm.tsx
"use client";

import { useState } from "react";

const PRESET_AMOUNTS = [20, 50, 80, 120] as const;
type Frequency = "ponctuel" | "mensuel";

export default function DonForm() {
    const [frequency, setFrequency] = useState<Frequency>("ponctuel");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
    const [customAmount, setCustomAmount] = useState<string>("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const amount =
            customAmount.trim() !== ""
                ? Number(customAmount.replace(",", "."))
                : selectedAmount;

        if (!amount || amount <= 0 || Number.isNaN(amount)) {
            alert("Merci d’indiquer un montant de don valide.");
            return;
        }

        console.log({
            frequency,
            amount,
        });

        alert(
            `Merci pour votre intention de don de ${amount.toFixed(
                2
            )} € (${frequency === "mensuel" ? "par mois" : "ponctuel"}).`
        );
    }

    const effectiveAmount =
        customAmount.trim() !== ""
            ? customAmount
            : selectedAmount !== null
                ? String(selectedAmount)
                : "";

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl bg-white/95 px-5 py-6 shadow-[0_18px_55px_rgba(28,22,18,0.14)] border border-vwa-background/80 backdrop-blur-sm"
        >
            {/* Montant & fréquence */}
            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    Montant du don*
                </p>

                {/* Boutons de montants */}
                <div className="grid gap-3 sm:grid-cols-4">
                    {PRESET_AMOUNTS.map((amount) => {
                        const isActive =
                            selectedAmount === amount && customAmount.trim() === "";
                        return (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setCustomAmount("");
                                }}
                                className={[
                                    "flex items-center justify-center rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                                    isActive
                                        ? "bg-vwa-dark text-vwa-background border-vwa-dark shadow-[0_10px_28px_rgba(28,22,18,0.45)]"
                                        : "bg-white text-vwa-dark/80 border-vwa-background hover:border-vwa-accent/70 hover:shadow-[0_0_0_1px_rgba(199,140,59,0.4)]",
                                ].join(" ")}
                            >
                                {amount} €
                            </button>
                        );
                    })}
                </div>

                {/* Montant libre */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">
                        Autre montant (facultatif)
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            step={1}
                            inputMode="decimal"
                            value={customAmount}
                            onChange={(e) => {
                                setCustomAmount(e.target.value);
                                if (e.target.value.trim() !== "") {
                                    setSelectedAmount(null);
                                }
                            }}
                            className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                            placeholder="Ex : 35"
                        />
                        <span className="text-sm text-vwa-dark/70">€</span>
                    </div>
                    <p className="text-[11px] text-vwa-dark/55">
                        Montant libre, à partir de 1&nbsp;€. Merci pour votre soutien.
                    </p>
                </div>

                {/* Fréquence */}
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        Fréquence du don*
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {([
                            { id: "ponctuel", label: "Don ponctuel" },
                            { id: "mensuel", label: "Don mensuel" },
                        ] as const).map((opt) => (
                            <label
                                key={opt.id}
                                className={[
                                    "flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs sm:text-sm cursor-pointer transition-all",
                                    frequency === opt.id
                                        ? "border-vwa-accent/70 shadow-[0_0_0_1px_rgba(199,140,59,0.5)] bg-vwa-background/70"
                                        : "border-vwa-background hover:border-vwa-accent/60",
                                ].join(" ")}
                            >
                                <input
                                    type="radio"
                                    name="frequency"
                                    value={opt.id}
                                    checked={frequency === opt.id}
                                    onChange={() => setFrequency(opt.id)}
                                    className="h-3.5 w-3.5 text-vwa-accent"
                                    required
                                />
                                <span className="text-vwa-dark/85">{opt.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Coordonnées donneur */}
            <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                    Vos coordonnées
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80">
                            Nom / Prénom*
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                            placeholder="Ex : Alex MARTIN"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80">
                            Email*
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                            placeholder="vous@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80">
                        Message (optionnel)
                    </label>
                    <textarea
                        name="message"
                        rows={3}
                        className="w-full rounded-2xl border border-vwa-background px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)]"
                        placeholder="Ex : Je souhaite soutenir en priorité les ateliers pour les jeunes…"
                    />
                </div>
            </div>

            {/* Récap + CTA */}
            <div className="space-y-2 pt-2">
                <p className="text-[11px] text-vwa-dark/60">
                    Montant choisi&nbsp;:{" "}
                    <span className="font-semibold text-vwa-dark">
                        {effectiveAmount ? `${effectiveAmount} €` : "—"}
                    </span>{" "}
                    ({frequency === "mensuel" ? "don mensuel" : "don ponctuel"}).
                </p>

                <button
                    type="submit"
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(28,22,18,0.45)] transition-all duration-200 hover:shadow-[0_20px_55px_rgba(28,22,18,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70"
                >
                    <span className="absolute inset-0 opacity-40">
                        <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
                    </span>
                    <span className="relative">Valider mon intention de don</span>
                </button>

                <p className="text-[11px] text-vwa-dark/60">
                    Vous recevrez ensuite les informations pratiques pour finaliser le
                    règlement (espèces, chèque, virement ou lien sécurisé).
                </p>
                <p className="text-[11px] text-vwa-dark/60">
                    NB : Un don ne donne pas accès au status de membre de l’association.
                </p>
            </div>
        </form>
    );
}