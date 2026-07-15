"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Sparkles } from "lucide-react";
import { easeOutExpo, fadeInUp, staggerContainer } from "@/src/utils/constants";
import { WeddingData } from "../utils/weddingStore";

interface ScratchCardProps {
  data: WeddingData;
  onReveal?: () => void;
}

export default function ScratchCard({ data, onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratchedFully, setIsScratchedFully] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const hasInitializedRef = useRef(false);
  const lastCheckRef = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const drawGoldFoil = (canvas: HTMLCanvasElement, width: number, height: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#AA7C11");
    grad.addColorStop(0.3, "#D4AF37");
    grad.addColorStop(0.5, "#FFF8E7");
    grad.addColorStop(0.7, "#D4AF37");
    grad.addColorStop(1, "#AA7C11");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 0.05;
    for (let i = 0; i < width; i += 4) {
      for (let j = 0; j < height; j += 4) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = "#000";
          ctx.fillRect(i, j, 2, 2);
        } else {
          ctx.fillStyle = "#FFF";
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }
    ctx.globalAlpha = 1.0;

    ctx.strokeStyle = "#AA7C11";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);
    ctx.strokeStyle = "#FFF8E7";
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    ctx.fillStyle = "#1A1A2E";
    ctx.font = 'bold 20px "Cormorant Garamond", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
    ctx.shadowBlur = 4;

    ctx.fillText("SCRATCH CARD", width / 2, height / 2 - 15);

    ctx.font = 'italic 13px "Inter", sans-serif';
    ctx.fillStyle = "#2D2D44";
    ctx.fillText("To Reveal Wedding Dates", width / 2, height / 2 + 15);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (width > 0 && height > 0 && !hasInitializedRef.current) {
          canvas.width = width;
          canvas.height = height;
          drawGoldFoil(canvas, width, height);
          hasInitializedRef.current = true;
        }
      }
    });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
    };
  }, []);

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const draw = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    const now = performance.now();
    if (now - lastCheckRef.current > 200) {
      lastCheckRef.current = now;
      checkScratchPercentage();
    }
  };

  const handleStart = (e: any) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    draw(x, y);
  };

  const handleMove = (e: any) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    const { x, y } = getCoordinates(e);
    draw(x, y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const handleKeyboardReveal = () => {
    setIsScratchedFully(true);
    setShowConfetti(true);
    if (onReveal) onReveal();
    setTimeout(() => setShowConfetti(false), 6000);
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparentCount++;
    }

    const percentage = transparentCount / (pixels.length / 16);

    if (percentage > 0.4) {
      setIsScratchedFully(true);
      setShowConfetti(true);
      if (onReveal) onReveal();
      setTimeout(() => setShowConfetti(false), 6000);
    }
  };

  return (
    <section className="relative py-24 bg-ivory overflow-hidden flex flex-col items-center justify-center">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          colors={["#D4AF37", "#AA7C11", "#FFF8E7", "#E03C60", "#F472B6"]}
          recycle={showConfetti}
          numberOfPieces={160}
        />
      )}

      <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />

      <div className="max-w-md w-full px-6 z-10 flex flex-col items-center">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-muted font-inter flex items-center justify-center gap-1.5">
            <Sparkles className="h-3 w-3 text-gold" /> Interactive reveal
          </span>
          <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-elegant tracking-wide mt-2">
            Reveal Wedding Dates
          </h2>
        </motion.div>

        <div className="relative w-full aspect-[4/3] rounded-2xl shadow-elevated overflow-hidden border border-champagne/30 bg-ivory-dark">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-elegant select-none">
            <div className="absolute inset-0 paper-texture pointer-events-none" />
            <div className="absolute inset-2.5 border border-champagne/25 rounded-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
              <span className="text-[10px] tracking-[0.3em] text-champagne uppercase mb-1">In The Name Of Allah</span>
              <p className="font-cormorant text-xs italic text-elegant/70 mb-4">We Invite You to Celebrate</p>

              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div className="border-r border-champagne/20 pr-2">
                  <span className="font-cormorant font-bold text-sm tracking-widest text-gold uppercase">Nikah</span>
                  <p className="font-cormorant text-base font-bold text-elegant mt-1 leading-tight">{data.nikahDate}</p>
                  <p className="text-[11px] font-inter text-elegant/70 mt-1">{data.nikahTime}</p>
                </div>
                <div className="pl-2">
                  <span className="font-cormorant font-bold text-sm tracking-widest text-gold uppercase">Walima</span>
                  <p className="font-cormorant text-base font-bold text-elegant mt-1 leading-tight">{data.walimaDate}</p>
                  <p className="text-[11px] font-inter text-elegant/70 mt-1">{data.walimaTime}</p>
                </div>
              </div>

              <div className="h-px w-24 bg-champagne/20 my-4" />
              <p className="font-inter text-[11px] uppercase tracking-[0.2em] text-elegant/60">
                {data.venueName}
              </p>
            </div>
          </div>

          <AnimatePresence>
            {!isScratchedFully && (
              <motion.canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-crosshair z-20 touch-none"
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
              />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!isScratchedFully && (
            <motion.button
              onClick={handleKeyboardReveal}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleKeyboardReveal(); } }}
              tabIndex={0}
              aria-label="Reveal wedding dates"
              className="mt-6 px-6 py-3 rounded-full bg-gold-gradient text-elegant font-cormorant font-semibold text-xs tracking-wider uppercase shadow-gold hover:shadow-gold-lg transition-all"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Reveal Dates
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isScratchedFully && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="text-xs uppercase font-cormorant tracking-[0.25em] text-gold mt-6 text-center"
            >
              Alhamdulillah! You revealed the dates.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
