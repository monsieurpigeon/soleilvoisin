import Link from "next/link";
import { Syne } from "next/font/google";
import type { Metadata } from "next";
import { BookReaderSection } from "@/components/home/BookReaderSection";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Bienvenue — Soleil Voisin",
  description: "Lisez Soleil Voisin en ligne.",
};

export default function HomePage() {
  return (
    <main
      id="contenu-principal"
      className="relative flex min-h-svh flex-col px-4 py-6 sm:px-6 sm:py-8"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,189,248,0.1),transparent_55%),radial-gradient(ellipse_90%_70%_at_100%_100%,rgba(251,191,36,0.06),transparent_50%),linear-gradient(180deg,#030510_0%,#0a0f1e_45%,#030510_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 pb-8 sm:gap-6 sm:pb-12">
        <header className="shrink-0 text-center">
          <Link
            href="/"
            className="mb-6 inline-block cursor-pointer font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-sky-300/80 transition hover:text-sky-200"
          >
            ← Retour
          </Link>

          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.45em] text-sky-300/90">
            Bienvenue
          </p>

          <h1
            className={`${syne.className} mt-4 bg-gradient-to-br from-amber-100 via-white to-amber-200/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl`}
          >
            Soleil Voisin
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Roman de science-politique-fiction.{" "}
            <span className="md:hidden">
              Ouvrez le livre sur Google Drive pour le lire sur votre appareil.
            </span>
            <span className="hidden md:inline">
              Ouvrez le livre et tournez les doubles pages pour embarquer vers
              l&apos;Alpha du Centaure.
            </span>
          </p>
        </header>

        <section
          aria-label="Lecture du livre"
          className="flex flex-col justify-center gap-4"
        >
          <BookReaderSection />
        </section>
      </div>
    </main>
  );
}
