import type { Metadata } from "next";
import { Syne } from "next/font/google";
import Link from "next/link";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Stellarium — Alpha du Centaure",
  description:
    "Exposé sur Alpha du Centaure : système triple, exoplanètes, observation et exploration. Le voisin stellaire qui inspire Soleil Voisin.",
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.4em] text-sky-300/90">
      {children}
    </h2>
  );
}

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
          α Centauri · Rigel Kentaurus · Toliman
        </p>

        <div className="mt-10 space-y-10 text-base leading-relaxed text-zinc-300 sm:text-lg">
          <section className="space-y-4">
            <SectionTitle>Le voisin immédiat</SectionTitle>
            <p>
              À seulement{" "}
              <strong className="font-medium text-zinc-100">4,37 années-lumière</strong>,
              Alpha du Centaure est le système stellaire le plus proche du Soleil. Dans
              l&apos;immensité de la Voie lactée, c&apos;est presque au bout du jardin :
              un voisinage cosmique, pas une contrée lointaine. C&apos;est ce voisinage
              qui a donné son titre au roman{" "}
              <em className="text-zinc-200">Soleil Voisin</em> — l&apos;idée qu&apos;on
              puisse viser l&apos;Alpha sans quitter tout à fait le réel astronomique.
            </p>
            <p>
              Connue aussi sous le nom arabe{" "}
              <strong className="font-medium text-zinc-100">Rigel Kentaurus</strong> ou
              de Toliman, l&apos;étoile brille dans la constellation du Centaure. Depuis
              l&apos;hémisphère sud, c&apos;est la{" "}
              <strong className="font-medium text-zinc-100">
                troisième étoile la plus brillante
              </strong>{" "}
              du ciel nocturne — un repère naturel pour trouver la Croix du Sud.
            </p>
          </section>

          <section className="space-y-4">
            <SectionTitle>Un système triple</SectionTitle>
            <p>
              Alpha du Centaure n&apos;est pas une étoile isolée mais un{" "}
              <strong className="font-medium text-zinc-100">système triple</strong> :
              trois astres liés par la gravité, qui orbitent autour d&apos;un centre
              commun.
            </p>
            <p>
              <strong className="font-medium text-zinc-100">Alpha Centauri A</strong>{" "}
              (Rigil Kentaurus) est une étoile de type G2V — une cousine du Soleil,
              légèrement plus massive et plus lumineuse.{" "}
              <strong className="font-medium text-zinc-100">Alpha Centauri B</strong>,
              plus orangée (K1V), est un peu plus petite et moins brillante. Les deux
              tournent l&apos;une autour de l&apos;autre en environ{" "}
              <strong className="font-medium text-zinc-100">80 ans</strong>, séparées
              en moyenne par une distance comparable à celle entre Saturne et le Soleil.
            </p>
            <p>
              La troisième membre du trio,{" "}
              <strong className="font-medium text-zinc-100">Proxima Centauri</strong>,
              est une naine rouge bien plus froide et discrète. Elle orbite le couple
              A-B à environ <strong className="font-medium text-zinc-100">0,2 année-lumière</strong>{" "}
              — loin du duo central, mais toujours gravitationnellement attachée. Et c&apos;est
              elle, paradoxalement, qui est{" "}
              <strong className="font-medium text-zinc-100">l&apos;étoile la plus proche de la Terre</strong>,
              à environ 4,24 années-lumière.
            </p>
          </section>

          <section className="space-y-4">
            <SectionTitle>Exoplanètes et habitabilité</SectionTitle>
            <p>
              En 2016, la découverte de{" "}
              <strong className="font-medium text-zinc-100">Proxima b</strong> a
              relancé l&apos;imaginaire : une exoplanète de masse terrestre, en orbite
              dans la zone habitable de Proxima, là où l&apos;eau liquide pourrait
              théoriquement exister en surface. Une seconde planète candidate,{" "}
              <strong className="font-medium text-zinc-100">Proxima c</strong>, a
              ensuite été signalée, bien que moins bien caractérisée.
            </p>
            <p>
              Mais habitable sur le papier ne veut pas dire accueillant. Proxima est
              une naine rouge active : éruptions et radiations intenses qui bombardent
              ses planètes. L&apos;environnement y serait probablement très différent
              de la Terre — atmosphère érodée, dureté des conditions, incertitudes
              sur la stabilité climatique. Autour d&apos;Alpha Centauri A et B, la
              recherche de planètes se poursuit ; rien n&apos;a encore été confirmé
              de façon définitive, mais le système reste une cible majeure.
            </p>
            <p>
              C&apos;est précisément dans cet entre-deux — assez proche pour qu&apos;un
              voyage interstellaire devienne un récit plausible, assez hostile pour
              qu&apos;il ne soit jamais simple — que s&apos;inscrit la science-fiction
              politique de <em className="text-zinc-200">Soleil Voisin</em>.
            </p>
          </section>

          <section className="space-y-4">
            <SectionTitle>Observer Alpha du Centaure</SectionTitle>
            <p>
              Alpha du Centaure est invisible depuis l&apos;Europe et une grande
              partie de l&apos;hémisphère nord. Il faut descendre vers les latitudes
              méridionales pour la voir à l&apos;œil nu : Australie, Amérique du Sud,
              Afrique australe. Là, elle scintille près du pôle céleste sud, voisine
              de la Croix du Sud — ce petit astérisme qui, pour les navigateurs comme
              pour les rêveurs, indique le sud avec une netteté presque vertigineuse.
            </p>
            <p>
              À la jumelle ou au télescope, le système se dédouble : A et B, si proches
              à l&apos;œil nu qu&apos;elles fusionnent en un seul point lumineux,
              révèlent alors leur nature binaire. Proxima, beaucoup plus faible, exige
              un instrument plus sensible — ou une carte stellaire en ligne.
            </p>
          </section>

          <section className="space-y-4">
            <SectionTitle>Vers les étoiles</SectionTitle>
            <p>
              Alpha du Centaure n&apos;est pas qu&apos;un objet de catalogue. C&apos;est
              une destination symbolique : la première étoile vers laquelle l&apos;humanité
              pourrait un jour tendre les bras. Des projets comme{" "}
              <strong className="font-medium text-zinc-100">Breakthrough Starshot</strong>{" "}
              envisagent d&apos;envoyer des micro-sondes propulsées par laser, capables
              d&apos;atteindre une fraction significative de la vitesse de la lumière —
              des décennies de voyage plutôt que des millénaires.
            </p>
            <p>
              Les défis restent immenses : énergie, miniaturisation, survie du voyage,
              retour d&apos;information. Mais le système le plus proche est aussi le
              laboratoire le plus accessible pour penser l&apos;interstellaire. Quatre
              années-lumière, c&apos;est le jardin d&apos;à-côté — et déjà un autre
              monde.
            </p>
          </section>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
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

        <div className="mt-10 text-center">
          <a
            href="https://stellarium-web.org/skysource/RigilKent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/10 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 transition hover:border-sky-300/60 hover:bg-sky-500/20"
          >
            Voir sur Stellarium Web
          </a>
          <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-zinc-600">
            Rigil Kent · α Centauri
          </p>
        </div>

        <p className="mt-10 border-t border-zinc-800/80 pt-8 text-center text-sm leading-relaxed text-zinc-500">
          <Link
            href="/mistral"
            className="cursor-pointer text-sky-400/80 transition hover:text-sky-300"
          >
            Lire aussi la conversation Mistral sur Alpha du Centaure →
          </Link>
        </p>
      </article>
    </main>
  );
}
