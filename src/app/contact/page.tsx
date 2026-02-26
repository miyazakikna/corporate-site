import { Contact } from '@/components/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | 株式会社Amelio',
  description:
    '株式会社Amelioへのご相談・お問い合わせはこちらから。事業立ち上げ、SNS運用、システム開発など、あなたの挑戦をサポートする最適な提案をいたします。',
  openGraph: {
    title: 'お問い合わせ | 株式会社Amelio',
    description:
      '株式会社Amelioへのご相談・お問い合わせはこちらから。事業立ち上げ、SNS運用、システム開発など、あなたの挑戦をサポートする最適な提案をいたします。',
  },
  twitter: {
    title: 'お問い合わせ | 株式会社Amelio',
    description:
      '株式会社Amelioへのご相談・お問い合わせはこちらから。事業立ち上げ、SNS運用、システム開発など、あなたの挑戦をサポートする最適な提案をいたします。',
  },
};

export default function ContactPage() {
  return (
    <Contact />
  );
}
