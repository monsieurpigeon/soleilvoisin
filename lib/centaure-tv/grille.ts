import fs from "fs";
import path from "path";

export type CentaureTvProgram = {
  title: string;
  description: string;
  duration: string;
  image: string;
};

const GRILLE_PATH = path.join(process.cwd(), "public/centaure-tv/grille.md");

function parseField(line: string, key: string): string | null {
  const match = line.match(
    new RegExp(`^-\\s+\\**${key}\\**:?\\**\\s*(.*)$`, "i"),
  );
  if (!match) return null;
  return match[1]?.trim() ?? "";
}

function isListFieldLine(line: string): boolean {
  return /^-\s+\**/.test(line.trim());
}

function readMultilineField(
  lines: string[],
  startIndex: number,
  initialValue: string,
): { value: string; nextIndex: number } {
  const parts = initialValue ? [initialValue] : [];
  let index = startIndex;

  while (index + 1 < lines.length) {
    const nextLine = lines[index + 1];
    if (nextLine.trim() === "" || isListFieldLine(nextLine)) break;
    index += 1;
    parts.push(nextLine.trim());
  }

  return {
    value: parts.join("\n"),
    nextIndex: index,
  };
}

export function parseGrilleMd(content: string): CentaureTvProgram[] {
  const programs: CentaureTvProgram[] = [];
  const sections = content.split(/^## /m).slice(1);

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const title = lines[0]?.trim();
    if (!title) continue;

    let description = "";
    let duration = "";
    let imageFile = "";

    for (let index = 1; index < lines.length; index += 1) {
      const line = lines[index];
      const parsedDescription = parseField(line, "Description");
      const parsedDuration = parseField(line, "Durée");
      const parsedImage = parseField(line, "Image");

      if (parsedDescription !== null) {
        const multiline = readMultilineField(lines, index, parsedDescription);
        description = multiline.value;
        index = multiline.nextIndex;
        continue;
      }

      if (parsedDuration !== null) duration = parsedDuration;
      if (parsedImage !== null) imageFile = parsedImage;
    }

    if (!description || !duration || !imageFile) continue;

    programs.push({
      title,
      description,
      duration,
      image: `/centaure-tv/${imageFile}`,
    });
  }

  return programs;
}

export function getCentaureTvGrille(): CentaureTvProgram[] {
  const content = fs.readFileSync(GRILLE_PATH, "utf-8");
  return parseGrilleMd(content);
}
