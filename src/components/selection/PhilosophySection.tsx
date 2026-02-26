'use client';

import { motion } from 'framer-motion';

export default function PhilosophySection() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-start items-center pt-24 px-10 relative bg-transparent">

      {/* <div className="absolute bottom-0 right-0 w-[75vw] lg:w-[55vw] h-[75vw] lg:h-[55vw] bg-linear-to-tl from-cyan-300/45 via-primary-200/35 to-blue-200/25 rounded-full blur-[65px] lg:blur-[130px] translate-y-1/2 translate-x-1/4 pointer-events-none" /> */}

      <div className="max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-lg md:text-xl text-white leading-relaxed tracking-widest"
        >
          私たちは<span className="hidden md:inline"><br /></span>
          あなたの挑戦を支える土台となる。<span className="hidden md:inline"><br /></span>
          テクノロジーで可能性を最大化し、<span className="hidden md:inline"><br /></span>
          成長が続く仕組みをつくる。
        </motion.p>
      </div>
    </section>
  );
}
