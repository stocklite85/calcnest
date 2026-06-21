'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';

const TOOLS = [
  { slug: 'loan-calculator',      emoji: '🏦', category: 'finance', ko: '대출 이자 계산기',   en: 'Loan Interest Calculator',     descKo: '원리금균등·원금균등·만기일시 비교',  descEn: 'Compare loan repayment types' },
  { slug: 'savings-calculator',   emoji: '💰', category: 'finance', ko: '적금 계산기',         en: 'Savings Calculator',            descKo: '월 납입금으로 만기 수령액 계산',    descEn: 'Calculate maturity from deposits' },
  { slug: 'compound-calculator',  emoji: '📈', category: 'finance', ko: '복리 계산기',         en: 'Compound Interest Calculator', descKo: '복리 효과로 목돈 성장 시뮬레이션', descEn: 'Simulate compound growth' },
  { slug: 'salary-calculator',    emoji: '💼', category: 'finance', ko: '연봉 계산기',        en: 'Annual Salary Calculator',     descKo: '연봉으로 월 실수령액·공제액 계산',  descEn: 'Monthly net pay from annual salary' },
  { slug: 'bmi-calculator',       emoji: '⚖️', category: 'health',  ko: 'BMI 계산기',          en: 'BMI Calculator',                descKo: '체질량지수와 비만도 측정',           descEn: 'Body mass index & obesity level' },
  { slug: 'bmr-calculator',       emoji: '🔥', category: 'health',  ko: '기초대사량 계산기',  en: 'BMR Calculator',                descKo: '하루 기초대사량·권장 칼로리',       descEn: 'Daily BMR & calorie needs' },
  { slug: 'dday-calculator',      emoji: '📅', category: 'date',    ko: 'D-day 계산기',        en: 'D-day Calculator',              descKo: '특별한 날까지 남은 날짜',           descEn: 'Days until a special event' },
  { slug: 'age-calculator',       emoji: '🎂', category: 'date',    ko: '나이 계산기',         en: 'Age Calculator',                descKo: '만 나이·한국 나이 한번에',          descEn: 'International & Korean age' },
  { slug: 'date-diff-calculator', emoji: '🗓️', category: 'date',    ko: '날짜 차이 계산기',   en: 'Date Difference Calculator',   descKo: '두 날짜 사이 일·주·월·년 계산',    descEn: 'Days, weeks, months between dates' },
  { slug: 'area-converter',       emoji: '🏠', category: 'living',  ko: '평수 변환기',         en: 'Area Converter',                descKo: '평 ↔ ㎡ ↔ ft² 단위 변환',         descEn: 'Convert Pyeong, ㎡ and ft²' },
  { slug: 'data-converter',        emoji: '💾', category: 'living',   ko: '데이터 용량 변환기', en: 'Data Unit Converter',          descKo: 'Bit · KB · MB · GB · TB 변환',        descEn: 'Convert Bit, KB, MB, GB, TB' },
  { slug: 'vat-calculator',        emoji: '🧾', category: 'finance',  ko: '부가세 계산기',       en: 'VAT Calculator',               descKo: '공급가액·부가세(10%)·합계 자동 계산',   descEn: 'Calculate supply price, VAT and total' },
  { slug: 'percentage-calculator', emoji: '📊', category: 'finance',  ko: '백분율 계산기',       en: 'Percentage Calculator',        descKo: '할인율·증가율·비율 등 백분율 계산',      descEn: 'Calculate discounts, increases & ratios' },
  { slug: 'severance-calculator',  emoji: '📋', category: 'finance',  ko: '퇴직금 계산기',       en: 'Severance Pay Calculator',     descKo: '근로기준법 기준 퇴직금 계산',            descEn: 'Severance pay under Korean Labor Law' },
  { slug: 'temperature-converter', emoji: '🌡️', category: 'living',   ko: '온도 변환기',         en: 'Temperature Converter',        descKo: '섭씨 ↔ 화씨 ↔ 켈빈 단위 변환',        descEn: 'Convert Celsius, Fahrenheit & Kelvin' },
] as const;

type Category = 'all' | 'finance' | 'health' | 'date' | 'living';

const CATEGORIES: { key: Category; labelKey: string }[] = [
  { key: 'all',     labelKey: 'home.all' },
  { key: 'finance', labelKey: 'home.finance' },
  { key: 'health',  labelKey: 'home.health' },
  { key: 'date',    labelKey: 'home.date' },
  { key: 'living',  labelKey: 'home.living' },
];

export default function Home() {
  const { lang } = useLang();
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? TOOLS : TOOLS.filter(tool => tool.category === active);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          {t(lang, 'home.hero')}
        </h1>
        <p className="text-slate-500 text-base">{t(lang, 'home.hero.sub')}</p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              active === cat.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            {t(lang, cat.labelKey)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(tool => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="text-3xl mb-3">{tool.emoji}</div>
            <h2 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
              {lang === 'ko' ? tool.ko : tool.en}
            </h2>
            <p className="text-sm text-slate-500">
              {lang === 'ko' ? tool.descKo : tool.descEn}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
