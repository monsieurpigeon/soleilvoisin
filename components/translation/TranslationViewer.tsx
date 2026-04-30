"use client";

import { useEffect, useMemo, useState } from "react";
import { renderMarkdown } from "./MarkdownRenderer";
import { TranslationDocument } from "@/lib/translations/types";

type TranslationViewerProps = {
  document: TranslationDocument;
};

export function TranslationViewer({ document }: TranslationViewerProps) {
  const [language, setLanguage] = useState(document.defaultLanguage);
  const [contentByLanguage, setContentByLanguage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadTranslations = async () => {
      try {
        const entries = await Promise.all(
          document.languages.map(async (lang) => {
            const response = await fetch(lang.file);
            const text = response.ok
              ? await response.text()
              : `# ${lang.label}\n\nLe fichier Markdown est introuvable.`;
            return [lang.code, text] as const;
          })
        );

        if (!active) return;
        setContentByLanguage(Object.fromEntries(entries));
      } finally {
        if (active) setLoading(false);
      }
    };

    loadTranslations();
    return () => {
      active = false;
    };
  }, [document]);

  const activeContentId = `translation-content-${document.slug}-${language}`;

  const renderedContent = useMemo(() => {
    const markdown = contentByLanguage[language];
    if (!markdown) return null;
    return renderMarkdown(markdown);
  }, [contentByLanguage, language]);

  return (
    <main id="contenu-principal" className="mx-auto min-h-svh w-full max-w-4xl px-2 py-3 sm:px-6 sm:py-12">
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="sticky top-0 z-20 -mx-2 border-b border-zinc-800/80 bg-zinc-950/95 px-2 py-2 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3" role="tablist" aria-label="Choix de la langue">
            {document.languages.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`translation-content-${document.slug}-${lang.code}`}
                  id={`translation-tab-${document.slug}-${lang.code}`}
                  className={`min-h-11 rounded-xl border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                    isActive
                      ? "border-sky-400/70 bg-sky-500/20 text-sky-100"
                      : "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-500"
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        <h1 className="mt-3 text-xl font-bold text-white sm:mt-6 sm:text-3xl">{document.title}</h1>
        <p className="mt-2 text-xs text-zinc-300 sm:mt-3 sm:text-base">{document.description}</p>

        <section
          id={activeContentId}
          role="tabpanel"
          aria-labelledby={`translation-tab-${document.slug}-${language}`}
          lang={language}
          className="mt-3 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 p-2 sm:mt-8 sm:p-6"
        >
          {loading ? (
            <p className="text-zinc-200" aria-live="polite">
              Chargement du contenu...
            </p>
          ) : (
            renderedContent
          )}
        </section>
      </div>
    </main>
  );
}
