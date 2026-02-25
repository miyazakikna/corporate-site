import { Contact } from '@/components/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | 株式会社Amelio',
  description: '株式会社Amelioへのお問い合わせページです。サービス内容やデモのお申し込みなど、お気軽にお問い合わせください。',
};

export default function ContactPage() {
  return (
    <Contact />
  );
}
