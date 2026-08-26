# MERKABAH CREATIVE LIFE — PRD

## Original Problem
Premium full-stack website for Merkabah Creative Life — a creative ecosystem uniting 9 divisions (Creative Agency, Studios, Academy of Music, Live, Courses, Podcast, Wellness, Careers, Store) under one parent brand. Brand line: "BEYOND IMAGINATION". Founded by Kingsley Victor.

## Architecture (Feb 2026 build)
- Backend: FastAPI + Motor(MongoDB), JWT auth (bcrypt), single `server.py`
- Frontend: React 19 + Tailwind + Fraunces/Manrope typography, Sonner toasts, editorial dark palette (stone-950 + cream + terracotta accent)
- Design: Editorial, cinematic, warm dark palette. Full-screen mobile nav, mega menu, grain overlay
- CMS: token-guarded /api/admin/* endpoints; simple admin dashboard tabbed view

## Implemented (v1, Feb 2026)
- 17+ pages: Home, About, Founder, 9 world pages, Careers, Internships, Store, Journal, Community, Search, Contact, Admin login + Dashboard
- Academy program subpages for Piano, Guitar, Violin, Drums, Vocals with free-trial form + certification (RSL/Trinity/ABRSM) + FAQ
- Forms: Contact, Project Enquiry (Agency multi-select), Trial Class, Internship application (with consent), Newsletter, Community join
- Public content API + Admin CMS API with JWT auth
- Global search across courses/events/podcast/jobs/articles/products
- Seeded admin (merkabahcreativelife@gmail.com) + 5 courses + 1 event + 1 article

## Personas
Business owner, music student/parent, event attendee, learner, podcast listener, wellness seeker, job seeker, intern applicant, customer, creative client

## Implemented (v2, Aug 2026 — publish-ready iteration)
- Real Kingsley Victor founder portrait across Home, About, Founder, Wellness (circular framed treatment)
- Wellness rebuilt with healer content: Certified Reiki / Angelic Zibu / Candle Healer, Auto Writing, Channelling, Knot Magic, Merkabah Magic & Miracles card image, 6 modalities + 4 experiences + enquiry CTA
- Detail pages for every clickable item: 11 Agency service pages (/creative-agency/services/:slug) with intro, offerings, approach, who-it's-for; Journal articles (/journal/:id); Live events (/live/:id) with register CTA; Jobs (/careers/job/:id) with apply CTA; Products (/store/:id) with price/discount/add-to-cart; Podcast episodes (/podcast/:id) with notes
- Seeded publish-ready content: 3 journal articles, 2 jobs, 2 podcast episodes, 3 products (tee, theory workbook, live event ticket), 2 portfolio case studies
- CORS fixed to explicit FRONTEND_URL; admin write endpoints restricted to content collections

## Implemented (v3, Aug 2026 — bright retheme)
- Removed founder portrait + healer card images per user request; replaced with typographic quote cards
- Full theme shift to bright/vibrant creative palette: warm cream base (#faf5ec), ink text (#201812), vibrant coral terracotta (#ef4e1f) + marigold + leaf accent tokens; lighter hero image treatments, multiply grain overlay
- HTML title + meta description set for launch

## Implemented (v4, Aug 2026 — professional polish)
- Our Worlds rebuilt as minimal editorial index: numbered rows (01–09), tagline overlines, large Fraunces names, hover arrow interactions — replaces image cards
- Theme muted to professional premium: brick terracotta accent (#c24b2a), clean off-white canvas, refined borders
- Photography upgraded to professional stock: workshop session (Courses), modern creative team (Careers), minimal kraft packaging (Store)

## Implemented (v5, Aug 2026 — store commerce + pine theme)
- Full store checkout: persistent cart (localStorage + CartContext with qty controls), /store/checkout with customer form + order summary, /store/order/:id confirmation page with order number (MKB-XXXXXXXX), POST/GET /api/orders, Orders tab in admin dashboard
- Navbar cart icon with live count badge; store category filters (8 categories); product pages add real items to cart
- Theme changed to world-class professional palette: ivory canvas, ink text, deep pine green accent (#2f6b4f) across buttons, links, overlines, selection
- Headlines polished: home hero ("nine disciplines, one parent brand, one standard of craft"), store ("Objects of the creative life")
- E2E verified: add-to-cart → checkout → order placed → confirmation; order visible in admin Orders tab

## Implemented (v6, Aug 2026 — multi-color world-class theme)
- Full palette: violet (#7c3aed) primary actions, gold/teal/pink/silver as per-division accent colors, black footer, white canvas
- Our Worlds rows: numbered color chips per division (violet=Agency/Courses, teal=Studios/Podcast, gold=Academy/Wellness, pink=Live/Careers, silver=Store)
- Creative journey differentiator rebuilt as boxed grid (10 steps, color-coded top borders, hover lift)
- Footer rebuilt in black with color-coded column labels (gold Explore, teal Company, pink Legal, silver Newsletter), violet subscribe CTA
- White body canvas replacing cream for a cleaner read

## Implemented (v7, Aug 2026 — Creative Agency boxed redesign)
- Agency services rebuilt as 11 boxed, color-coded cards (numbered, accent top border, dotted service list, "Explore Service" links) replacing flat 2-column lists
- Process steps (Discover→Strategize→Create→Grow) as color-coded lift-on-hover boxes; Why Merkabah and client chips boxed with white cards + shadow hover
- Hero photo swapped to professional team-collaboration image

## Implemented (v8, Aug 2026 — copy dedup)
- Removed repetitive "Merkabah" prefix from all 9 division names in Our Worlds index + mega menu (Creative Agency, Studios, Academy of Music, Live, Courses & Workshops, Podcast, Holistic Wellness, Careers, Store)

## Implemented (v9, Aug 2026 — iconic journey + bg sync)
- "Merkabah Difference" rebuilt as iconic connected path: gradient line (violet→teal→gold→pink→silver) linking 10 numbered circular nodes with glow shadows, hover scale, closing statement "One idea in. A whole brand out."
- Homepage backgrounds synchronized: hero fades into pure white body, section separators unified to silver-200, journey panel on cream-to-white gradient band
- Academy page boxed redesign (v8b): color-coded program cards with photos, boxed certification boards, vibrant grade ladder chips, boxed FAQs, brighter hero/instrument photos

## Implemented (v10, Aug 2026 — founder portrait + worlds grid)
- Real Kingsley Victor B&W portrait added to Founder (framed card with black nameplate), Home preview (violet nameplate, grayscale→color hover), About, and Wellness healer section
- Our Worlds rebuilt as professional 3-col boxed grid: white cards, per-division color top border + number, tagline, name, description, CTA footer, hover lift/shadow

## Implemented (v11, Aug 2026 — full certification content)
- Academy certifications rebuilt with complete exam-board detail: RSL (Rockschool), Trinity College London, ABRSM — each a large boxed panel with intro, subjects, grade ladder chips (Debut/Initial → Grade 8), level notes (incl. ABRSM Grade 5 Theory mandatory warning), "Why choose" bullets, "At Merkabah" support checklists, eligibility, Grade Exam vs Performance Certificate syllabus boxes
- Passport-journey intro with 3 benefit boxes (love performing / learn responsibility / future starts here), Merkabah branding throughout (no third-party academy names)

## Implemented (v12, Aug 2026 — service link fix)
- Fixed all 11 "Explore Service" links: slug mismatch for &-containing categories (e.g. brand-strategy-and-consultation) resolved via name-slug fallback lookup in ServiceDetail; every category now opens its detail page like Digital Marketing

## Backlog
- P0: Stripe/Razorpay online payment on checkout; resume file upload via object storage
- P1: Rich admin create/edit UI; Resend order/form email notifications; event ticketing; podcast audio/video players
- P2: Customer accounts + order history; student login/LMS; certificates; sitemap.xml + robots.txt + Open Graph; analytics events

## Placeholders
- Real photography (using curated Unsplash); social links; portfolio projects; podcast episodes; job listings — admin can populate
