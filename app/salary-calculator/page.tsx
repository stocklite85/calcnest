'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcSalary, won } from '@/lib/salary';

const EXAMPLES = [
  { label: '3,000만원', value: '3000' },
  { label: '4,000만원', value: '4000' },
  { label: '5,000만원', value: '5000' },
  { label: '1억원', value: '10000' },
];

export default function SalaryCalculatorPage() {
  const { lang } = useLang();
  const [annual, setAnnual] = useState('');
  const [dependents, setDependents] = useState('1');
  const [result, setResult] = useState<ReturnType<typeof calcSalary> | null>(null);

  const handleCalc = () => {
    const a = parseFloat(annual);
    const d = parseInt(dependents);
    if (!a || a <= 0) return;
    setResult(calcSalary(a, d || 1));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">💼</div>
        <h1 className="text-2xl font-bold text-slate-900">
          {lang === 'ko' ? '연봉 계산기' : 'Annual Salary Calculator'}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {lang === 'ko' ? '연봉으로 월 실수령액과 4대보험·소득세 공제액을 계산합니다.' : 'Calculate monthly net pay and deductions from annual salary.'}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'ko' ? '2025년 4대보험 요율 기준 · 소득세 간이세액표 근사치' : 'Based on 2025 insurance rates · Approximate income tax'}
        </p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      {/* 빠른 예시 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {EXAMPLES.map(ex => (
          <button key={ex.label} onClick={() => setAnnual(ex.value)}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors bg-white">
            {ex.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'ko' ? '연봉 (만원)' : 'Annual Salary (KRW 10k)'}
          </label>
          <input type="number" value={annual} onChange={e => setAnnual(e.target.value)}
            placeholder="4000"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'salary.dependents')}</label>
          <select value={dependents} onChange={e => setDependents(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>{n}{lang === 'ko' ? '명' : ' person(s)'}</option>
            ))}
          </select>
        </div>

        <button onClick={handleCalc}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          {t(lang, 'calc')}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">{t(lang, 'result')}</h2>

          {/* 핵심 결과 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{lang === 'ko' ? '월 실수령액' : 'Monthly Net'}</p>
              <p className="text-xl font-bold text-blue-600">{won(result.monthlyNet)}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{lang === 'ko' ? '연 실수령액' : 'Annual Net'}</p>
              <p className="text-xl font-bold text-slate-700">{won(result.annualNet)}</p>
            </div>
          </div>

          {/* 공제 내역 */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>{lang === 'ko' ? '월 세전 급여' : 'Monthly Gross'}</span>
              <span className="font-medium text-slate-700">{won(result.monthlyGross)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t(lang, 'salary.pension')}</span>
              <span className="text-red-500">- {won(result.pension)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t(lang, 'salary.health')}</span>
              <span className="text-red-500">- {won(result.health + result.longTermCare)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t(lang, 'salary.employment')}</span>
              <span className="text-red-500">- {won(result.employment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t(lang, 'salary.incomeTax')}</span>
              <span className="text-red-500">- {won(result.incomeTax + result.localTax)}</span>
            </div>
            <div className="border-t border-slate-100 pt-2 flex justify-between font-medium">
              <span className="text-slate-700">{t(lang, 'salary.totalDeduction')}</span>
              <span className="text-red-500">- {won(result.totalDeduction)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
