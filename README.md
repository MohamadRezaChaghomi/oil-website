# 🛢️ OIL & GAS – Corporate Website

<p align="center">
  <img src="https://img.shields.io/badge/status-production-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-8-green?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-7-DC382D?style=flat-square&logo=redis&logoColor=white" />
</p>

<br />

<div align="center">
  <h1>🛢️ Oil & Gas – Corporate Website</h1>
  <p><strong>A modern, high‑performance corporate website for the oil, gas and petrochemical industry.</strong></p>
  <p>Built with <strong>Next.js 15, TypeScript, Tailwind CSS, MongoDB, Redis</strong> and more.</p>
</div>

---

## 📖 About The Project

This project is a complete corporate website designed for oil, gas and petrochemical companies. It includes a **public section** (introducing the brand, products, services, blog) and a **fully protected admin panel** for managing content.

> 🚀 The website is SEO‑optimized, fully responsive, supports dark/light mode, and is ready for production deployment via Docker or Vercel.

### ✨ Key Features

| Category | Features |
|----------|----------|
| 🏢 **Public Pages** | Homepage with hero, services, featured products; products listing with filtering & pagination; product detail page; blog listing & article detail; about, contact, services pages. |
| 🎨 **UI/UX** | Custom oil‑themed palette (no blue) – primary `#2C3E2B` (oil green), secondary `#E67E22` (burnt orange); dark/light theme using `next-themes`; fully responsive (mobile, tablet, desktop); RTL support (ready for Persian/Arabic). |
| 🛡️ **Admin Panel** | Protected with HTTP Basic Auth; full CRUD for products, articles, categories; manage contact messages, newsletter subscribers, site settings; dashboard with stats. |
| 📧 **Contact & Newsletter** | Contact form stores messages in MongoDB and sends email via Nodemailer; newsletter subscription with DB storage; admin can view/delete subscribers. |
| ⚡ **Performance** | Next.js App Router with Server Components; Redis caching for product/article lists (60s TTL, auto‑invalidation on changes); image optimization with `next/image`. |
| 🔍 **SEO** | Dynamic metadata (title, description, Open Graph) for every page; auto‑generated `sitemap.xml` and `robots.txt`; JSON‑LD structured data (Product, Article, Organization); custom 404 page. |
| 🐳 **Deployment** | Docker ready (Dockerfile, docker-compose); can also be deployed on Vercel or VPS with PM2. |

---

## 🧱 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Framework** | Next.js 15 (App Router) with TypeScript |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 + CSS Modules (via ShadCN/UI) |
| **Database** | MongoDB + Mongoose 8 |
| **Caching** | Redis (ioredis) |
| **Forms & Validation** | react‑hook-form + Zod |
| **HTTP Client** | Next.js native fetch / API Routes |
| **Email** | Nodemailer |
| **Theming** | next‑themes |
| **Animations** | Framer Motion |
| **Admin Security** | Basic Auth (Middleware) |
| **Deployment** | Docker, Vercel, or any Node.js host |

---

## 🏗️ Architecture (Full‑Stack Next.js)

┌─────────────────────────────────────────────────────┐
│                     Browser (User)                   │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│            Next.js App Router (RSC)                 │
│  - Server Components for public pages (SSR/SSG)     │
│  - Client Components for interactive parts          │
│  - Middleware (Basic Auth for /admin, security headers)│
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│             Next.js API Routes (Backend)            │
│  - Product, Article, Category, Message, Subscriber │
│  - Contact form, Newsletter                         │
│  - Admin CRUD endpoints (protected)                 │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│                     Data Layer                      │
│  - MongoDB (primary database)                       │
│  - Redis (cache for product/article lists)          │
└─────────────────────────────────────────────────────┘

---

## 📁 Project Structure

oil-company-website/
├── public/                     # Static files
├── src/
│   ├── app/
│   │   ├── (public)/           # Public pages (home, products, blog, about, contact, services)
│   │   ├── admin/              # Admin panel (Basic Auth protected)
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── products/       # Product CRUD
│   │   │   ├── articles/       # Article CRUD
│   │   │   ├── categories/     # Category CRUD
│   │   │   ├── messages/       # Contact messages
│   │   │   ├── newsletter/     # Subscriber management
│   │   │   └── settings/       # Site settings (contact, social, SEO)
│   │   ├── api/                # Route Handlers (REST API)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                 # Button, Input, Textarea, Label, Card, Skeleton
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # HeroSection, ServicesSection, ProductsShowcase
│   │   └── providers/          # ThemeProvider, AnalyticsProvider
│   ├── lib/
│   │   ├── models/             # Mongoose models (Product, Article, Category, Setting, Message, Subscriber)
│   │   ├── services/           # Business logic (productService, articleService, ...)
│   │   ├── validations/        # Zod schemas
│   │   ├── db.ts               # MongoDB connection
│   │   ├── redis.ts            # Redis client
│   │   └── cache.ts            # Cache helpers
│   ├── hooks/                  # Custom hooks (useTheme, useScroll...)
│   ├── utils/                  # formatters, seoHelpers, cn utility
│   ├── types/                  # TypeScript type definitions
│   └── middleware.ts           # Basic Auth + security headers
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Redis (optional – caching works without it)

### Installation

1. **Clone the repository**

   git clone https://github.com/mohamadreza/oil-company-website.git
   cd oil-company-website

2. **Install dependencies**

   npm install

3. **Environment variables** – Create `.env.local` in the root (use `.env.local.example` as reference):

   # Required
   MONGODB_URI=mongodb://localhost:27017/oilcompany
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password

   # Optional (caching, email, analytics)
   REDIS_URL=redis://localhost:6379
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=app_password
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

4. **Run the development server**

   npm run dev

5. Open [http://localhost:3000](http://localhost:3000) – public site.  
   Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin) (use `ADMIN_USERNAME`/`ADMIN_PASSWORD` from `.env.local`).

---

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string |
| `NEXT_PUBLIC_SITE_URL` | ✅ Yes | Base URL of the site (for absolute links, sitemap, etc.) |
| `ADMIN_USERNAME` | ✅ Yes | Username for Basic Auth on `/admin` |
| `ADMIN_PASSWORD` | ✅ Yes | Password for Basic Auth on `/admin` |
| `REDIS_URL` | ❌ No | Redis connection URL (if omitted, caching is disabled) |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` | ❌ No | SMTP config for contact form (if omitted, email not sent) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ❌ No | Google Analytics 4 ID (if omitted, analytics not loaded) |

---

## 📦 Building for Production

npm run build
npm start

---

## ☁️ Deployment

### Deploy on Vercel (Recommended)

1. Push code to GitHub.
2. Import project at [vercel.com](https://vercel.com).
3. Add environment variables in Vercel dashboard.
4. Deploy – Vercel provides automatic CDN, SSL, and analytics.

### Deploy on VPS with PM2 (No Docker)

# Install Node.js and MongoDB
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs mongodb redis-server

# Clone and build
git clone https://github.com/mohamadreza/oil-company-website.git
cd oil-company-website
npm install
npm run build

# Install PM2 and start
npm install -g pm2
pm2 start npm --name "oil-company" -- start
pm2 save && pm2 startup

### Deploy with Docker

docker-compose up -d --build

---

## 📊 Current Status & Roadmap

| Feature | Status |
|---------|--------|
| Public pages (home, products, product detail, blog, article detail, about, contact, services) | ✅ Complete |
| Admin panel (products, articles, categories, messages, subscribers, settings) | ✅ Complete |
| Dark/light mode | ✅ Complete |
| Redis caching for product/article lists | ✅ Complete |
| Contact form with DB storage + email | ✅ Complete |
| Newsletter subscription | ✅ Complete |
| SEO (metadata, sitemap, robots, JSON‑LD, 404) | ✅ Complete |
| Docker setup | ✅ Complete |
| Google Analytics integration | ✅ Complete |
| Multi‑language (i18n) | ❌ Planned for future |
| Vector search (MongoDB Atlas) | ❌ Planned for future |
| CDN optimisation | ❌ Handled by Vercel automatically |

---

## 🤝 Developers

**MohamadReza Chaghomi**

- 📧 mohamad.chaghomi@gmail.com  
- 🐙 [github.com/MohamadRezaChaghomi](https://github.com/MohamadRezaChaghomi)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- Next.js team – for the amazing framework
- Tailwind CSS – for utility‑first styling
- MongoDB – for flexible document database
- Redis – for high‑performance caching
- All open‑source contributors

<p align="center">
  <i>Built with ❤️ and ☕ by MohamadReza</i><br/>
  <b>Oil & Gas – Powering the future</b>
</p>