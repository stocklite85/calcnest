export interface SavingsResult {
  principal: number;
  preInterest: number;
  tax: number;
  maturity: number;
}

export function calcSavings(monthlyMan: number, annualRate: number, months: number, taxFree: boolean): SavingsResult {
  const monthly = monthlyMan * 10000;
  const r = annualRate / 100 / 12;
  const principal = monthly * months;

  // 정기적금 이자 계산 (단리, 월납 기준)
  // 이자 = 월납입금 × 이율/12 × (납입월수 × (납입월수+1) / 2)
  const preInterest = monthly * r * (months * (months + 1)) / 2;

  const taxRate = taxFree ? 0 : 0.154;
  const tax = Math.floor(preInterest * taxRate);
  const maturity = principal + preInterest - tax;

  return { principal, preInterest, tax, maturity };
}

export function won(n: number): string {
  return Math.round(n).toLocaleString('ko-KR') + '원';
}
