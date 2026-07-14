"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, MapPin } from "lucide-react";
import { WeddingData } from "../utils/weddingStore";

interface EventDetailsProps {
  data: WeddingData;
}

const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function EventDetails({ data }: EventDetailsProps) {
  const events = [
    {
      title: "The Nikah",
      arabicTitle: "النكاح",
      description: "The Islamic Marriage Contract Ceremony",
      date: data.nikahDate,
      time: data.nikahTime,
      venue: data.venueName,
      icon: (
        <svg className="w-12 h-12 text-gold fill-current" viewBox="0 0 100 100">
          <path d="M 50 5 L 50 15 M 40 15 L 60 15 C 60 15, 65 30, 75 35 C 75 35, 78 45, 68 55 L 68 80 C 68 85, 62 90, 50 90 C 38 90, 32 85, 32 80 L 32 55 C 22 45, 25 35, 25 35 C 35 30, 40 15, 40 15 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 38 45 L 62 45 M 32 58 L 68 58 M 32 70 L 68 70 M 50 15 L 50 90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
          <circle cx="50" cy="93" r="2.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "The Walima",
      arabicTitle: "الوليمة",
      description: "The Wedding Reception & Banquet",
      date: data.walimaDate,
      time: data.walimaTime,
      venue: data.venueName,
      icon: (
        <svg className="w-12 h-12 text-gold fill-current" viewBox="0 0 100 100">
          <path d="M 50 5 C 50 5, 45 18, 30 25 C 20 30, 20 40, 20 40 L 80 40 C 80 40, 80 30, 70 25 C 55 18, 50 5, 50 5 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <rect x="25" y="40" width="50" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 35 55 A 15 15 0 0 1 65 55 L 65 82 L 35 82 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="40" x2="50" y2="82" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 bg-luxury-bg overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-10" />
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-cormorant">Schedule of celebrations</span>
          <h2 className="font-playfair text-[clamp(1.75rem,5vw,3rem)] sm:text-5xl font-light text-navy tracking-wide mt-2">
            Event Details
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-gold/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-[1px] w-8 bg-gold/50" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: index * 0.2, ease: easeOutExpo }}
              className="paper-texture relative rounded-[32px] p-8 sm:p-10 border border-gold/30 shadow-elevated flex flex-col justify-between overflow-hidden group hover:shadow-gold transition-all duration-500"
            >
              <div className="absolute inset-3 border border-gold/15 rounded-[24px] pointer-events-none group-hover:border-gold/30 transition-colors" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-cream border border-gold/20 shadow-soft">
                  {event.icon}
                </div>

                <span className="font-urdu text-xl text-gold-gradient tracking-wide mb-1 opacity-80 select-none">
                  {event.arabicTitle}
                </span>

                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-navy tracking-wide mt-2">
                  {event.title}
                </h3>
                
                <p className="font-cormorant text-sm italic text-navy/60 mt-1 mb-8">
                  {event.description}
                </p>

                <div className="w-full flex flex-col gap-4 text-left border-t border-gold/15 pt-6 max-w-xs">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gold shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-navy/40 font-cormorant">Date</p>
                      <p className="font-playfair text-sm font-semibold text-navy mt-0.5">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gold shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-navy/40 font-cormorant">Time</p>
                      <p className="font-playfair text-sm font-semibold text-navy mt-0.5">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gold shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-navy/40 font-cormorant">Venue</p>
                      <p className="font-playfair text-sm font-semibold text-navy mt-0.5 leading-tight">{event.venue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
