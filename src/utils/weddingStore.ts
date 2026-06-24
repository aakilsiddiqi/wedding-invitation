"use client";

import { useState, useEffect } from "react";
import defaultData from "@/src/data/wedding.json";

export interface WeddingData {
  brideName: string;
  groomName: string;
  nikahDate: string;
  walimaDate: string;
  nikahTime: string;
  walimaTime: string;
  venueName: string;
  venueAddress: string;
  googleMapLink: string;
  googleMapEmbed: string;
  countdownDate: string;
  brideFamily: string;
  groomFamily: string;
  brideContact: string;
  groomContact: string;
  bgMusicUrl: string;
  islamicQuoteArabic: string;
  islamicQuoteEnglish: string;
  islamicQuoteReference: string;
}

const STORAGE_KEY = "luxury_wedding_invitation_data";

export function getInitialData(): WeddingData {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
  }
  return defaultData as WeddingData;
}

export function saveWeddingData(data: WeddingData): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Dispatch a storage event or a custom event to notify other components in same window
      window.dispatchEvent(new Event("wedding-data-updated"));
    } catch (e) {
      console.error("Error writing to localStorage:", e);
    }
  }
}

export function resetWeddingData(): WeddingData {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event("wedding-data-updated"));
    } catch (e) {
      console.error("Error clearing localStorage:", e);
    }
  }
  return defaultData as WeddingData;
}

export function useWeddingStore() {
  const [data, setData] = useState<WeddingData>(defaultData as WeddingData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load initial data on mount (client-side only)
    setData(getInitialData());
    setIsLoaded(true);

    const handleUpdate = () => {
      setData(getInitialData());
    };

    window.addEventListener("wedding-data-updated", handleUpdate);
    return () => {
      window.removeEventListener("wedding-data-updated", handleUpdate);
    };
  }, []);

  const updateData = (newData: WeddingData) => {
    setData(newData);
    saveWeddingData(newData);
  };

  const resetData = () => {
    const defaultVal = resetWeddingData();
    setData(defaultVal);
  };

  return {
    data,
    isLoaded,
    updateData,
    resetData,
  };
}
