"use client";

import { motion } from "framer-motion";
import { WeddingData } from "../utils/weddingStore";

interface InvitationLetterProps {
  data: WeddingData;
  guestName: string;
}

export default function InvitationLetter({ data, guestName }: InvitationLetterProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center py-20 px-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-luxury-bg islamic-pattern opacity-10" />

      {/* Gold Arch Outer Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="paper-texture relative w-full max-w-2xl px-6 py-16 sm:px-12 sm:py-24 rounded-[40px] shadow-2xl border border-gold/30 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Luxury Gold Border Outlines */}
        <div className="absolute inset-4 border border-gold/20 rounded-[32px] pointer-events-none" />
        <div className="absolute inset-5 border border-gold/40 rounded-[28px] pointer-events-none" />
        
        {/* Decorative corner ornaments */}
        <div className="absolute top-8 left-8 w-8 h-8 text-gold opacity-60">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 0 h 30 v 2 H 2 v 28 H 0 Z" />
          </svg>
        </div>
        <div className="absolute top-8 right-8 w-8 h-8 text-gold opacity-60 rotate-90">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 0 h 30 v 2 H 2 v 28 H 0 Z" />
          </svg>
        </div>
        <div className="absolute bottom-8 left-8 w-8 h-8 text-gold opacity-60 -rotate-90">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 0 h 30 v 2 H 2 v 28 H 0 Z" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 w-8 h-8 text-gold opacity-60 rotate-180">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 0 h 30 v 2 H 2 v 28 H 0 Z" />
          </svg>
        </div>

        {/* Bismillah Calligraphy (SVG) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-48 sm:w-64 text-gold mb-8 fill-current"
        >
          {/* Beautiful Vector Arabic Bismillah */}
          <svg viewBox="0 0 350 70" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20 35 C 40 10, 80 10, 100 35 C 120 60, 160 60, 180 35 C 200 10, 240 10, 260 35 C 270 50, 290 50, 310 35" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 85 45 C 90 20, 110 20, 115 45 M 100 30 C 102 20, 108 20, 110 30" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Elegant Calligraphic Text overlay representation */}
            <text x="50%" y="45" textAnchor="middle" className="font-playfair text-xl tracking-[0.25em] fill-gold font-light" style={{ fontStyle: "italic" }}>
              Bismillahir Rahmanir Rahim
            </text>
          </svg>
        </motion.div>

        {/* Islamic Greeting (Arabic & English) */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-playfair text-2xl sm:text-3xl text-gold-gradient tracking-wide mb-2"
        >
          Assalamu Alaikum
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xs sm:text-sm tracking-widest text-gold/60 uppercase mb-8"
        >
          Peace be upon you
        </motion.p>

        {/* Guest Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-center mb-6"
        >
          <p className="font-cormorant text-lg sm:text-xl text-navy/70 italic">Dear</p>
          <h2 className="font-playfair text-2xl sm:text-4xl font-semibold text-navy tracking-wide mt-1">
            {guestName}
          </h2>
        </motion.div>

        {/* Invitation Message Body */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-center max-w-md sm:max-w-lg mb-10 flex flex-col items-center"
        >
          <p className="font-cormorant text-lg sm:text-xl leading-relaxed text-navy/80 px-4">
            With the blessings of Allah SWT, we cordially invite you and your family to celebrate the wedding ceremony of
          </p>

          {/* Names Section */}
          <div className="my-8 flex flex-col items-center">
            {/* Bride */}
            <motion.h4
              whileHover={{ scale: 1.03 }}
              className="font-playfair text-3xl sm:text-4xl font-bold tracking-wide text-gold-gradient cursor-default"
            >
              {data.brideName}
            </motion.h4>
            
            {/* Heart Seal */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="my-4 text-gold flex items-center justify-center"
            >
              <span className="text-2xl">❤</span>
            </motion.div>

            {/* Groom */}
            <motion.h4
              whileHover={{ scale: 1.03 }}
              className="font-playfair text-3xl sm:text-4xl font-bold tracking-wide text-gold-gradient cursor-default"
            >
              {data.groomName}
            </motion.h4>
          </div>

          <p className="font-cormorant text-base sm:text-lg text-gold/80 italic tracking-wider mt-4">
            to be united in holy matrimony
          </p>
        </motion.div>

        {/* Decorative Divider */}
        <div className="flex items-center gap-3 w-48 opacity-40">
          <div className="h-[1px] flex-1 bg-gold" />
          <div className="w-2.5 h-2.5 rounded-full border border-gold rotate-45" />
          <div className="h-[1px] flex-1 bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}
