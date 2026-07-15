"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easeOutExpo, fadeInScale, itemFadeInUp } from "@/src/utils/constants";

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

const boxBorder = "border-champagne/20";

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-24 bg-elegant text-warm-white overflow-hidden" aria-live="polite" aria-label="Wedding countdown timer" role="timer">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-champagne/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 islamic-pattern opacity-[0.08]" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          variants={fadeInScale}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-champagne/70 font-cormorant">Countdown to union</span>
          <h2 className="font-cormorant text-[clamp(1.5rem,4vw,2.5rem)] sm:text-4xl font-semibold text-warm-white mt-1 tracking-wide">
            {timeLeft.isCompleted ? "Alhamdulillah! The Celebration Has Begun" : "Counting Down The Seconds"}
          </h2>
        </motion.div>

        {!timeLeft.isCompleted ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl justify-center">
            {timeItems.map((item, index) => (
              <motion.div
                key={item.label}
                variants={itemFadeInUp}
                custom={index}
                className={`relative bg-elegant-light/50 border ${boxBorder} backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-elevated overflow-hidden`}
              >
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-champagne/40" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-champagne/40" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-champagne/40" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-champagne/40" />

                <span className="font-cormorant text-[clamp(2rem,6vw,3rem)] sm:text-5xl font-bold text-gold-gradient tracking-tight">
                  {String(item.value).padStart(2, "0")}
                </span>

                <span className="text-xs uppercase tracking-[0.2em] text-champagne/60 mt-3 font-inter">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="border border-champagne/30 bg-elegant-light/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center max-w-md shadow-elevated"
          >
            <p className="font-cormorant text-xl text-gold italic">Barakallahu Lakuma wa Baraka Alaikuma wa Jamaa Bainakuma Fee Khair</p>
            <p className="font-inter text-sm text-champagne/70 mt-4 leading-relaxed">
              May Allah bless you and shower His blessings upon you and unite you in goodness.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
