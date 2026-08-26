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

## Backlog
- P0: Testing subagent full sweep; portfolio project detail pages
- P1: Rich admin CRUD editor (currently list-only); resume upload via object storage; Journal article detail page; store payment integration (Stripe)
- P2: Student login/LMS; event ticketing; Resend email notifications; sitemap.xml + Open Graph; analytics dashboard

## Placeholders
- Real photography (using curated Unsplash); social links; portfolio projects; podcast episodes; job listings — admin can populate
