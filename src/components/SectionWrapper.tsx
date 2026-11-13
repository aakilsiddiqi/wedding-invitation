"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeInScale } from "@/src/utils/constants";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  decorative?: boolean;
}

export default function SectionWrapper({ children, className = "", id, dark = false, decorative = true }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-24 overflow-hidden ${dark ? "bg-elegant text-warm-white" : "bg-ivory text-elegant"} ${className}`}>
      {decorative && (
        <>
          <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />
          {dark && <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-champagne/5 rounded-full blur-3xl pointer-events-none" />}
        </>
      )}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {children}
      </div>
    </section>
  );
}

export const SectionWrapperInner = motion.div;
