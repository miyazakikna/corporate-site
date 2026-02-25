'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { slideUp } from '@/utils/animations';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Work = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const caseStudies = [
    {
      id: 'shape-fit-festival',
      title: 'Shape Fit Festival',
      client: 'Shape Fit Inc.',
      tags: ['イベント集客', 'SNS運用', 'LP制作'],
      description: 'フィットネスイベント「Shape Fit Festival」の集客から運営まで総合的にサポート。SNS運用戦略の再構築とコンバージョン重視のランディングページ制作により、前年比150%の参加者増加を実現しました。',
      achievements: ['参加者数：前年比150%増', 'SNSフォロワー：3ヶ月で2倍に増加', '申込みコンバージョン率：32%向上'],
      imageSrc: '/images/works/shape-fit-festival.jpg',
      imageAlt: 'Shape Fit Festival イベントの様子',
    },
    {
      id: 'shape-fit-gym',
      title: 'Shape Fit Gym',
      client: 'Shape Fit Inc.',
      tags: ['ホームページ制作', '予約システム導入', 'UI/UXデザイン'],
      description: '多店舗展開するフィットネスジム「Shape Fit Gym」のブランドイメージに合わせたホームページをデザイン。また、顧客満足度を高めるための予約システムを導入し、運用サポートも行いました。',
      achievements: ['Web予約率：導入後3ヶ月で全体の65%に', '顧客満足度調査：92%が「使いやすい」と回答', '店舗スタッフの業務効率：約40%改善'],
      imageSrc: '/images/works/shape-fit-gym.jpg',
      imageAlt: 'Shape Fit Gym ウェブサイトと予約システム',
    }
  ];

  return (
    <section id='works' className="section bg-white relative" ref={sectionRef}>
      <div className='container'>
        <motion.h2
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          実績紹介
        </motion.h2>

        <motion.div
          className="relative my-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            // Add custom dot styles here to replace scss globals
            className="pb-[50px] mx-auto w-full max-w-[1200px] [&_.swiper-pagination-bullet]:bg-light-gray [&_.swiper-pagination-bullet]:opacity-70 [&_.swiper-pagination-bullet]:w-[10px] [&_.swiper-pagination-bullet]:h-[10px] [&_.swiper-pagination-bullet-active]:bg-primary [&_.swiper-pagination-bullet-active]:opacity-100"
          >
            {caseStudies.map((caseStudy) => (
              <SwiperSlide key={caseStudy.id} className="flex items-center justify-center">
                <div className="flex flex-col gap-lg shadow-md rounded-md overflow-hidden bg-white h-full md:flex-row md:items-stretch w-full">
                  <div className="w-full md:w-[40%]">
                    <div className="relative w-full h-[250px] md:h-full md:min-h-[400px]">
                      <Image
                        src={caseStudy.imageSrc}
                        alt={caseStudy.imageAlt}
                        fill
                        sizes='(max-width: 768px) 100vw, 50vw'
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-md flex-1 flex flex-col md:p-lg">
                    <h3 className="text-xl text-secondary mb-xs relative inline-block self-start after:content-[''] after:absolute after:-bottom-[5px] after:left-0 after:w-[60px] after:h-[3px] after:bg-primary">{caseStudy.title}</h3>
                    <p className="text-base mb-sm text-dark-gray mt-4">
                      <span className="font-semibold">クライアント：</span>
                      {caseStudy.client}
                    </p>

                    <div className="flex flex-wrap gap-xs mb-sm">
                      {caseStudy.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-block bg-primary/10 text-primary py-1 px-3 rounded-full text-sm font-medium">{tag}</span>
                      ))}
                    </div>

                    <p className="mb-md leading-relaxed">{caseStudy.description}</p>

                    <div className="mt-auto bg-light-gray p-sm rounded-md">
                      <h4 className="text-base font-bold mb-xs text-secondary">成果</h4>
                      <ul className="list-none p-0 m-0">
                        {caseStudy.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start mb-xs last:mb-0">
                            <span className="text-primary mr-xs font-bold">✓</span>
                            <span className="flex-1">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 flex justify-between px-5 pointer-events-none">
            <button ref={navigationPrevRef} className="w-10 h-10 sm:w-[50px] sm:h-[50px] flex items-center justify-center bg-white/80 rounded-full border-none cursor-pointer shadow-sm text-secondary pointer-events-auto transition-colors duration-300 hover:bg-primary hover:text-white" aria-label='前へ'>
              <ChevronLeft />
            </button>
            <button ref={navigationNextRef} className="w-10 h-10 sm:w-[50px] sm:h-[50px] flex items-center justify-center bg-white/80 rounded-full border-none cursor-pointer shadow-sm text-secondary pointer-events-auto transition-colors duration-300 hover:bg-primary hover:text-white" aria-label='次へ'>
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
