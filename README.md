# Tafya — Health Information Platform

A full-stack health information platform built as a capstone project,
simulating the structure and purpose of public. Built over 10 days to practice every layer of the
modern web development stack.

**Live site:** https://tafya.vercel.app/

---

## The brief

Design and build a content-driven health platform with:
- A browsable, searchable A–Z of health conditions
- A healthy living hub with topic articles
- An interactive symptom checker
- A contact form backed by an API
- Full accessibility compliance (WCAG 2.1 AA)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Fonts | Inter + Lexend (via next/font) |
| Deployment | Vercel |
| Version control | Git + GitHub |

---

## Features

- **Health A–Z** — 14 conditions with symptoms, causes, self-care
  advice, "when to seek help" callouts, and related condition links.
  Filterable by 6 categories via URL-based filter pills.
- **Healthy Living hub** — 6 topic articles across Physical Health,
  Mental Wellbeing, and Preventive Care.
- **Live search** — debounced search bar querying a MongoDB-backed
  API, returning grouped results for conditions and topics.
- **Symptom checker** — rule-based branching decision tree built with
  `useReducer`, guiding users to one of three outcomes (self-care,
  see a GP, seek urgent help) with a Back button and progress
  indicator.
- **Contact form** — client- and server-side validated form posting
  to a Next.js API route.
- **Branded 404 page** — custom not-found page with navigation links.
- **Responsive** — mobile-first layout tested at 375px, 768px,
  and 1280px.
- **Accessible** — WCAG 2.1 AA compliant. See Lighthouse scores below.

---

## API routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/conditions` | All conditions, optional `?category=` filter |
| GET | `/api/conditions/[slug]` | Single condition by slug |
| GET | `/api/healthy-living` | All topics, optional `?category=` filter |
| GET | `/api/healthy-living/[slug]` | Single topic by slug |
| GET | `/api/search?q=` | Search conditions and topics |
| POST | `/api/contact` | Submit contact form |

---

## Running locally

**Prerequisites:** Node.js 20+, a MongoDB Atlas account

**1. Clone the repo**
```bash
git clone https://github.com/Lokeny2/tafya.git
cd tafya
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Copy `.env.example` to `.env.local` and fill in the values:
```bash
copy .env.example .env.local
```

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tafya
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**4. Seed the database**
```bash
npm run seed
```

**5. Start the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure
src/
├── app/ # Next.js App Router pages and API routes
│ ├── api/ # Route handlers (conditions, search, contact)
│ ├── conditions/ # Health A–Z pages
│ ├── healthy-living/ # Healthy Living pages
│ ├── symptom-checker/ # Interactive symptom checker
│ ├── contact/ # Contact form
│ └── about/ # About and disclaimer
├── components/
│ ├── layout/ # Header, Footer
│ └── ui/ # SearchBar, FormField
├── data/ # Seed data (conditions, topics, symptom tree)
├── lib/ # MongoDB connection, Mongoose models, API helpers
└── types/ # TypeScript interfaces
---

## Disclaimer

Tafya is a learner's portfolio project. It does not provide real medical advice,
diagnosis, or treatment. All content is illustrative and written for
demonstration purposes only. For any health concern, please consult a
qualified healthcare professional.

---

## What I would add next

- Authentication and user accounts (saved conditions, health notes)
- A CMS (e.g. Sanity) so content can be edited without a redeploy
- Email delivery for the contact form (e.g. Resend)
- Full-text search index in MongoDB for faster, fuzzier search
- Dark mode
- Unit and integration tests (Jest + React Testing Library)
- More medical data