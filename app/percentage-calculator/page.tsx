'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcPercent, type PercentMode } from '@/lib/percentage';

const MODES: { key: PercentMode; ko: string; en: string }[] = [
  { key: 'whatPercent', ko: 'A는 B의 몇 %?',   en: 'A is what % of B?' },
  { key: 'percentOf',   ko: 'B의 A%는?',        en: 'A% of B = ?' },
  { key: 'change',      ko: '변화율',            en: 'Change Rate' },
];

const LABELS: Record<PercentMode, { aKo: string; aEn: string; bKo: string; bEn: string }> = {
  whatPercent: { aKo: '값 A',     aEn: 'Value A',      bKo: '값 B',    bEn: 'Value B' },
  percentOf:   { aKo: '비율 (%)', aEn: 'Percent (%)',  bKo: '전체 값', bEn: 'Total Value' },
  change:      { aKo: '이전 값',  aEn: 'Before',       bKo: '이후 값', bEn: 'After' },
};

export default function PercentageCalculatorPage() {
  const { lang } = useLang();
  const isKo = lang === 'ko';
  const [mode, setMode] = useState<PercentMode>('whatPercent');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalc = () => {
    const na = parseFloat(a);
    const nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb) || nb === 0) return;
    setResult(calcPercent(mode, na, nb));
  };

  const handleModeChange = (m: PercentMode) => {
    setMode(m);
    setResult(null);
    setA('');
    setB('');
  };

  const lbl = LABELS[mode];

  const getDisplayValue = () => {
    if (result === null) return '';
    if (mode === 'percentOf') {
      return result.toLocaleString('ko-KR', { maximumFractionDigits: 6 });
    }
    const prefix = mode === 'change' && result > 0 ? '+' : '';
    return `${prefix}${result.toFixed(4).replace(/\.?0+$/, '')}%`;
  };

  const getDescription = () => {
    if (result === null) return '';
    const na = parseFloat(a);
    const nb = parseFloat(b);
    if (mode === 'whatPercent') {
      return isKo
        ? `${na.toLocaleString()}는 ${nb.toLocaleString()}의 ${getDisplayValue()}입니다`
        : `${na.toLocaleString()} is ${getDisplayValue()} of ${nb.toLocaleString()}`;
    }
    if (mode === 'percentOf') {
      return isKo
        ? `${nb.toLocaleString()}의 ${na}% = ${getDisplayValue()}`
        : `${na}% of ${nb.toLocaleString()} = ${getDisplayValue()}`;
    }
    const prefix = result > 0 ? '+' : '';
    return isKo
      ? `${na.toLocaleString()} → ${nb.toLocaleString()}: ${prefix}${result.toFixed(2)}% 변화`
      : `${na.toLocaleString()} → ${nb.toLocaleString()}: ${prefix}${result.toFixed(2)}% change`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">
        ← {t(lang, 'nav.home')}
      </Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">📊</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'pct.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'pct.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">
        {t(lang, 'privacy.badge')}
      </p>

      <div className="flex gap-2 mb-4">
        {MODES.map(m => (
          <button
            key={m.key}
            onClick={() => handleModeChange(m.key)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
              mode === m.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
            }`}
          >
            {isKo ? m.ko : m.en}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {isKo ? lbl.aKo : lbl.aEn}
          </label>
          <input
            type="number"
            value={a}
            onChange={e => setA(e.target.value)}
            placeholder="0"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {isKo ? lbl.bKo : lbl.bEn}
          </label>
          <input
            type="number"
            value={b}
            onChange={e => setB(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCalc()}
            placeholder="0"
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

      {result !== null && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-3">{t(lang, 'result')}</h2>
          <p className={`text-3xl font-bold mb-2 ${
            mode === 'change'
              ? result > 0 ? 'text-green-600' : result < 0 ? 'text-red-500' : 'text-slate-700'
              : 'text-blue-600'
          }`}>
            {getDisplayValue()}
          </p>
          <p className="text-sm text-slate-500">{getDescription()}</p>
        </div>
      )}
    </div>
  );
}
