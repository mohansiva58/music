# Personalized Music Artist Landing Page — Soulnote

## Problem statement (verbatim)
Premium, conversion-focused landing page for a personalized music artist. WhatsApp is the primary conversion channel. 150+ songs created since 2025. Design must match the uploaded cinematic video reference (golden-hour palette, large 3D hero object, scroll-reactive, big bold typography).

## User personas
- Gift buyers (partners, birthdays, anniversaries)
- Couples (proposals, weddings)
- Friends/family (milestone tributes)
- Self-gifts / personal stories

## Core requirements
- Dark cinematic premium theme, gold/amber accents
- Sections: Hero (3D scroll-reactive), Social Proof, About, How It Works, Audio Portfolio (6 songs single-play), Value Props, Testimonials (carousel), Pricing (3 tiers), FAQ, Final CTA, Floating WhatsApp
- WhatsApp click-to-chat prefilled message, multiple CTA placements
- Fully responsive

## Implemented (2025-12)
- Complete landing page built — all 11 sections
- Custom CSS 3D vinyl record with grooves, shimmer, gold center label
- Scroll-driven animations (framer-motion useScroll → rotate/tilt/scale/opacity)
- Golden-hour hero with sunset gradient → fades to dark body
- Single-play audio portfolio (only one track plays at a time)
- Testimonials carousel with prev/next + dots
- 3-tier pricing (Basic / Premium-featured / Studio) — all CTAs → wa.me
- FAQ accordion, Floating WhatsApp pulse button
- All data-testid attributes wired
- Placeholders: WhatsApp +91 9999999999, artist "Aarav Mehra" / brand "Soulnote"

## Backlog (P1/P2)
- Replace placeholder WhatsApp number with real number
- Replace placeholder artist portrait with real photo
- Replace royalty-free pixabay audio with real song samples
- Optional: video background in hero instead of vinyl
- Optional: Analytics tracking (GA4 / Meta Pixel)
- Optional: Contact form fallback for non-WhatsApp users
- Optional: Multi-language (Hindi variant)

## Next tasks
- Await user inputs (real WA number, artist photo, real audio files) to replace placeholders
