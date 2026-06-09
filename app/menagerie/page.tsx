import type { Metadata } from "next";
import Link from "next/link";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Ménagerie — Soleil Voisin",
  description:
    "Ménagerie virtuelle de Soleil Voisin — un tamagotchi réaliste, bientôt disponible. En attendant, découvrez la galerie pastel.",
};

export default function MenageriePage() {
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
          Ménagerie
        </p>

        <h1
          className={`${syne.className} mt-4 bg-gradient-to-br from-amber-100 via-white to-sky-200/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl`}
        >
          Bientôt disponible
        </h1>

        <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
          Ici, vous pourrez élever les créatures de l&apos;univers{" "}
          <em className="text-zinc-300">Soleil Voisin</em> — un tamagotchi
          réaliste, fidèle et un peu exigeant. Patience : l&apos;incubateur
          chauffe encore.
        </p>

        <Link
          href="/pastel"
          className="mt-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 transition hover:border-amber-300/60 hover:bg-amber-500/20"
        >
          Voir la collection pastel
        </Link>
      </div>
    </main>
  );
}
