'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <div className="w-full bg-transparent text-white font-sans relative overflow-hidden">

      {/* <div className="absolute top-0 right-0 w-[75vw] lg:w-[55vw] h-[75vw] lg:h-[55vw] bg-linear-to-bl from-cyan-300/45 via-primary-200/35 to-blue-200/25 rounded-full blur-[65px] lg:blur-[130px] -translate-y-1/2 translate-x-1/4 pointer-events-none" /> */}

      <section className="min-h-screen w-screen flex flex-col justify-center items-center p-10 relative">
        <div className="h-10 md:h-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-sm sm:text-base md:text-xl tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] font-light text-[#556677] uppercase text-center"
          >
            makes growth scalable.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-20 md:bottom-30 right-10"
        >
          <motion.div
            style={{ opacity: scrollOpacity }}
            className="flex flex-row items-end gap-2"
          >
            <span className="text-[10px] tracking-[0.2em] text-white uppercase [writing-mode:vertical-lr] rotate-180 mb-0.5">
              Scroll
            </span>
            <div className="w-[2px] h-13 bg-white/20 relative overflow-hidden">
              <motion.div
                animate={{
                  y: [-24, 48],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
