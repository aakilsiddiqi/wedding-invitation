"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { WeddingData } from "../utils/weddingStore";

interface VenueProps {
  data: WeddingData;
}

const easeOutExpo: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function Venue({ data }: VenueProps) {
  return (
    <section className="relative py-24 bg-navy text-cream overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-10" />
      <div className="absolute -bottom-48 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-cormorant">The Celebration Venue</span>
          <h2 className="font-playfair text-[clamp(1.75rem,5vw,3rem)] sm:text-5xl font-light text-gold-gradient tracking-wide mt-2">
            Venue & Location
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-gold/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-[1px] w-8 bg-gold/50" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 h-36 text-gold fill-current mb-8 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
                <path d="M 10 110 L 10 70 L 30 50 L 50 70 L 50 110" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 150 110 L 150 70 L 130 50 L 110 70 L 110 110" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 50 110 L 50 60 C 50 35, 65 30, 80 15 C 95 30, 110 35, 110 60 L 110 110" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M 70 110 L 70 80 C 70 72, 75 66, 80 66 C 85 66, 90 72, 90 80 L 90 110" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="30" y1="50" x2="30" y2="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 30 10 C 30 10, 27 15, 30 20 C 33 15, 30 10, 30 10 Z" fill="currentColor" />
                <line x1="130" y1="50" x2="130" y2="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 130 10 C 130 10, 127 15, 130 20 C 133 15, 130 10, 130 10 Z" fill="currentColor" />
                <circle cx="80" cy="45" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
                <line x1="10" y1="110" x2="150" y2="110" stroke="currentColor" strokeWidth="2" />
              </svg>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="font-playfair text-2xl sm:text-3xl font-bold text-gold"
            >
              {data.venueName}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
              className="flex items-start gap-2.5 mt-4 mb-8 text-cream/80 max-w-sm"
            >
              <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <p className="font-cormorant text-base sm:text-lg leading-relaxed">
                {data.venueAddress}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
              className="flex flex-wrap gap-4 items-center justify-center lg:justify-start"
            >
              <a
                href={data.googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-gold/30 bg-gold-gradient text-navy font-playfair font-semibold text-xs tracking-wider uppercase hover:shadow-gold transition-all focus-visible:outline-2 focus-visible:outline-gold"
              >
                <ExternalLink className="h-4 w-4" />
                Open In Maps
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.venueAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-gold/40 hover:bg-gold/10 text-gold font-playfair font-semibold text-xs tracking-wider uppercase transition-all focus-visible:outline-2 focus-visible:outline-gold"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: easeOutExpo }}
            className="lg:col-span-7 w-full aspect-video min-h-[320px] max-h-[450px] rounded-3xl overflow-hidden border border-gold/30 shadow-elevated relative glow-effect"
          >
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold z-10 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold z-10 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold z-10 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold z-10 pointer-events-none" />

            <iframe
              src={data.googleMapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Location Map"
              className="opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
