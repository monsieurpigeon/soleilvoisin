import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Soleil Voisin — Roman de science-politique-fiction vers Alpha du Centaure";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(ellipse 90% 70% at 100% 100%, rgba(251,191,36,0.12), transparent 50%), linear-gradient(180deg, #030510 0%, #0a0f1e 45%, #030510 100%)",
          padding: "64px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.45), transparent),
              radial-gradient(1px 1px at 78% 12%, rgba(255,255,255,0.35), transparent),
              radial-gradient(1px 1px at 40% 88%, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 90% 75%, rgba(255,255,255,0.22), transparent)
            `,
          }}
        />

        <p
          style={{
            fontSize: 22,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(125, 211, 252, 0.9)",
            marginBottom: 24,
          }}
        >
          Science · Politique · Fiction
        </p>

        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1,
            textAlign: "center",
            background: "linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #fde68a 100%)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          Soleil Voisin
        </div>

        <div
          style={{
            marginTop: 36,
            height: 2,
            width: 200,
            background:
              "linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)",
          }}
        />

        <p
          style={{
            marginTop: 36,
            maxWidth: 820,
            fontSize: 30,
            lineHeight: 1.45,
            textAlign: "center",
            color: "rgba(228, 232, 240, 0.88)",
          }}
        >
          On laisse Mars aux américains. Les bons petits français iront sur
          l&apos;Alpha du Centaure.
        </p>

        <p
          style={{
            position: "absolute",
            bottom: 48,
            fontSize: 20,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(161, 161, 170, 0.9)",
          }}
        >
          Lisez le roman en ligne
        </p>
      </div>
    ),
    { ...size },
  );
}
