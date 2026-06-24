"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  url: string;
  isPlayingGlobal: boolean;
  setIsPlayingGlobal: (playing: boolean) => void;
}

export default function AudioPlayer({ url, isPlayingGlobal, setIsPlayingGlobal }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4; // Soft background music
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

  // Sync internal state with global play state (e.g. triggered by envelope open)
  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingGlobal) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Autoplay prevented or paused:", err);
          setIsPlaying(false);
          setIsPlayingGlobal(false);
        });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isPlayingGlobal, setIsPlayingGlobal]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPlayingGlobal(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsPlayingGlobal(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={togglePlay}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-navy/90 text-gold shadow-lg shadow-gold/10 backdrop-blur-md outline-none cursor-pointer"
        whileHover={{ scale: 1.1, borderColor: "rgba(212,175,55,0.8)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Background Music"
      >
        {/* Pulsing Outer Rings */}
        {isPlaying && (
          <>
            <span className="absolute -inset-1 animate-ping rounded-full border border-gold/30 opacity-75" />
            <span className="absolute -inset-2 animate-pulse rounded-full border border-gold/15 opacity-40" />
          </>
        )}

        {/* Animated waveform bars or icons */}
        <div className="flex items-center justify-center gap-[3px]">
          {isPlaying ? (
            // Waveform visualizer
            <div className="flex h-5 items-end gap-[3px]">
              {[0.4, 0.8, 0.6, 0.9, 0.5].map((delay, index) => (
                <motion.span
                  key={index}
                  className="w-[2.5px] rounded-full bg-gold"
                  animate={{
                    height: ["4px", "18px", "4px"],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: delay,
                  }}
                />
              ))}
            </div>
          ) : (
            <VolumeX className="h-6 w-6" />
          )}
        </div>
      </motion.button>
    </div>
  );
}
