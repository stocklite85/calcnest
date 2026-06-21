import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '나이 계산기',
  description: '만 나이, 한국 나이, 연 나이를 한번에 계산하세요. 다음 생일까지 남은 날짜도 알려드립니다.',
  keywords: ['나이계산기', '만나이계산기', '한국나이', '만나이', '생일계산'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
