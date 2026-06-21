export type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export interface TempResult {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
}

export function convertTemp(value: number, from: TempUnit): TempResult {
  let c: number;
  if (from === 'fahrenheit') c = (value - 32) * (5 / 9);
  else if (from === 'kelvin') c = value - 273.15;
  else c = value;
  return { celsius: c, fahrenheit: c * (9 / 5) + 32, kelvin: c + 273.15 };
}
