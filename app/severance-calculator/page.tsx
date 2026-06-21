'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcSeverance } from '@/lib/severance';

export default function SeveranceCalculatorPage() {
  const { lang } = useLang();
  const isKo = lang === 'ko';
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [avgSalary, setAvgSalary] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcSeverance> | null>(null);

  const handleCalc = () => {
    if (!startDate || !endDate || !avgSalary) return;
    const salary = parseFloat(avgSalary);
    if (!salary || salary <= 0) return;
    setResult(calcSeverance(startDate, endDate, salary));
  };

  const fmt = (n: number) => n.toLocaleString('ko-KR');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">
        ← {t(lang, 'nav.home')}
      </Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">📋</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'severance.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'severance.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-2">
        {t(lang, 'privacy.badge')}
      </p>
      <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-6">
        {isKo
          ? '⚠️ 지급 기준: 계속 근로기간 1년 이상, 주 15시간 이상 근무 (근로기준법 제34조). 결과는 참고용입니다.'
          : '⚠️ Eligibility: 1+ year continuous employment, 15+ hrs/week (Korean Labor Standards Act §34). For reference only.'}
      </p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(lang, 'severance.start')}
          </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(lang, 'severance.end')}
          </label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(lang, 'severance.avgSalary')}
          </label>
          <input
            type="number"
            value={avgSalary}
            onChange={e => setAvgSalary(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCalc()}
            placeholder="300"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          onClick={handleCalc}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {t(lang, 'calc')}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">{t(lang, 'result')}</h2>

          {!result.eligible && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
              {t(lang, 'severance.ineligible')}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600">{t(lang, 'severance.days')}</span>
              <span className="font-semibold">{fmt(result.workingDays)}{isKo ? '일' : ' days'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600">{t(lang, 'severance.years')}</span>
              <span className="font-semibold">{result.workingYears.toFixed(2)}{isKo ? '년' : ' yrs'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600">{t(lang, 'severance.dailyWage')}</span>
              <span className="font-semibold">{fmt(Math.round(result.dailyAvgWage))}원</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700 font-medium">{t(lang, 'severance.amount')}</span>
              <span className={`text-xl font-bold ${result.eligible ? 'text-blue-600' : 'text-slate-400'}`}>
                {fmt(result.severanceWon)}원
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
