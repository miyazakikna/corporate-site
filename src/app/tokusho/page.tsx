import { Tokusho } from '@/components/Tokusho';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description:
    '株式会社Amelioの特定商取引法に基づく表記ページです。販売事業者名、所在地、連絡先、サービス価格、お支払い方法、役務提供時期、キャンセルポリシー等の重要事項を掲載しています。',
  alternates: {
    canonical: 'https://amelio-tech.com/tokusho',
  },
  openGraph: {
    title: '特定商取引法に基づく表記 | 株式会社Amelio',
    description:
      '株式会社Amelioの特定商取引法に基づく表記ページです。販売事業者名、所在地、連絡先、サービス価格、お支払い方法、役務提供時期、キャンセルポリシー等の重要事項を掲載しています。',
    url: 'https://amelio-tech.com/tokusho',
    type: 'website',
    images: ['/ogp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '特定商取引法に基づく表記 | 株式会社Amelio',
    description:
      '株式会社Amelioの特定商取引法に基づく表記ページです。販売事業者名、所在地、連絡先、サービス価格、お支払い方法、役務提供時期、キャンセルポリシー等の重要事項を掲載しています。',
    images: ['/ogp.png'],
  },
};

export default function TokushoPage() {
  return <Tokusho />;
}
