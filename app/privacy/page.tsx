'use client';

import { useLang } from '@/contexts/LangContext';

export default function PrivacyPage() {
  const { lang } = useLang();

  if (lang === 'en') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 prose prose-slate">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-slate-600 mb-4">Effective date: June 2025</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">1. Data Collection</h2>
        <p className="text-slate-600">CalcNest does not collect any personal information. All calculations are performed locally in your browser and no data is sent to our servers.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">2. Cookies</h2>
        <p className="text-slate-600">We store only your language preference (ko/en) in localStorage. This data never leaves your device.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">3. Google AdSense</h2>
        <p className="text-slate-600">We use Google AdSense to display advertisements. Google may use cookies to serve personalized ads based on your browsing history. You can opt out via Google Ad Settings.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">4. Contact</h2>
        <p className="text-slate-600">For privacy inquiries, please contact us via GitHub Issues.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">개인정보 처리방침</h1>
      <p className="text-slate-600 mb-4">시행일: 2025년 6월</p>
      <h2 className="text-lg font-semibold mt-6 mb-2">1. 개인정보 수집</h2>
      <p className="text-slate-600">CalcNest는 개인정보를 수집하지 않습니다. 모든 계산은 브라우저에서 처리되며 서버로 전송되지 않습니다.</p>
      <h2 className="text-lg font-semibold mt-6 mb-2">2. 쿠키 및 로컬스토리지</h2>
      <p className="text-slate-600">언어 설정(한국어/영어)만 localStorage에 저장합니다. 이 데이터는 기기 밖으로 전송되지 않습니다.</p>
      <h2 className="text-lg font-semibold mt-6 mb-2">3. Google AdSense</h2>
      <p className="text-slate-600">광고 제공을 위해 Google AdSense를 사용합니다. Google은 맞춤 광고를 위해 쿠키를 사용할 수 있습니다. Google 광고 설정에서 거부할 수 있습니다.</p>
      <h2 className="text-lg font-semibold mt-6 mb-2">4. 문의</h2>
      <p className="text-slate-600">개인정보 관련 문의는 GitHub Issues를 통해 연락해 주세요.</p>
    </div>
  );
}
