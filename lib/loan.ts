export type RepayType = 'equal' | 'principal' | 'bullet';

export interface LoanResult {
  type: RepayType;
  monthlyFirst: number;
  totalInterest: number;
  totalPayment: number;
  schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[];
}

export function calcLoan(amountMan: number, annualRate: number, months: number, type: RepayType): LoanResult {
  const amount = amountMan * 10000;
  const r = annualRate / 100 / 12;
  const schedule: LoanResult['schedule'] = [];

  if (type === 'equal') {
    // 원리금균등
    const monthly = r === 0 ? amount / months : amount * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    let balance = amount;
    for (let i = 1; i <= months; i++) {
      const interest = balance * r;
      const principal = monthly - interest;
      balance -= principal;
      schedule.push({ month: i, payment: monthly, principal, interest, balance: Math.max(0, balance) });
    }
    const totalPayment = monthly * months;
    return { type, monthlyFirst: monthly, totalInterest: totalPayment - amount, totalPayment, schedule };
  }

  if (type === 'principal') {
    // 원금균등
    const principalPerMonth = amount / months;
    let balance = amount;
    let totalInterest = 0;
    for (let i = 1; i <= months; i++) {
      const interest = balance * r;
      const payment = principalPerMonth + interest;
      balance -= principalPerMonth;
      totalInterest += interest;
      schedule.push({ month: i, payment, principal: principalPerMonth, interest, balance: Math.max(0, balance) });
    }
    return {
      type,
      monthlyFirst: schedule[0].payment,
      totalInterest,
      totalPayment: amount + totalInterest,
      schedule,
    };
  }

  // 만기일시
  const monthlyInterest = amount * r;
  for (let i = 1; i <= months; i++) {
    const isLast = i === months;
    const payment = isLast ? amount + monthlyInterest : monthlyInterest;
    const principal = isLast ? amount : 0;
    schedule.push({ month: i, payment, principal, interest: monthlyInterest, balance: isLast ? 0 : amount });
  }
  const totalInterest = monthlyInterest * months;
  return { type, monthlyFirst: monthlyInterest, totalInterest, totalPayment: amount + totalInterest, schedule };
}

export function won(n: number): string {
  return Math.round(n).toLocaleString('ko-KR') + '원';
}
