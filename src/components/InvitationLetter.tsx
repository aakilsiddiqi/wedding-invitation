"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { easeOutExpo, itemFadeInUp, staggerContainer, scrollToSection } from "@/src/utils/constants";
import { WeddingData } from "../utils/weddingStore";
import CornerOrnaments from "./CornerOrnaments";

interface InvitationLetterProps {
  data: WeddingData;
  guestName: string;
}

export default function InvitationLetter({ data, guestName }: InvitationLetterProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center py-24 px-4 overflow-hidden" id="invitation-letter">
      <div className="absolute inset-0 bg-ivory" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full border border-champagne/20"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: easeOutExpo } },
        }}
        className="paper-texture relative w-full max-w-3xl px-8 py-20 sm:px-16 sm:py-28 rounded-[40px] shadow-elevated border border-champagne/30 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-4 border border-champagne/20 rounded-[32px] pointer-events-none" />
        <div className="absolute inset-5 border border-champagne/40 rounded-[28px] pointer-events-none" />

        <CornerOrnaments />

        <motion.div
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={itemFadeInUp}
            custom={0}
            className="w-48 sm:w-64 text-champagne mb-8 fill-current"
          >
            <svg viewBox="0 0 350 70" role="img" aria-label="Bismillahir Rahmanir Rahim">
              <path d="M 20 35 C 40 10, 80 10, 100 35 C 120 60, 160 60, 180 35 C 200 10, 240 10, 260 35 C 270 50, 290 50, 310 35" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 85 45 C 90 20, 110 20, 115 45 M 100 30 C 102 20, 108 20, 110 30" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="50%" y="45" textAnchor="middle" className="font-cormorant text-xl tracking-[0.25em] fill-gold font-light" style={{ fontStyle: "italic" }}>
                Bismillahir Rahmanir Rahim
              </text>
            </svg>
          </motion.div>

          <motion.h3
            variants={itemFadeInUp}
            custom={1}
            className="font-cormorant text-[clamp(1.5rem,4vw,2.5rem)] text-gold-gradient tracking-wide mb-2"
          >
            Assalamu Alaikum
          </motion.h3>

          <motion.p
            variants={itemFadeInUp}
            custom={2}
            className="text-xs sm:text-sm tracking-[0.25em] text-champagne/60 uppercase mb-10"
          >
            Peace be upon you
          </motion.p>

          <motion.div
            variants={itemFadeInUp}
            custom={3}
            className="text-center mb-8"
          >
            <p className="font-inter text-lg sm:text-xl text-elegant/70 italic">Dear</p>
            <h2 className="font-cormorant text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-elegant tracking-wide mt-2">
              {guestName}
            </h2>
          </motion.div>

          <motion.div
            variants={itemFadeInUp}
            custom={4}
            className="text-center max-w-lg sm:max-w-xl mb-12 flex flex-col items-center"
          >
            <p className="font-inter text-lg sm:text-xl leading-relaxed text-elegant/80 px-4">
              With the blessings of Allah SWT, we cordially invite you and your family to celebrate the wedding ceremony of
            </p>

            <div className="my-10 flex flex-col items-center">
              <motion.h4
                whileHover={{ scale: 1.03 }}
                className="font-cormorant text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-wide text-gold-gradient cursor-default"
              >
                {data.brideName}
              </motion.h4>

              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="my-4 text-gold flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-2xl">❤</span>
              </motion.div>

              <motion.h4
                whileHover={{ scale: 1.03 }}
                className="font-cormorant text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-wide text-gold-gradient cursor-default"
              >
                {data.groomName}
              </motion.h4>
            </div>

            <p className="font-inter text-base sm:text-lg text-champagne/80 italic tracking-wider mt-4">
              to be united in holy matrimony
            </p>
          </motion.div>

          <motion.div
            variants={itemFadeInUp}
            custom={5}
            className="flex items-center gap-3 w-48 opacity-40"
          >
            <div className="h-px flex-1 bg-champagne" />
            <div className="w-2.5 h-2.5 border border-champagne rotate-45" />
            <div className="h-px flex-1 bg-champagne" />
          </motion.div>

          <motion.button
            onClick={() => scrollToSection("islamic-quote")}
            variants={itemFadeInUp}
            custom={6}
            className="mt-10 flex items-center gap-2 px-6 py-3 rounded-full border border-champagne/30 text-champagne/70 hover:text-champagne hover:border-champagne/60 text-xs uppercase tracking-[0.25em] transition-all cursor-pointer bg-elegant/5 hover:bg-elegant/10"
            aria-label="Scroll to explore the invitation"
          >
            <span>Scroll to Explore</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
