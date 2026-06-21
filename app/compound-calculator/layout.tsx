import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '복리 계산기',
  description: '원금, 이자율, 기간으로 복리 효과를 시뮬레이션하고 최종 금액을 무료로 계산하세요.',
  keywords: ['복리계산기', '복리효과', '복리이자', '투자계산기', '재테크계산기'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
