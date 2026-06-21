export type CompoundFreq = 'annually' | 'monthly';

export interface CompoundResult {
  final: number;
  profit: number;
  returnRate: number;
}

export function calcCompound(principalMan: number, annualRate: number, years: number, freq: CompoundFreq): CompoundResult {
  const principal = principalMan * 10000;
  const n = freq === 'monthly' ? 12 : 1;
  const r = annualRate / 100 / n;
  const periods = n * years;

  const final = principal * Math.pow(1 + r, periods);
  const profit = final - principal;
  const returnRate = (profit / principal) * 100;

  return { final, profit, returnRate };
}

export function won(n: number): string {
  return Math.round(n).toLocaleString('ko-KR') + '원';
}
