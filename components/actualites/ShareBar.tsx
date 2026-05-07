"use client";

import { useState } from "react";
import { Share2, Link2, Check, Mail } from "lucide-react";

type Props = { title: string; description?: string };

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ShareBar({ title, description = "" }: Props) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!url) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-vwa-dark/50 flex items-center gap-2">
        <Share2 className="h-3.5 w-3.5" /> Partager cet article
      </p>
      <div className="flex flex-wrap gap-2">
        <button onClick={copyLink} className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition">
          {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Link2 className="h-3.5 w-3.5" />}
          {copied ? "Copié !" : "Copier le lien"}
        </button>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#1877F2] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0c63d4] transition">
          <FacebookIcon className="h-3.5 w-3.5" /> Facebook
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800 transition">
          <XIcon className="h-3.5 w-3.5" /> X
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#004182] transition">
          <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
        </a>
        <a href={`mailto:?subject=${encodeURIComponent(`Partage : ${title}`)}&body=${encodeURIComponent(`${title}\n\n${description}\n\n${url}`)}`} className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-300 transition">
          <Mail className="h-3.5 w-3.5" /> Email
        </a>
      </div>
    </div>
  );
}
