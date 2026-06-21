export interface VatResult {
  supply: number;
  vat: number;
  total: number;
}

export type VatMode = 'supply' | 'total';

export function calcVat(amount: number, mode: VatMode): VatResult {
  if (mode === 'supply') {
    const vat = Math.round(amount * 0.1);
    return { supply: amount, vat, total: amount + vat };
  }
  const supply = Math.round(amount / 1.1);
  const vat = amount - supply;
  return { supply, vat, total: amount };
}
