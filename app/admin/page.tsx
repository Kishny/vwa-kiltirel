import type { Metadata } from "next";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import EventInscription from "@/models/EventInscription";
import InscriptionActions from "@/components/admin/InscriptionActions";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Admin inscriptions | Vwa Kiltirèl",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = Promise<{
  status?: string;
  q?: string;
}>;

function formatDate(date: string | Date) {
  return new Date(date).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusBadge(status: InscriptionStatus) {
  switch (status) {
    case "confirmed":
      return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
    case "cancelled":
      return "bg-slate-200 text-slate-700 ring-1 ring-slate-300";
    case "pending":
    default:
      return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
  }
}

type InscriptionStatus = "pending" | "confirmed" | "cancelled";

type AdminInscription = {
  _id: string;
  eventSlug: string;
  eventTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  adults: number;
  children: number;
  message?: string;
  isPaid: boolean;
  status: InscriptionStatus;
  createdAt: string;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { status = "all", q = "" } = await searchParams;

  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (status !== "all") {
    query.status = status;
  }

  if (q.trim()) {
    query.$or = [
      { firstName: { $regex: q, $options: "i" } },
      { lastName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { eventTitle: { $regex: q, $options: "i" } },
    ];
  }

  const inscriptionsRaw = await EventInscription.find(query)
    .sort({ createdAt: -1 })
    .lean();

    const inscriptions: AdminInscription[] = inscriptionsRaw.map((item) => ({
      _id: String(item._id),
      eventSlug: String(item.eventSlug ?? ""),
      eventTitle: String(item.eventTitle ?? ""),
      firstName: String(item.firstName ?? ""),
      lastName: String(item.lastName ?? ""),
      email: String(item.email ?? ""),
      phone: item.phone ? String(item.phone) : "",
      adults: Number(item.adults ?? 0),
      children: Number(item.children ?? 0),
      message: item.message ? String(item.message) : "",
      isPaid: Boolean(item.isPaid),
      status: (item.status as InscriptionStatus) ?? "pending",
      createdAt: item.createdAt
        ? new Date(item.createdAt).toISOString()
        : new Date().toISOString(),
    }));

    const confirmedCount = inscriptions.filter(
      (item) => item.status === "confirmed"
    ).length;
    
    const pendingCount = inscriptions.filter(
      (item) => item.status === "pending"
    ).length;
    
    const cancelledCount = inscriptions.filter(
      (item) => item.status === "cancelled"
    ).length;

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-10 space-y-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/50 to-vwa-background" />
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-vwa-primary/15 blur-3xl opacity-70" />
      </div>

      <section className="rounded-[2rem] border border-vwa-background/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(28,22,18,0.14)] backdrop-blur-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
              Tableau de bord admin
            </p>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-vwa-dark">
                Gestion des inscriptions
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-vwa-dark/70">
                Visualise les inscriptions, filtre les demandes, confirme les
                participations et garde une vue claire sur la dynamique de tes
                événements.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/evenements"
              className="inline-flex items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-4 py-2 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
            >
              Voir les événements
            </Link>

            <Link
              href="/api/event-inscriptions"
              className="inline-flex items-center justify-center rounded-full bg-vwa-dark px-4 py-2 text-sm font-semibold text-vwa-background shadow-sm transition hover:bg-black"
            >
              Voir JSON brut
            </Link>

            <AdminLogoutButton />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-3xl border border-vwa-background/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(28,22,18,0.10)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/50">
            Total
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-3xl font-extrabold text-vwa-dark">{inscriptions.length}</p>
            <UserGroupIcon className="h-8 w-8 text-vwa-primary/70" />
          </div>
        </article>

        <article className="rounded-3xl border border-vwa-background/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(28,22,18,0.10)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/50">
            Confirmées
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-3xl font-extrabold text-emerald-700">
              {confirmedCount}
            </p>
            <CheckCircleIcon className="h-8 w-8 text-emerald-600/70" />
          </div>
        </article>

        <article className="rounded-3xl border border-vwa-background/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(28,22,18,0.10)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/50">
            En attente
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-3xl font-extrabold text-amber-700">
              {pendingCount}
            </p>
            <ClockIcon className="h-8 w-8 text-amber-600/70" />
          </div>
        </article>

        <article className="rounded-3xl border border-vwa-background/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(28,22,18,0.10)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-vwa-dark/50">
            Annulées
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-3xl font-extrabold text-slate-700">
              {cancelledCount}
            </p>
            <XCircleIcon className="h-8 w-8 text-slate-500/70" />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-vwa-background/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(28,22,18,0.10)]">
        <form className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)_auto]">
          <div className="space-y-1">
            <label
              htmlFor="status"
              className="text-xs font-medium uppercase tracking-[0.16em] text-vwa-dark/55"
            >
              Statut
            </label>
            <select
              id="status"
              name="status"
              defaultValue={status}
              className="w-full rounded-2xl border border-vwa-background bg-white px-3 py-2.5 text-sm text-vwa-dark outline-none focus:border-vwa-accent/70"
            >
              <option value="all">Tous</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="q"
              className="text-xs font-medium uppercase tracking-[0.16em] text-vwa-dark/55"
            >
              Recherche
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Nom, email, événement..."
              className="w-full rounded-2xl border border-vwa-background bg-white px-3 py-2.5 text-sm text-vwa-dark outline-none focus:border-vwa-accent/70"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="inline-flex h-[46px] items-center justify-center rounded-full bg-vwa-dark px-5 text-sm font-semibold text-vwa-background shadow-sm transition hover:bg-black"
            >
              Filtrer
            </button>

            <Link
              href="/admin"
              className="inline-flex h-[46px] items-center justify-center rounded-full border border-vwa-dark/10 bg-white px-5 text-sm font-medium text-vwa-dark/80 shadow-sm transition hover:border-vwa-primary/30 hover:text-vwa-primary"
            >
              Réinitialiser
            </Link>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        {inscriptions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-vwa-background/90 bg-white/70 px-6 py-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-vwa-dark">
              Aucune inscription trouvée
            </p>
            <p className="mt-2 text-sm text-vwa-dark/65">
              Essaie un autre filtre ou attends les prochaines inscriptions.
            </p>
          </div>
        ) : (
          inscriptions.map((item) => (
            <article
              key={item._id}
              className="rounded-[1.75rem] border border-vwa-background/80 bg-white/95 p-5 shadow-[0_18px_45px_rgba(28,22,18,0.12)]"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-4 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusBadge(
                        item.status
                      )}`}
                    >
                      {item.status === "pending"
                        ? "En attente"
                        : item.status === "confirmed"
                        ? "Confirmée"
                        : "Annulée"}
                    </span>

                    <span className="rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium text-vwa-dark/60">
                      {item.eventTitle}
                    </span>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <h2 className="text-lg font-extrabold text-vwa-dark">
                        {item.firstName} {item.lastName}
                      </h2>

                      <div className="space-y-1.5 text-sm text-vwa-dark/72">
                        <p className="inline-flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-vwa-primary" />
                          <span className="break-all">{item.email}</span>
                        </p>

                        <p className="inline-flex items-center gap-2">
                          <UserGroupIcon className="h-4 w-4 text-vwa-primary" />
                          <span>
                            {item.adults} adulte(s) • {item.children} enfant(s)
                          </span>
                        </p>

                        <p className="inline-flex items-center gap-2">
                          <CalendarDaysIcon className="h-4 w-4 text-vwa-primary" />
                          <span>Inscrit le {formatDate(item.createdAt)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-vwa-dark/45">
                        Message transmis
                      </p>
                      <div className="min-h-[88px] rounded-2xl bg-vwa-background/55 px-4 py-3 text-sm leading-relaxed text-vwa-dark/72 ring-1 ring-vwa-background/70">
                        {item.message?.trim()
                          ? item.message
                          : "Aucun message renseigné."}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="xl:w-[260px] xl:pl-3">
                  <div className="rounded-2xl bg-vwa-background/55 p-4 ring-1 ring-vwa-background/70">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-vwa-dark/45">
                      Actions
                    </p>
                    <div className="mt-3">
                      <InscriptionActions
                        inscriptionId={item._id}
                        currentStatus={item.status}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}