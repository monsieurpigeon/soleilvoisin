import type { Metadata } from "next";
import Link from "next/link";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const MISTRAL_CONVERSATION_URL =
  "https://chat.mistral.ai/chat/992647ae-f213-4f56-ab2b-2b5019f6e05c";

export const metadata: Metadata = {
  title: "Mistral — Alpha du Centaure",
  description:
    "Conversation Mistral AI sur Alpha du Centaure, étoile la plus proche du Soleil et destination de Soleil Voisin.",
};

export default function MistralPage() {
  return (
    <main
      id="contenu-principal"
      className="relative flex min-h-svh flex-col items-center justify-center px-4 py-12 sm:px-6"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(ellipse_80%_60%_at_100%_100%,rgba(251,191,36,0.08),transparent_50%),linear-gradient(180deg,#030510_0%,#0a0f1e_50%,#030510_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.45em] text-sky-300/90">
          Mistral AI
        </p>

        <h1
          className={`${syne.className} mt-4 bg-gradient-to-br from-amber-100 via-white to-sky-200/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl`}
        >
          Alpha du Centaure
        </h1>

        <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
          Une conversation avec Mistral sur le système stellaire le plus proche
          du Soleil — composition, exoplanètes, exploration et science-fiction.
        </p>

        <a
          href={MISTRAL_CONVERSATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/10 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 transition hover:border-sky-300/60 hover:bg-sky-500/20"
        >
          Ouvrir la conversation
        </a>

        <p className="mt-8">
          <Link
            href="/stellarium"
            className="cursor-pointer font-mono text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500 transition hover:text-sky-300/80"
          >
            Voir aussi Stellarium →
          </Link>
        </p>
      </div>
    </main>
  );
}
