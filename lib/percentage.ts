export type PercentMode = 'whatPercent' | 'percentOf' | 'change';

export function calcPercent(mode: PercentMode, a: number, b: number): number {
  if (mode === 'whatPercent') return (a / b) * 100;
  if (mode === 'percentOf') return (b * a) / 100;
  return ((b - a) / Math.abs(a)) * 100;
}
