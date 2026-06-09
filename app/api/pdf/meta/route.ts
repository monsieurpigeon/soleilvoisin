import {
  BOOK_PDF_VERSION_CHECK_SECONDS,
  probeDrivePdfVersion,
} from "@/lib/book/pdf-cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const version = await probeDrivePdfVersion();

    return Response.json(
      { version },
      {
        headers: {
          "Cache-Control": `public, max-age=${BOOK_PDF_VERSION_CHECK_SECONDS}, must-revalidate`,
        },
      },
    );
  } catch {
    return Response.json(
      { error: "Impossible de vérifier la version du PDF." },
      { status: 502 },
    );
  }
}
