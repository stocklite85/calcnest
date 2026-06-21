import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대출 이자 계산기',
  description: '원리금균등, 원금균등, 만기일시 상환 방식별 대출 이자와 월 상환금을 무료로 계산하세요.',
  keywords: ['대출이자계산기', '원리금균등', '원금균등', '대출계산기', '이자계산'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
