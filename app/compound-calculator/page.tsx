'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcCompound, won, type CompoundFreq } from '@/lib/compound';

export default function CompoundCalculatorPage() {
  const { lang } = useLang();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [freq, setFreq] = useState<CompoundFreq>('annually');
  const [result, setResult] = useState<ReturnType<typeof calcCompound> | null>(null);

  const handleCalc = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseInt(years);
    if (!p || !r || !y || p <= 0 || r <= 0 || y <= 0) return;
    setResult(calcCompound(p, r, y, freq));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">📈</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'compound.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'compound.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'compound.principal')}</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)}
            placeholder="1000"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'compound.rate')}</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1"
            placeholder="7"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'compound.years')}</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)}
            placeholder="10"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t(lang, 'compound.freq')}</label>
          <div className="flex gap-2">
            {(['annually', 'monthly'] as CompoundFreq[]).map(f => (
              <button key={f} onClick={() => setFreq(f)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${freq === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}>
                {t(lang, `compound.${f}`)}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'compound.final')}</p>
              <p className="text-lg font-bold text-blue-600">{won(result.final)}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'compound.profit')}</p>
              <p className="text-lg font-bold text-green-600">+{won(result.profit)}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'compound.rate.return')}</p>
              <p className="text-lg font-bold text-slate-700">+{result.returnRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
