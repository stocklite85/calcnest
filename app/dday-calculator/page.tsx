'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcDday } from '@/lib/dday';

const PRESETS = [
  { ko: '수능', en: 'CSAT', month: 11, day: 14 },
  { ko: '크리스마스', en: 'Christmas', month: 12, day: 25 },
  { ko: '새해', en: "New Year's", month: 1, day: 1 },
];

export default function DdayCalculatorPage() {
  const { lang } = useLang();
  const [targetDate, setTargetDate] = useState('');
  const [label, setLabel] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcDday> | null>(null);
  const [savedLabel, setSavedLabel] = useState('');

  const handleCalc = () => {
    if (!targetDate) return;
    setSavedLabel(label);
    setResult(calcDday(targetDate));
  };

  const handlePreset = (p: typeof PRESETS[0]) => {
    const year = new Date().getFullYear();
    const date = new Date(year, p.month - 1, p.day);
    if (date < new Date()) date.setFullYear(year + 1);
    setTargetDate(date.toISOString().split('T')[0]);
    setLabel(lang === 'ko' ? p.ko : p.en);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">📅</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'dday.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'dday.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      <div className="flex gap-2 flex-wrap mb-4">
        {PRESETS.map(p => (
          <button key={p.ko} onClick={() => handlePreset(p)}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-400 hover:text-blue-600 bg-white transition-colors">
            {lang === 'ko' ? p.ko : p.en}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'dday.label')}</label>
          <input type="text" value={label} onChange={e => setLabel(e.target.value)}
            placeholder={lang === 'ko' ? '예: 수능, 졸업식, 여행' : 'e.g. Exam, Graduation, Trip'}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'dday.target')}</label>
          <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <button onClick={handleCalc}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          {t(lang, 'calc')}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
          {savedLabel && <p className="text-slate-500 text-sm mb-2">{savedLabel}</p>}
          {result.isToday ? (
            <p className="text-4xl font-bold text-blue-600">{t(lang, 'dday.today')}</p>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-1">
                {result.isPast ? t(lang, 'dday.passed') : t(lang, 'dday.remaining')}
              </p>
              <p className={`text-5xl font-bold ${result.isPast ? 'text-slate-400' : 'text-blue-600'}`}>
                {result.isPast ? `+${Math.abs(result.diff)}` : `D-${result.diff}`}
              </p>
            </>
          )}
          <p className="text-sm text-slate-400 mt-3">{targetDate}</p>
        </div>
      )}
    </div>
  );
}
