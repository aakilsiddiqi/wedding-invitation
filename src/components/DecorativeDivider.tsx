"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/src/utils/constants";

interface DecorativeDividerProps {
  className?: string;
  dot?: boolean;
}

export default function DecorativeDivider({ className = "", dot = false }: DecorativeDividerProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`flex items-center justify-center gap-2 mt-4 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-8 bg-champagne" />
      {dot ? (
        <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
      ) : (
        <div className="w-1.5 h-1.5 rotate-45 border border-champagne" />
      )}
      <div className="h-px w-8 bg-champagne" />
    </motion.div>
  );
}
