import { OG_IMAGE, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const LINKEDIN_URL = "https://www.linkedin.com/in/maxime-pigeon/";

export const metadata: Metadata = {
  title: "Coincoin — Soleil Voisin",
  description:
    "Pour découvrir mes vrais projets, consultez mon profil LinkedIn.",
  alternates: {
    canonical: "/coincoin",
  },
  openGraph: {
    title: "Coincoin — Soleil Voisin",
    description:
      "Pour découvrir mes vrais projets, consultez mon profil LinkedIn.",
    url: "/coincoin",
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function CoincoinPage() {
  return (
    <main
      id="contenu-principal"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,189,248,0.1),transparent_55%),radial-gradient(ellipse_90%_70%_at_100%_100%,rgba(251,191,36,0.06),transparent_50%),linear-gradient(180deg,#030510_0%,#0a0f1e_45%,#030510_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <Link
          href="/home"
          className="mb-10 inline-block cursor-pointer font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-sky-300/80 transition hover:text-sky-200"
        >
          ← Retour
        </Link>

        <h1
          className={`${syne.className} bg-gradient-to-br from-amber-100 via-white to-amber-200/90 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl`}
        >
          Coincoin
        </h1>

        <Image
          src="/coincoin-ai.png"
          alt="Coincoin AI"
          width={902}
          height={1951}
          className="mx-auto mt-6 h-auto w-full max-w-[280px] object-contain sm:max-w-md"
          priority
        />

        <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
          Pour découvrir mes vrais projets, consultez mon profil{" "}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-medium text-sky-300 underline-offset-4 transition hover:text-sky-200 hover:underline"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </main>
  );
}
