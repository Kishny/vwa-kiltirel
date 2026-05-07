"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Fingerprint,
  Sparkles,
  Activity,
  Zap,
} from "lucide-react";

const securityLabels = [
  "Très faible",
  "Faible",
  "Moyen",
  "Fort",
  "Très fort",
  "Excellent",
];

const securityBarClasses = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-emerald-400",
];

const securityTextClasses = [
  "text-red-400",
  "text-orange-400",
  "text-yellow-400",
  "text-lime-400",
  "text-emerald-400",
  "text-emerald-300",
];

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [securityLevel, setSecurityLevel] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let level = 0;
    if (password.length > 0) level += 1;
    if (password.length >= 8) level += 1;
    if (/[A-Z]/.test(password)) level += 1;
    if (/[0-9]/.test(password)) level += 1;
    if (/[^A-Za-z0-9]/.test(password)) level += 1;

    setSecurityLevel(Math.min(level, 5));
  }, [password]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-vwa-dark">
      {/* Fond futuriste */}
      <div className="fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          }}
        />

        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-vwa-accent/5 blur-3xl animate-pulse" />
        <div className="animation-delay-1000 absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-vwa-primary/5 blur-3xl animate-pulse" />
        <div className="animation-delay-2000 absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-vwa-accent/10 blur-3xl animate-pulse" />

        <svg className="absolute inset-0 h-full w-full opacity-10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(197,130,70,0.3)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Contenu */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Colonne gauche */}
            <div className="hidden flex-col justify-center space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 backdrop-blur-sm lg:flex">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-vwa-accent/30 bg-vwa-accent/20 px-3 py-1">
                  <Sparkles className="h-3 w-3 animate-pulse text-vwa-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-vwa-accent">
                    Back-office sécurisé
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Interface d&apos;administration
                </h2>

                <p className="leading-relaxed text-white/60">
                  Accédez à la gestion des inscriptions, des événements et des
                  membres de l&apos;association Vwa Kiltirèl.
                </p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    <span>Session sécurisée</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <Fingerprint className="h-4 w-4 text-vwa-accent" />
                    <span>
                      Authentification à deux facteurs (prochainement)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span>Journalisation des accès</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-6">
                <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>SÉCURITÉ DE LA SESSION</span>
                  <span>NIVEAU 3/5</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/5 animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-vwa-accent" />
                </div>
                <p className="mt-2 text-[10px] font-mono text-white/30">
                  TLS 1.3 • Chiffrement AES-256 • Protection CSRF
                </p>
              </div>
            </div>

            {/* Carte login */}
            <div ref={cardRef} className="group relative">
              <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-vwa-accent via-vwa-primary to-vwa-accent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(197,130,70,0.15) 0%, transparent 60%)`,
                }}
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl backdrop-blur-2xl">
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-vwa-accent/50 to-transparent" />

                <div className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        <Lock className="h-3 w-3 text-vwa-accent" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                          Accès restreint
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-[9px] font-mono text-white/40">
                          SÉCURISÉ
                        </span>
                      </div>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                      Connexion admin
                    </h1>

                    <p className="text-sm leading-relaxed text-white/50">
                      Accédez au tableau de bord privé pour gérer les
                      inscriptions, les événements et suivre l&apos;activité de
                      l&apos;association.
                    </p>
                  </div>

                  {error && (
                    <div className="animate-shake mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-red-400">
                        <span>❌</span>
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-white/60">
                        <Mail className="h-3 w-3" />
                        Adresse e-mail
                      </label>

                      <div className="group/input relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="username"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-10 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30 focus:border-vwa-accent/50 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.3)]"
                          placeholder="admin@vwa-kiltirel.local"
                        />
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 transition-colors group-focus-within/input:text-vwa-accent" />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-white/60">
                        <Lock className="h-3 w-3" />
                        Mot de passe
                      </label>

                      <div className="group/input relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyUp={handlePasswordKeyEvent}
                          onClick={handlePasswordKeyEvent}
                          required
                          autoComplete="current-password"
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-10 pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30 focus:border-vwa-accent/50 focus:shadow-[0_0_0_1px_rgba(197,130,70,0.3)]"
                          placeholder="••••••••••"
                          aria-label="Mot de passe administrateur"
                        />
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 transition-colors group-focus-within/input:text-vwa-accent" />

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
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-all duration-200 hover:text-vwa-accent"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>

                      {capsLockOn && (
                        <div className="flex items-center gap-2 text-[11px] text-amber-400 animate-pulse">
                          <Zap className="h-3 w-3" />
                          <span>
                            Verr. Maj est activée — les caractères seront en
                            majuscules
                          </span>
                        </div>
                      )}

                      {isFocused && password.length > 0 && (
                        <div className="animate-slideDown space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-white/40">
                              FORCE DU MOT DE PASSE
                            </span>
                            <span className={securityTextClasses[securityLevel]}>
                              {securityLabels[securityLevel]}
                            </span>
                          </div>

                          <div className="h-1 overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${securityBarClasses[securityLevel]}`}
                              style={{ width: `${(securityLevel / 5) * 100}%` }}
                            />
                          </div>

                          <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/30">
                            <span
                              className={
                                password.length >= 8 ? "text-emerald-400" : ""
                              }
                            >
                              ● 8+ caractères
                            </span>
                            <span
                              className={
                                /[A-Z]/.test(password) ? "text-emerald-400" : ""
                              }
                            >
                              ● Majuscule
                            </span>
                            <span
                              className={
                                /[0-9]/.test(password) ? "text-emerald-400" : ""
                              }
                            >
                              ● Chiffre
                            </span>
                            <span
                              className={
                                /[^A-Za-z0-9]/.test(password)
                                  ? "text-emerald-400"
                                  : ""
                              }
                            >
                              ● Spécial
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`group/btn relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
                        loading
                          ? "cursor-not-allowed bg-white/10"
                          : "bg-gradient-to-r from-vwa-primary to-vwa-dark hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(197,130,70,0.4)]"
                      }`}
                    >
                      {!loading && (
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                      )}

                      <span className="relative flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                            Connexion en cours...
                          </>
                        ) : (
                          <>
                            <Fingerprint className="h-4 w-4" />
                            Se connecter
                          </>
                        )}
                      </span>
                    </button>

                    <div className="pt-4 text-center">
                      <p className="text-[10px] font-mono text-white/30">
                        {new Date().getFullYear()} © Vwa Kiltirèl — Tous droits
                        réservés
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}