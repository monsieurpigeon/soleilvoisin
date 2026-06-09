import { getCentaureTvGrille, type CentaureTvProgram } from "@/lib/centaure-tv/grille";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import Image from "next/image";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Centaure TV — Soleil Voisin",
  description:
    "Centaure TV, la chaîne de télévision fictionnelle du système Alpha. Journal, débats, documentaires et émissions pour la ménagère centaurienne.",
};

function ProgramCard({ program }: { program: CentaureTvProgram }) {
  return (
    <li className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/60 transition hover:border-sky-400/30">
      <div className="relative aspect-video bg-[#0a0f1e]">
        <Image
          src={program.image}
          alt={`Vignette — ${program.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-200 backdrop-blur-sm">
          {program.duration}
        </span>
      </div>

      <div className="px-5 py-4">
        <h2 className="text-lg font-semibold text-sky-100 sm:text-xl">
          {program.title}
        </h2>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-zinc-400">
          {program.description}
        </p>
      </div>
    </li>
  );
}

export default function CentaureTvPage() {
  const programs = getCentaureTvGrille();

  return (
    <main
      id="contenu-principal"
      className="relative min-h-svh px-4 py-8 sm:px-6 sm:py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_50%_at_50%_0%,rgba(56,189,248,0.15),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(99,102,241,0.1),transparent_50%),linear-gradient(180deg,#030510_0%,#0a0f1e_45%,#030510_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/40 px-4 py-1.5">
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-red-500"
              aria-hidden
            />
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-sky-300/90">
              En direct
            </p>
          </div>

          <h1
            className={`${syne.className} mt-6 bg-gradient-to-br from-sky-100 via-white to-indigo-200/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl`}
          >
            Centaure TV
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            La télévision fictionnelle du système Alpha.
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Infos, débats, fictions et télé-achats
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            pour la ménagère centaurienne.
          </p>
        </header>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.image} program={program} />
          ))}
        </ul>
      </div>
    </main>
  );
}
