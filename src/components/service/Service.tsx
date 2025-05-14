'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Rocket, Share2, Code, MessageSquare, Layout, ShoppingCart, BarChart, Store, Target } from 'lucide-react';
import styles from './Service.module.scss';
import { fadeIn, slideUp, serviceCardContainer, serviceCard } from '@/utils/animations';

export const Service = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const services = [
    {
      icon: <Rocket className={styles.icon} />,
      title: '事業立ち上げ支援',
      description: 'アイデアの具現化から事業計画の策定、資金調達戦略まで、起業初期のあらゆる課題を総合的にサポートします。'
    },
    {
      icon: <Store className={styles.icon} />,
      title: '店舗コンサルティング',
      description: '市場分析や競合調査に基づき、売上向上・顧客満足度の最大化を目指した戦略設計とKGI/KPIの構築を行います。'
    },
    {
      icon: <Code className={styles.icon} />,
      title: 'システム開発',
      description: '業務効率化や顧客体験の向上を目的に、要件定義から開発・運用保守まで一貫したシステム構築を提供します。'
    },
    {
      icon: <MessageSquare className={styles.icon} />,
      title: 'LINE構築',
      description: 'LINE公式アカウントの開設から運用設計、自動応答やリッチメニューなどの機能活用による集客・販促を支援します。'
    },
    {
      icon: <Layout className={styles.icon} />,
      title: 'ホームページ・LP制作',
      description: 'ブランドの魅力を伝えるデザインと、高いコンバージョンを実現する構成でWebサイト・LPを制作します。'
    },
    {
      icon: <ShoppingCart className={styles.icon} />,
      title: 'ECサイト構築',
      description: '商品管理・決済・物流連携までを考慮した、ビジネスモデルに最適化されたECサイトを構築します。'
    },
    {
      icon: <Target className={styles.icon} />,
      title: 'MEO対策',
      description: 'Googleマップでの店舗情報最適化を通じて、地域ユーザーからの認知度と来店率を向上させます。'
    },
    {
      icon: <Share2 className={styles.icon} />,
      title: 'SNS運用',
      description: 'Instagram、YouTube、TikTok等のSNSを活用し、ターゲットに合わせたコンテンツ設計と分析で集客・エンゲージメントを強化します。'
    },
    {
      icon: <BarChart className={styles.icon} />,
      title: '広告運用',
      description: 'Meta広告、Google広告などを活用し、目的に応じた広告戦略の立案から運用・改善までを支援します。'
    }
  ];

  return (
    <section id='services' className={`section ${styles.services}`} ref={sectionRef}>
      <div className='container'>
        <motion.h2
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          サービス
        </motion.h2>

        <motion.p
          className='section-description'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          株式会社Amelioは、事業の成長に不可欠なサービスをワンストップで提供しています。
          他社にはない「総合的な支援」により、戦略から実行・改善までを一貫してサポートします。
        </motion.p>

        <motion.div
          className={styles.servicesGrid}
          variants={serviceCardContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              variants={serviceCard}
              whileHover='hover'
            >
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};