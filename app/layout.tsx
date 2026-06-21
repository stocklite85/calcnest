import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { LangProvider } from '@/contexts/LangContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'CalcNest — 무료 생활 계산기 모음',
    template: '%s | CalcNest',
  },
  description: '대출, BMI, D-day, 나이, 적금, 세후급여, 기초대사량 등 자주 쓰는 생활 계산기를 무료로 제공합니다.',
  keywords: ['계산기', '대출계산기', 'BMI계산기', 'D-day계산기', '나이계산기', '적금계산기', '세후급여'],
  metadataBase: new URL('https://calcnest.vercel.app'),
  openGraph: {
    siteName: 'CalcNest',
    type: 'website',
    locale: 'ko_KR',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        <LangProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
