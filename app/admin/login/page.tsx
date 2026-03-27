"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "Réponse serveur invalide. Vérifie ton API /api/admin/login."
        );
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Identifiants incorrects.");
      }

      await new Promise((resolve) => setTimeout(resolve, 400));

      router.push("/admin");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur inconnue lors de la connexion.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handlePasswordKeyEvent(
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) {
    if ("getModifierState" in e) {
      setCapsLockOn(e.getModifierState("CapsLock"));
    }
  }

  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-vwa-background/0 via-vwa-background/55 to-vwa-background" />
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-vwa-accent/20 blur-3xl opacity-70" />
      </div>

      <section className="w-full max-w-md overflow-hidden rounded-[2rem] border border-vwa-background/80 bg-white/95 p-6 shadow-[0_24px_70px_rgba(28,22,18,0.14)]">
        <div className="space-y-3">
          <p className="inline-flex rounded-full bg-vwa-dark/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-vwa-dark/60">
            Espace administrateur
          </p>

          <h1 className="text-2xl font-extrabold text-vwa-dark">
            Connexion admin
          </h1>

          <p className="text-sm leading-relaxed text-vwa-dark/70">
            Accède au tableau de bord privé pour gérer les inscriptions et suivre
            l’activité des événements.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-vwa-dark/75">
              Adresse e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-2xl border border-vwa-background bg-white px-3.5 py-3 text-sm text-vwa-dark outline-none transition focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
              placeholder="admin@vwa-kiltirel.local"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-vwa-dark/75">
              Mot de passe
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={handlePasswordKeyEvent}
                onClick={handlePasswordKeyEvent}
                required
                autoComplete="current-password"
                className="w-full rounded-2xl border border-vwa-background bg-white px-3.5 py-3 pr-12 text-sm text-vwa-dark outline-none transition focus:border-vwa-accent/70 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.35)]"
                placeholder="••••••••••"
                aria-label="Mot de passe administrateur"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                title={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-vwa-dark/55 transition hover:text-vwa-dark"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {capsLockOn && (
              <p className="text-[11px] text-amber-700">
                ⚠️ Verr. Maj est activée.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(28,22,18,0.38)] transition ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-gradient-to-r from-vwa-primary to-vwa-dark hover:-translate-y-[1px] hover:shadow-[0_20px_55px_rgba(28,22,18,0.55)]"
            }`}
          >
            <span className="flex items-center gap-2">
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
              )}
              {loading ? "Connexion..." : "Se connecter"}
            </span>
          </button>
        </form>
      </section>
    </main>
  );
}