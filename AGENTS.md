# AGENTS.md — Muslim Wedding Invitation

## Executive Summary

Interactive luxury Muslim wedding invitation website. Single-page Next.js app with envelope-opening animation, scratch card date reveal, countdown timer, Google Maps embed, background audio, and an admin dashboard for editing wedding details. Configuration stored in `src/data/wedding.json` with localStorage override. No backend — fully static, client-rendered, deployed to Vercel.

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.9 |
| UI | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Animation | Framer Motion | ^12.41.0 |
| Icons | Lucide React | ^1.21.0 |
| Confetti | react-confetti | ^6.4.0 |
| Scratch Card | react-scratchcard-v2 | ^2.0.0 |
| Animation lib | GSAP | ^3.15.0 (installed, unused) |
| Fonts | Playfair Display, Cormorant Garamond, Noto Nastaliq Urdu | Google Fonts |

## Architecture Overview

- **Rendering**: All pages/components marked `"use client"`. No server components, no SSR benefits used.
- **State**: Custom React hook `useWeddingStore` with localStorage persistence. Cross-component sync via `window.dispatchEvent(new Event("wedding-data-updated"))`.
- **Data flow**: `wedding.json` → `weddingStore.ts` (loads defaults) → localStorage override from admin → components read via hook.
- **Routing**: App Router — `/` (invitation), `/admin` (dashboard). No API routes.
- **Deployment**: Static export to Vercel. No server-side logic.

## Folder Structure

```
├── app/
│   ├── layout.tsx          # Root layout, metadata, viewport config
│   ├── page.tsx            # Main invitation page (client component)
│   ├── globals.css         # Tailwind import + custom theme + animations
│   ├── favicon.ico
│   └── admin/
│       └── page.tsx        # Admin dashboard for editing wedding data
├── src/
│   ├── components/
│   │   ├── AudioPlayer.tsx      # Background music with waveform toggle
│   │   ├── BrideGroom.tsx       # SVG illustrations of bride & groom
│   │   ├── Countdown.tsx        # Live countdown timer
│   │   ├── Envelope.tsx         # 3D envelope opening with canvas petals
│   │   ├── EventDetails.tsx     # Nikah & Walima event cards
│   │   ├── Footer.tsx           # Family compliments, contacts
│   │   ├── InvitationLetter.tsx # Parchment letter with Bismillah
│   │   ├── IslamicQuote.tsx     # Quranic verse with parallax
│   │   ├── ScratchCard.tsx      # Gold foil scratch-to-reveal
│   │   └── Venue.tsx            # Google Maps embed + directions
│   ├── data/
│   │   └── wedding.json         # Default wedding configuration
│   └── utils/
│       └── weddingStore.ts      # State management hook + localStorage
├── scripts/
│   ├── send_invitations.py      # WhatsApp bulk sender (Python)
│   └── guests.csv               # Guest list for bulk sender
├── public/                      # Static assets (default SVGs)
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── next.config.ts               # Empty config
└── eslint.config.mjs            # ESLint flat config (next core-web-vitals + TS)
```

## Application Flow

1. **Load** → `page.tsx` renders `InvitationContent` inside `<Suspense>`.
2. **Data init** → `useWeddingStore` reads localStorage, falls back to `wedding.json`.
3. **Guest name** → `?guest=Name` query param parsed, defaults to "Dear Valued Guest".
4. **Envelope** → Full-screen overlay with canvas star particles. Click wax seal → 3D flap open → rose petal rain → card slide out → transition to invitation.
5. **Music** → Autoplay starts on envelope open (browser restrictions may block). Toggle button fixed bottom-right.
6. **Invitation content** (sequential scroll):
   - InvitationLetter (Bismillah, names, greeting)
   - IslamicQuote (parallax Surah Ar-Rum 30:21)
   - BrideGroom (SVG illustrations, floating animation)
   - Countdown (live ticking, "Alhamdulillah" on completion)
   - ScratchCard (gold foil, 40% threshold triggers confetti + unlock)
7. **Gated sections** (after scratch reveal): EventDetails → Venue → Footer.
8. **Admin** → `/admin` form edits localStorage, download JSON for permanent deploy.

## Component Hierarchy

```
Home (app/page.tsx)
└── Suspense
    └── InvitationContent
        ├── AudioPlayer (fixed, bottom-right)
        ├── Envelope (fixed overlay, removed after open)
        └── InvitationLetter
            ├── IslamicQuote
            ├── BrideGroom
            ├── Countdown
            ├── ScratchCard
            └── AnimatePresence (gated)
                └── motion.div
                    ├── EventDetails
                    ├── Venue
                    └── Footer
```

Admin is standalone: `app/admin/page.tsx` → `useWeddingStore` + form UI.

## State Management

**File**: `src/utils/weddingStore.ts`

| Export | Purpose |
|--------|---------|
| `WeddingData` (interface) | Type for all wedding config fields |
| `useWeddingStore()` | Hook returning `{ data, isLoaded, updateData, resetData }` |
| `getInitialData()` | Reads localStorage or returns defaults |
| `saveWeddingData(data)` | Writes to localStorage + dispatches event |
| `resetWeddingData()` | Clears localStorage, returns defaults |

**Event protocol**: All state changes dispatch `new Event("wedding-data-updated")`. Components listen and re-read from localStorage.

# Product Vision

This application is a premium digital Muslim wedding invitation.

It should feel like opening an elegant luxury wedding invitation rather than using a traditional website.

The experience should communicate:

- Elegance
- Warmth
- Celebration
- Sophistication
- Simplicity
- Premium craftsmanship

Every design decision should reinforce these values.

Avoid unnecessary visual clutter.

Favor timeless elegance over short-lived design trends.

**Additional state in page.tsx**:
- `envelopeOpened` — controls overlay vs content visibility
- `isPlayingMusic` — global audio state
- `guestName` — from URL param
- `datesRevealed` — persisted in `localStorage.luxury_wedding_dates_revealed`

## API Layer

None. No backend, no API routes, no data fetching. All data is static JSON + localStorage.

## Build & Deployment

```bash
npm run dev      # Local dev server
npm run build    # Next.js production build
npm run start    # Serve production build
npm run lint     # ESLint
```

**Deployment**: Vercel (recommended). Push to Git → import in Vercel dashboard → auto-deploy. No environment variables required.

## Coding Standards

- **Language**: TypeScript strict mode
- **Components**: Functional components, `"use client"` directive on all
- **Styling**: Tailwind utility classes + custom CSS (globals.css)
- **Fonts**: Google Fonts loaded via CSS `@import`
- **Icons**: Lucide React (`lucide-react`) + inline SVGs for custom illustrations
- **State**: React hooks + localStorage, no external state library
- **Path aliases**: `@/*` maps to project root
- **ESLint**: Flat config with `eslint-config-next` (core-web-vitals + typescript)

## Strengths

1. **Polished UX** — envelope animation, scratch card, confetti, parallax create premium feel
2. **Clean component structure** — each section is isolated, single-responsibility
3. **TypeScript throughout** — `WeddingData` interface enforces config shape
4. **Mobile responsive** — Tailwind breakpoints used consistently
5. **SEO configured** — metadata, OpenGraph, Twitter cards in layout
6. **Zero API dependencies** — works offline once deployed (except Google Maps + audio URL)
7. **Admin dashboard** — non-technical users can edit config via form

## Weaknesses

1. **GSAP installed but unused** — dead dependency in package.json
2. **All client-side** — no SSR, no server components, no SEO benefits from Next.js
3. **localStorage only** — data lost on browser clear, no cross-device sync
4. **No admin auth** — `/admin` accessible to anyone
5. **No error boundaries** — runtime errors crash entire app
6. **No tests** — zero test files
7. **Audio autoplay** — browsers block; requires user interaction (partially handled)
8. **Scratch card perf** — `checkScratchPercentage` runs full pixel scan on every draw stroke

## Technical Debt

| Item | Impact | Notes |
|------|--------|-------|
| GSAP unused | Low | Remove from package.json |
| No SSR | Medium | All components are client-rendered; defeats Next.js purpose |
| localStorage persistence | Medium | No backup, no sync, no server-side storage |
| Pixel scan performance | Low | `ScratchCard.tsx:180-217` — scans every 4th pixel on each stroke |
| Duplicate event listeners | Low | `page.tsx` and `weddingStore.ts` both listen to same events |
| Inline SVG illustrations | Low | Large components (BrideGroom, Envelope); could be extracted |

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Browser audio block | Medium | Fallback to manual toggle (already implemented) |
| Google Maps API changes | Low | Embed URL is stable, but no fallback |
| localStorage full/corrupted | Low | try-catch + fallback to defaults |
| No admin authentication | Medium | Acceptable for private invitation; risk if public |
| SoundHelix URL availability | Low | External audio host; could go down |

## Suggested Improvements (Do Not Implement)

1. **Remove GSAP** — unused dependency, saves ~50KB bundle
2. **Add error boundaries** — prevent full-page crashes
3. **Extract inline SVGs** — BrideGroom and Envelope are 400+ lines; separate SVG files
4. **Defer scratch check** — throttle `checkScratchPercentage` to every N frames instead of every stroke
5. **Add admin password** — simple env var or query param gate
6. **Consider server components** — layout, metadata, static text could be server-rendered
7. **Add Open Graph image** — generate or create a static preview image
8. **Preload audio** — `<link rel="preload">` for MP3 to reduce delay

## Questions

1. Is GSAP intentionally kept for future use, or can it be removed?
2. Is the admin dashboard intended to remain public, or should it have authentication?
3. Is there a plan for server-side persistence (database, CMS)?
4. Should the WhatsApp bulk sender be maintained as part of this repo or separated?
