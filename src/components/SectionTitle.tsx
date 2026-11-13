"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/src/utils/constants";
import DecorativeDivider from "./DecorativeDivider";

interface SectionTitleProps {
  label: string;
  title: string;
  dark?: boolean;
}

export default function SectionTitle({ label, title, dark = false }: SectionTitleProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="text-center mb-14"
    >
      <span className={`text-xs uppercase tracking-[0.3em] font-cormorant ${dark ? "text-champagne/70" : "text-muted"}`}>
        {label}
      </span>
      <h2 className={`font-cormorant text-[clamp(1.75rem,5vw,3rem)] sm:text-5xl font-semibold tracking-wide mt-2 ${dark ? "text-warm-white" : "text-elegant"}`}>
        {title}
      </h2>
      <DecorativeDivider />
    </motion.div>
  );
}
