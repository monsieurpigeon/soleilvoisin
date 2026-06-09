"use client";

import dynamic from "next/dynamic";

const BookViewer = dynamic(
  () => import("./BookViewer").then((mod) => mod.BookViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[60svh] items-center justify-center">
        <p className="animate-pulse font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">
          Ouverture du livre…
        </p>
      </div>
    ),
  },
);

export function BookViewerLoader() {
  return <BookViewer />;
}
