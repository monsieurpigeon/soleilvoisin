import { getPastelGalerie, type PastelPainting } from "@/lib/pastel/galerie";
import { MonsieurPigeonLink } from "@/components/MonsieurPigeonLink";
import { MONSIEUR_PIGEON_NAME } from "@/lib/site";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import Image from "next/image";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Pastel — Soleil Voisin",
  description:
    "Galerie de peintures au pastel : Le pèlerin centaure et Le petit-déjeuner, par Monsieur Pigeon.",
};

function PastelPaintingText({ painting }: { painting: PastelPainting }) {
  return (
    <>
      <h2 className="text-xl font-semibold text-amber-100 sm:text-2xl">
        {painting.title}
      </h2>
      <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
        {painting.artist === MONSIEUR_PIGEON_NAME ? (
          <MonsieurPigeonLink className="cursor-pointer transition hover:text-sky-300" />
        ) : (
          painting.artist
        )}
        {painting.date ? (
          <span className="text-zinc-600"> · {painting.date}</span>
        ) : null}
      </p>
      {painting.description ? (
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
          {painting.description}
        </p>
      ) : null}
    </>
  );
}

function PortraitPaintingCard({ painting }: { painting: PastelPainting }) {
  return (
    <li className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/50">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="shrink-0 bg-[#1a1410] sm:w-52 md:w-60">
          <Image
            src={painting.image}
            alt={`${painting.title}, par ${painting.artist}`}
            width={painting.width}
            height={painting.height}
            className="h-auto w-full"
            sizes="(max-width: 640px) 100vw, 240px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 py-5 sm:px-8 sm:py-6">
          <PastelPaintingText painting={painting} />
        </div>
      </div>
    </li>
  );
}

function LandscapePaintingCard({ painting }: { painting: PastelPainting }) {
  return (
    <li className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/50">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="flex flex-1 flex-col justify-center px-5 py-5 sm:px-8 sm:py-6">
          <PastelPaintingText painting={painting} />
        </div>

        <div className="shrink-0 bg-[#1a1410] sm:flex-1 sm:max-w-2xl">
          <Image
            src={painting.image}
            alt={`${painting.title}, par ${painting.artist}`}
            width={painting.width}
            height={painting.height}
            className="h-auto w-full"
            sizes="(max-width: 640px) 100vw, 672px"
          />
        </div>
      </div>
    </li>
  );
}

export default function PastelPage() {
  const paintings = getPastelGalerie();

  return (
    <main
      id="contenu-principal"
      className="relative min-h-svh px-4 py-8 sm:px-6 sm:py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(251,191,36,0.1),transparent_55%),radial-gradient(ellipse_80%_50%_at_0%_100%,rgba(244,114,182,0.08),transparent_50%),linear-gradient(180deg,#0f0a08_0%,#1a1210_45%,#0f0a08_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="text-center">
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.45em] text-amber-300/90">
            Galerie
          </p>

          <h1
            className={`${syne.className} mt-4 bg-gradient-to-br from-amber-100 via-rose-100 to-amber-200/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl`}
          >
            Pastel
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            <em className="text-zinc-300">Science-fiction</em>.
          </p>
        </header>

        <ul className="mt-12 flex flex-col gap-10">
          {paintings.map((painting) =>
            painting.orientation === "portrait" ? (
              <PortraitPaintingCard key={painting.image} painting={painting} />
            ) : (
              <LandscapePaintingCard key={painting.image} painting={painting} />
            ),
          )}
        </ul>

        <section
          aria-labelledby="pastel-participer"
          className="mt-16 rounded-2xl border border-zinc-800/80 bg-zinc-950/50 px-6 py-8 text-center sm:px-10 sm:py-10"
        >
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-amber-300/80">
            Participer
          </p>

          <h2
            id="pastel-participer"
            className={`${syne.className} mt-3 text-2xl font-bold text-amber-100 sm:text-3xl`}
          >
            Vous aussi, dessinez l&apos;univers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Vous peignez au pastel dans l&apos;esprit de{" "}
            <em className="text-zinc-300">Soleil Voisin</em> ? Envoyez-nous
            votre œuvre — nous serions ravis de la partager ici.
          </p>

          <a
            href="mailto:contact@soleilvoisin.fr?subject=Pastel%20%E2%80%94%20Soleil%20Voisin"
            className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 transition hover:border-amber-300/60 hover:bg-amber-500/20"
          >
            contact@soleilvoisin.fr
          </a>
        </section>
      </div>
    </main>
  );
}
