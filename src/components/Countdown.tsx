"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];

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
    <section className="relative py-24 bg-navy text-cream overflow-hidden" aria-live="polite" aria-label="Wedding countdown timer" role="timer">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 islamic-pattern opacity-10" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-cormorant">Countdown to union</span>
          <h2 className="font-playfair text-[clamp(1.5rem,4vw,2.5rem)] sm:text-4xl font-light text-cream mt-1 tracking-wide">
            {timeLeft.isCompleted ? "Alhamdulillah! The Celebration Has Begun" : "Counting Down The Seconds"}
          </h2>
        </motion.div>

        {!timeLeft.isCompleted ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl justify-center">
            {timeItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
                className="relative bg-navy-light/50 border border-gold/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center glow-effect overflow-hidden shadow-card"
              >
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold/40" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-gold/40" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-gold/40" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-gold/40" />

                <span className="font-playfair text-[clamp(2rem,6vw,3rem)] sm:text-5xl font-bold text-gold-gradient tracking-tight">
                  {String(item.value).padStart(2, "0")}
                </span>
                
                <span className="text-xs uppercase tracking-[0.2em] text-cream/60 mt-3 font-cormorant">
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
            className="border border-gold/30 bg-navy-light/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center max-w-md glow-effect shadow-elevated"
          >
            <p className="font-playfair text-xl text-gold italic">Barakallahu Lakuma wa Baraka Alaikuma wa Jamaa Bainakuma Fee Khair</p>
            <p className="font-cormorant text-sm text-cream/70 mt-4 leading-relaxed">
              May Allah bless you and shower His blessings upon you and unite you in goodness.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
