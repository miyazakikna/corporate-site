'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SubPageHeader from '@/components/SubPageHeader';

type SectionData = {
  title: string;
  content: string;
  list?: string[];
  list2?: { heading: string; items: string[] };
};

const policySections: SectionData[] = [
  {
    title: '第1条（個人情報）',
    content:
      '「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。',
  },
  {
    title: '第2条（個人情報の収集方法）',
    content:
      '当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当社の提携先（情報提供元、広告主、広告配信先など）から収集することがあります。',
  },
  {
    title: '第3条（個人情報を収集・利用する目的）',
    content: '当社が個人情報を収集・利用する目的は、以下のとおりです。',
    list: [
      '当社サービスの提供・運営のため',
      'ユーザーからのお問い合わせに回答するため（本人確認を含む）',
      'ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメール送付',
      'メンテナンス、重要なお知らせなど必要に応じたご連絡のため',
      '不正・不当な目的でサービスを利用しようとするユーザーの特定と利用停止のため',
      'ユーザーにご自身の登録情報の閲覧や変更、削除、利用状況の確認をしていただくため',
      '有料サービス利用者への料金請求のため',
      '上記の利用目的に付随する目的',
    ],
  },
  {
    title: '第4条（利用目的の変更）',
    content:
      '当社は、関連性が認められる範囲内で利用目的を変更する場合があります。変更の際には、ユーザーに通知または当社ウェブサイト上で公表します。',
  },
  {
    title: '第5条（個人情報の第三者提供）',
    content:
      '当社は、以下の場合を除き、事前にユーザーの同意を得ずに第三者に個人情報を提供しません。',
    list: [
      '法令に基づく場合',
      '人命・財産保護が必要かつ本人同意が困難な場合',
      '公衆衛生の向上、児童の健全育成に必要な場合',
      '国の機関等への協力が必要な場合',
      '本人に通知し公表し、個人情報保護委員会に届出済のとき',
    ],
    list2: {
      heading: '次に該当する場合、第三者提供には該当しません。',
      items: [
        '当社が業務を委託する場合',
        '事業承継時の提供',
        '共同利用する場合（利用者への通知がある場合）',
      ],
    },
  },
  {
    title: '第6条（個人情報の開示）',
    content:
      '本人から開示請求があった場合は遅滞なく開示します。ただし、以下に該当する場合は全部または一部を開示しないことがあります。',
    list: [
      '本人または第三者の生命・財産などを害するおそれがあるとき',
      '当社業務の適正な実施に著しい支障を及ぼすおそれがあるとき',
      '法令違反となる場合',
    ],
  },
  {
    title: '第7条（個人情報の訂正および削除）',
    content:
      'ユーザーは自身の個人情報について訂正、追加、削除の請求が可能です。当社は請求に応じる必要があると判断した場合には、遅滞なく対応し、結果を通知します。',
  },
  {
    title: '第8条（個人情報の利用停止等）',
    content:
      '本人から、利用目的を超える利用または不正取得があった場合には、調査の上、遅滞なく利用停止または消去を行います。ただし、困難な場合は代替措置を講じます。',
  },
  {
    title: '第9条（プライバシーポリシーの変更）',
    content:
      '本ポリシーは、ユーザーへの通知なく変更できるものとし、ウェブサイト上に掲載した時点から効力を生じます。',
  },
  {
    title: '第10条（お問い合わせ窓口）',
    content: '本ポリシーに関するお問い合わせは、以下までお願いいたします。',
  },
];

function PolicySection({ section, index, isInView }: { section: SectionData; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.05 }}
      className="group"
    >
      <div className="flex-1 min-w-0">
        {/* Section title */}
        <h2 className="text-base md:text-lg font-bold text-secondary mb-3 md:mb-4 tracking-wide leading-snug">
          {section.title}
        </h2>

        {/* Content */}
        <p className="text-sm md:text-[15px] text-slate-600 leading-[1.9] mb-4">
          {section.content}
        </p>

        {/* List */}
        {section.list && (
          <ul className="space-y-2 mb-4">
            {section.list.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-[15px] text-slate-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Secondary list */}
        {section.list2 && (
          <>
            <p className="text-sm md:text-[15px] text-slate-600 leading-[1.9] mb-3">
              {section.list2.heading}
            </p>
            <ul className="space-y-2 mb-4">
              {section.list2.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-[15px] text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </motion.div>
  );
}

export const Privacy = () => {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.05 });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <SubPageHeader
        title="プライバシーポリシー"
        titleEn="PRIVACY POLICY"
        crumbs={[
          { label: 'TOP', href: '/' },
          { label: 'プライバシーポリシー' },
        ]}
      />

      {/* Content */}
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 py-12 md:py-20" ref={contentRef}>
          {/* Main Card Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="p-6 md:p-10">
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="mb-8 md:mb-12"
              >
                <p className="text-sm md:text-[15px] text-slate-600 leading-[1.9]">
                  株式会社Amelio（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
                </p>
              </motion.div>

              {/* Divider between Intro and Sections */}
              <div className="h-px bg-slate-100 mb-8 md:mb-12" />

              {/* Policy sections */}
              <div className="space-y-8 md:space-y-12">
                {policySections.map((section, i) => (
                  <PolicySection key={i} section={section} index={i} isInView={isInView} />
                ))}

                {/* Disclosure fee note for section 6 */}
                <div className="pt-2">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-xs text-slate-400"
                  >
                    ※開示には1件あたり1,000円の手数料が発生します。
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-10"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="hidden md:flex shrink-0 w-10 h-10 items-center justify-center rounded-xl bg-primary/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold text-secondary mb-4 tracking-wide">お問い合わせ窓口</h3>
                <div className="space-y-2 text-sm md:text-[15px] text-slate-600 leading-[1.9]">
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <span className="text-slate-400 text-xs font-bold tracking-wider shrink-0 w-20">社名</span>
                    <span>株式会社Amelio</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <span className="text-slate-400 text-xs font-bold tracking-wider shrink-0 w-20">代表取締役</span>
                    <span>宮崎 賢治</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <span className="text-slate-400 text-xs font-bold tracking-wider shrink-0 w-20">メール</span>
                    <a href="mailto:contact@amelio-tech.com" className="text-primary hover:text-primary-dark transition-colors duration-300">
                      contact@amelio-tech.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};