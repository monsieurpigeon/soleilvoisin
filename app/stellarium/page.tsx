import Link from "next/link";
import { Syne } from "next/font/google";
import type { Metadata } from "next";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Stellarium — Alpha du Centaure",
  description:
    "Un exposé rapide sur Alpha du Centaure, étoile la plus proche du Soleil et destination du roman Soleil Voisin.",
};

const facts = [
  {
    label: "Distance",
    value: "4,37 années-lumière",
    detail: "Le système stellaire le plus proche du nôtre.",
  },
  {
    label: "Composition",
    value: "3 étoiles",
    detail: "Alpha Centauri A, B et Proxima Centauri.",
  },
  {
    label: "Étoile principale",
    value: "G2V + K1V",
    detail: "Deux soleils semblables au nôtre, en orbite l'une autour de l'autre.",
  },
  {
    label: "Proxima",
    value: "Naine rouge",
    detail: "La plus proche des trois ; au moins deux exoplanètes confirmées.",
  },
];

export default function StellariumPage() {
  return (
    <main
      id="contenu-principal"
      className="relative min-h-svh px-4 py-8 sm:px-6 sm:py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,rgba(56,189,248,0.14),transparent_55%),radial-gradient(ellipse_80%_60%_at_100%_80%,rgba(251,191,36,0.08),transparent_50%),linear-gradient(180deg,#030510_0%,#0a0f1e_50%,#030510_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 15% 30%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 65% 15%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 82% 70%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 40% 85%, rgba(255,255,255,0.3), transparent)
          `,
        }}
        aria-hidden
      />

      <article className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-block cursor-pointer font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-sky-300/80 transition hover:text-sky-200"
        >
          ← Retour
        </Link>

        <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.45em] text-sky-300/90">
          Stellarium
        </p>

        <h1
          className={`${syne.className} mt-4 bg-gradient-to-br from-amber-100 via-white to-sky-200/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl`}
        >
          Alpha du Centaure
        </h1>

        <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          α Centauri · Rigel Kentaurus
        </p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
          <p>
            À seulement <strong className="font-medium text-zinc-100">4,37 années-lumière</strong>,
            Alpha du Centaure est notre voisine immédiate dans la Voie lactée. Visible à
            l&apos;œil nu depuis l&apos;hémisphère sud, elle brille dans la constellation du
            Centaure — ce « soleil voisin » qui a inspiré le roman.
          </p>

          <p>
            Le système est un <strong className="font-medium text-zinc-100">triple</strong> :
            deux étoiles semblables au Soleil, Alpha Centauri A et B, tournent l&apos;une autour
            de l&apos;autre en environ 80 ans ; une troisième,{" "}
            <strong className="font-medium text-zinc-100">Proxima Centauri</strong>, naine rouge
            plus froide et plus proche encore, gravite autour du couple à une distance d&apos;environ
            0,2 année-lumière.
          </p>

          <p>
            Proxima abrite au moins une planète dans la zone habitable,{" "}
            <strong className="font-medium text-zinc-100">Proxima b</strong>, découverte en 2016.
            Assez proche pour qu&apos;un voyage interstellaire — même lent, même ambitieux — devienne
            un récit plausible : c&apos;est précisément le pari de{" "}
            <em className="text-zinc-200">Soleil Voisin</em>, où les « bons petits français »
            laissent Mars aux Américains et visent l&apos;Alpha.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {facts.map((fact) => (
            <li
              key={fact.label}
              className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-4 py-4"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-sky-300/80">
                {fact.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-amber-100">{fact.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{fact.detail}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 border-t border-zinc-800/80 pt-8 text-sm leading-relaxed text-zinc-500">
          Dans le ciel, Alpha du Centaure et le Croix du Sud guident le regard vers le sud
          céleste. À cette échelle cosmique, quatre années-lumière, c&apos;est le jardin
          d&apos;à-côté — et déjà un autre monde.
        </p>
      </article>
    </main>
  );
}
