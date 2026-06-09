import { BOOK_PDF_DRIVE_URL } from "@/lib/book/constants";

export function MobileDriveLink() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 text-center shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-sky-300/90">
        Lecture mobile
      </p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-400">
        Le lecteur intégré est optimisé pour ordinateur. Sur mobile, ouvrez le
        PDF directement sur Google Drive.
      </p>
      <a
        href={BOOK_PDF_DRIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.15)] transition hover:border-amber-300/60 hover:bg-amber-500/20"
      >
        Lire sur Google Drive
      </a>
    </div>
  );
}
