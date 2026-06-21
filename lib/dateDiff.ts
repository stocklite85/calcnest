export interface DateDiffResult {
  days: number;
  weeks: number;
  months: number;
  years: number;
}

export function calcDateDiff(fromStr: string, toStr: string): DateDiffResult {
  const from = new Date(fromStr);
  const to = new Date(toStr);
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);

  const days = Math.abs(Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
  const weeks = Math.floor(days / 7);

  const [start, end] = from <= to ? [from, to] : [to, from];
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  const years = Math.floor(months / 12);

  return { days, weeks, months, years };
}
