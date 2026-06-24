"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
  guestName: string;
}

export default function Envelope({ onOpen, guestName }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenedFully, setIsOpenedFully] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background particle context & rose petal rainfall setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles (stars) in the background
    const stars: Array<{ x: number; y: number; size: number; speed: number; alpha: number }> = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.15 + 0.05,
        alpha: Math.random(),
      });
    }

    // Rose petals (only active after envelope is clicked)
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }
    const petals: Petal[] = [];
    const createPetals = () => {
      for (let i = 0; i < 70; i++) {
        petals.push({
          x: Math.random() * width,
          y: -50 - Math.random() * height,
          size: Math.random() * 12 + 8,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 + 1.5,
          opacity: Math.random() * 0.6 + 0.4,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 2 - 1,
        });
      }
    };

    let triggerPetals = false;

    // Listen for custom trigger to start rose rain
    const handleEnvelopeOpen = () => {
      triggerPetals = true;
      createPetals();
    };

    window.addEventListener("start-rose-rain", handleEnvelopeOpen);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      ctx.fillStyle = "#D4AF37";
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) star.y = 0;
        star.alpha += Math.random() * 0.04 - 0.02;
        if (star.alpha < 0) star.alpha = 0;
        if (star.alpha > 1) star.alpha = 1;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render rose petals if triggered
      if (triggerPetals) {
        petals.forEach((petal) => {
          petal.y += petal.speedY;
          petal.x += petal.speedX + Math.sin(petal.y / 30) * 0.5;
          petal.rotation += petal.rotationSpeed;

          // Recycle petals
          if (petal.y > height + 20) {
            petal.y = -20;
            petal.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(petal.x, petal.y);
          ctx.rotate((petal.rotation * Math.PI) / 180);
          ctx.globalAlpha = petal.opacity;

          // Drawing a single premium organic rose petal shape
          ctx.beginPath();
          ctx.fillStyle = "rgba(224, 60, 96, 0.85)"; // Beautiful rose pink/crimson
          ctx.bezierCurveTo(0, 0, -petal.size / 2, -petal.size / 2, -petal.size, 0);
          ctx.bezierCurveTo(-petal.size, 0, -petal.size / 2, petal.size, 0, petal.size);
          ctx.bezierCurveTo(0, petal.size, petal.size / 2, petal.size, petal.size, 0);
          ctx.bezierCurveTo(petal.size, 0, petal.size / 2, -petal.size / 2, 0, 0);
          ctx.fill();

          // Add simple vein/highlight
          ctx.beginPath();
          ctx.strokeStyle = "rgba(180, 20, 50, 0.4)";
          ctx.lineWidth = 0.5;
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(0, petal.size / 2, 0, petal.size);
          ctx.stroke();

          ctx.restore();
        });
      }

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("start-rose-rain", handleEnvelopeOpen);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Play sound, start rose rain, transition out
    window.dispatchEvent(new Event("start-rose-rain"));
    
    // Stage 1: Seal fades/scale-down, flap opens (takes ~1.2s total)
    // Stage 2: Card slides out (takes ~1s)
    // Stage 3: Envelope fades out completely and unlocks invitation
    setTimeout(() => {
      setIsOpenedFully(true);
      setTimeout(() => {
        onOpen();
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy text-cream overflow-hidden">
      {/* Dynamic Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Islamic Border Pattern Overlay */}
      <div className="absolute inset-4 border border-gold/15 pointer-events-none rounded-lg islamic-pattern opacity-30" />
      <div className="absolute inset-6 border border-gold/30 pointer-events-none rounded-lg" />
      
      {/* Top Corners Decorative SVGs */}
      <div className="absolute top-8 left-8 w-12 h-12 text-gold opacity-40 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M0 0 h 60 v 4 H 4 v 56 H 0 Z" />
          <path d="M10 10 h 40 v 2 H 12 v 38 H 10 Z" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 w-12 h-12 text-gold opacity-40 pointer-events-none rotate-90">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M0 0 h 60 v 4 H 4 v 56 H 0 Z" />
          <path d="M10 10 h 40 v 2 H 12 v 38 H 10 Z" />
        </svg>
      </div>

      <AnimatePresence>
        {!isOpenedFully && (
          <motion.div
            className="flex flex-col items-center z-10 w-full px-4 text-center max-w-xl"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Header Text */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="font-playfair text-lg sm:text-xl tracking-[0.2em] text-gold uppercase mb-2"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xs sm:text-sm tracking-[0.3em] font-cormorant text-gold/60 uppercase mb-8"
            >
              Bismillahir Rahmanir Rahim
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 1.2 }}
              className="font-playfair text-3xl sm:text-5xl font-light tracking-[0.1em] text-gold-gradient uppercase mb-12"
            >
              You Are Invited
            </motion.h1>

            {/* 3D Envelope container */}
            <div className="relative w-[320px] h-[210px] sm:w-[460px] sm:h-[300px] mt-2 mb-12 perspective-[1000px]">
              {/* Back flap (interior of the envelope) */}
              <div className="absolute inset-0 bg-gold-dark rounded-lg shadow-2xl overflow-hidden border border-gold/30">
                <div className="absolute inset-0 bg-navy opacity-95 flex items-center justify-center">
                  {/* Luxury Inner Lining pattern */}
                  <div className="w-full h-full islamic-pattern opacity-25" />
                </div>
              </div>

              {/* The Letter Card inside */}
              <motion.div
                className="absolute inset-x-4 top-2 bottom-2 bg-cream rounded-md p-4 text-navy flex flex-col justify-center items-center shadow-lg border border-gold/30"
                initial={{ y: 0, opacity: 0.8 }}
                animate={isOpen ? { y: -160, opacity: 1, scale: 1.02 } : { y: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              >
                <div className="border border-gold/20 w-full h-full rounded p-3 flex flex-col justify-between items-center text-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Wedding Invitation</span>
                  <div className="my-2">
                    <p className="font-playfair text-sm italic text-navy/80">Save the Date for</p>
                    <p className="font-playfair text-xl sm:text-2xl font-bold tracking-wide text-gold-gradient mt-1">Ayesha & Zayd</p>
                  </div>
                  <div className="h-[1px] w-12 bg-gold/30" />
                  <p className="text-[11px] font-playfair tracking-widest text-navy/60 uppercase">Honor of Your Presence Is Requested</p>
                </div>
              </motion.div>

              {/* Bottom and Side Flaps (these overlay in front of the letter initially) */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* Left Side Flap */}
                <div 
                  className="absolute left-0 bottom-0 top-0 w-1/2 bg-navy border-l border-gold/20 shadow-md"
                  style={{
                    clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
                    background: "linear-gradient(to right, #0F172A, #1E293B)",
                  }}
                />
                {/* Right Side Flap */}
                <div 
                  className="absolute right-0 bottom-0 top-0 w-1/2 bg-navy border-r border-gold/20 shadow-md"
                  style={{
                    clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
                    background: "linear-gradient(to left, #0F172A, #1E293B)",
                  }}
                />
                {/* Bottom Flap */}
                <div 
                  className="absolute left-0 right-0 bottom-0 h-1/2 bg-navy border-b border-gold/20 shadow-lg"
                  style={{
                    clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                    background: "linear-gradient(to top, #0A0F1D, #0F172A)",
                  }}
                />
              </div>

              {/* Top Flap (folds over from the top) */}
              <motion.div
                className="absolute left-0 right-0 top-0 h-1/2 bg-navy border-t border-gold/20 z-30"
                style={{
                  clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
                  background: "linear-gradient(to bottom, #0F172A, #1E293B)",
                  originY: 0,
                }}
                animate={isOpen ? { rotateX: -180, zIndex: 5 } : { rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Wax Seal - Clicking this triggers the open animation */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.button
                    onClick={handleOpenEnvelope}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 focus:outline-none cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
                  >
                    {/* Pulsing Seal Aura */}
                    <span className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-60" />
                    
                    {/* Melting Wax SVG Seal */}
                    <svg className="w-full h-full drop-shadow-lg text-gold-gradient fill-current" viewBox="0 0 100 100">
                      <defs>
                        <radialGradient id="wax-grad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#FFF8E7" />
                          <stop offset="35%" stopColor="#D4AF37" />
                          <stop offset="70%" stopColor="#AA7C11" />
                          <stop offset="100%" stopColor="#553D00" />
                        </radialGradient>
                      </defs>
                      {/* Wax Outer Border */}
                      <circle cx="50" cy="50" r="44" fill="url(#wax-grad)" opacity="0.9" />
                      {/* Melted organic contours */}
                      <path d="M 45 8 C 55 9, 65 5, 75 12 C 85 20, 95 35, 92 48 C 89 61, 94 75, 83 85 C 72 95, 55 91, 45 92 C 35 93, 20 95, 12 84 C 4 73, 9 55, 7 45 C 5 35, 3 20, 14 12 C 25 4, 35 7, 45 8 Z" fill="url(#wax-grad)" />
                      {/* Inner gold crest ring */}
                      <circle cx="50" cy="50" r="30" fill="none" stroke="#AA7C11" strokeWidth="1.5" strokeDasharray="3,3" />
                      <circle cx="50" cy="50" r="26" fill="none" stroke="#F3E5AB" strokeWidth="1" />
                      {/* Bismillah Calligraphy Stamp or Calligraphy initial - let's render an ornate calligraphy pattern */}
                      <path d="M 50 32 C 45 32, 42 38, 42 42 C 42 48, 58 45, 58 52 C 58 58, 50 64, 44 64 M 40 50 L 60 50 M 50 40 A 10 10 0 0 1 50 60" fill="none" stroke="#FFF8E7" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Guest Welcome & Click Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex flex-col items-center"
            >
              <p className="font-cormorant text-base sm:text-lg tracking-widest text-cream/70 uppercase">
                Welcome
              </p>
              <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-gold mt-1 mb-8">
                {guestName}
              </h2>
              
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1 opacity-50"
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em]">Click seal to open</span>
                <ChevronDown className="h-4 w-4 text-gold" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
