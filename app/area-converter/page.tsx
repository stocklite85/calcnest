'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcArea, type AreaUnit } from '@/lib/area';

const PRESETS = [
  { ko: '원룸 (20㎡)', sqm: 20 },
  { ko: '투룸 (33㎡)', sqm: 33 },
  { ko: '아파트 (84㎡)', sqm: 84 },
  { ko: '아파트 (114㎡)', sqm: 114 },
];

export default function AreaConverterPage() {
  const { lang } = useLang();
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<AreaUnit>('pyeong');
  const [result, setResult] = useState<ReturnType<typeof calcArea> | null>(null);

  const handleCalc = () => {
    const v = parseFloat(value);
    if (!v || v <= 0) return;
    setResult(calcArea(v, unit));
  };

  const handlePreset = (sqm: number) => {
    setValue(String(sqm));
    setUnit('sqm');
    setResult(calcArea(sqm, 'sqm'));
  };

  const UNITS: { key: AreaUnit; label: string }[] = [
    { key: 'pyeong', label: t(lang, 'area.pyeong') },
    { key: 'sqm',    label: t(lang, 'area.sqm') },
    { key: 'sqft',   label: t(lang, 'area.sqft') },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">🏠</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'area.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'area.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      <div className="flex gap-2 flex-wrap mb-4">
        {PRESETS.map(p => (
          <button key={p.ko} onClick={() => handlePreset(p.sqm)}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-400 hover:text-blue-600 bg-white transition-colors">
            {p.ko}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{lang === 'ko' ? '입력 단위' : 'Input Unit'}</label>
          <div className="flex gap-2">
            {UNITS.map(u => (
              <button key={u.key} onClick={() => setUnit(u.key)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${unit === u.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}>
                {u.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {lang === 'ko' ? '면적 입력' : 'Area Value'}
          </label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="33"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
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
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600 font-medium">{t(lang, 'area.pyeong')}</span>
              <span className="text-xl font-bold text-blue-600">{result.pyeong.toFixed(2)} 평</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-slate-600 font-medium">{t(lang, 'area.sqm')}</span>
              <span className="text-xl font-bold text-slate-700">{result.sqm.toFixed(2)} ㎡</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600 font-medium">{t(lang, 'area.sqft')}</span>
              <span className="text-xl font-bold text-slate-700">{result.sqft.toFixed(2)} ft²</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
