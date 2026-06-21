'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { t } from '@/lib/translations';
import { calcLoan, won, type RepayType } from '@/lib/loan';

const EXAMPLES = [
  { label: '1억 / 3%/ 60개월', amount: 1_000_0, rate: 3, months: 60 },
  { label: '3억 / 4% / 120개월', amount: 3_000_0, rate: 4, months: 120 },
  { label: '5억 / 5% / 240개월', amount: 5_000_0, rate: 5, months: 240 },
];

export default function LoanCalculatorPage() {
  const { lang } = useLang();
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [type, setType] = useState<RepayType>('equal');
  const [result, setResult] = useState<ReturnType<typeof calcLoan> | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleCalc = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    const m = parseInt(months);
    if (!a || !r || !m || a <= 0 || r <= 0 || m <= 0) return;
    setResult(calcLoan(a, r, m, type));
    setShowSchedule(false);
  };

  const handleExample = (ex: typeof EXAMPLES[0]) => {
    setAmount(String(ex.amount));
    setRate(String(ex.rate));
    setMonths(String(ex.months));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-slate-400 hover:text-blue-600 mb-4 inline-block">← {t(lang, 'nav.home')}</Link>

      <div className="mb-6">
        <div className="text-4xl mb-2">🏦</div>
        <h1 className="text-2xl font-bold text-slate-900">{t(lang, 'loan.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t(lang, 'loan.desc')}</p>
      </div>

      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mb-6">{t(lang, 'privacy.badge')}</p>

      {/* 빠른 예시 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {EXAMPLES.map(ex => (
          <button key={ex.label} onClick={() => handleExample(ex)}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors bg-white">
            {ex.label}
          </button>
        ))}
      </div>

      {/* 입력 폼 */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'loan.amount')}</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
            placeholder="10000"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'loan.rate')}</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1"
            placeholder="3.5"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t(lang, 'loan.period')}</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)}
            placeholder="60"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t(lang, 'loan.type')}</label>
          <div className="flex gap-2">
            {(['equal', 'principal', 'bullet'] as RepayType[]).map(tp => (
              <button key={tp} onClick={() => setType(tp)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${type === tp ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}>
                {t(lang, `loan.type.${tp}`)}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleCalc}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          {t(lang, 'calc')}
        </button>
      </div>

      {/* 결과 */}
      {result && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">{t(lang, 'result')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'loan.monthly')}</p>
              <p className="text-lg font-bold text-blue-600">{won(result.monthlyFirst)}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'loan.totalInterest')}</p>
              <p className="text-lg font-bold text-slate-700">{won(result.totalInterest)}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t(lang, 'loan.totalPayment')}</p>
              <p className="text-lg font-bold text-slate-700">{won(result.totalPayment)}</p>
            </div>
          </div>

          <button onClick={() => setShowSchedule(v => !v)}
            className="w-full text-sm text-slate-500 hover:text-blue-600 border border-slate-200 rounded-lg py-2 transition-colors">
            {showSchedule ? '▲' : '▼'} {lang === 'ko' ? '상환 스케줄 보기' : 'Repayment Schedule'}
          </button>

          {showSchedule && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-slate-600">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-2 text-left">{lang === 'ko' ? '회차' : 'Month'}</th>
                    <th className="py-2 text-right">{lang === 'ko' ? '납입금' : 'Payment'}</th>
                    <th className="py-2 text-right">{lang === 'ko' ? '원금' : 'Principal'}</th>
                    <th className="py-2 text-right">{lang === 'ko' ? '이자' : 'Interest'}</th>
                    <th className="py-2 text-right">{lang === 'ko' ? '잔금' : 'Balance'}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map(row => (
                    <tr key={row.month} className="border-b border-slate-50">
                      <td className="py-1.5">{row.month}</td>
                      <td className="py-1.5 text-right">{Math.round(row.payment).toLocaleString()}</td>
                      <td className="py-1.5 text-right">{Math.round(row.principal).toLocaleString()}</td>
                      <td className="py-1.5 text-right">{Math.round(row.interest).toLocaleString()}</td>
                      <td className="py-1.5 text-right">{Math.round(row.balance).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
