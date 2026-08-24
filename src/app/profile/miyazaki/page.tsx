import type { Metadata } from 'next';
import { MiyazakiProfile } from '@/components/it-partner/MiyazakiProfile';

export const metadata: Metadata = {
  title: '代表について（代表取締役 宮崎賢治）',
  description:
    '株式会社Amelio代表取締役・宮崎賢治のプロフィール。NTTグループでのアプリ開発やパーソナルジムFC責任者・DX推進を経て、経営者の右腕としてWeb制作・システム開発・業務DXを一貫支援しています。',
  alternates: {
    canonical: 'https://amelio-tech.com/profile/miyazaki',
  },
  openGraph: {
    title: '代表について（代表取締役 宮崎賢治） | 株式会社Amelio',
    description:
      '株式会社Amelio代表取締役・宮崎賢治のプロフィール。NTTグループでのアプリ開発やパーソナルジムFC責任者・DX推進を経て、経営者の右腕としてWeb制作・システム開発・業務DXを一貫支援しています。',
    url: 'https://amelio-tech.com/profile/miyazaki',
    type: 'profile',
    images: ['/ogp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '代表について（代表取締役 宮崎賢治） | 株式会社Amelio',
    description:
      '株式会社Amelio代表取締役・宮崎賢治のプロフィール。NTTグループでのアプリ開発やパーソナルジムFC責任者・DX推進を経て、経営者の右腕としてWeb制作・システム開発・業務DXを一貫支援しています。',
    images: ['/ogp.png'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '宮崎 賢治',
  alternateName: 'KENJI MIYAZAKI',
  jobTitle: '代表取締役',
  worksFor: {
    '@type': 'Organization',
    name: '株式会社Amelio',
    url: 'https://amelio-tech.com',
  },
  url: 'https://amelio-tech.com/profile/miyazaki',
  image: 'https://amelio-tech.com/it-partner/miyazaki.png',
};

export default function MiyazakiProfilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <MiyazakiProfile />
    </>
  );
}
