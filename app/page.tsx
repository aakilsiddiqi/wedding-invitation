"use client";

import { useState, useEffect, Suspense } from "react";
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

  // Sync datesRevealed state with browser storage to allow persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("luxury_wedding_dates_revealed");
    }

    // Listen for data resets or updates in Admin
    const handleUpdate = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("luxury_wedding_dates_revealed");
        setDatesRevealed(stored === "true");
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
      setGuestName(decodeURIComponent(guest));
    }
  }, [searchParams]);

  // Handle scroll lock on body based on envelope state
  useEffect(() => {
    if (!envelopeOpened) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [envelopeOpened]);

  // Handle envelope opening sequence
  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    setIsPlayingMusic(true); // Soft music starts playing upon interaction
  };

  const handleRevealDates = () => {
    setDatesRevealed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("luxury_wedding_dates_revealed", "true");
    }
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy text-gold">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-playfair text-sm tracking-widest uppercase">Loading Invitation...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-luxury-bg">
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
      <div className={`transition-opacity duration-1000 ${envelopeOpened ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {envelopeOpened && (
          <>
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
                  transition={{ duration: 1.0, ease: "easeOut" }}
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
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy text-gold">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
          <span className="font-playfair text-sm tracking-widest uppercase">Preparing Invitation...</span>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}
