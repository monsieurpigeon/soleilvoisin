import { BOOK_PDF_FILE_ID } from "@/lib/book/constants";

export const runtime = "nodejs";

export async function GET() {
  const driveUrl = `https://drive.google.com/uc?export=download&id=${BOOK_PDF_FILE_ID}`;

  const response = await fetch(driveUrl, {
    redirect: "follow",
    next: { revalidate: 3600 },
  });

  if (!response.ok || !response.body) {
    return new Response("Impossible de charger le PDF.", { status: 502 });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
