'use client';

import { useLang } from '@/contexts/LangContext';

export default function PrivacyPage() {
  const { lang } = useLang();

  if (lang === 'en') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 prose prose-slate">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-slate-600 mb-4">Effective date: June 22, 2026</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">1. Data Collection</h2>
        <p className="text-slate-600">CalcNest does not send calculator inputs to our servers. All calculations are performed locally in your browser. With your consent, anonymous usage data may be collected through Google Analytics.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">2. Cookies</h2>
        <p className="text-slate-600">We store your language preference and cookie-consent choice in localStorage. Google Analytics and AdSense may use cookies only after you consent.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">3. Google Analytics and AdSense</h2>
        <p className="text-slate-600">We use Google Analytics to understand site usage and Google AdSense to display advertisements. Google may use cookies for measurement and ad delivery. You can decline these cookies through our consent banner.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">4. Contact</h2>
        <p className="text-slate-600">For privacy inquiries, please contact us via GitHub Issues.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">개인정보 처리방침</h1>
      <p className="text-slate-600 mb-4">시행일: 2026년 6월 22일</p>
      <h2 className="text-lg font-semibold mt-6 mb-2">1. 개인정보 수집</h2>
      <p className="text-slate-600">CalcNest는 계산기에 입력한 내용을 서버로 전송하지 않습니다. 모든 계산은 브라우저에서 처리됩니다. 동의한 경우 Google Analytics를 통해 익명의 이용 통계가 수집될 수 있습니다.</p>
      <h2 className="text-lg font-semibold mt-6 mb-2">2. 쿠키 및 로컬스토리지</h2>
      <p className="text-slate-600">언어 설정과 쿠키 동의 선택을 localStorage에 저장합니다. Google Analytics와 AdSense 쿠키는 동의한 경우에만 사용됩니다.</p>
      <h2 className="text-lg font-semibold mt-6 mb-2">3. Google Analytics 및 AdSense</h2>
      <p className="text-slate-600">사이트 이용 현황 파악을 위해 Google Analytics를, 광고 제공을 위해 Google AdSense를 사용합니다. Google은 측정 및 광고 제공에 쿠키를 사용할 수 있으며, 사이트의 동의 배너에서 거부할 수 있습니다.</p>
      <h2 className="text-lg font-semibold mt-6 mb-2">4. 문의</h2>
      <p className="text-slate-600">개인정보 관련 문의는 GitHub Issues를 통해 연락해 주세요.</p>
    </div>
  );
}
