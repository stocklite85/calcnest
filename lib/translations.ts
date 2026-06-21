type Lang = 'ko' | 'en';

const data: Record<string, Record<Lang, string>> = {
  // Site
  'site.title': { ko: 'CalcNest — 생활 계산기 모음', en: 'CalcNest — Free Online Calculators' },
  'site.description': { ko: '대출, BMI, D-day, 나이, 적금, 급여 등 자주 쓰는 생활 계산기를 무료로 제공합니다.', en: 'Free online calculators for loans, BMI, D-day, age, savings, salary and more.' },
  'site.tagline': { ko: '자주 쓰는 계산기, 한 곳에서', en: 'All the calculators you need, in one place' },

  // Nav
  'nav.home': { ko: '홈', en: 'Home' },
  'nav.lang': { ko: '🇺🇸 English', en: '🇰🇷 한국어' },

  // Homepage
  'home.hero': { ko: '무료 생활 계산기', en: 'Free Life Calculators' },
  'home.hero.sub': { ko: '광고 없이 바로 계산. 모든 데이터는 브라우저에서만 처리됩니다.', en: 'Calculate instantly. All data stays in your browser.' },
  'home.all': { ko: '전체', en: 'All' },
  'home.finance': { ko: '금융', en: 'Finance' },
  'home.health': { ko: '건강', en: 'Health' },
  'home.date': { ko: '날짜', en: 'Date' },
  'home.living': { ko: '생활', en: 'Living' },

  // Footer
  'footer.privacy': { ko: '개인정보 처리방침', en: 'Privacy Policy' },
  'footer.rights': { ko: '모든 계산 결과는 참고용이며 법적 효력이 없습니다.', en: 'All results are for reference only and have no legal effect.' },

  // Common
  'calc': { ko: '계산하기', en: 'Calculate' },
  'reset': { ko: '초기화', en: 'Reset' },
  'copy': { ko: '복사', en: 'Copy' },
  'copied': { ko: '복사됨', en: 'Copied' },
  'result': { ko: '계산 결과', en: 'Result' },
  'privacy.badge': { ko: '🔒 모든 계산은 브라우저에서만 처리됩니다', en: '🔒 All calculations run locally in your browser' },

  // Loan Calculator
  'loan.title': { ko: '대출 이자 계산기', en: 'Loan Interest Calculator' },
  'loan.desc': { ko: '원리금균등, 원금균등, 만기일시 상환 방식 비교', en: 'Compare equal payment, equal principal, and bullet repayment' },
  'loan.amount': { ko: '대출 금액 (만원)', en: 'Loan Amount (KRW 10k)' },
  'loan.rate': { ko: '연 이자율 (%)', en: 'Annual Interest Rate (%)' },
  'loan.period': { ko: '대출 기간 (개월)', en: 'Loan Period (months)' },
  'loan.type': { ko: '상환 방식', en: 'Repayment Type' },
  'loan.type.equal': { ko: '원리금균등', en: 'Equal Payment' },
  'loan.type.principal': { ko: '원금균등', en: 'Equal Principal' },
  'loan.type.bullet': { ko: '만기일시', en: 'Bullet' },
  'loan.monthly': { ko: '월 상환금', en: 'Monthly Payment' },
  'loan.totalInterest': { ko: '총 이자', en: 'Total Interest' },
  'loan.totalPayment': { ko: '총 상환금', en: 'Total Payment' },

  // BMI Calculator
  'bmi.title': { ko: 'BMI 계산기', en: 'BMI Calculator' },
  'bmi.desc': { ko: '체질량지수(BMI)와 비만도 측정', en: 'Calculate Body Mass Index and obesity level' },
  'bmi.height': { ko: '키 (cm)', en: 'Height (cm)' },
  'bmi.weight': { ko: '몸무게 (kg)', en: 'Weight (kg)' },
  'bmi.result': { ko: 'BMI 지수', en: 'BMI Index' },
  'bmi.underweight': { ko: '저체중', en: 'Underweight' },
  'bmi.normal': { ko: '정상', en: 'Normal' },
  'bmi.overweight': { ko: '과체중', en: 'Overweight' },
  'bmi.obese': { ko: '비만', en: 'Obese' },
  'bmi.severeObese': { ko: '고도비만', en: 'Severely Obese' },

  // D-day Calculator
  'dday.title': { ko: 'D-day 계산기', en: 'D-day Calculator' },
  'dday.desc': { ko: '특별한 날까지 남은 날짜 계산', en: 'Calculate days until a special event' },
  'dday.target': { ko: '목표 날짜', en: 'Target Date' },
  'dday.label': { ko: '이름 (선택)', en: 'Label (optional)' },
  'dday.remaining': { ko: '남은 날', en: 'Days Remaining' },
  'dday.passed': { ko: '지난 날', en: 'Days Passed' },
  'dday.today': { ko: '오늘!', en: 'Today!' },

  // Age Calculator
  'age.title': { ko: '나이 계산기', en: 'Age Calculator' },
  'age.desc': { ko: '만 나이, 한국식 나이, 연도별 나이 계산', en: 'Calculate international age, Korean age, and more' },
  'age.birth': { ko: '생년월일', en: 'Date of Birth' },
  'age.international': { ko: '만 나이', en: 'International Age' },
  'age.korean': { ko: '한국 나이', en: 'Korean Age' },
  'age.year': { ko: '연 나이', en: 'Year Age' },
  'age.nextBirthday': { ko: '다음 생일까지', en: 'Until Next Birthday' },

  // Savings Calculator
  'savings.title': { ko: '적금 계산기', en: 'Savings Calculator' },
  'savings.desc': { ko: '월 납입금, 이자율, 기간으로 만기 금액 계산', en: 'Calculate maturity amount from monthly deposits' },
  'savings.monthly': { ko: '월 납입금 (만원)', en: 'Monthly Deposit (KRW 10k)' },
  'savings.rate': { ko: '연 이자율 (%)', en: 'Annual Interest Rate (%)' },
  'savings.period': { ko: '납입 기간 (개월)', en: 'Period (months)' },
  'savings.taxType': { ko: '세금 구분', en: 'Tax Type' },
  'savings.taxNormal': { ko: '일반과세 (15.4%)', en: 'Standard Tax (15.4%)' },
  'savings.taxFree': { ko: '비과세', en: 'Tax-free' },
  'savings.principal': { ko: '납입 원금', en: 'Total Principal' },
  'savings.interest': { ko: '세전 이자', en: 'Pre-tax Interest' },
  'savings.tax': { ko: '세금', en: 'Tax' },
  'savings.maturity': { ko: '만기 수령액', en: 'Maturity Amount' },

  // Salary Calculator
  'salary.title': { ko: '세후 급여 계산기', en: 'After-tax Salary Calculator' },
  'salary.desc': { ko: '4대보험 공제 후 실수령액 계산', en: 'Calculate take-home pay after deductions' },
  'salary.gross': { ko: '세전 월급 (만원)', en: 'Gross Monthly Salary (KRW 10k)' },
  'salary.dependents': { ko: '부양가족 수 (본인 포함)', en: 'Dependents (including self)' },
  'salary.net': { ko: '실수령액', en: 'Net Pay' },
  'salary.incomeTax': { ko: '소득세 + 지방소득세', en: 'Income Tax + Local Tax' },
  'salary.pension': { ko: '국민연금', en: 'National Pension' },
  'salary.health': { ko: '건강보험 + 장기요양', en: 'Health Insurance' },
  'salary.employment': { ko: '고용보험', en: 'Employment Insurance' },
  'salary.totalDeduction': { ko: '총 공제액', en: 'Total Deductions' },

  // BMR Calculator
  'bmr.title': { ko: '기초대사량 계산기', en: 'BMR Calculator' },
  'bmr.desc': { ko: '하루 기초대사량과 활동 칼로리 계산', en: 'Calculate Basal Metabolic Rate and daily calories' },
  'bmr.gender': { ko: '성별', en: 'Gender' },
  'bmr.male': { ko: '남성', en: 'Male' },
  'bmr.female': { ko: '여성', en: 'Female' },
  'bmr.age': { ko: '나이', en: 'Age' },
  'bmr.height': { ko: '키 (cm)', en: 'Height (cm)' },
  'bmr.weight': { ko: '몸무게 (kg)', en: 'Weight (kg)' },
  'bmr.activity': { ko: '활동 수준', en: 'Activity Level' },
  'bmr.sedentary': { ko: '거의 움직이지 않음', en: 'Sedentary' },
  'bmr.light': { ko: '가벼운 운동 (주 1-3회)', en: 'Light Exercise (1-3x/week)' },
  'bmr.moderate': { ko: '보통 운동 (주 3-5회)', en: 'Moderate Exercise (3-5x/week)' },
  'bmr.active': { ko: '격렬한 운동 (주 6-7회)', en: 'Active Exercise (6-7x/week)' },
  'bmr.veryActive': { ko: '매우 격렬 (운동선수)', en: 'Very Active (Athlete)' },
  'bmr.bmr': { ko: '기초대사량', en: 'BMR' },
  'bmr.tdee': { ko: '하루 권장 칼로리', en: 'Daily Calories (TDEE)' },

  // Date Diff Calculator
  'dateDiff.title': { ko: '날짜 차이 계산기', en: 'Date Difference Calculator' },
  'dateDiff.desc': { ko: '두 날짜 사이의 기간 계산', en: 'Calculate the period between two dates' },
  'dateDiff.from': { ko: '시작 날짜', en: 'Start Date' },
  'dateDiff.to': { ko: '종료 날짜', en: 'End Date' },
  'dateDiff.days': { ko: '일', en: 'Days' },
  'dateDiff.weeks': { ko: '주', en: 'Weeks' },
  'dateDiff.months': { ko: '개월', en: 'Months' },
  'dateDiff.years': { ko: '년', en: 'Years' },

  // Area Converter
  'area.title': { ko: '평수 변환기', en: 'Area Converter' },
  'area.desc': { ko: '평 ↔ ㎡ ↔ ft² 단위 변환', en: 'Convert between Pyeong, ㎡ and ft²' },
  'area.pyeong': { ko: '평', en: 'Pyeong' },
  'area.sqm': { ko: '제곱미터 (㎡)', en: 'Square Meters (㎡)' },
  'area.sqft': { ko: '제곱피트 (ft²)', en: 'Square Feet (ft²)' },

  // Compound Interest
  'compound.title': { ko: '복리 계산기', en: 'Compound Interest Calculator' },
  'compound.desc': { ko: '복리 효과로 목돈 성장 시뮬레이션', en: 'Simulate lump-sum growth with compound interest' },
  'compound.principal': { ko: '원금 (만원)', en: 'Principal (KRW 10k)' },
  'compound.rate': { ko: '연 이자율 (%)', en: 'Annual Interest Rate (%)' },
  'compound.years': { ko: '투자 기간 (년)', en: 'Investment Period (years)' },
  'compound.freq': { ko: '복리 주기', en: 'Compounding Frequency' },
  'compound.annually': { ko: '연 복리', en: 'Annually' },
  'compound.monthly': { ko: '월 복리', en: 'Monthly' },
  'compound.final': { ko: '최종 금액', en: 'Final Amount' },
  'compound.profit': { ko: '수익', en: 'Profit' },
  'compound.rate.return': { ko: '수익률', en: 'Return Rate' },
};

export function t(lang: Lang, key: string): string {
  return data[key]?.[lang] ?? key;
}
