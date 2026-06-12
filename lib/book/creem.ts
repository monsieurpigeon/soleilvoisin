export type BookOffer = {
  quantity: number;
  bonusQuantity: number;
  priceEur: number;
  productId: string;
};

function creemProductId(
  envValue: string | undefined,
  fallback: string,
): string {
  return envValue?.trim() || fallback;
}

/** Description affichée sur /shop — paragraphes séparés par une ligne vide */
export const BOOK_SHOP_DESCRIPTION = `Roman de science-politique-fiction.
Magazine de 24 pages.

Au moins 99% de cet ouvrage a été produit sans IA

Ecrit et illustré par Monsieur Pigeon`;

export const SINGLE_BOOK_OFFER: BookOffer = {
  quantity: 1,
  bonusQuantity: 0,
  priceEur: 10,
  productId: creemProductId(
    process.env.NEXT_PUBLIC_CREEM_PRODUCT_1,
    "prod_6GvfIMSlgInK02KKlPF1aV",
  ),
};

/** Offres boutique — productId à configurer dans Creem ou via NEXT_PUBLIC_CREEM_PRODUCT_* */
export const BOOK_OFFERS: BookOffer[] = [
  SINGLE_BOOK_OFFER,
  {
    quantity: 10,
    bonusQuantity: 1,
    priceEur: 100,
    productId: creemProductId(
      process.env.NEXT_PUBLIC_CREEM_PRODUCT_10,
      "prod_PACK_10_A_CONFIGURER",
    ),
  },
  {
    quantity: 100,
    bonusQuantity: 12,
    priceEur: 1000,
    productId: creemProductId(
      process.env.NEXT_PUBLIC_CREEM_PRODUCT_100,
      "prod_PACK_100_A_CONFIGURER",
    ),
  },
  {
    quantity: 1000,
    bonusQuantity: 123,
    priceEur: 10000,
    productId: creemProductId(
      process.env.NEXT_PUBLIC_CREEM_PRODUCT_100,
      "prod_PACK_100_A_CONFIGURER",
    ),
  },
];

export function getCreemCheckoutUrl(productId: string): string {
  return `https://www.creem.io/payment/${productId}`;
}

export function getTotalQuantity(offer: BookOffer): number {
  return offer.quantity + offer.bonusQuantity;
}

export function formatOfferLabel(offer: BookOffer): string {
  if (offer.quantity === 1) return "1 exemplaire";
  return `${offer.quantity} exemplaires`;
}

export function formatOfferBonus(offer: BookOffer): string | null {
  if (offer.bonusQuantity <= 0) return null;
  const unit =
    offer.bonusQuantity === 1 ? "exemplaire offert" : "exemplaires offerts";
  return `+ ${offer.bonusQuantity} ${unit}`;
}
