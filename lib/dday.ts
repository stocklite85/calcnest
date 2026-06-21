export interface DdayResult {
  diff: number;       // 양수: 남은 날, 음수: 지난 날, 0: 오늘
  isToday: boolean;
  isPast: boolean;
}

export function calcDday(targetDateStr: string): DdayResult {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);

  const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    diff,
    isToday: diff === 0,
    isPast: diff < 0,
  };
}
