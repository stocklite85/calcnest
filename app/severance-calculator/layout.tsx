import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '퇴직금 계산기',
  description: '입사일, 퇴사일, 월평균 급여를 입력하면 한국 근로기준법에 따른 퇴직금을 자동으로 계산합니다.',
  keywords: ['퇴직금계산기', '퇴직금계산', '퇴직금산정', '퇴직금공식', '근로기준법퇴직금', '퇴직금얼마'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
