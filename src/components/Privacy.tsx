'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, slideUp } from '@/utils/animations';
import Breadcrumb from '@/components/Breadcrumb';

export const Privacy = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div className="bg-white py-xl min-h-[calc(100vh-200px)]" ref={sectionRef}>
      <div className='container'>
        <motion.div
          className="flex justify-between mt-xl"
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <Breadcrumb crumbs={[
            { label: 'TOP', href: '/' },
            { label: 'プライバシーポリシー' }
          ]} />
        </motion.div>
        <motion.h1
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          プライバシーポリシー
        </motion.h1>

        <motion.div
          className="bg-white rounded-md shadow-md p-md mb-xl md:p-lg"
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-lg text-sm last:mb-0">
            <p className="leading-relaxed">
              株式会社Amelio（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。<br /><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第1条（個人情報）</span>
              「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。<br /><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第2条（個人情報の収集方法）</span>
              当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当社の提携先（情報提供元、広告主、広告配信先など）から収集することがあります。<br /><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第3条（個人情報を収集・利用する目的）</span>
              当社が個人情報を収集・利用する目的は、以下のとおりです。<br />
              <ul className="pl-lg mb-md list-disc">
                <li className="mb-xs">当社サービスの提供・運営のため</li>
                <li className="mb-xs">ユーザーからのお問い合わせに回答するため（本人確認を含む）</li>
                <li className="mb-xs">ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメール送付</li>
                <li className="mb-xs">メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                <li className="mb-xs">不正・不当な目的でサービスを利用しようとするユーザーの特定と利用停止のため</li>
                <li className="mb-xs">ユーザーにご自身の登録情報の閲覧や変更、削除、利用状況の確認をしていただくため</li>
                <li className="mb-xs">有料サービス利用者への料金請求のため</li>
                <li className="mb-xs">上記の利用目的に付随する目的</li>
              </ul><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第4条（利用目的の変更）</span>
              当社は、関連性が認められる範囲内で利用目的を変更する場合があります。変更の際には、ユーザーに通知または当社ウェブサイト上で公表します。<br /><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第5条（個人情報の第三者提供）</span>
              当社は、以下の場合を除き、事前にユーザーの同意を得ずに第三者に個人情報を提供しません。<br />
              <ul className="pl-lg mb-md list-disc">
                <li className="mb-xs">法令に基づく場合</li>
                <li className="mb-xs">人命・財産保護が必要かつ本人同意が困難な場合</li>
                <li className="mb-xs">公衆衛生の向上、児童の健全育成に必要な場合</li>
                <li className="mb-xs">国の機関等への協力が必要な場合</li>
                <li className="mb-xs">本人に通知し公表し、個人情報保護委員会に届出済のとき</li>
              </ul><br />
              次に該当する場合、第三者提供には該当しません。<br />
              <ul className="pl-lg mb-md list-disc">
                <li className="mb-xs">当社が業務を委託する場合</li>
                <li className="mb-xs">事業承継時の提供</li>
                <li className="mb-xs">共同利用する場合（利用者への通知がある場合）</li>
              </ul><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第6条（個人情報の開示）</span>
              本人から開示請求があった場合は遅滞なく開示します。ただし、以下に該当する場合は全部または一部を開示しないことがあります。<br />
              <ul className="pl-lg mb-md list-disc">
                <li className="mb-xs">本人または第三者の生命・財産などを害するおそれがあるとき</li>
                <li className="mb-xs">当社業務の適正な実施に著しい支障を及ぼすおそれがあるとき</li>
                <li className="mb-xs">法令違反となる場合</li>
              </ul>
              ※開示には1件あたり1,000円の手数料が発生します。<br /><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第7条（個人情報の訂正および削除）</span>
              ユーザーは自身の個人情報について訂正、追加、削除の請求が可能です。当社は請求に応じる必要があると判断した場合には、遅滞なく対応し、結果を通知します。<br /><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第8条（個人情報の利用停止等）</span>
              本人から、利用目的を超える利用または不正取得があった場合には、調査の上、遅滞なく利用停止または消去を行います。ただし、困難な場合は代替措置を講じます。<br /><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第9条（プライバシーポリシーの変更）</span>
              本ポリシーは、ユーザーへの通知なく変更できるものとし、ウェブサイト上に掲載した時点から効力を生じます。<br /><br />

              <span className="text-lg text-secondary mb-md font-semibold block">第10条（お問い合わせ窓口）</span>
              本ポリシーに関するお問い合わせは、以下までお願いいたします。<br />
            </p>
            <address className="mt-md not-italic leading-[1.8]">
              社名：株式会社Amelio<br />
              住所：千葉県香取郡多古町井戸山722番地1<br />
              代表取締役：宮崎 賢治<br />
              メール：contact@amelio-tech.com
            </address>
          </div>
        </motion.div>
      </div>
    </div>
  );
};