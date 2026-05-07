"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Post, PostBlock } from "@/data/posts";
import { ArrowLeft, CalendarDays, Clock, ArrowRight, Share2 } from "lucide-react";
import ShareBar from "./ShareBar";

type Props = { post: Post };

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

function ratioClass(ratio?: "16/9" | "4/3" | "1/1" | "3/4") {
  switch (ratio) {
    case "1/1": return "aspect-square";
    case "4/3": return "aspect-[4/3]";
    case "3/4": return "aspect-[3/4]";
    default: return "aspect-[16/9]";
  }
}

function RenderBlocks({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-6 text-sm text-vwa-dark/80 leading-relaxed">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2 key={i} className="text-lg font-bold text-vwa-dark pt-4">
              {b.text}
            </h2>
          );
        }
        if (b.type === "p") {
          return <p key={i} className="whitespace-pre-line">{b.text}</p>;
        }
        if (b.type === "quote") {
          return (
            <figure key={i} className="rounded-xl bg-gradient-to-r from-vwa-dark/5 to-vwa-primary/5 p-6 border-l-4 border-vwa-accent">
              <blockquote className="text-sm italic text-vwa-dark/80">“{b.text}”</blockquote>
              {b.author && <figcaption className="mt-2 text-xs text-vwa-dark/50">— {b.author}</figcaption>}
            </figure>
          );
        }
        if (b.type === "list") {
          return (
            <ul key={i} className="list-disc list-inside space-y-1">
              {b.items.map((it, idx) => <li key={idx}>{it}</li>)}
            </ul>
          );
        }
        if (b.type === "image") {
          return (
            <figure key={i} className={`relative w-full ${ratioClass(b.ratio)} rounded-xl overflow-hidden shadow-md`}>
              <Image src={b.src} alt={b.alt} fill className="object-cover" style={{ objectPosition: b.focal ?? "50% 50%" }} />
              {b.caption && <figcaption className="absolute bottom-2 left-2 text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded">{b.caption}</figcaption>}
            </figure>
          );
        }
        if (b.type === "video") {
          return (
            <figure key={i} className={`relative w-full ${ratioClass(b.ratio)} rounded-xl overflow-hidden bg-black`}>
              <video controls playsInline poster={b.poster} className="w-full h-full object-cover">
                <source src={b.src} />
              </video>
              {b.caption && <figcaption className="absolute bottom-2 left-2 text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded">{b.caption}</figcaption>}
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}

const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
};

export default function ArticlePageClient({ post }: Props) {
  // Trouver article précédent/suivant pour la navigation (optionnel, basé sur posts triés)
  // Ici on simplifie, mais on peut le faire avec un hook useMemo si besoin

  return (
    <>
      {/* Logo filigrane */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="relative w-[800px] h-[800px] opacity-[0.03] sm:opacity-[0.04]">
            <Image src="/images/Logo.png" alt="Vwa Kiltirèl" fill sizes="800px" className="object-contain" />
          </motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} className="relative w-[500px] h-[500px] opacity-[0.02] sm:opacity-[0.03]">
            <Image src="/images/Logo.png" alt="Vwa Kiltirèl" fill sizes="500px" className="object-contain" />
          </motion.div>
        </div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Retour */}
        <div className="mb-6">
          <Link href="/actualites" className="inline-flex items-center gap-2 text-sm text-vwa-dark/60 hover:text-vwa-dark transition-colors">
            <ArrowLeft className="h-4 w-4" /> Retour aux actualités
          </Link>
        </div>

        <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-vwa-dark/8">
          {/* Hero image */}
          <div className="relative h-64 sm:h-96">
            <Image src={post.cover} alt={post.title} fill priority className="object-cover" style={{ objectPosition: post.focal ?? "50% 50%" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{post.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {formatDate(post.date)}</span>
                {post.readingMinutes && <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readingMinutes} min de lecture</span>}
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6 md:p-8 space-y-6">
            <p className="text-lg font-medium text-vwa-dark/80 italic border-l-4 border-vwa-accent pl-4">{post.excerpt}</p>
            <RenderBlocks blocks={post.content} />
            <div className="pt-6 border-t border-vwa-dark/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs rounded-full bg-vwa-dark/5 px-3 py-1 text-vwa-dark/70">#{tag}</span>
                ))}
              </div>
              <div className="mt-6">
                <ShareBar title={post.title} description={post.excerpt} />
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}