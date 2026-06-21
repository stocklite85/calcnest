export interface AgeResult {
  international: number;  // 만 나이
  korean: number;         // 한국 나이
  yearAge: number;        // 연 나이
  daysUntilBirthday: number;
  nextBirthdayDate: string;
  totalDaysLived: number;
}

export function calcAge(birthDateStr: string): AgeResult {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birth = new Date(birthDateStr);
  birth.setHours(0, 0, 0, 0);

  const todayYear = today.getFullYear();
  const birthYear = birth.getFullYear();
  const birthMonth = birth.getMonth();
  const birthDay = birth.getDate();

  // 만 나이
  let international = todayYear - birthYear;
  const hadBirthdayThisYear =
    today.getMonth() > birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() >= birthDay);
  if (!hadBirthdayThisYear) international -= 1;

  // 한국 나이
  const korean = todayYear - birthYear + 1;

  // 연 나이
  const yearAge = todayYear - birthYear;

  // 다음 생일
  let nextBirthday = new Date(todayYear, birthMonth, birthDay);
  if (nextBirthday <= today) {
    nextBirthday = new Date(todayYear + 1, birthMonth, birthDay);
  }
  const daysUntilBirthday = Math.round((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const nextBirthdayDate = nextBirthday.toLocaleDateString('ko-KR');

  // 살아온 날
  const totalDaysLived = Math.round((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

  return { international, korean, yearAge, daysUntilBirthday, nextBirthdayDate, totalDaysLived };
}
