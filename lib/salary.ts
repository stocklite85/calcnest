export interface SalaryResult {
  gross: number;
  pension: number;
  health: number;
  longTermCare: number;
  employment: number;
  incomeTax: number;
  localTax: number;
  totalDeduction: number;
  net: number;
}

function 근로소득공제(annual: number): number {
  if (annual <= 5_000_000) return annual * 0.70;
  if (annual <= 15_000_000) return 3_500_000 + (annual - 5_000_000) * 0.40;
  if (annual <= 45_000_000) return 7_500_000 + (annual - 15_000_000) * 0.15;
  if (annual <= 100_000_000) return 12_000_000 + (annual - 45_000_000) * 0.05;
  return 14_750_000;
}

function calcAnnualTax(taxable: number): number {
  const brackets = [
    { limit: 14_000_000,    rate: 0.06, deduction: 0 },
    { limit: 50_000_000,    rate: 0.15, deduction: 1_260_000 },
    { limit: 88_000_000,    rate: 0.24, deduction: 5_760_000 },
    { limit: 150_000_000,   rate: 0.35, deduction: 15_440_000 },
    { limit: 300_000_000,   rate: 0.38, deduction: 19_940_000 },
    { limit: 500_000_000,   rate: 0.40, deduction: 25_940_000 },
    { limit: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
    { limit: Infinity,      rate: 0.45, deduction: 65_940_000 },
  ];
  if (taxable <= 0) return 0;
  for (const b of brackets) {
    if (taxable <= b.limit) return Math.max(0, taxable * b.rate - b.deduction);
  }
  return 0;
}

export function calcSalary(grossMan: number, dependents: number): SalaryResult {
  const gross = grossMan * 10000;

  // 4대보험 (2025년 기준)
  const pension = Math.floor(gross * 0.045);           // 국민연금 4.5%
  const health = Math.floor(gross * 0.03545);          // 건강보험 3.545%
  const longTermCare = Math.floor(health * 0.1295);    // 장기요양 12.95%
  const employment = Math.floor(gross * 0.009);        // 고용보험 0.9%

  // 소득세 (간이세액 근사치)
  const annual = gross * 12;
  const 공제후소득 = annual - 근로소득공제(annual);
  const 인적공제 = 1_500_000 * Math.max(1, dependents);
  const taxable = Math.max(0, 공제후소득 - 인적공제);
  const annualTax = calcAnnualTax(taxable);

  // 근로소득세액공제
  let taxCredit = 0;
  if (annualTax <= 1_300_000) taxCredit = annualTax * 0.55;
  else taxCredit = 715_000 + (annualTax - 1_300_000) * 0.30;
  taxCredit = Math.min(taxCredit, 740_000);

  const incomeTax = Math.max(0, Math.floor((annualTax - taxCredit) / 12));
  const localTax = Math.floor(incomeTax * 0.1);

  const totalDeduction = pension + health + longTermCare + employment + incomeTax + localTax;
  const net = gross - totalDeduction;

  return { gross, pension, health, longTermCare, employment, incomeTax, localTax, totalDeduction, net };
}

export function won(n: number): string {
  return Math.round(n).toLocaleString('ko-KR') + '원';
}
