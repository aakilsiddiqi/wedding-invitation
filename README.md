# Luxury Interactive Muslim Wedding Invitation Website

A premium, elegant, and highly interactive Muslim Wedding Invitation website designed to emulate receiving a royal wedding invitation letter.

## ✨ Key Features

1. **3D Golden Envelope Seal Reveal**: Features a glowing golden wax seal stamp, a realistic 3D envelope fold-open animation, background music autoplay, and canvas rose petals floating upon opening.
2. **Personalized Greeting**: Greets guests using URL parameter parsing (e.g. `?guest=Ahmed+Ali`), falling back to a gracious general greeting if not supplied.
3. **Parchment Invitation Letter**: Beautiful Arabic Bismillah calligraphic vector and Playfair Display typography blend.
4. **Bride & Groom Section**: Elegant, custom hand-crafted vector SVG illustrations of the couple in traditional royal cream and gold attire.
5. **Countdown Section**: Live ticking countdown timer to the wedding date with glowing luxury card borders.
6. **Scratch to Reveal Dates**: Custom canvas gold-foil card. Scratching beyond 50% automatically reveals the Nikah & Walima timings and triggers a celebratory full-screen confetti effect.
7. **Interactive Venue Section**: Grand palace illustration, embedded responsive Google Maps widget, and direction/navigation integration buttons.
8. **Quranic Quote Banner**: Parallax scrolling layout of Surah Ar-Rum [30:21] with Arabic and English translation formatting.
9. **Admin Dashboard (`/admin`)**: Clean control panel to change dates, timings, names, and contact details, featuring a direct `wedding.json` configuration download link.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the invitation.
Go to [http://localhost:3000/admin](http://localhost:3000/admin) to access the dashboard.
To see a personalized name, visit: `http://localhost:3000/?guest=Ahmed`

---

## 🛠 Configuration (`src/data/wedding.json`)

All values on the wedding invitation site load dynamically from `src/data/wedding.json`:

```json
{
  "brideName": "Ayesha Siddiqua",
  "groomName": "Zayd Rahman",
  "nikahDate": "20 December 2026",
  "walimaDate": "21 December 2026",
  "nikahTime": "11:00 AM",
  "walimaTime": "07:00 PM",
  "venueName": "The Royal Pavilion & Gardens",
  "venueAddress": "12 Imperial Drive, Golden Palms, Jaipur, Rajasthan",
  "googleMapLink": "https://maps.google.com/?q=The+Royal+Pavilion+Jaipur",
  "googleMapEmbed": "https://www.google.com/maps/embed?pb=...",
  "countdownDate": "2026-12-20T11:00:00",
  "brideFamily": "Mr. & Mrs. Shakeel Ahmed Siddiqua",
  "groomFamily": "Mr. & Mrs. Fazlur Rahman",
  "brideContact": "+91 98765 43210",
  "groomContact": "+91 87654 32109",
  "bgMusicUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "islamicQuoteArabic": "...",
  "islamicQuoteEnglish": "...",
  "islamicQuoteReference": "Surah Ar-Rum [30:21]"
}
```

### Dynamic Updating:
1. Navigate to `/admin`.
2. Edit any values (e.g. names, dates, maps, background music URL).
3. Click **Save Configuration**. The changes will update the local browser immediately.
4. Click **Download JSON** to get the updated config.
5. Replace `src/data/wedding.json` with your downloaded file, commit to Git, and push.

---

## 📤 Bulk WhatsApp Invitation Sender

A Python script is included inside `/scripts` to automate sending personalized wedding invitation links.

### How to use:
1. Edit `/scripts/guests.csv` and add your guest names and phone numbers (including country codes without spaces or symbols, e.g. `91` for India, `1` for US):
   ```csv
   Name,Phone
   Ahmed Ali,919876543210
   Fatima Begum,918765432109
   ```
2. Open `/scripts/send_invitations.py` and replace `BASE_URL` with your live deployed website URL.
3. Run the script:
   ```bash
   python scripts/send_invitations.py
   ```
4. A command prompt will guide you. Press Enter, and it will automate opening WhatsApp Web tabs with pre-loaded personalized greetings and links.

---

## ☁ Vercel Deployment Guide

This project is fully structured for Vercel deployment.

### Deploying via Vercel CLI:
1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Run vercel:
   ```bash
   vercel
   ```
3. Set your project settings:
   - Framework: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`
4. Deploy to production:
   ```bash
   vercel --prod
   ```

### Deploying via Vercel Dashboard (Git Integration):
1. Push this codebase to a private/public GitHub, GitLab, or Bitbucket repository.
2. Go to the [Vercel Dashboard](https://vercel.com/new).
3. Import the repository and click **Deploy**. Vercel will automatically detect Next.js and build the project.
