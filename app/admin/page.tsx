"use client";

import { useWeddingStore, WeddingData } from "@/src/utils/weddingStore";
import { ArrowLeft, Save, RefreshCw, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const { data, isLoaded, updateData, resetData } = useWeddingStore();
  const [form, setForm] = useState<WeddingData | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (isLoaded) setForm(data);
  }, [data, isLoaded]);

  if (!isLoaded || !form) {
    return (
      <div className="min-h-screen bg-elegant text-gold flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-cormorant text-sm tracking-widest uppercase">Loading Dashboard...</span>
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
    setTimeout(() => setMessage(null), 5000);
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
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(form, null, 2))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "wedding.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setMessage({ text: "Downloaded wedding.json successfully. Place this file inside your project at 'src/data/wedding.json' and deploy to Vercel to update it permanently!", type: "success" });
    setTimeout(() => setMessage(null), 6000);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-elegant/15 focus:border-gold outline-none text-sm transition-colors bg-ivory/50 font-inter";

  return (
    <div className="min-h-screen bg-ivory text-elegant py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 islamic-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-champagne/20 pb-6 mb-8 gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-inter uppercase tracking-wider text-gold hover:text-gold-dark transition-colors mb-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Invitation
            </Link>
            <h1 className="font-cormorant text-3xl sm:text-4xl font-bold text-gold-gradient flex items-center gap-2">
              Wedding Config <Sparkles className="h-6 w-6 text-gold" />
            </h1>
            <p className="font-inter text-sm text-muted mt-1">
              Customize names, dates, maps, quotes, and download files for permanent deployment.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handleResetScratch} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-champagne/40 text-muted hover:bg-champagne/10 text-xs font-inter uppercase tracking-wider transition-all cursor-pointer">
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Scratch
            </button>
            <button onClick={handleReset} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-400/30 text-red-600 hover:bg-red-50 text-xs font-inter uppercase tracking-wider transition-all cursor-pointer">
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Defaults
            </button>
            <button onClick={handleDownloadJSON} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-gradient text-elegant hover:shadow-gold text-xs font-cormorant font-semibold uppercase tracking-wider transition-all cursor-pointer">
              <Download className="h-3.5 w-3.5" />
              Download JSON
            </button>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-8 border ${message.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"}`}>
            <p className="text-sm font-semibold font-inter">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          <div className="bg-white border border-champagne/20 rounded-3xl p-6 sm:p-8 shadow-warm space-y-6">
            <h2 className="font-cormorant text-lg font-bold text-gold border-b border-champagne/10 pb-2">1. The Couple</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Bride Name</label>
                <input type="text" name="brideName" value={form.brideName} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Groom Name</label>
                <input type="text" name="groomName" value={form.groomName} onChange={handleChange} required className={inputClass} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-champagne/20 rounded-3xl p-6 sm:p-8 shadow-warm space-y-6">
            <h2 className="font-cormorant text-lg font-bold text-gold border-b border-champagne/10 pb-2">2. Dates & Timings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Nikah Date</label>
                <input type="text" name="nikahDate" value={form.nikahDate} onChange={handleChange} required placeholder="e.g. 20 December 2026" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Nikah Time</label>
                <input type="text" name="nikahTime" value={form.nikahTime} onChange={handleChange} required placeholder="e.g. 11:00 AM" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Walima Date</label>
                <input type="text" name="walimaDate" value={form.walimaDate} onChange={handleChange} required placeholder="e.g. 21 December 2026" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Walima Time</label>
                <input type="text" name="walimaTime" value={form.walimaTime} onChange={handleChange} required placeholder="e.g. 07:00 PM" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Countdown Target ISO Date</label>
                <input type="text" name="countdownDate" value={form.countdownDate} onChange={handleChange} required placeholder="e.g. 2026-12-20T11:00:00" className={inputClass} />
                <span className="text-[10px] text-muted/40 font-inter mt-1 block">Must follow format YYYY-MM-DDTHH:MM:SS (e.g. 2026-12-20T11:00:00)</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-champagne/20 rounded-3xl p-6 sm:p-8 shadow-warm space-y-6">
            <h2 className="font-cormorant text-lg font-bold text-gold border-b border-champagne/10 pb-2">3. Venue & Location</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Venue Name</label>
                <input type="text" name="venueName" value={form.venueName} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Venue Address</label>
                <textarea name="venueAddress" value={form.venueAddress} onChange={handleChange} required rows={2} className={`${inputClass} resize-y`} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Google Maps URL</label>
                <input type="text" name="googleMapLink" value={form.googleMapLink} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Google Maps Embed SRC</label>
                <textarea name="googleMapEmbed" value={form.googleMapEmbed} onChange={handleChange} required rows={3} className={`${inputClass} resize-y`} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-champagne/20 rounded-3xl p-6 sm:p-8 shadow-warm space-y-6">
            <h2 className="font-cormorant text-lg font-bold text-gold border-b border-champagne/10 pb-2">4. Family & Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Bride Family</label>
                <input type="text" name="brideFamily" value={form.brideFamily} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Groom Family</label>
                <input type="text" name="groomFamily" value={form.groomFamily} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Bride Contact</label>
                <input type="text" name="brideContact" value={form.brideContact} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Groom Contact</label>
                <input type="text" name="groomContact" value={form.groomContact} onChange={handleChange} required className={inputClass} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-champagne/20 rounded-3xl p-6 sm:p-8 shadow-warm space-y-6">
            <h2 className="font-cormorant text-lg font-bold text-gold border-b border-champagne/10 pb-2">5. Media & Quotes</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Background Music URL</label>
                <input type="text" name="bgMusicUrl" value={form.bgMusicUrl} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Quranic Quote (Arabic)</label>
                <input type="text" name="islamicQuoteArabic" value={form.islamicQuoteArabic} onChange={handleChange} required className={`${inputClass} font-urdu`} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Quranic Quote (English)</label>
                <textarea name="islamicQuoteEnglish" value={form.islamicQuoteEnglish} onChange={handleChange} required rows={2} className={`${inputClass} resize-y`} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-inter text-muted font-semibold mb-2">Quote Reference</label>
                <input type="text" name="islamicQuoteReference" value={form.islamicQuoteReference} onChange={handleChange} required className={inputClass} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t border-champagne/20 pt-6">
            <button type="submit" className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-elegant text-gold border border-champagne/30 hover:bg-elegant-light font-cormorant font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer">
              <Save className="h-4 w-4" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
