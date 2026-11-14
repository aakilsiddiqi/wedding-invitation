"use client";

import { useState, useEffect } from "react";
import defaultData from "@/src/data/wedding.json";

export interface WeddingData {
  brideName: string;
  groomName: string;
  /** "groom" or "bride": which side is inviting, decides whose name reads first */
  inviteSide: string;
  nikahDate: string;
  walimaDate: string;
  nikahTime: string;
  walimaTime: string;
  venueName: string;
  venueAddress: string;
  googleMapLink: string;
  googleMapEmbed: string;
  nikahVenueName: string;
  nikahVenueAddress: string;
  nikahMapLink: string;
  nikahMapEmbed: string;
  walimaVenueName: string;
  walimaVenueAddress: string;
  walimaMapLink: string;
  walimaMapEmbed: string;
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

export interface VenueInfo {
  name: string;
  address: string;
  mapLink: string;
  mapEmbed: string;
}

/**
 * Per-event venue, falling back to the legacy single-venue fields so data saved
 * before the two-venue split still renders.
 */
export function getEventVenue(data: WeddingData, event: "nikah" | "walima"): VenueInfo {
  const isNikah = event === "nikah";
  return {
    name: (isNikah ? data.nikahVenueName : data.walimaVenueName) || data.venueName,
    address: (isNikah ? data.nikahVenueAddress : data.walimaVenueAddress) || data.venueAddress,
    mapLink: (isNikah ? data.nikahMapLink : data.walimaMapLink) || data.googleMapLink,
    mapEmbed: (isNikah ? data.nikahMapEmbed : data.walimaMapEmbed) || data.googleMapEmbed,
  };
}

export interface CoupleOrder {
  groomFirst: boolean;
  first: string;
  second: string;
  heading: string;
  families: { label: string; family: string; contact: string }[];
}

/**
 * Whichever side is inviting reads first, so groom-side invites lead with the groom.
 * A missing key keeps the historical bride-first order.
 */
export function getCoupleOrder(data: WeddingData): CoupleOrder {
  const groomFirst = data.inviteSide === "groom";
  const families = [
    { label: "Groom's Family", family: data.groomFamily, contact: data.groomContact },
    { label: "Bride's Family", family: data.brideFamily, contact: data.brideContact },
  ];
  return {
    groomFirst,
    first: groomFirst ? data.groomName : data.brideName,
    second: groomFirst ? data.brideName : data.groomName,
    heading: groomFirst ? "The Groom & The Bride" : "The Bride & The Groom",
    families: groomFirst ? families : [...families].reverse(),
  };
}

export function getInitialData(): WeddingData {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // merge over defaults so data saved before a field existed still fills every key
        const parsed = JSON.parse(stored) as Partial<WeddingData>;
        const merged = { ...(defaultData as WeddingData), ...parsed };
        // data saved before the two-venue split keeps its single venue for both events
        if (!parsed.nikahVenueName) {
          merged.nikahVenueName = merged.venueName;
          merged.nikahVenueAddress = merged.venueAddress;
          merged.nikahMapLink = merged.googleMapLink;
          merged.nikahMapEmbed = merged.googleMapEmbed;
          merged.walimaVenueName = merged.venueName;
          merged.walimaVenueAddress = merged.venueAddress;
          merged.walimaMapLink = merged.googleMapLink;
          merged.walimaMapEmbed = merged.googleMapEmbed;
        }
        return merged;
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
