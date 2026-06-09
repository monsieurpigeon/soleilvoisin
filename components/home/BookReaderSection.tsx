"use client";

import { BookViewerLoader } from "@/components/book/BookViewerLoader";
import { MobileDriveLink } from "@/components/home/MobileDriveLink";
import { useIsMobile } from "@/components/home/useIsMobile";
import { BOOK_PDF_DRIVE_URL } from "@/lib/book/constants";

export function BookReaderSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileDriveLink />;
  }

  return (
    <>
      <BookViewerLoader />
      <p className="shrink-0 text-center text-xs text-zinc-500">
        Le fichier est hébergé sur Google Drive. Si le livre ne s&apos;affiche
        pas,{" "}
        <a
          href={BOOK_PDF_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-sky-400 underline-offset-2 hover:text-sky-300 hover:underline"
        >
          ouvrez le PDF dans un nouvel onglet
        </a>
        .
      </p>
    </>
  );
}
