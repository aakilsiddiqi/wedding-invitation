"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { easeOutExpo, itemFadeInUp, staggerContainer } from "@/src/utils/constants";
import { WeddingData } from "../utils/weddingStore";
import SectionWrapper from "./SectionWrapper";
import SectionTitle from "./SectionTitle";

interface EventDetailsProps {
  data: WeddingData;
}

export default function EventDetails({ data }: EventDetailsProps) {
  const events = [
    {
      title: "The Nikah",
      arabicTitle: "النكاح",
      description: "The Islamic Marriage Contract Ceremony",
      date: data.nikahDate,
      time: data.nikahTime,
      venue: data.venueName,
    },
    {
      title: "The Walima",
      arabicTitle: "الوليمة",
      description: "The Wedding Reception & Banquet",
      date: data.walimaDate,
      time: data.walimaTime,
      venue: data.venueName,
    },
  ];

  return (
    <SectionWrapper id="events" decorative>
      <SectionTitle label="Schedule of celebrations" title="Event Details" />

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto"
      >
        {events.map((event) => (
          <motion.div
            key={event.title}
            variants={itemFadeInUp}
            custom={0}
            className="paper-texture relative rounded-[32px] p-8 sm:p-10 border border-champagne/30 shadow-elevated flex flex-col justify-between overflow-hidden group hover:shadow-warm transition-all duration-500"
          >
            <div className="absolute inset-3 border border-champagne/15 rounded-[24px] pointer-events-none group-hover:border-champagne/30 transition-colors" />
            <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-50" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="font-urdu text-xl text-gold-gradient tracking-wide mb-1 opacity-80 select-none">
                {event.arabicTitle}
              </span>

              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-elegant tracking-wide mt-2">
                {event.title}
              </h3>

              <p className="font-inter text-sm italic text-muted mt-1 mb-8">
                {event.description}
              </p>

              <div className="w-full flex flex-col gap-4 text-left border-t border-champagne/20 pt-6 max-w-xs">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted font-inter">Date</p>
                    <p className="font-cormorant text-sm font-semibold text-elegant mt-0.5">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted font-inter">Time</p>
                    <p className="font-cormorant text-sm font-semibold text-elegant mt-0.5">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted font-inter">Venue</p>
                    <p className="font-cormorant text-sm font-semibold text-elegant mt-0.5 leading-tight">{event.venue}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
