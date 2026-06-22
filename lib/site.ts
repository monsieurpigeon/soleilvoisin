export const SITE_NAME = "Soleil Voisin";

export const MONSIEUR_PIGEON_NAME = "Monsieur Pigeon";

export const MONSIEUR_PIGEON_FACEBOOK_URL =
  "https://www.facebook.com/mons.pigeon";

export const META_PIXEL_ID = "376866626108811";

export const OG_IMAGE_PATH = "/og-image.png";

export const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "Soleil Voisin — Roman de science-politique-fiction vers Alpha du Centaure",
} as const;

export function getSiteUrl(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}
