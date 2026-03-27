"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type InscriptionActionsProps = {
  inscriptionId: string;
  currentStatus: "pending" | "confirmed" | "cancelled";
};

export default function InscriptionActions({
  inscriptionId,
  currentStatus,
}: InscriptionActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(status: "pending" | "confirmed" | "cancelled") {
    try {
      setLoading(true);

      const response = await fetch(`/api/event-inscriptions/${inscriptionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Erreur de mise à jour.");
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteInscription() {
    const confirmed = window.confirm(
      "Supprimer définitivement cette inscription ?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/event-inscriptions/${inscriptionId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Erreur de suppression.");
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  const buttonBase =
    "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={loading || currentStatus === "confirmed"}
        onClick={() => updateStatus("confirmed")}
        className={`${buttonBase} bg-emerald-100 text-emerald-700 hover:bg-emerald-200`}
      >
        Confirmer
      </button>

      <button
        type="button"
        disabled={loading || currentStatus === "pending"}
        onClick={() => updateStatus("pending")}
        className={`${buttonBase} bg-amber-100 text-amber-700 hover:bg-amber-200`}
      >
        En attente
      </button>

      <button
        type="button"
        disabled={loading || currentStatus === "cancelled"}
        onClick={() => updateStatus("cancelled")}
        className={`${buttonBase} bg-slate-200 text-slate-700 hover:bg-slate-300`}
      >
        Annuler
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={deleteInscription}
        className={`${buttonBase} bg-red-100 text-red-700 hover:bg-red-200`}
      >
        Supprimer
      </button>
    </div>
  );
}