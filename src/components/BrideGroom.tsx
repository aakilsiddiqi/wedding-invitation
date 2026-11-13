"use client";

import { motion } from "framer-motion";
import { easeOutExpo, fadeInLeft, fadeInRight } from "@/src/utils/constants";
import { WeddingData } from "../utils/weddingStore";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";

interface BrideGroomProps {
  data: WeddingData;
}

export default function BrideGroom({ data }: BrideGroomProps) {
  return (
    <SectionWrapper id="bride-groom" dark decorative>
      <SectionTitle label="Introducing The Couple" title="The Bride & The Groom" dark />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 items-center justify-center max-w-4xl mx-auto">
        <motion.div
          variants={fadeInLeft}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-t-full border border-champagne/30 bg-elegant-light/40 flex items-center justify-center p-6 shadow-elevated backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-2 rounded-t-full border border-champagne/10 pointer-events-none" />

            <svg className="w-full h-full text-gold fill-current" viewBox="0 0 200 240" role="img" aria-label="Bride illustration">
              <defs>
                <linearGradient id="gold-grad-bride" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#AA7C11" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#FFF8E7" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="120" r="80" fill="url(#gold-grad-bride)" opacity="0.08" />
              <path d="M 100 30 C 55 30, 45 70, 45 130 C 45 200, 30 230, 20 240 L 180 240 C 170 230, 155 200, 155 130 C 155 70, 145 30, 100 30 Z" fill="url(#gold-grad-bride)" opacity="0.25" />
              <path d="M 100 35 C 65 35, 52 72, 52 130 C 52 190, 40 220, 35 240 L 165 240 C 160 220, 148 190, 148 130 C 148 72, 135 35, 100 35 Z" fill="#1A1A2E" />
              <path d="M 100 70 C 82 70, 75 90, 75 110 C 75 130, 85 145, 100 145 C 115 145, 125 130, 125 110 C 125 90, 118 70, 100 70 Z" fill="url(#gold-grad-bride)" opacity="0.15" />
              <path d="M 100 50 C 75 50, 68 75, 68 110 C 68 140, 82 155, 100 155 C 118 155, 132 140, 132 110 C 132 75, 125 50, 100 50 Z" fill="none" stroke="url(#gold-grad-bride)" strokeWidth="2.5" />
              <path d="M 100 50 C 80 50, 72 75, 72 110 C 72 135, 85 152, 100 152 C 115 152, 128 135, 128 110 C 128 75, 120 50, 100 50 Z" fill="none" stroke="#FFF8E7" strokeWidth="1" opacity="0.3" />
              <path d="M 100 50 L 100 75" stroke="url(#gold-grad-bride)" strokeWidth="2" />
              <polygon points="100,75 97,82 100,88 103,82" fill="url(#gold-grad-bride)" />
              <circle cx="100" cy="82" r="1.5" fill="#FFF8E7" />
              <path d="M 76 80 Q 84 62, 100 52" fill="none" stroke="url(#gold-grad-bride)" strokeWidth="1.2" />
              <circle cx="83" cy="71" r="1.5" fill="url(#gold-grad-bride)" />
              <circle cx="91" cy="61" r="1.5" fill="url(#gold-grad-bride)" />
              <path d="M 78 140 C 78 140, 90 170, 100 170 C 110 170, 122 140, 122 140 C 122 140, 120 185, 100 185 C 80 185, 78 140, 78 140 Z" fill="url(#gold-grad-bride)" opacity="0.8" />
              <path d="M 50 200 C 50 180, 70 175, 100 175 C 130 175, 150 180, 150 200 C 150 215, 160 228, 170 240 L 30 240 C 40 228, 50 215, 50 200 Z" fill="url(#gold-grad-bride)" />
              <path d="M 100 175 L 100 240 M 90 185 L 90 240 M 110 185 L 110 240 M 75 195 L 85 240 M 125 195 L 115 240" fill="none" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.35" />
              <path d="M 100 190 L 80 205 M 100 205 L 120 220 M 100 190 L 120 205 M 100 205 L 80 220" fill="none" stroke="url(#gold-grad-bride)" strokeWidth="1.5" opacity="0.7" />
            </svg>
          </motion.div>

          <h3 className="font-cormorant text-2xl font-bold text-gold mt-6 tracking-wide">
            {data.brideName}
          </h3>
          <p className="font-inter text-sm text-champagne/60 uppercase tracking-widest mt-1">
            The Elegant Bride
          </p>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-t-full border border-champagne/30 bg-elegant-light/40 flex items-center justify-center p-6 shadow-elevated backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-2 rounded-t-full border border-champagne/10 pointer-events-none" />

            <svg className="w-full h-full text-gold fill-current" viewBox="0 0 200 240" role="img" aria-label="Groom illustration">
              <defs>
                <linearGradient id="gold-grad-groom" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#AA7C11" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#FFF8E7" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="120" r="80" fill="url(#gold-grad-groom)" opacity="0.08" />
              <path d="M 68 58 C 68 50, 75 32, 100 32 C 125 32, 132 50, 132 58 C 132 63, 125 66, 100 66 C 75 66, 68 63, 68 58 Z" fill="url(#gold-grad-groom)" />
              <path d="M 69 54 Q 100 42, 131 54 M 72 58 Q 100 48, 128 58 M 76 62 Q 100 54, 124 62" fill="none" stroke="#1A1A2E" strokeWidth="1.2" opacity="0.3" />
              <path d="M 100 32 C 100 15, 96 8, 96 5 C 96 8, 92 15, 100 32 Z" fill="url(#gold-grad-groom)" />
              <circle cx="98" cy="22" r="2.5" fill="#FFF8E7" />
              <line x1="100" y1="32" x2="98" y2="22" stroke="url(#gold-grad-groom)" strokeWidth="1" />
              <path d="M 100 58 C 82 58, 77 75, 77 98 C 77 122, 85 138, 100 138 C 115 138, 123 122, 123 98 C 123 75, 118 58, 100 58 Z" fill="url(#gold-grad-groom)" opacity="0.15" />
              <path d="M 100 58 C 82 58, 77 75, 77 98 C 77 122, 85 138, 100 138 C 115 138, 123 122, 123 98 C 123 75, 118 58, 100 58 Z" fill="none" stroke="url(#gold-grad-groom)" strokeWidth="1" opacity="0.2" />
              <path d="M 85 125 L 82 145 C 82 145, 92 155, 100 155 C 108 155, 118 145, 118 145 L 115 125 Z" fill="url(#gold-grad-groom)" />
              <path d="M 85 125 L 82 145 C 82 145, 92 155, 100 155 C 108 155, 118 145, 118 145 L 115 125 Z" fill="none" stroke="#FFF8E7" strokeWidth="1" opacity="0.2" />
              <path d="M 77 95 C 77 120, 85 132, 100 132 C 115 132, 123 120, 123 95 C 123 105, 115 122, 100 122 C 85 122, 77 105, 77 95 Z" fill="url(#gold-grad-groom)" opacity="0.3" />
              <path d="M 45 190 C 45 170, 65 160, 100 160 C 135 160, 155 170, 155 190 L 165 240 L 35 240 Z" fill="url(#gold-grad-groom)" />
              <path d="M 100 160 L 100 240" stroke="#1A1A2E" strokeWidth="2.5" opacity="0.4" />
              <circle cx="100" cy="175" r="2.5" fill="#FFF8E7" />
              <circle cx="100" cy="190" r="2.5" fill="#FFF8E7" />
              <circle cx="100" cy="205" r="2.5" fill="#FFF8E7" />
              <circle cx="100" cy="220" r="2.5" fill="#FFF8E7" />
              <path d="M 120 180 L 138 180 L 134 195 L 122 195 Z" fill="#FFF8E7" opacity="0.2" />
              <path d="M 124 180 L 129 170 L 134 180" fill="url(#gold-grad-groom)" />
            </svg>
          </motion.div>

          <h3 className="font-cormorant text-2xl font-bold text-gold mt-6 tracking-wide">
            {data.groomName}
          </h3>
          <p className="font-inter text-sm text-champagne/60 uppercase tracking-widest mt-1">
            The Noble Groom
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
