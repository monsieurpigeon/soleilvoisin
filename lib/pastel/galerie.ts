import fs from "fs";
import path from "path";

export const PASTEL_LONG_SIDE = 800;
export const PASTEL_SHORT_SIDE = 600;

export type PastelOrientation = "portrait" | "paysage";

export type PastelPainting = {
  title: string;
  artist: string;
  date: string;
  description: string;
  image: string;
  orientation: PastelOrientation;
  width: number;
  height: number;
};

const GALERIE_PATH = path.join(process.cwd(), "public/pastel/galerie.md");

function parseField(line: string, key: string): string | null {
  const match = line.match(
    new RegExp(`^-\\s+\\**${key}\\**:?\\**\\s*(.+)$`, "i"),
  );
  return match?.[1]?.trim() ?? null;
}

function parseOrientation(value: string): PastelOrientation | null {
  const normalized = value.toLowerCase();
  if (normalized === "portrait") return "portrait";
  if (normalized === "paysage" || normalized === "landscape") return "paysage";
  return null;
}

export function getPastelDimensions(
  orientation: PastelOrientation,
): Pick<PastelPainting, "width" | "height"> {
  return orientation === "paysage"
    ? { width: PASTEL_LONG_SIDE, height: PASTEL_SHORT_SIDE }
    : { width: PASTEL_SHORT_SIDE, height: PASTEL_LONG_SIDE };
}

export function parseGalerieMd(content: string): PastelPainting[] {
  const paintings: PastelPainting[] = [];
  const sections = content.split(/^## /m).slice(1);

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const title = lines[0]?.trim();
    if (!title) continue;

    let artist = "";
    let date = "";
    let imageFile = "";
    let description = "";
    let orientation: PastelOrientation = "paysage";

    for (const line of lines.slice(1)) {
      const parsedArtist = parseField(line, "Artiste");
      const parsedDate = parseField(line, "Date");
      const parsedImage = parseField(line, "Image");
      const parsedDescription = parseField(line, "Description");
      const parsedFormat = parseField(line, "Format");
      if (parsedArtist) artist = parsedArtist;
      if (parsedDate) date = parsedDate;
      if (parsedImage) imageFile = parsedImage;
      if (parsedDescription) description = parsedDescription;
      if (parsedFormat) {
        const parsedOrientation = parseOrientation(parsedFormat);
        if (parsedOrientation) orientation = parsedOrientation;
      }
    }

    if (!artist || !imageFile) continue;

    paintings.push({
      title,
      artist,
      date,
      description,
      image: `/pastel/${imageFile}`,
      orientation,
      ...getPastelDimensions(orientation),
    });
  }

  return paintings;
}

export function getPastelGalerie(): PastelPainting[] {
  const content = fs.readFileSync(GALERIE_PATH, "utf-8");
  return parseGalerieMd(content);
}
