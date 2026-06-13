import {
  MONSIEUR_PIGEON_FACEBOOK_URL,
  MONSIEUR_PIGEON_NAME,
} from "@/lib/site";
import type { ReactNode } from "react";

type MonsieurPigeonLinkProps = {
  className?: string;
};

export function MonsieurPigeonLink({ className }: MonsieurPigeonLinkProps) {
  return (
    <a
      href={MONSIEUR_PIGEON_FACEBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "cursor-pointer transition hover:text-sky-300 hover:underline underline-offset-4"
      }
    >
      {MONSIEUR_PIGEON_NAME}
    </a>
  );
}

export function textWithMonsieurPigeonLink(
  text: string,
  linkClassName?: string,
): ReactNode {
  const parts = text.split(MONSIEUR_PIGEON_NAME);
  if (parts.length === 1) return text;

  return parts.flatMap((part, index) => {
    const nodes: ReactNode[] = [part];
    if (index < parts.length - 1) {
      nodes.push(
        <MonsieurPigeonLink
          key={`monsieur-pigeon-${index}`}
          className={linkClassName}
        />,
      );
    }
    return nodes;
  });
}
