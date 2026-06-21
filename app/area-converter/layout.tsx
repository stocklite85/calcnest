import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '평수 변환기',
  description: '평 ↔ 제곱미터(㎡) ↔ 제곱피트(ft²) 단위를 무료로 변환하세요. 부동산 면적 계산에 유용합니다.',
  keywords: ['평수변환기', '평방미터변환', '평수계산기', '평을㎡로', '㎡를평으로'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
