'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcVat, type VatMode } from '@/lib/vat';

const PRESETS = [
  { label: '1만원',   amount: 10000 },
  { label: '10만원',  amount: 100000 },
  { label: '100만원', amount: 1000000 },
  { label: '1000만원', amount: 10000000 },
];

export default function VatCalculatorPage() {
  const { lang } = useLang();
  const isKo = lang === 'ko';
  const [mode, setMode] = useState<VatMode>('supply');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcVat> | null>(null);

  const handleCalc = () => {
    const v = parseFloat(amount);
    if (!v || v <= 0) return;
    setResult(calcVat(v, mode));
  };

  const handlePreset = (amt: number) => {
    setAmount(String(amt));
    setResult(calcVat(amt, mode));
  };

  const fmt = (n: number) => n.toLocaleString('ko-KR');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">
        ← {t(lang, 'nav.home')}
      </Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">🧾</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'vat.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'vat.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">
        {t(lang, 'privacy.badge')}
      </p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {isKo ? '계산 방향' : 'Mode'}
          </label>
          <div className="flex gap-2">
            {(['supply', 'total'] as VatMode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setResult(null); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  mode === m
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                }`}
              >
                {t(lang, `vat.mode.${m}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {PRESETS.map(p => (
            <button
              key={p.amount}
              onClick={() => handlePreset(p.amount)}
              className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-400 hover:text-blue-600 bg-white transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(lang, mode === 'supply' ? 'vat.supply' : 'vat.total')} (원)
          </label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCalc()}
            placeholder="100000"
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
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600">{t(lang, 'vat.supply')}</span>
              <span className="font-semibold text-slate-800">{fmt(result.supply)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600">{t(lang, 'vat.vat')}</span>
              <span className="font-semibold text-green-600">{fmt(result.vat)}원</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700 font-medium">{t(lang, 'vat.total')}</span>
              <span className="text-xl font-bold text-blue-600">{fmt(result.total)}원</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
