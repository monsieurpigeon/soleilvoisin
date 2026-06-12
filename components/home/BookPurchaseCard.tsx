import {
  BOOK_OFFERS,
  formatOfferBonus,
  formatOfferLabel,
  getCreemCheckoutUrl,
  getTotalQuantity,
} from "@/lib/book/creem";

export function BookPurchaseCard() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="text-center">
        <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-amber-300/90">
          Boutique
        </p>
        <p className="mt-3 text-sm text-zinc-400">
          Roman complet · science-politique-fiction
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {BOOK_OFFERS.map((offer) => {
          const bonus = formatOfferBonus(offer);
          const total = getTotalQuantity(offer);

          return (
          <li
            key={offer.quantity}
            className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/70"
          >
            <div className="border-b border-zinc-800/80 bg-gradient-to-br from-amber-500/10 via-transparent to-sky-500/5 px-5 py-6 text-center">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-zinc-500">
                {formatOfferLabel(offer)}
              </p>
              <p
                className={`mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] ${
                  bonus ? "text-amber-300/90" : "text-transparent"
                }`}
                aria-hidden={!bonus}
              >
                {bonus ?? "+ 10 exemplaires offerts"}
              </p>
              <p className="mt-3 font-mono text-3xl font-semibold tracking-tight text-amber-100">
                {offer.priceEur}&nbsp;€
              </p>
              <p
                className={`mt-1 text-xs ${
                  offer.quantity > 1 ? "text-zinc-500" : "text-transparent"
                }`}
                aria-hidden={offer.quantity === 1}
              >
                {offer.quantity > 1
                  ? `${total} au total · ${(offer.priceEur / total).toFixed(1)}\u00a0€ / ex.`
                  : "110 au total · 9.1\u00a0€ / ex."}
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-end p-5">
              <a
                href={getCreemCheckoutUrl(offer.productId)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 px-5 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-100 transition hover:border-amber-300/60 hover:bg-amber-500/20"
              >
                Acheter
              </a>
            </div>
          </li>
          );
        })}
      </ul>

      <p className="mt-8 text-center text-xs leading-relaxed text-zinc-600">
        Paiement sécurisé via{" "}
        <a
          href="https://docs.creem.io/getting-started/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-zinc-500 underline-offset-2 hover:text-zinc-400 hover:underline"
        >
          Creem
        </a>
        .
      </p>
    </div>
  );
}
