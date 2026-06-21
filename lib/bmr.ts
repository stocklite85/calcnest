export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

export interface BmrResult {
  bmr: number;
  tdee: number;
}

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export function calcBmr(gender: Gender, age: number, heightCm: number, weightKg: number, activity: ActivityLevel): BmrResult {
  // Mifflin-St Jeor 공식
  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = bmr * ACTIVITY_FACTORS[activity];
  return { bmr, tdee };
}
