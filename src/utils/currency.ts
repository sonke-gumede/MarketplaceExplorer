const USD_TO_ZAR = 18.5;

export const toRand = (usd: number): string =>
  `R${(usd * USD_TO_ZAR).toFixed(2)}`;
