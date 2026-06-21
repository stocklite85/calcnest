'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcSalary, won } from '@/lib/salary';

export default function SalaryCalculatorPage() {
  const { lang } = useLang();
  const [gross, setGross] = useState('');
  const [dependents, setDependents] = useState('1');
  const [result, setResult] = useState<ReturnType<typeof calcSalary> | null>(null);

  const handleCalc = () => {
    const g = parseFloat(gross);
    const d = parseInt(dependents);
    if (!g || g <= 0) return;
    setResult(calcSalary(g, d || 1));
  };

  const rows = result ? [
    { label: t(lang, 'salary.pension'),    value: result.pension,       color: 'text-red-500' },
    { label: t(lang, 'salary.health'),     value: result.health + result.longTermCare, color: 'text-red-500' },
    { label: t(lang, 'salary.employment'), value: result.employment,    color: 'text-red-500' },
    { label: t(lang, 'salary.incomeTax'),  value: result.incomeTax + result.localTax, color: 'text-red-500' },
  ] : [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">💼</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'salary.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'salary.desc')}</p>
        <p className="text-xs text-slate-400 mt-1">{lang === 'ko' ? '2025년 4대보험 요율 기준 · 소득세 간이세액표 근사치' : 'Based on 2025 insurance rates · Approximate income tax'}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'salary.gross')}</label>
          <input type="number" value={gross} onChange={e => setGross(e.target.value)}
            placeholder="300"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'salary.dependents')}</label>
          <select value={dependents} onChange={e => setDependents(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
            {[1,2,3,4,5,6].map(n => (
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
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">{t(lang, 'result')}</h2>

          <div className="bg-blue-50 rounded-lg p-4 text-center mb-4">
            <p className="text-sm text-slate-500 mb-1">{t(lang, 'salary.net')}</p>
            <p className="text-3xl font-bold text-blue-600">{won(result.net)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-500">
              <span>{lang === 'ko' ? '세전 월급' : 'Gross Salary'}</span>
              <span className="font-medium text-slate-700">{won(result.gross)}</span>
            </div>
            {rows.map(row => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-slate-500">{row.label}</span>
                <span className={`font-medium ${row.color}`}>- {won(row.value)}</span>
              </div>
            ))}
            <div className="border-t border-slate-100 pt-2 flex justify-between text-sm">
              <span className="font-medium text-slate-700">{t(lang, 'salary.totalDeduction')}</span>
              <span className="font-medium text-red-500">- {won(result.totalDeduction)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
