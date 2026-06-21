'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcSavings, won } from '@/lib/savings';

export default function SavingsCalculatorPage() {
  const { lang } = useLang();
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [taxFree, setTaxFree] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calcSavings> | null>(null);

  const handleCalc = () => {
    const m = parseFloat(monthly);
    const r = parseFloat(rate);
    const mo = parseInt(months);
    if (!m || !r || !mo || m <= 0 || r <= 0 || mo <= 0) return;
    setResult(calcSavings(m, r, mo, taxFree));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">💰</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'savings.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'savings.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'savings.monthly')}</label>
          <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
            placeholder="50"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'savings.rate')}</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1"
            placeholder="3.5"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'savings.period')}</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)}
            placeholder="12"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t(lang, 'savings.taxType')}</label>
          <div className="flex gap-2">
            {[false, true].map(isFree => (
              <button key={String(isFree)} onClick={() => setTaxFree(isFree)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${taxFree === isFree ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}>
                {isFree ? t(lang, 'savings.taxFree') : t(lang, 'savings.taxNormal')}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleCalc}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          {t(lang, 'calc')}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">{t(lang, 'result')}</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{t(lang, 'savings.principal')}</span>
              <span className="font-medium">{won(result.principal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{t(lang, 'savings.interest')}</span>
              <span className="font-medium">{won(result.preInterest)}</span>
            </div>
            {result.tax > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t(lang, 'savings.tax')} (15.4%)</span>
                <span className="font-medium text-red-500">- {won(result.tax)}</span>
              </div>
            )}
            <div className="border-t border-slate-100 pt-3 flex justify-between">
              <span className="font-semibold text-slate-900">{t(lang, 'savings.maturity')}</span>
              <span className="text-xl font-bold text-blue-600">{won(result.maturity)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
