'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcDateDiff } from '@/lib/dateDiff';

export default function DateDiffCalculatorPage() {
  const { lang } = useLang();
  const today = new Date().toISOString().split('T')[0];
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcDateDiff> | null>(null);

  const handleCalc = () => {
    if (!from || !to) return;
    setResult(calcDateDiff(from, to));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">🗓️</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'dateDiff.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'dateDiff.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'dateDiff.from')}</label>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'dateDiff.to')}</label>
            <input type="date" value={to} onChange={e => setTo(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
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
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'dateDiff.days')}</p>
              <p className="text-2xl font-bold text-blue-600">{result.days.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'dateDiff.weeks')}</p>
              <p className="text-2xl font-bold text-slate-700">{result.weeks.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'dateDiff.months')}</p>
              <p className="text-2xl font-bold text-slate-700">{result.months.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'dateDiff.years')}</p>
              <p className="text-2xl font-bold text-slate-700">{result.years.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
