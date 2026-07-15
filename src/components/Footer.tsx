"use client";

import { motion } from "framer-motion";
import { Phone, ArrowUp } from "lucide-react";
import { fadeInUp, fadeInScale } from "@/src/utils/constants";
import { WeddingData } from "../utils/weddingStore";
import DecorativeDivider from "./DecorativeDivider";

interface FooterProps {
  data: WeddingData;
}

export default function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-elegant text-warm-white py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-champagne/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute inset-4 border border-champagne/15 pointer-events-none rounded-lg" />
      <div className="absolute inset-6 border border-champagne/25 pointer-events-none rounded-lg" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          variants={fadeInUp}
          className="mb-16"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-champagne/60 font-cormorant">A Gracious Thank You</span>
          <h2 className="font-cormorant text-[clamp(1.75rem,5vw,2.5rem)] sm:text-4xl font-semibold text-gold-gradient mt-2 mb-6">
            Thank You
          </h2>
          <p className="font-inter text-base sm:text-lg text-champagne/80 max-w-lg mx-auto leading-relaxed italic">
            Your presence and prayers on our special day will make our celebration truly complete. We look forward to welcoming you with warm hearts.
          </p>
        </motion.div>

        <DecorativeDivider className="mx-auto mb-16" dot />

        <motion.div
          variants={fadeInUp}
          className="mb-16"
        >
          <h3 className="font-cormorant text-lg sm:text-xl text-gold uppercase tracking-[0.2em] mb-10">
            With Compliments From
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl border border-champagne/10 bg-elegant-light/30 backdrop-blur-sm shadow-card">
              <span className="text-[10px] tracking-widest text-champagne uppercase font-cormorant">Bride&apos;s Family</span>
              <h4 className="font-cormorant text-base sm:text-lg font-bold text-warm-white mt-2 mb-4 leading-tight">
                {data.brideFamily}
              </h4>
              <a
                href={`tel:${data.brideContact.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 text-xs text-gold hover:text-warm-white transition-colors mt-2"
              >
                <Phone className="h-3.5 w-3.5" />
                {data.brideContact}
              </a>
            </div>

            <div className="p-6 rounded-2xl border border-champagne/10 bg-elegant-light/30 backdrop-blur-sm shadow-card">
              <span className="text-[10px] tracking-widest text-champagne uppercase font-cormorant">Groom&apos;s Family</span>
              <h4 className="font-cormorant text-base sm:text-lg font-bold text-warm-white mt-2 mb-4 leading-tight">
                {data.groomFamily}
              </h4>
              <a
                href={`tel:${data.groomContact.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 text-xs text-gold hover:text-warm-white transition-colors mt-2"
              >
                <Phone className="h-3.5 w-3.5" />
                {data.groomContact}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInScale}
          className="text-champagne opacity-50 w-24 h-12 mx-auto fill-current"
        >
          <svg viewBox="0 0 100 50">
            <path d="M 10 25 L 30 25 M 70 25 L 90 25 M 50 15 L 50 35 M 40 25 A 10 10 0 0 1 60 25" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="50,11 47,15 53,15" fill="currentColor" />
            <polygon points="50,39 47,35 53,35" fill="currentColor" />
            <circle cx="50" cy="25" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        <p className="text-[10px] font-inter tracking-widest text-champagne/40 uppercase mt-8">
          &copy; {year} Ayesha &amp; Zayd Wedding Invitation. All rights reserved.
        </p>

        <motion.button
          onClick={scrollToTop}
          variants={fadeInUp}
          className="mt-10 mx-auto flex items-center gap-2 px-5 py-2 rounded-full border border-champagne/20 text-champagne/60 hover:text-champagne hover:border-champagne/40 text-xs uppercase tracking-widest transition-all focus-visible:outline-2 focus-visible:outline-gold"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-3 w-3" />
          Back to top
        </motion.button>
      </div>
    </footer>
  );
}
