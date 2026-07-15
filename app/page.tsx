"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useWeddingStore } from "@/src/utils/weddingStore";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "@/src/components/Envelope";
import InvitationLetter from "@/src/components/InvitationLetter";
import BrideGroom from "@/src/components/BrideGroom";
import ScratchCard from "@/src/components/ScratchCard";
import Countdown from "@/src/components/Countdown";
import EventDetails from "@/src/components/EventDetails";
import Venue from "@/src/components/Venue";
import IslamicQuote from "@/src/components/IslamicQuote";
import Footer from "@/src/components/Footer";
import AudioPlayer from "@/src/components/AudioPlayer";

function InvitationContent() {
  const { data, isLoaded } = useWeddingStore();
  const searchParams = useSearchParams();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [guestName, setGuestName] = useState("Dear Valued Guest");
  const [datesRevealed, setDatesRevealed] = useState(false);

  // Sync datesRevealed state with browser storage
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("luxury_wedding_dates_revealed") : null;
    if (stored === "true") {
      setDatesRevealed(true);
    }

    const handleUpdate = () => {
      if (typeof window !== "undefined") {
        const s = localStorage.getItem("luxury_wedding_dates_revealed");
        setDatesRevealed(s === "true");
      }
    };
    window.addEventListener("wedding-data-updated", handleUpdate);
    return () => {
      window.removeEventListener("wedding-data-updated", handleUpdate);
    };
  }, []);

  // Read guest query parameter safely on mount
  useEffect(() => {
    const guest = searchParams.get("guest");
    if (guest) {
      const sanitized = decodeURIComponent(guest).replace(/[<>]/g, "");
      setGuestName(sanitized || "Dear Valued Guest");
    }
  }, [searchParams]);

  // Handle scroll lock on body based on envelope state
  useEffect(() => {
    if (!envelopeOpened) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
      document.body.style.left = "0";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.left = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.left = "";
    };
  }, [envelopeOpened]);

  const handleOpenEnvelope = useCallback(() => {
    setEnvelopeOpened(true);
    setIsPlayingMusic(true);
  }, []);

  const handleRevealDates = useCallback(() => {
    setDatesRevealed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("luxury_wedding_dates_revealed", "true");
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-elegant">
        <div className="relative w-12 h-12 mb-6">
          <div className="absolute inset-0 border-2 border-gold/30 rounded-full" />
          <div className="absolute inset-0 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-gold/80">Loading Invitation</span>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-ivory">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="fixed -top-10 left-4 z-[60] font-inter text-sm bg-gold text-elegant px-4 py-2 rounded-b-lg shadow-card transition-all duration-300 focus:top-0 focus:outline-2 focus:outline-gold"
      >
        Skip to invitation
      </a>

      {/* Background Audio Player */}
      <AudioPlayer
        url={data.bgMusicUrl}
        isPlayingGlobal={isPlayingMusic}
        setIsPlayingGlobal={setIsPlayingMusic}
      />

      {/* Envelope Overlay */}
      {!envelopeOpened && (
        <Envelope onOpen={handleOpenEnvelope} guestName={guestName} />
      )}

      {/* Full Page Invitation Content */}
      <div className={`transition-all duration-1000 ease-out ${envelopeOpened ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {envelopeOpened && (
          <div id="main-content" role="main">
            {/* 1. Handwritten Invitation Letter & Greetings */}
            <InvitationLetter data={data} guestName={guestName} />

            {/* 2. Islamic Quote Banner with Parallax */}
            <IslamicQuote data={data} />

            {/* 3. Custom SVG Bride & Groom Section */}
            <BrideGroom data={data} />

            {/* 4. Live Countdown to Wedding Union */}
            <Countdown targetDate={data.countdownDate} />

            {/* 5. Scratch to Reveal Event Dates */}
            <ScratchCard data={data} onReveal={handleRevealDates} />

            {/* Gated Sections: Revealed only after dates are scratched */}
            <AnimatePresence>
              {datesRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  className="w-full"
                >
                  {/* 6. Event Details (Nikah / Walima Cards) */}
                  <EventDetails data={data} />

                  {/* 7. Venue Google Maps & Directions */}
                  <Venue data={data} />

                  {/* 8. Gracious Footer (Compliments, family info, contacts) */}
                  <Footer data={data} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-elegant">
          <div className="relative w-12 h-12 mb-6">
            <div className="absolute inset-0 border-2 border-gold/30 rounded-full" />
            <div className="absolute inset-0 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
          <span className="font-cormorant text-sm tracking-[0.3em] uppercase text-gold/80">Preparing Invitation</span>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}
