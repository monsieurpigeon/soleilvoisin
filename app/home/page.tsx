import { OG_IMAGE, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const PAGE_TITLE =
  "Soleil Voisin — Roman SF en ligne | Alpha du Centaure";

const META_DESCRIPTION =
  "Roman de science-politique-fiction : embarquez vers Alpha du Centaure. Lisez ou achetez Soleil Voisin.";

const OG_TITLE = "Soleil Voisin — De la SF bien française.";

const OG_DESCRIPTION =
  "Roman de science-politique-fiction : embarquez vers Alpha du Centaure. Lisez Soleil Voisin en ligne gratuitement.";

const HOME_SYNOPSIS = [
  "Sur Terre certains astronomes observent un gigantesque flash dans le ciel. Après vérification, c’est l’Alpha du Centaure, un système stellaire voisin, qui a émis une lumière 100 fois supérieure à la moyenne.",
  "Sur Terre aucun changement, mais peu à peu la population observe des événements de plus en plus inhabituels.",
  "Dans le système stellaire de l’Alpha du Centaure, le quotidien n’est pas le même, il ne reste pas assez de temps pour évacuer tout le système avant le cataclysme qui s’annonce, le climat est déjà en train de complètement se dérégler sur plusieurs satellites.",
  "Leurs politiques stellaires ont identifié un refuge accessible : la Terre, et ils se préparent pour venir y installer un maximum de leur population avant de pouvoir retourner dans leur système.",
  "Différentes factions apparaissent sur Terre, notamment ceux qui se préparent à accueillir des cargos entiers d’une population étrangère et vulnérable en organisant leurs ressources : les Développeurs.",
  "La plupart des habitants de la Terre sont complètement inconscients de la situation et continuent de détruire l'écosystème pour du plaisir personnel.",
  "Avec le premier débarquement enregistré de 1024 centaures à La Roche-Chalais, toutes les caméras du monde se tournent vers la France et cela oblige les diverses politiques locales à consolider leurs acquis pour que l’accueil dans cette région très rurale du Périgord devienne un exemple national.",
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: META_DESCRIPTION,
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: "/home",
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function HomePage() {
  return (
    <main
      id="contenu-principal"
      className="relative min-h-svh px-4 py-10 sm:px-6 sm:py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,189,248,0.1),transparent_55%),radial-gradient(ellipse_90%_70%_at_100%_100%,rgba(251,191,36,0.06),transparent_50%),linear-gradient(180deg,#030510_0%,#0a0f1e_45%,#030510_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-8 sm:flex-row sm:items-start">
        <h1 className="sr-only">Soleil Voisin</h1>

        <div className="mx-auto w-full max-w-xs shrink-0 overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:mx-0">
          <Image
            src="/couverture.png"
            alt="Couverture du roman Soleil Voisin"
            width={600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <p
            className={`${syne.className} text-center text-2xl font-extrabold tracking-tight text-amber-100 sm:text-left sm:text-3xl`}
          >
            Soleil Voisin
          </p>
          <p className="mt-2 text-center font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 sm:text-left">
            Monsieur Pigeon
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {HOME_SYNOPSIS.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Link
              href="/lecture"
              className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200 transition hover:border-sky-400/40 hover:text-sky-100 sm:flex-none"
            >
              Lire
            </Link>

            <Link
              href="/shop"
              className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.12)] transition hover:border-amber-300/60 hover:bg-amber-500/20 sm:flex-none"
            >
              Acheter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
