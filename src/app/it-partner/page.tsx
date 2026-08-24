import type { Metadata } from 'next';
import { ItPartner } from '@/components/it-partner/ItPartner';

export const metadata: Metadata = {
  title: '業務支援（ITパートナー・Web制作・業務DX）',
  description:
    '本業に集中。裏方は、お任せください。ホームページ制作、Webシステム開発、AI導入、バックオフィス業務DXまで、経営やITの困りごとを現場目線でまるごと伴走支援します。',
  keywords: [
    '業務支援',
    'ITパートナー',
    'ホームページ制作',
    'Web制作',
    'LP制作',
    'Webシステム開発',
    'AI導入',
    '業務効率化',
    '業務DX',
    'バックオフィス支援',
    '株式会社Amelio',
  ],
  alternates: {
    canonical: 'https://amelio-tech.com/it-partner',
  },
  openGraph: {
    title: '業務支援（ITパートナー・Web制作・業務DX） | 株式会社Amelio',
    description:
      '本業に集中。裏方は、お任せください。ホームページ制作、Web開発、AI導入、業務DXまで、経営やITの困りごとを現場目線でまるごと伴走支援します。',
    url: 'https://amelio-tech.com/it-partner',
    type: 'website',
    images: ['/ogp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '業務支援（ITパートナー・Web制作・業務DX） | 株式会社Amelio',
    description:
      '本業に集中。裏方は、お任せください。ホームページ制作、Web開発、AI導入、業務DXまで、経営やITの困りごとを現場目線でまるごと伴走支援します。',
    images: ['/ogp.png'],
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '業務支援（ITパートナー・Web制作・業務DX伴走支援）',
  description:
    'ホームページ制作、Webアプリケーション開発、AI導入、バックオフィス業務効率化を、課題整理から実装・運用まで一貫して支援します。',
  provider: {
    '@type': 'Organization',
    name: '株式会社Amelio',
    url: 'https://amelio-tech.com',
  },
  areaServed: 'JP',
  url: 'https://amelio-tech.com/it-partner',
};

export default function ItPartnerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ItPartner />
    </>
  );
}
