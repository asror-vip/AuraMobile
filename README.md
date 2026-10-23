# AURA MOBILE — Next-Gen Flagship E-Commerce Showcase

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-orange?style=for-the-badge)](https://turbo.build/)
[![Contra Portfolio](https://img.shields.io/badge/Contra-Case_Study-00FF66?style=for-the-badge)](https://contra.com/)

> **A luxury, high-performance consumer tech e-commerce platform built for modern flagship smartphones.** Engineered with fluid micro-interactions, full responsive fidelity, an interactive multi-method checkout flow, international concierge care, and bilingual support (English & Russian).

---

## 🌟 Key Highlights & Engineering Features

### 1. Interactive 3D Flagship Hero Carousel
* **Curated Devices:** Apple iPhone 16 Pro (Desert Titanium), Samsung Galaxy S25 Ultra (Titanium Silverblue), and Xiaomi 14T Series.
* **Ambient Lighting:** Dynamic chromatic aura backdrops tailored to the exact metallic tones of each device.
* **Smooth Transitions:** Custom timing curves, auto-sliding with pause-on-hover, and tactile indicator controls.

### 2. Modern Interactive Checkout Prototype (`/payment`)
* **Multi-Gateway Architecture:** Interactive simulated flows for **Apple Pay (Pay)**, **Google Pay (GPay)**, and **Credit Cards (Visa, MasterCard, American Express)**.
* **Live Visual Card Preview:** Dynamic titanium card mockup that updates in real time with autofill, card brand detection, and format masks.
* **Live Promo Code Engine:** Test discount codes like `CONTRA` or `AURA20` for immediate 20% calculations with celebratory micro-animations.
* **Instant Order Confirmation & Invoice:** Generates printable invoices with unique order hashes (`#AURA-98214`) and delivery tracking simulator.

### 3. Flagship Experience Centers & VIP Concierge (`/contacts`)
* **Global Hubs:** Showrooms in San Francisco (Global HQ), London (Mayfair), Dubai (Marina), and Tokyo with opening hours and direct lines.
* **Interactive VIP Ticket Generator:** In-browser booking form that creates copyable concierge tickets and pre-formatted mailto passes.

### 4. Zero-Dependency Performant Design
* **Scroll-Driven Micro-Animations:** IntersectionObserver-driven scroll reveals (`data-reveal`).
* **Zero Heavy Libraries:** No bloated animation packages — built entirely with pure CSS transforms and lightweight React Context for blistering 100/100 Lighthouse scores.
* **Static Page Generation:** All routes pre-rendered statically using Next.js 16 Partial Prerendering and Turbopack.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Static Site Generation (SSG), Turbopack compiler |
| **Language** | TypeScript (Strict) | 100% type safety for products, orders, and context |
| **Styling** | Tailwind CSS v4 | Custom design tokens, glassmorphism, responsive grid |
| **Typography** | Manrope & DM Sans | Modern luxury tech font pair via `next/font/google` |
| **Icons** | Lucide React | Clean, scalable featherweight SVGs |
| **State** | React Context API | Dual language toggle (English / Russian), favorites, checkout |

---

## 🚀 Quick Start & Local Development

### 1. Clone & Install
```bash
git clone https://github.com/your-username/aura-mobile.git
cd aura-mobile
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live app.

### 3. Build Production Bundle
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
d:/Desktop/project/
├── public/                 # Static assets (transparent smartphone PNGs & SVG brand marks)
│   └── assets/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── catalog/        # Flagship catalog & dynamic product detail routes
│   │   ├── contacts/       # Global showroom & concierge ticket builder
│   │   ├── payment/        # Interactive checkout flow & order confirmation
│   │   ├── delivery/       # Worldwide express shipping policies
│   │   ├── returns/        # 14-day global returns & AURA Care warranty
│   │   ├── cancellation/   # Self-service order cancellation ticket builder
│   │   └── layout.tsx      # Root layout with announcement bar & footer
│   ├── components/         # Reusable modular UI components
│   │   ├── HeroSection.tsx # Chromatic flagship carousel
│   │   ├── Navbar.tsx      # Sticky glassmorphism header & search
│   │   ├── ProductCard.tsx # Hover-lift product cards with quick view
│   │   └── Footer.tsx      # Multi-column footer & international credentials
│   ├── context/            # AppContext (Language en/ru, favorites, toast notifications)
│   ├── data/               # Product catalog, store info, and policy documents
│   └── types/              # Comprehensive TypeScript interfaces
└── README.md
```

---

## 💼 Contra Portfolio Showcase

Built with precision for global showcase on **[Contra.com](https://contra.com/)**. Demonstrates end-to-end frontend mastery:
* High-end art direction for luxury tech.
* Flawless interactive state management.
* Production-ready Next.js performance and accessibility.

*Developed with passion for excellence in web engineering.*
