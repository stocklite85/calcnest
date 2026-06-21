import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '부가세 계산기',
  description: '공급가액으로 부가세(10%)와 합계금액을 계산하거나, 합계금액에서 공급가액을 역산합니다. 사업자·소비자 모두 무료로 사용 가능.',
  keywords: ['부가세계산기', '부가세계산', 'VAT계산기', '공급가액계산', '부가가치세', '역산'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
