"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp } from "@/src/utils/constants";
import { WeddingData } from "../utils/weddingStore";

interface IslamicQuoteProps {
  data: WeddingData;
}

export default function IslamicQuote({ data }: IslamicQuoteProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 bg-ivory overflow-hidden flex items-center justify-center min-h-[50vh]"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] text-champagne/20 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M 50 0 L 64 35 L 100 35 L 71 57 L 82 92 L 50 71 L 18 92 L 29 57 L 0 35 L 36 35 Z" />
          <path d="M 50 10 L 60 40 L 90 40 L 65 58 L 75 88 L 50 70 L 25 88 L 35 58 L 10 40 L 40 40 Z" fill="#FDF8F4" />
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div style={{ y: textY }} className="flex flex-col items-center">
          <motion.div variants={fadeInUp} className="flex items-center gap-3 w-32 opacity-35 mb-8">
            <div className="h-px flex-1 bg-champagne" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
            <div className="h-px flex-1 bg-champagne" />
          </motion.div>

          <h3
            lang="ar"
            dir="rtl"
            className="font-urdu text-[clamp(1.5rem,5vw,2.5rem)] sm:text-4xl text-gold-gradient leading-loose tracking-wide max-w-3xl mb-8 px-4 select-none"
          >
            {data.islamicQuoteArabic}
          </h3>

          <p className="font-cormorant text-[clamp(1rem,3vw,1.5rem)] sm:text-2xl font-light italic text-elegant/75 leading-relaxed max-w-2xl px-2">
            &ldquo;{data.islamicQuoteEnglish}&rdquo;
          </p>

          <span className="text-xs uppercase tracking-[0.25em] text-gold mt-6 font-cormorant">
            {data.islamicQuoteReference}
          </span>

          <motion.div variants={fadeInUp} className="flex items-center gap-3 w-32 opacity-35 mt-8">
            <div className="h-px flex-1 bg-champagne" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
            <div className="h-px flex-1 bg-champagne" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
