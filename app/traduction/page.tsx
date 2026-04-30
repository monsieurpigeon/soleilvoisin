import Link from "next/link";
import { translationDocuments } from "@/lib/translations";

export default function TraductionPage() {
  return (
    <main id="contenu-principal" className="mx-auto min-h-svh w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Textes a traduire</h1>
        <p className="mt-3 text-sm text-zinc-300 sm:text-base">
          Selectionne un texte pour ouvrir ses traductions.
        </p>

        <ul className="mt-6 space-y-3">
          {translationDocuments.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/traduction/${doc.slug}`}
                className="block rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:text-base"
              >
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
