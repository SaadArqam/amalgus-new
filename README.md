# GlassIQ by AmalGus — India's Most Intelligent Glass Marketplace

> **"GlassIQ: Making Glass Simple for Everyone"**

GlassIQ is a sophisticated digital marketplace designed to transform the glass industry. By connecting Homeowners, Architects, Builders, and Dealers directly with verified manufacturers and service partners, we bring transparency, speed, and AI-driven precision to a traditionally fragmented sector.

![GlassIQ Architecture](https://img.shields.io/badge/Architecture-Next.js%2016%20App%20Router-blue?style=for-the-badge)
![UI/UX](https://img.shields.io/badge/Design-Tailwind%20CSS%20%26%20Glassmorphism-F59E0B?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Groq%20%26%20Google%20Gemini-black?style=for-the-badge)

---

## 🚀 Key Features

### Core Experience ✅
- [x] **Smart Role Selection**: Tailored UX for Homeowners, Architects, Builders, and Dealers with persistent state using React Context.
- [x] **Glass Catalog**: Complete catalog with 8 standard glass types, advanced filtering, and product detail pages.
- [x] **Product Detail Pages**: Technical specs, tags, and "Complete Your System" section with allied products cross-sell.
- [x] **Estimate Generator**: Millimeter-to-Sqft conversion with GST @18% and role-based discounts.
- [x] **Download Estimate**: Print/PDF functionality for professional estimates.

### AI & Market Intelligence ✅
- [x] **Smart AI Matcher**: Describe your requirement in plain English and get technical glass specs powered by Google Gemini.
- [x] **Daily Rates Dashboard**: Real-time market pulse with trend data.
- [x] **Multi-Vendor Comparison**: Compare live prices from multiple factories per product.

### Partner Ecosystem ✅
- [x] **Vendor Directory**: Vetted manufacturing partners across major Indian cities.
- [x] **Service Partners**: Direct access to Glaziers, Installers, and Measurement teams.
- [x] **Allied Products**: Comprehensive hardware, sealants, and accessories for complete system solutions.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **AI Engine**: Groq (Llama 3.3 70B) or Google Gemini API
- **State Management**: React Context API (Roles & Toasts)
- **Deployment**: Vercel Ready
- **Colors**: Deep slate (#0f172a) primary, Amber (#F59E0B) accent

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/glassiq.git
cd glassiq
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_GROQ_KEY=your_groq_key_here
NEXT_PUBLIC_GEMINI_KEY=your_gemini_key_here
```

**How to get API keys:**
- **Groq**: https://console.groq.com/keys
- **Google Gemini**: https://aistudio.google.com/app/apikey

**Note**: Groq key should start with `gsk_` — the app automatically detects which one to use based on your key! If both are provided, Groq is used first.

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Sample AI Queries to Try 🎯

1. **"I need glass for my bathroom shower"** → 8mm Toughened (tempered for safety)
2. **"Soundproof glass for my office cabin"** → 10mm Laminated or DGU Acoustic
3. **"Glass railing for my balcony on 15th floor"** → 12mm Toughened + Laminated (height safety)
4. **"Energy efficient glass for south-facing facade"** → Low-E DGU (solar heat control)

---

## Customer Role Discounts 📊

- **Homeowner**: 0% discount
- **Architect**: 5% discount
- **Builder**: 8% discount
- **Dealer**: 12% discount

---

## Glass Product Catalog 🪟

1. **Clear Float** (5mm, Plain, Windows, ₹45–₹60/sqft)
2. **Toughened** (8mm, Tempered, Shower Enclosure, ₹120–₹160/sqft)
3. **Laminated** (10mm, PVB Laminated, Railing/Safety, ₹180–₹250/sqft)
4. **DGU/IGU** (6+12+6mm, Insulated, Facade/Curtain Wall, ₹350–₹500/sqft)
5. **Frosted** (6mm, Acid Etched, Partition/Privacy, ₹85–₹110/sqft)
6. **Reflective** (6mm, Coated, Exterior Facade, ₹100–₹140/sqft)
7. **Low-E Glass** (6mm, Soft Coat, Energy Efficient, ₹200–₹300/sqft)
8. **Back-Painted** (8mm, Lacquered, Kitchen/Decorative, ₹150–₹220/sqft)

---

## 📜 Architecture Overview
GlassIQ leverages **Next.js 16 Route Handlers** for a lightweight backend, using local JSON persistence for the prototype phase. The frontend utilizes **React Context API** for global state management (Roles & Toasts) and **Tailwind CSS** for a premium, industrial design language.

---

## 🛡 Disclaimer
*This project is a functional architectural prototype built for GlassIQ by AmalGus. Market rates and vendor data are mocked for demonstration purposes. Developed with ❤️ for the Indian Glass Industry.*
# amalgus-new
