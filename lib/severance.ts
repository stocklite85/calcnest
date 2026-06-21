export interface SeveranceResult {
  workingDays: number;
  workingYears: number;
  dailyAvgWage: number;
  severanceWon: number;
  eligible: boolean;
}

// 퇴직금 = 일평균임금 × 30 × (재직일수 / 365)
// 일평균임금 = 퇴직 전 3개월 급여합계 / 91일
export function calcSeverance(
  startDate: string,
  endDate: string,
  avgMonthlyMan: number
): SeveranceResult {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const workingDays = Math.max(0, Math.floor((end.getTime() - start.getTime()) / 86400000));
  const workingYears = workingDays / 365;
  const eligible = workingDays >= 365;
  const dailyAvgWage = (avgMonthlyMan * 10000 * 3) / 91;
  const severanceWon = eligible ? Math.round(dailyAvgWage * 30 * workingYears) : 0;
  return { workingDays, workingYears, dailyAvgWage, severanceWon, eligible };
}
