"use client";

import { useWeddingStore, WeddingData } from "@/src/utils/weddingStore";
import { ArrowLeft, Save, RefreshCw, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const { data, isLoaded, updateData, resetData } = useWeddingStore();
  const [form, setForm] = useState<WeddingData | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Initialize form state when store is loaded
  useEffect(() => {
    if (isLoaded) {
      setForm(data);
    }
  }, [data, isLoaded]);

  if (!isLoaded || !form) {
    return (
      <div className="min-h-screen bg-navy text-gold flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-playfair text-sm tracking-widest uppercase">Loading Dashboard...</span>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(form);
    setMessage({ text: "Invitation settings saved successfully to localStorage! View your main page to see the live updates.", type: "success" });
    
    // Clear message after 4 seconds
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to revert all fields to the default template values? This will wipe your custom browser settings and lock the scratch card.")) {
      resetData();
      localStorage.removeItem("luxury_wedding_dates_revealed");
      window.dispatchEvent(new Event("wedding-data-updated"));
      setMessage({ text: "Settings reset to original JSON template values and scratch state locked.", type: "success" });
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const handleResetScratch = () => {
    localStorage.removeItem("luxury_wedding_dates_revealed");
    window.dispatchEvent(new Event("wedding-data-updated"));
    setMessage({ text: "Scratch card locked! Go back to the invitation page to try scratching it again.", type: "success" });
    setTimeout(() => setMessage(null), 4000);
  };


  const handleDownloadJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(form, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "wedding.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    setMessage({ text: "Downloaded wedding.json successfully. Place this file inside your project at 'src/data/wedding.json' and deploy to Vercel to update it permanently!", type: "success" });
    setTimeout(() => setMessage(null), 6000);
  };

  return (
    <div className="min-h-screen bg-luxury-bg text-navy py-12 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <div className="absolute inset-0 islamic-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gold/20 pb-6 mb-8 gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-playfair uppercase tracking-wider text-gold hover:text-gold-dark transition-colors mb-2"
            >
              <ArrowLeft className="h-4.5 w-4.5" /> Back to Invitation
            </Link>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gold-gradient flex items-center gap-2">
              Wedding Config Dashboard <Sparkles className="h-6 w-6 text-gold" />
            </h1>
            <p className="font-cormorant text-sm text-navy/60 mt-1">
              Customize names, dates, maps, quotes, and download files for permanent Vercel hosting.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleResetScratch}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold/5 text-xs font-playfair font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Scratch State
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-500/30 text-red-600 hover:bg-red-50 text-xs font-playfair font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Defaults
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold bg-gold-gradient text-navy hover:shadow-md text-xs font-playfair font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Download JSON
            </button>
          </div>
        </div>

        {/* Notifications */}
        {message && (
          <div
            className={`p-4 rounded-xl mb-8 border ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <p className="text-sm font-semibold">{message.text}</p>
          </div>
        )}

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-8">
          {/* Couple Names */}
          <div className="bg-white border border-gold/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-playfair text-lg font-bold text-gold border-b border-gold/10 pb-2">
              1. The Couple
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Bride Name
                </label>
                <input
                  type="text"
                  name="brideName"
                  value={form.brideName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Groom Name
                </label>
                <input
                  type="text"
                  name="groomName"
                  value={form.groomName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
            </div>
          </div>

          {/* Dates & Timings */}
          <div className="bg-white border border-gold/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-playfair text-lg font-bold text-gold border-b border-gold/10 pb-2">
              2. Dates & Timings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Nikah Date
                </label>
                <input
                  type="text"
                  name="nikahDate"
                  value={form.nikahDate}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 20 December 2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Nikah Time
                </label>
                <input
                  type="text"
                  name="nikahTime"
                  value={form.nikahTime}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 11:00 AM"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Walima Date
                </label>
                <input
                  type="text"
                  name="walimaDate"
                  value={form.walimaDate}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 21 December 2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Walima Time
                </label>
                <input
                  type="text"
                  name="walimaTime"
                  value={form.walimaTime}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 07:00 PM"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Countdown Target ISO Date
                </label>
                <input
                  type="text"
                  name="countdownDate"
                  value={form.countdownDate}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 2026-12-20T11:00:00"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
                <span className="text-[10px] text-navy/40 font-cormorant mt-1 block">
                  Must follow format YYYY-MM-DDTHH:MM:SS (e.g. 2026-12-20T11:00:00)
                </span>
              </div>
            </div>
          </div>

          {/* Venue & Maps */}
          <div className="bg-white border border-gold/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-playfair text-lg font-bold text-gold border-b border-gold/10 pb-2">
              3. Venue & Location
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Venue Name
                </label>
                <input
                  type="text"
                  name="venueName"
                  value={form.venueName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Venue Address
                </label>
                <textarea
                  name="venueAddress"
                  value={form.venueAddress}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30 resize-y"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Google Maps URL (Direction Button link)
                </label>
                <input
                  type="text"
                  name="googleMapLink"
                  value={form.googleMapLink}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Google Maps Embed Iframe SRC Link
                </label>
                <textarea
                  name="googleMapEmbed"
                  value={form.googleMapEmbed}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30 resize-y"
                />
                <span className="text-[10px] text-navy/40 font-cormorant mt-1 block">
                  Copy the src URL from the Google Maps &lt;iframe&gt; embed code (starts with https://www.google.com/maps/embed?...)
                </span>
              </div>
            </div>
          </div>

          {/* Family & Contact details */}
          <div className="bg-white border border-gold/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-playfair text-lg font-bold text-gold border-b border-gold/10 pb-2">
              4. Family Compliments & Contacts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Bride Family Names
                </label>
                <input
                  type="text"
                  name="brideFamily"
                  value={form.brideFamily}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Groom Family Names
                </label>
                <input
                  type="text"
                  name="groomFamily"
                  value={form.groomFamily}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Bride Contact Number
                </label>
                <input
                  type="text"
                  name="brideContact"
                  value={form.brideContact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Groom Contact Number
                </label>
                <input
                  type="text"
                  name="groomContact"
                  value={form.groomContact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
            </div>
          </div>

          {/* Quotes & Background Music */}
          <div className="bg-white border border-gold/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-playfair text-lg font-bold text-gold border-b border-gold/10 pb-2">
              5. Media & Quotes
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Background Music Audio MP3 URL
                </label>
                <input
                  type="text"
                  name="bgMusicUrl"
                  value={form.bgMusicUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Quranic Quote (Arabic Text)
                </label>
                <input
                  type="text"
                  name="islamicQuoteArabic"
                  value={form.islamicQuoteArabic}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30 font-urdu"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Quranic Quote (English Translation)
                </label>
                <textarea
                  name="islamicQuoteEnglish"
                  value={form.islamicQuoteEnglish}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30 resize-y"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-cormorant text-navy/60 font-semibold mb-2">
                  Quote Verse Reference
                </label>
                <input
                  type="text"
                  name="islamicQuoteReference"
                  value={form.islamicQuoteReference}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-navy/15 focus:border-gold outline-none text-sm transition-colors bg-luxury-bg/30"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 border-t border-gold/20 pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-navy text-gold border border-gold/30 hover:bg-navy-light shadow-lg hover:shadow-gold/5 font-playfair font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              <Save className="h-4.5 w-4.5" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
