'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcBmr, type Gender, type ActivityLevel } from '@/lib/bmr';

const ACTIVITIES: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'veryActive'];

export default function BmrCalculatorPage() {
  const { lang } = useLang();
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [result, setResult] = useState<ReturnType<typeof calcBmr> | null>(null);

  const handleCalc = () => {
    const a = parseInt(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!a || !h || !w || a <= 0 || h <= 0 || w <= 0) return;
    setResult(calcBmr(gender, a, h, w, activity));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">🔥</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'bmr.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'bmr.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t(lang, 'bmr.gender')}</label>
          <div className="flex gap-2">
            {(['male', 'female'] as Gender[]).map(g => (
              <button key={g} onClick={() => setGender(g)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${gender === g ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}>
                {t(lang, `bmr.${g}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'bmr.age')}</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="30"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'bmr.height')}</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="170"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'bmr.weight')}</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="65"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t(lang, 'bmr.activity')}</label>
          <div className="space-y-2">
            {ACTIVITIES.map(a => (
              <button key={a} onClick={() => setActivity(a)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors ${activity === a ? 'bg-blue-50 border-blue-400 text-blue-700 font-medium' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}>
                {t(lang, `bmr.${a}`)}
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
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'bmr.bmr')}</p>
              <p className="text-2xl font-bold text-orange-500">{Math.round(result.bmr).toLocaleString()}</p>
              <p className="text-xs text-slate-400">kcal/day</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'bmr.tdee')}</p>
              <p className="text-2xl font-bold text-red-500">{Math.round(result.tdee).toLocaleString()}</p>
              <p className="text-xs text-slate-400">kcal/day</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">Mifflin-St Jeor 공식 기준</p>
        </div>
      )}
    </div>
  );
}
