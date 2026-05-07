// components/forms/DonForm.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { isValidEmail } from "@/lib/validators/email";

const PRESET_AMOUNTS = [20, 50, 80, 120] as const;
type Frequency = "ponctuel" | "mensuel";

type FormData = {
    fullName: string;
    email: string;
    message: string;
    frequency: Frequency;
    amount: number | null;
    customAmount: string;
};

type FieldErrors = {
    fullName?: string;
    email?: string;
    amount?: string;
};

export default function DonForm() {
    const [frequency, setFrequency] = useState<Frequency>("ponctuel");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [hasSent, setHasSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (hasSent) {
            const timer = setTimeout(() => setHasSent(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [hasSent]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    function validateForm(data: FormData): FieldErrors {
        const errors: FieldErrors = {};

        if (!data.fullName.trim()) errors.fullName = "Le nom est requis.";
        if (!data.email.trim()) {
            errors.email = "L'email est requis.";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Veuillez entrer une adresse email valide.";
        }

        const amount = data.customAmount.trim() !== "" 
            ? Number(data.customAmount.replace(",", ".")) 
            : data.amount;
        
        if (!amount || amount <= 0 || Number.isNaN(amount)) {
            errors.amount = "Veuillez indiquer un montant valide.";
        }

        return errors;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSending(true);
        setError(null);
        setFieldErrors({});

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data: FormData = {
            fullName: formData.get("fullName") as string || "",
            email: formData.get("email") as string || "",
            message: formData.get("message") as string || "",
            frequency,
            amount: selectedAmount,
            customAmount,
        };

        const validationErrors = validateForm(data);
        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            setError("Merci de corriger les champs indiqués.");
            setIsSending(false);
            return;
        }

        const finalAmount = customAmount.trim() !== "" 
            ? Number(customAmount.replace(",", ".")) 
            : selectedAmount;

        try {
            // Simulation d'appel API
            await new Promise((resolve) => setTimeout(resolve, 900));
            
            setSubmittedData({ ...data, amount: finalAmount });
            setHasSent(true);
            formRef.current?.reset();
            setSelectedAmount(50);
            setCustomAmount("");
            setFrequency("ponctuel");
            
            // Tracking analytics
            console.log("TRACK_DONATION_ATTEMPT", {
                frequency,
                amount: finalAmount,
                timestamp: new Date().toISOString(),
            });
        } catch (err) {
            setError("Une erreur est survenue. Merci de réessayer.");
        } finally {
            setIsSending(false);
        }
    }

    const effectiveAmount = customAmount.trim() !== ""
        ? customAmount
        : selectedAmount !== null
            ? String(selectedAmount)
            : "";

    // Données structurées JSON-LD pour le formulaire de don
    const formSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Formulaire de don Vwa Kiltirèl",
        description: "Soutenez l'association Vwa Kiltirèl par un don ponctuel ou mensuel.",
        mainEntity: {
            "@type": "Offer",
            name: "Don à Vwa Kiltirèl",
            description: "Soutenez les cultures afro-descendantes, créoles et caribéennes à Tours.",
            priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                minPrice: 1,
                maxPrice: 10000,
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(formSchema) }}
            />

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5 rounded-3xl bg-white/95 px-5 py-6 shadow-[0_18px_55px_rgba(28,22,18,0.14)] border border-vwa-background/80 backdrop-blur-sm"
                noValidate
            >
                {/* Message de succès */}
                {hasSent && submittedData && (
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 animate-[fadeInUp_220ms_ease-out]">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                                ✓
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-emerald-800">
                                    Merci pour votre générosité !
                                </p>
                                <p className="text-xs text-emerald-700 mt-1">
                                    Votre intention de don de <strong>{submittedData.amount} €</strong> 
                                    {" "}({submittedData.frequency === "mensuel" ? "don mensuel" : "don ponctuel"}) 
                                    a bien été enregistrée.
                                </p>
                                <div className="mt-2 text-[11px] text-emerald-600 bg-emerald-100/50 rounded-lg p-2">
                                    📧 Un email de confirmation vous a été envoyé à {submittedData.email}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Message d'erreur */}
                {error && (
                    <div className="rounded-2xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                        ❌ {error}
                    </div>
                )}

                {/* Montant & fréquence */}
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        Montant du don*
                    </p>
                    {fieldErrors.amount && <p className="text-red-500 text-[10px] -mt-1">{fieldErrors.amount}</p>}

                    {/* Boutons de montants */}
                    <div className="grid gap-3 sm:grid-cols-4">
                        {PRESET_AMOUNTS.map((amount) => {
                            const isActive = selectedAmount === amount && customAmount.trim() === "";
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
                                { id: "ponctuel", label: "Don ponctuel", description: "Une seule fois" },
                                { id: "mensuel", label: "Don mensuel", description: "Chaque mois" },
                            ] as const).map((opt) => (
                                <label
                                    key={opt.id}
                                    className={[
                                        "flex items-start gap-2 rounded-2xl border p-3 text-xs sm:text-sm cursor-pointer transition-all",
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
                                        className="h-3.5 w-3.5 text-vwa-accent mt-0.5"
                                        required
                                    />
                                    <div>
                                        <div className="font-semibold text-vwa-dark/85">{opt.label}</div>
                                        <div className="text-[10px] text-vwa-dark/50">{opt.description}</div>
                                    </div>
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
                            <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                                <span>Nom / Prénom*</span>
                                {fieldErrors.fullName && <span className="text-red-500 text-[10px]">{fieldErrors.fullName}</span>}
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                aria-invalid={!!fieldErrors.fullName}
                                className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                                    fieldErrors.fullName ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                                }`}
                                placeholder="Ex : Alex MARTIN"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                                <span>Email*</span>
                                {fieldErrors.email && <span className="text-red-500 text-[10px]">{fieldErrors.email}</span>}
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                aria-invalid={!!fieldErrors.email}
                                className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                                    fieldErrors.email ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                                }`}
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
                    <div className="rounded-xl bg-vwa-dark/5 p-3 text-center">
                        <p className="text-[11px] text-vwa-dark/60">
                            Montant choisi&nbsp;:{" "}
                            <span className="font-semibold text-vwa-dark">
                                {effectiveAmount ? `${effectiveAmount} €` : "—"}
                            </span>{" "}
                            ({frequency === "mensuel" ? "don mensuel" : "don ponctuel"}).
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSending}
                        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-vwa-primary to-vwa-dark px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(28,22,18,0.45)] transition-all duration-200 hover:shadow-[0_20px_55px_rgba(28,22,18,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-vwa-accent/70 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span className="absolute inset-0 opacity-40">
                            <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:translate-x-[220%]" />
                        </span>
                        <span className="relative">
                            {isSending ? "Envoi en cours…" : "Valider mon intention de don"}
                        </span>
                    </button>

                    <p className="text-[11px] text-vwa-dark/60 text-center">
                        Vous recevrez ensuite les informations pratiques pour finaliser le
                        règlement (espèces, chèque, virement ou lien sécurisé).
                    </p>
                    <p className="text-[11px] text-vwa-dark/60 text-center">
                        NB : Un don ne donne pas accès au statut de membre de l'association.
                    </p>
                </div>
            </form>
        </>
    );
}