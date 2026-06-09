import { BOOK_PDF_FILE_ID } from "@/lib/book/constants";

/** Durée de cache du fichier PDF côté serveur / navigateur (secondes). */
export const BOOK_PDF_CACHE_SECONDS = 300;

/** Intervalle entre deux vérifications de version côté client (secondes). */
export const BOOK_PDF_VERSION_CHECK_SECONDS = 60;

const DRIVE_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${BOOK_PDF_FILE_ID}`;

export function getBookPdfUrl(version: string): string {
  return `/api/pdf?v=${encodeURIComponent(version)}`;
}

export async function probeDrivePdfVersion(): Promise<string> {
  const response = await fetch(DRIVE_DOWNLOAD_URL, {
    headers: { Range: "bytes=0-0" },
    redirect: "follow",
    cache: "no-store",
  });

  if (!response.ok && response.status !== 206) {
    throw new Error(`Drive PDF probe failed (${response.status})`);
  }

  const etag = response.headers.get("etag")?.replace(/"/g, "");
  const lastModified = response.headers.get("last-modified");
  const contentRange = response.headers.get("content-range");
  const totalBytes = contentRange?.split("/")[1];
  const contentLength =
    totalBytes ?? response.headers.get("content-length") ?? undefined;

  if (etag) return etag;
  if (lastModified && contentLength) return `${lastModified}:${contentLength}`;

  return `t${Math.floor(Date.now() / (BOOK_PDF_CACHE_SECONDS * 1000))}`;
}

export function pdfResponseCacheControl(): string {
  return `public, max-age=${BOOK_PDF_CACHE_SECONDS}, stale-while-revalidate=${BOOK_PDF_CACHE_SECONDS * 2}`;
}
