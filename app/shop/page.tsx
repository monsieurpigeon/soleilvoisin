import {
  BOOK_SHOP_DESCRIPTION,
  SINGLE_BOOK_OFFER,
} from "@/lib/book/creem";
import { textWithMonsieurPigeonLink } from "@/components/MonsieurPigeonLink";
import { OG_IMAGE, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Boutique — Soleil Voisin",
  description: "Achetez Soleil Voisin — roman de science-politique-fiction.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Boutique — Soleil Voisin",
    description: "Achetez Soleil Voisin — roman de science-politique-fiction.",
    url: "/shop",
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function ShopPage() {
  const offer = SINGLE_BOOK_OFFER;

  return (
    <main
      id="contenu-principal"
      className="relative min-h-svh px-4 py-8 sm:px-6 sm:py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,189,248,0.1),transparent_55%),radial-gradient(ellipse_90%_70%_at_100%_100%,rgba(251,191,36,0.06),transparent_50%),linear-gradient(180deg,#030510_0%,#0a0f1e_45%,#030510_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Link
          href="/home"
          className="mb-8 inline-block cursor-pointer font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-sky-300/80 transition hover:text-sky-200"
        >
          ← Retour
        </Link>

        <header className="mb-10 text-center sm:text-left">
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.45em] text-amber-300/90">
            Boutique
          </p>
          <h1
            className={`${syne.className} mt-4 bg-gradient-to-br from-amber-100 via-white to-amber-200/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl`}
          >
            Soleil Voisin
          </h1>
        </header>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
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

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/50 px-5 py-6 sm:px-6 sm:py-7">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-zinc-500">
                Description
              </p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {BOOK_SHOP_DESCRIPTION.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>
                    {textWithMonsieurPigeonLink(paragraph)}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-5 py-6 text-center sm:px-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-zinc-500">
                1 exemplaire
              </p>
              <p className="mt-3 font-mono text-4xl font-semibold tracking-tight text-amber-100">
                {offer.priceEur}&nbsp;€
              </p>

              <div className="mt-6 flex w-full flex-col items-stretch gap-3">
                <span
                  aria-disabled="true"
                  className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-900/50 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
                >
                  Bientôt disponible
                </span>

                <Link
                  href="/lecture"
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200 transition hover:border-sky-400/40 hover:text-sky-100"
                >
                  Lire gratuitement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
