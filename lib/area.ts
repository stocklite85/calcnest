// 1평 = 3.30579㎡, 1㎡ = 10.7639ft²
const PYEONG_TO_SQM = 3.30579;
const SQM_TO_SQFT = 10.7639;

export interface AreaResult {
  pyeong: number;
  sqm: number;
  sqft: number;
}

export type AreaUnit = 'pyeong' | 'sqm' | 'sqft';

export function calcArea(value: number, from: AreaUnit): AreaResult {
  let sqm: number;

  if (from === 'pyeong') sqm = value * PYEONG_TO_SQM;
  else if (from === 'sqft') sqm = value / SQM_TO_SQFT;
  else sqm = value;

  return {
    pyeong: sqm / PYEONG_TO_SQM,
    sqm,
    sqft: sqm * SQM_TO_SQFT,
  };
}
