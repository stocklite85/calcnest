export interface BmiResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese' | 'severeObese';
  idealWeightMin: number;
  idealWeightMax: number;
}

export function calcBmi(heightCm: number, weightKg: number): BmiResult {
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);

  let category: BmiResult['category'];
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 23) category = 'normal';
  else if (bmi < 25) category = 'overweight';
  else if (bmi < 30) category = 'obese';
  else category = 'severeObese';

  const idealWeightMin = 18.5 * h * h;
  const idealWeightMax = 22.9 * h * h;

  return { bmi, category, idealWeightMin, idealWeightMax };
}
