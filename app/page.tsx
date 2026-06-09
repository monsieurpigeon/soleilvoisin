import Link from "next/link";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function Home() {
  return (
    <main
      id="contenu-principal"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16"
    >
      {/* Fond cosmos */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(ellipse_90%_70%_at_100%_100%,rgba(251,191,36,0.08),transparent_50%),linear-gradient(180deg,#030510_0%,#0a0f1e_45%,#030510_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.45), transparent),
            radial-gradient(1px 1px at 25% 65%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 78% 12%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 40% 88%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 55% 35%, rgba(255,255,255,0.15), transparent),
            radial-gradient(1px 1px at 15% 90%, rgba(255,255,255,0.22), transparent),
            radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.18), transparent)
          `,
        }}
        aria-hidden
      />
      {/* Halo « soleil » */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[min(70vw,520px)] w-[min(95vw,900px)] -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-500/25 via-orange-400/15 to-transparent blur-3xl"
        style={{ animation: "soleil-breathe 10s ease-in-out infinite" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-amber-400/20 blur-[100px]"
        style={{ animation: "soleil-breathe 12s ease-in-out infinite 1s" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-6 font-mono text-[0.65rem] font-medium uppercase tracking-[0.45em] text-sky-300/90">
          Science · Politique · Fiction
        </p>

        <h1
          className={`${syne.className} bg-gradient-to-br from-amber-100 via-white to-amber-200/90 bg-clip-text text-5xl font-extrabold leading-[1.05] tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(251,191,36,0.25)] sm:text-6xl sm:leading-[1.02] md:text-7xl md:leading-none lg:text-8xl`}
          style={{
            backgroundSize: "200% 200%",
            animation: "soleil-shimmer 14s ease-in-out infinite",
          }}
        >
          Soleil<br />Voisin
        </h1>

        <div className="mx-auto mt-10 h-px max-w-xs bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <p className="mx-auto mt-10 max-w-lg text-lg leading-relaxed text-zinc-400 sm:text-xl">
          On laisse Mars aux américains, <br />
          <span className="text-zinc-200">les bons petits français</span> <br />
          iront sur l’Alpha du Centaure.
        </p>

        <div className="mt-14 flex flex-col items-center gap-6">
          <p
            className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-400"
            style={{ animation: "float-dust 5s ease-in-out infinite alternate" }}
          >
            Bientôt dans les librairies
          </p>

          <Link
            href="/home"
            className="inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.15)] transition hover:border-amber-300/60 hover:bg-amber-500/20 hover:shadow-[0_0_40px_rgba(251,191,36,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030510]"
          >
            Accéder au site
          </Link>
        </div>
      </div>
    </main>
  );
}
