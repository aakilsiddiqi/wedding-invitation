"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { WeddingData } from "../utils/weddingStore";

interface FooterProps {
  data: WeddingData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="relative bg-navy text-cream py-24 px-4 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 islamic-pattern opacity-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Outer borders */}
      <div className="absolute inset-4 border border-gold/15 pointer-events-none rounded-lg" />
      <div className="absolute inset-6 border border-gold/25 pointer-events-none rounded-lg" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Thank You Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="mb-16"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold/60 font-cormorant">A Gracious Thank You</span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-light text-gold-gradient mt-2 mb-6">
            Thank You
          </h2>
          <p className="font-cormorant text-base sm:text-lg text-cream/80 max-w-lg mx-auto leading-relaxed italic">
            Your presence and prayers on our special day will make our celebration truly complete. We look forward to welcoming you with warm hearts.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 w-40 mx-auto opacity-30 mb-16">
          <div className="h-[1px] flex-1 bg-gold" />
          <div className="w-2 h-2 rounded-full border border-gold rotate-45" />
          <div className="h-[1px] flex-1 bg-gold" />
        </div>

        {/* Compliments Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="font-playfair text-lg sm:text-xl text-gold uppercase tracking-[0.2em] mb-10">
            With Compliments From
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
            {/* Bride's Family */}
            <div className="p-6 rounded-2xl border border-gold/10 bg-navy-light/30 backdrop-blur-sm">
              <span className="text-[10px] tracking-widest text-gold uppercase font-cormorant">Bride's Family</span>
              <h4 className="font-playfair text-base sm:text-lg font-bold text-cream mt-2 mb-4 leading-tight">
                {data.brideFamily}
              </h4>
              <a
                href={`tel:${data.brideContact.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 text-xs text-gold hover:text-cream transition-colors mt-2"
              >
                <Phone className="h-3.5 w-3.5" />
                {data.brideContact}
              </a>
            </div>

            {/* Groom's Family */}
            <div className="p-6 rounded-2xl border border-gold/10 bg-navy-light/30 backdrop-blur-sm">
              <span className="text-[10px] tracking-widest text-gold uppercase font-cormorant">Groom's Family</span>
              <h4 className="font-playfair text-base sm:text-lg font-bold text-cream mt-2 mb-4 leading-tight">
                {data.groomFamily}
              </h4>
              <a
                href={`tel:${data.groomContact.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 text-xs text-gold hover:text-cream transition-colors mt-2"
              >
                <Phone className="h-3.5 w-3.5" />
                {data.groomContact}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Elegant footer bottom ornament (SVG) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="text-gold opacity-50 w-24 h-12 mx-auto fill-current"
        >
          <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 25 L 30 25 M 70 25 L 90 25 M 50 15 L 50 35 M 40 25 A 10 10 0 0 1 60 25" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="50,11 47,15 53,15" fill="currentColor" />
            <polygon points="50,39 47,35 53,35" fill="currentColor" />
            <circle cx="50" cy="25" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        <p className="text-[10px] font-cormorant tracking-widest text-cream/40 uppercase mt-8">
          &copy; {new Date().getFullYear()} Ayesha & Zayd Wedding Invitation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
