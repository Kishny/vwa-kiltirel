"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

type Subscriber = {
  _id: string;
  email: string;
  firstName?: string;
  isActive: boolean;
  createdAt: string;
  unsubscribedAt?: string;
};

export default function AdminNewsletterPage() {
  const [data, setData] = useState<Subscriber[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        search,
        status,
        page: String(page),
      });

      const res = await fetch(`/api/admin/newsletter?${params.toString()}`, {
        cache: "no-store",
      });

      const json = await res.json();

      if (json.success) {
        setData(json.data ?? []);
        setTotalPages(json.pagination?.totalPages ?? 1);
      } else {
        setData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Erreur chargement newsletter admin:", error);
      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [search, status, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  async function toggleUser(id: string, isActive: boolean) {
    try {
      setActionLoadingId(id);

      const res = await fetch(`/api/admin/newsletter/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || "Impossible de modifier le statut.");
      }

      await fetchData();
    } catch (error) {
      console.error("Erreur mise à jour statut newsletter:", error);
    } finally {
      setActionLoadingId(null);
    }
  }

  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter((user) => user.isActive).length;
    const inactive = data.filter((user) => !user.isActive).length;

    return { total, active, inactive };
  }, [data]);

  return (
    <div className="space-y-8">
      {/* Intro léger de page */}
      <section className="rounded-[2rem] border border-vwa-background/80 bg-white/95 p-6 shadow-[0_18px_50px_rgba(28,22,18,0.10)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
              Gestion dédiée
            </p>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-vwa-dark sm:text-3xl">
                Newsletter
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-vwa-dark/70">
                Gère les abonnés, distingue les actifs des désinscrits, filtre
                rapidement la base et exporte facilement les contacts.
              </p>
            </div>
          </div>

          <a
            href="/api/admin/newsletter/export"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-vwa-dark px-4 py-2.5 text-sm font-semibold text-vwa-background shadow-sm transition hover:bg-black"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export CSV
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-3xl border border-vwa-background/80 bg-white/95 p-6 shadow-[0_18px_45px_rgba(28,22,18,0.10)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(28,22,18,0.14)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/50">
            Liste affichée
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-3xl font-extrabold text-vwa-dark">
              {stats.total}
            </p>
            <UserGroupIcon className="h-8 w-8 text-vwa-primary/70" />
          </div>
        </article>

        <article className="rounded-3xl border border-vwa-background/80 bg-white/95 p-6 shadow-[0_18px_45px_rgba(28,22,18,0.10)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(28,22,18,0.14)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/50">
            Actifs
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-3xl font-extrabold text-emerald-700">
              {stats.active}
            </p>
            <CheckCircleIcon className="h-8 w-8 text-emerald-600/70" />
          </div>
        </article>

        <article className="rounded-3xl border border-vwa-background/80 bg-white/95 p-6 shadow-[0_18px_45px_rgba(28,22,18,0.10)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(28,22,18,0.14)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/50">
            Désinscrits
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-3xl font-extrabold text-slate-700">
              {stats.inactive}
            </p>
            <XCircleIcon className="h-8 w-8 text-slate-500/70" />
          </div>
        </article>
      </section>

      {/* Filtres */}
      <section className="rounded-[2rem] border border-vwa-background/80 bg-white/95 p-6 shadow-[0_18px_45px_rgba(28,22,18,0.10)]">
        <div className="mb-5 flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-vwa-accent/10 text-vwa-accent">
            <EnvelopeIcon className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-vwa-dark">
              Filtrer les abonnés
            </h3>
            <p className="text-sm text-vwa-dark/65">
              Recherche par email et distinction entre actifs et désinscrits.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-vwa-dark/35" />
            <input
              placeholder="Rechercher un email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-vwa-background bg-white py-2.5 pl-10 pr-4 text-sm text-vwa-dark outline-none transition focus:border-vwa-accent/70"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "all" | "active" | "inactive")
            }
            className="rounded-2xl border border-vwa-background bg-white px-4 py-2.5 text-sm text-vwa-dark outline-none transition focus:border-vwa-accent/70"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Désinscrits</option>
          </select>
        </div>
      </section>

      {/* Liste */}
      <section className="space-y-6">
        {loading ? (
          <div className="rounded-3xl border border-vwa-background/80 bg-white/90 px-6 py-12 text-center shadow-sm">
            <p className="text-sm font-medium text-vwa-dark/70">
              Chargement des abonnés...
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-vwa-background/90 bg-white/80 px-6 py-14 text-center shadow-sm">
            <p className="text-lg font-semibold text-vwa-dark">
              Aucun abonné trouvé
            </p>
            <p className="mt-2 text-sm text-vwa-dark/65">
              Essaie une autre recherche ou un autre filtre.
            </p>
          </div>
        ) : (
          data.map((user) => (
            <article
              key={user._id}
              className="rounded-[2rem] border border-vwa-background/80 bg-white/95 p-6 shadow-[0_18px_45px_rgba(28,22,18,0.12)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(28,22,18,0.16)]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                        user.isActive
                          ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-slate-200 text-slate-700 ring-1 ring-slate-300"
                      }`}
                    >
                      {user.isActive ? "Actif" : "Désinscrit"}
                    </span>

                    {user.firstName && (
                      <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/60">
                        {user.firstName}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="break-all text-xl font-extrabold text-vwa-dark">
                      {user.email}
                    </h3>

                    <div className="space-y-1 text-sm text-vwa-dark/70">
                      <p>
                        <span className="font-medium text-vwa-dark/55">
                          Inscrit le :
                        </span>{" "}
                        {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                      </p>

                      {user.unsubscribedAt && !user.isActive && (
                        <p>
                          <span className="font-medium text-vwa-dark/55">
                            Désinscrit le :
                          </span>{" "}
                          {new Date(user.unsubscribedAt).toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:w-[220px] lg:pl-4">
                  <div className="rounded-[1.5rem] bg-vwa-background/55 p-4 ring-1 ring-vwa-background/70">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-vwa-dark/45">
                      Action rapide
                    </p>

                    <button
                      type="button"
                      onClick={() => toggleUser(user._id, user.isActive)}
                      disabled={actionLoadingId === user._id}
                      className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        user.isActive
                          ? "bg-vwa-dark hover:bg-black"
                          : "bg-gradient-to-r from-vwa-primary to-vwa-dark hover:opacity-95"
                      }`}
                    >
                      {actionLoadingId === user._id
                        ? "Mise à jour..."
                        : user.isActive
                        ? "Désinscrire"
                        : "Réactiver"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Pagination */}
      <section className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-vwa-background/80 bg-white/95 px-3 py-2 shadow-sm">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-full border border-vwa-dark/10 px-3 py-1 text-sm text-vwa-dark/80 transition hover:border-vwa-primary/30 hover:text-vwa-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            ←
          </button>

          <span className="px-3 py-1 text-sm font-medium text-vwa-dark/70">
            {page} / {totalPages}
          </span>

          <button
            type="button"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-full border border-vwa-dark/10 px-3 py-1 text-sm text-vwa-dark/80 transition hover:border-vwa-primary/30 hover:text-vwa-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
}