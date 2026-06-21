import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '적금 계산기',
  description: '월 납입금, 이자율, 기간으로 적금 만기 수령액과 세후 이자를 무료로 계산하세요.',
  keywords: ['적금계산기', '적금이자', '만기수령액', '정기적금', '이자계산'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
