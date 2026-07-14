"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WeddingData } from "../utils/weddingStore";

interface IslamicQuoteProps {
  data: WeddingData;
}

const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];

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
      className="relative py-28 bg-luxury-bg overflow-hidden flex items-center justify-center min-h-[50vh]"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] text-gold/5 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M 50 0 L 64 35 L 100 35 L 71 57 L 82 92 L 50 71 L 18 92 L 29 57 L 0 35 L 36 35 Z" />
          <path d="M 50 10 L 60 40 L 90 40 L 65 58 L 75 88 L 50 70 L 25 88 L 35 58 L 10 40 L 40 40 Z" fill="#FDFCF8" />
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div style={{ y: textY }} className="flex flex-col items-center">
          <div className="flex items-center gap-3 w-32 opacity-35 mb-8">
            <div className="h-[1px] flex-1 bg-gold" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-[1px] flex-1 bg-gold" />
          </div>

          <h3
            lang="ar"
            dir="rtl"
            className="font-urdu text-[clamp(1.5rem,5vw,2.5rem)] sm:text-4xl text-gold-gradient leading-loose tracking-wide max-w-3xl mb-8 px-4 select-none"
          >
            {data.islamicQuoteArabic}
          </h3>

          <p className="font-playfair text-[clamp(1rem,3vw,1.5rem)] sm:text-2xl font-light italic text-navy/80 leading-relaxed max-w-2xl px-2">
            &ldquo;{data.islamicQuoteEnglish}&rdquo;
          </p>

          <span className="text-xs uppercase tracking-[0.25em] text-gold mt-6 font-cormorant">
            {data.islamicQuoteReference}
          </span>

          <div className="flex items-center gap-3 w-32 opacity-35 mt-8">
            <div className="h-[1px] flex-1 bg-gold" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-[1px] flex-1 bg-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
