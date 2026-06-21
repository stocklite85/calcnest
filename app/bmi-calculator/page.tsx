'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcBmi } from '@/lib/bmi';

const CATEGORY_COLOR = {
  underweight:  { bg: 'bg-blue-50',   text: 'text-blue-600',   bar: 'bg-blue-400' },
  normal:       { bg: 'bg-green-50',  text: 'text-green-600',  bar: 'bg-green-400' },
  overweight:   { bg: 'bg-yellow-50', text: 'text-yellow-600', bar: 'bg-yellow-400' },
  obese:        { bg: 'bg-orange-50', text: 'text-orange-600', bar: 'bg-orange-400' },
  severeObese:  { bg: 'bg-red-50',    text: 'text-red-600',    bar: 'bg-red-400' },
};

const BAR_POSITION: Record<string, number> = {
  underweight: 10, normal: 30, overweight: 55, obese: 72, severeObese: 90,
};

export default function BmiCalculatorPage() {
  const { lang } = useLang();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcBmi> | null>(null);

  const handleCalc = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;
    setResult(calcBmi(h, w));
  };

  const color = result ? CATEGORY_COLOR[result.category] : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">⚖️</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'bmi.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'bmi.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'bmi.height')}</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="170"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'bmi.weight')}</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="65"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <button onClick={handleCalc}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          {t(lang, 'calc')}
        </button>
      </div>

      {result && color && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className={`${color.bg} rounded-lg p-5 text-center`}>
            <p className="text-sm text-slate-500 mb-1">{t(lang, 'bmi.result')}</p>
            <p className={`text-4xl font-bold ${color.text}`}>{result.bmi.toFixed(1)}</p>
            <p className={`text-lg font-semibold mt-1 ${color.text}`}>{t(lang, `bmi.${result.category}`)}</p>
          </div>

          {/* BMI 구간 바 */}
          <div>
            <div className="relative h-3 rounded-full bg-gradient-to-r from-blue-300 via-green-300 via-yellow-300 via-orange-300 to-red-400 mb-1">
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-slate-700 rounded-full shadow"
                style={{ left: `${BAR_POSITION[result.category]}%` }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>18.5↓</span><span>23</span><span>25</span><span>30↑</span>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">{lang === 'ko' ? '정상 체중 범위' : 'Normal weight range'}</span>
            <span className="font-medium">{result.idealWeightMin.toFixed(1)} ~ {result.idealWeightMax.toFixed(1)} kg</span>
          </div>
        </div>
      )}
    </div>
  );
}
