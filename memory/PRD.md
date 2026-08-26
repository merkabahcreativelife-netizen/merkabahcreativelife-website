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

## Backlog
- P0: Stripe checkout for store; resume file upload via object storage
- P1: Rich admin create/edit UI; Resend email notifications; event ticketing; podcast audio/video players
- P2: Student login/LMS; certificates; sitemap.xml + robots.txt + Open Graph; analytics events

## Placeholders
- Real photography (using curated Unsplash); social links; portfolio projects; podcast episodes; job listings — admin can populate
