import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coincoin — Soleil Voisin",
  description: "Coincoin AI",
};

export default function CoincoinPage() {
  return (
    <main
      id="contenu-principal"
      className="flex min-h-svh items-center justify-center bg-[#FFE600] px-6 py-12"
    >
      <Image
        src="/coincoin-ai.png"
        alt="Coincoin AI"
        width={902}
        height={1951}
        className="h-auto w-full max-w-md object-contain sm:max-w-lg"
        priority
      />
    </main>
  );
}
