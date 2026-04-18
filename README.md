# AmalGus

*India's Most Intelligent B2B2C Glass Marketplace*

A precision-engineered marketplace that brings AI-powered glass matching, live factory rates, and multi-vendor comparison to India's $150B+ glass industry. Built in 24 hours as an internship prototype for AmalGus Technology.

---

## Overview

AmalGus addresses the structural gap in India's fragmented glass industry through intelligent automation and transparent pricing. The platform combines AI-powered matching, real-time factory rates, and role-based UX to serve homeowners, architects, builders, and dealers from a single interface. Built as a functional prototype demonstrating industrial-grade engineering under extreme time constraints.

---

## Live Demo + Repository

[Live Demo](https://amalgus-new-zeta.vercel.app) | [GitHub](https://github.com/SaadArqam/amalgus-new)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + inline CSS variables |
| AI Engine | OpenAI API (GPT-4o-mini) |
| State | React Context API |
| Data | Local JSON (prototype phase) |
| Deployment | Vercel |

---

## Features

### Core Features

- **Glass Product Catalog** — Complete catalog with filters by thickness, process, and application
- **AI Smart Matcher** — Plain English input → technical glass recommendations
- **Estimate Engine** — mm to sq.ft conversion, GST @18%, role-based discounts
- **Daily Rate Dashboard** — Live factory price feed with trend indicators
- **Multi-Vendor Comparison** — 3+ verified sources per product with delivery timelines
- **Responsive UI** — Mobile-first, works across all screen sizes

### Bonus Features

- **Customer Role System** — Homeowner / Architect / Builder / Dealer with persistent localStorage
- **Role-based discounts** — Homeowner 0% / Architect 5% / Builder 8% / Dealer 12%
- **Allied Products** — Cross-sell on every product detail page
- **Service Partner directory** — City and type filters
- **Vendor directory** — Price adjustment indicators

---

## AI Matcher — Sample Queries

| Query | Recommended Glass |
|---|---|
| "Glass for my bathroom shower" | 8mm Toughened — tempered for safety |
| "Soundproof glass for office cabin" | 10mm Laminated or DGU Acoustic |
| "Glass railing for 15th floor balcony" | 12mm Toughened + Laminated — height safety |
| "Energy efficient south-facing facade" | Low-E DGU — solar heat control |

---

## Getting Started

```bash
# Clone
git clone https://github.com/SaadArqam/amalgus-new.git
cd amalgus-new

# Install
npm install

# Environment
cp .env.example .env.local
# Add your key: NEXT_PUBLIC_OPENAI_KEY=your_key_here

# Run
npm run dev
```

Open `http://localhost:3000`

---

## Environment Variables

```env
NEXT_PUBLIC_OPENAI_KEY=your_openai_key_here
```

---

## Architecture Overview

GlassIQ leverages Next.js 15 Route Handlers for lightweight backend operations, using local JSON persistence during prototype phase. The frontend implements React Context API for global state management (roles & notifications) and Tailwind CSS with CSS variables for the dark industrial design system. The AI engine processes natural language queries through OpenAI's GPT-4o-mini, converting user requirements into technical glass specifications.

---

## Customer Role System

- **Homeowner** — 0% discount, consumer-focused UX
- **Architect** — 5% discount, technical specifications priority
- **Builder** — 8% discount, bulk ordering features
- **Dealer** — 12% discount, wholesale pricing and margins

Role selection persists in localStorage, enabling personalized pricing and feature access across sessions.

---

*Functional prototype built for AmalGus Technology internship. Market rates and vendor data are simulated for demonstration purposes.*
