import { BOOK_PDF_FILE_ID } from "@/lib/book/constants";
import {
  BOOK_PDF_CACHE_SECONDS,
  pdfResponseCacheControl,
} from "@/lib/book/pdf-cache";

export const runtime = "nodejs";

export async function GET() {
  const driveUrl = `https://drive.google.com/uc?export=download&id=${BOOK_PDF_FILE_ID}`;

  const response = await fetch(driveUrl, {
    redirect: "follow",
    next: { revalidate: BOOK_PDF_CACHE_SECONDS },
  });

  if (!response.ok || !response.body) {
    return new Response("Impossible de charger le PDF.", { status: 502 });
  }

  const contentLength = response.headers.get("content-length");

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": pdfResponseCacheControl(),
      ...(contentLength ? { "Content-Length": contentLength } : {}),
    },
  });
}
