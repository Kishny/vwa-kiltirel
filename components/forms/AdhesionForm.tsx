// components/forms/AdhesionForm.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { isValidEmail } from "@/lib/validators/email";

const FORMULES = [
    {
        id: "trimestrielle",
        title: "Adhésion trimestrielle",
        amount: "30 €",
        duration: "3 mois",
        price: 30,
        period: "quarterly",
    },
    {
        id: "annuelle",
        title: "Adhésion annuelle",
        amount: "140 €",
        duration: "12 mois",
        price: 140,
        period: "yearly",
    },
];

type FormData = {
    lastName: string;
    firstName: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
    email: string;
    birthDate: string;
    job: string;
    formula: string;
    paymentMode: string;
    message: string;
};

type FieldErrors = {
    [K in keyof FormData]?: string;
};

export default function AdhesionForm() {
    const [isSending, setIsSending] = useState(false);
    const [hasSent, setHasSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Nettoyer les messages après 5 secondes
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

        if (!data.lastName.trim()) errors.lastName = "Le nom est requis.";
        if (!data.firstName.trim()) errors.firstName = "Le prénom est requis.";
        if (!data.address.trim()) errors.address = "L'adresse est requise.";
        if (!data.postalCode.trim()) errors.postalCode = "Le code postal est requis.";
        if (!data.city.trim()) errors.city = "La ville est requise.";
        if (!data.phone.trim()) errors.phone = "Le téléphone est requis.";
        if (!data.email.trim()) {
            errors.email = "L'email est requis.";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Veuillez entrer une adresse email valide.";
        }
        if (!data.birthDate) errors.birthDate = "La date de naissance est requise.";
        if (!data.formula) errors.formula = "Veuillez choisir une formule d'adhésion.";

        return errors;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSending(true);
        setError(null);
        setFieldErrors({});

        const formData = new FormData(e.currentTarget);
        const data: FormData = {
            lastName: formData.get("lastName") as string || "",
            firstName: formData.get("firstName") as string || "",
            address: formData.get("address") as string || "",
            postalCode: formData.get("postalCode") as string || "",
            city: formData.get("city") as string || "",
            phone: formData.get("phone") as string || "",
            email: formData.get("email") as string || "",
            birthDate: formData.get("birthDate") as string || "",
            job: formData.get("job") as string || "",
            formula: formData.get("formula") as string || "",
            paymentMode: formData.get("paymentMode") as string || "",
            message: formData.get("message") as string || "",
        };

        const validationErrors = validateForm(data);
        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            setError("Merci de corriger les champs indiqués.");
            setIsSending(false);
            return;
        }

        try {
            // Simulation d'appel API
            await new Promise((resolve) => setTimeout(resolve, 900));
            
            setSubmittedData(data);
            setHasSent(true);
            formRef.current?.reset();
            
            // Tracking analytics
            console.log("TRACK_ADHESION_ATTEMPT", {
                formula: data.formula,
                paymentMode: data.paymentMode,
                timestamp: new Date().toISOString(),
            });
        } catch (err) {
            setError("Une erreur est survenue. Merci de réessayer.");
        } finally {
            setIsSending(false);
        }
    }

    // Données structurées JSON-LD pour le formulaire d'adhésion
    const formSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Formulaire d'adhésion Vwa Kiltirèl",
        description: "Devenez membre de l'association Vwa Kiltirèl en remplissant ce formulaire d'adhésion.",
        mainEntity: {
            "@type": "Offer",
            name: "Adhésion à Vwa Kiltirèl",
            description: "Devenez membre de l'association Vwa Kiltirèl pour soutenir les cultures afro-descendantes, créoles et caribéennes.",
            priceSpecification: FORMULES.map(f => ({
                "@type": "UnitPriceSpecification",
                name: f.title,
                price: f.price,
                priceCurrency: "EUR",
                billingDuration: f.period === "quarterly" ? "P3M" : "P1Y",
            })),
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
                                    Demande d'adhésion enregistrée !
                                </p>
                                <p className="text-xs text-emerald-700 mt-1">
                                    Merci {submittedData.firstName} {submittedData.lastName}. 
                                    L'équipe Vwa Kiltirèl vous recontactera très prochainement 
                                    pour finaliser votre adhésion.
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

                {/* Infos perso */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                            <span>Nom*</span>
                            {fieldErrors.lastName && <span className="text-red-500 text-[10px]">{fieldErrors.lastName}</span>}
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            aria-invalid={!!fieldErrors.lastName}
                            className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                                fieldErrors.lastName ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                            }`}
                            placeholder="Ex : MARTIN"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                            <span>Prénom*</span>
                            {fieldErrors.firstName && <span className="text-red-500 text-[10px]">{fieldErrors.firstName}</span>}
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            aria-invalid={!!fieldErrors.firstName}
                            className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                                fieldErrors.firstName ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                            }`}
                            placeholder="Ex : Annie"
                        />
                    </div>
                </div>

                {/* Adresse */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                        <span>Adresse*</span>
                        {fieldErrors.address && <span className="text-red-500 text-[10px]">{fieldErrors.address}</span>}
                    </label>
                    <input
                        type="text"
                        name="address"
                        required
                        aria-invalid={!!fieldErrors.address}
                        className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                            fieldErrors.address ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                        }`}
                        placeholder="N° et rue"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                            <span>Code postal*</span>
                            {fieldErrors.postalCode && <span className="text-red-500 text-[10px]">{fieldErrors.postalCode}</span>}
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            required
                            aria-invalid={!!fieldErrors.postalCode}
                            className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                                fieldErrors.postalCode ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                            }`}
                            placeholder="Ex : 37100"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                            <span>Ville*</span>
                            {fieldErrors.city && <span className="text-red-500 text-[10px]">{fieldErrors.city}</span>}
                        </label>
                        <input
                            type="text"
                            name="city"
                            required
                            aria-invalid={!!fieldErrors.city}
                            className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                                fieldErrors.city ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                            }`}
                            placeholder="Ex : Tours"
                        />
                    </div>
                </div>

                {/* Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                            <span>Téléphone*</span>
                            {fieldErrors.phone && <span className="text-red-500 text-[10px]">{fieldErrors.phone}</span>}
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            aria-invalid={!!fieldErrors.phone}
                            className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-vwa-dark placeholder:text-vwa-dark/30 outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                                fieldErrors.phone ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                            }`}
                            placeholder="Pour vous joindre si besoin"
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

                {/* Date de naissance + profession */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-vwa-dark/80 flex items-center justify-between">
                            <span>Date de naissance*</span>
                            {fieldErrors.birthDate && <span className="text-red-500 text-[10px]">{fieldErrors.birthDate}</span>}
                        </label>
                        <input
                            type="date"
                            name="birthDate"
                            required
                            aria-invalid={!!fieldErrors.birthDate}
                            className={`w-full rounded-2xl border px-3 py-2 text-sm text-vwa-dark outline-none transition-all duration-200 focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(199,140,59,0.5)] ${
                                fieldErrors.birthDate ? "border-red-400 bg-red-50/30" : "border-vwa-background"
                            }`}
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

                {/* Formule d'adhésion */}
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vwa-dark/60">
                        Formule d'adhésion*
                    </p>
                    {fieldErrors.formula && <p className="text-red-500 text-[10px] -mt-1">{fieldErrors.formula}</p>}
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
                        l'adhésion.
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
                                : "Envoyer ma demande d'adhésion"}
                        </span>
                    </button>

                    <p className="text-[11px] text-vwa-dark/60">
                        En envoyant ce formulaire, vous déclarez accepter les statuts et le
                        règlement intérieur de l'association Vwa Kiltirèl.
                    </p>

                    <p className="text-[11px] text-vwa-dark/60">
                        NB : Les membres ont la possibilités de faire des dons en plus de leurs cotisations.
                    </p>
                </div>
            </form>
        </>
    );
}