import { ItConsulting } from '@/components/ItConsulting';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ITコンサルティング | 株式会社Amelio',
  description:
    '株式会社AmelioのITコンサルティングサービス。Webサイト制作からシステム開発、IT戦略の立案まで、提案・開発・運用を一貫してサポートします。初回相談無料。',
  openGraph: {
    title: 'ITコンサルティング | 株式会社Amelio',
    description:
      '株式会社AmelioのITコンサルティングサービス。Webサイト制作からシステム開発、IT戦略の立案まで、提案・開発・運用を一貫してサポートします。初回相談無料。',
  },
  twitter: {
    title: 'ITコンサルティング | 株式会社Amelio',
    description:
      '株式会社AmelioのITコンサルティングサービス。Webサイト制作からシステム開発、IT戦略の立案まで、提案・開発・運用を一貫してサポートします。初回相談無料。',
  },
};

export default function ItConsultingPage() {
  return <ItConsulting />;
}
