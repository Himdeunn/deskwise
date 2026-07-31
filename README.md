# DeskWise — Hotel Service Management System

> *"DeskWise — Smarter Desk, Faster Service."*

DeskWise is a modern, full-stack **Hotel Service Management Dashboard** built with Next.js 14 (App Router), TypeScript, Prisma ORM, Neon PostgreSQL, and Bun. It streamlines, monitors, and accelerates the processing of hotel guest service requests in real time.

---

## 📖 Table of Contents
- [Project Overview & Philosophy](#-project-overview--philosophy)
- [Key Features & Role Access Matrix](#-key-features--role-access-matrix)
- [Tech Stack & Tooling](#-tech-stack--tooling)
- [Order Lifecycle & SLA Breach Rules](#-order-lifecycle--sla-breach-rules)
- [Installation & Local Setup with Bun](#-installation--local-setup-with-bun)
- [Testing Credentials (Seed Users)](#-testing-credentials-seed-users)
- [Project Structure](#-project-structure)
- [Technical Decisions & State Architecture](#-technical-decisions--state-architecture)

---

## 💡 Project Overview & Philosophy

The name **DeskWise** is derived from two core concepts:
- **Desk**: Represents the hotel front desk and operational workstation where all guest requests originate and are processed.
- **Wise**: Represents operational intelligence. The system assists staff in making fast, informed decisions — prioritizing urgent requests, monitoring SLA breach risks, and auditing financial performance with zero operational clutter.

---

## 👥 Key Features & Role Access Matrix

DeskWise enforces strict server-side **Role-Based Access Control (RBAC)** via Next.js Middleware and API Route Handlers:

### 1. Public Landing Page (`/`)
- **Sticky Header**: Brand logo (`/logo.png`), smooth-scroll links, and dynamic CTA buttons.
- **5 Core Sections**:
  - **Hero Section**: Live Service Monitor card showcase and interactive CTAs.
  - **About Section**: Core operational pillars (*Clarity*, *Speed*, *Intelligence*, *Financial Audit*) and performance metrics.
  - **Services Section**: Interactive cards highlighting 5 service categories (*Room Service*, *Housekeeping*, *Laundry*, *Extra Bed*, *Spa & Massage*).
  - **FAQ Section**: Expandable accordion addressing common operational and guest inquiries.
  - **Contact & Footer Section**: 24/7 helpline cards, direct inquiry form, and brand footer.

### 2. Staff Dashboard & Management (`/dashboard`)
- **Operational Metrics**: Active Guests, Pending Orders, SLA Breach Count, Today's Revenue, and Top Services Chart.
- **Service Requests (`/dashboard/orders`)**: Dedicated page for searching, filtering (status & service type), and updating order lifecycles (*Accept*, *Process*, *Complete*, *Cancel*).
- **Revenue & Financial Analytics (`/dashboard/revenue`)**: Staff-only financial dashboard displaying earnings breakdown by service category, payment collection ratios, and transaction ledger.
- **Admin Management (`/dashboard/admin-management`)**: Restricted to `SUPER_ADMIN` for creating, editing, and managing staff accounts.

### 3. Guest Self-Service Portal (`/my-orders`)
- Restricted to `CUSTOMER` role for creating new hotel service requests (`/my-orders/new`) and tracking personal order statuses in real time.

### 4. Universal Profile & Settings (`/profile`)
- Accessible by all authenticated roles to update full name and password with Zod schema validation.

---

## 🛠 Tech Stack & Tooling

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Runtime & Tooling**: [Bun](https://bun.sh/) (Runtime, Package Manager, and Execution Engine)
- **Styling & Design System**: [Tailwind CSS](https://tailwindcss.com/) with a curated palette (`#0F3D91` Dark Navy, `#1A73E8` Primary Blue, `#BBD4FF` Soft Accent)
- **Database**: [Neon PostgreSQL](https://neon.tech/) (Serverless Cloud Postgres)
- **ORM**: [Prisma ORM](https://www.prisma.io/) (Type-safe schema, migrations, and seed scripts)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/) Credentials Provider (`bcryptjs` password hashing)
- **State & Data Fetching**: [TanStack Query v5](https://tanstack.com/query) + React Hooks
- **Form & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

---

## ⏱ Order Lifecycle & SLA Breach Rules

### Order Lifecycle State Machine
```
[ New ] ---> [ Acknowledged ] ---> [ In Progress ] ---> [ Completed ]
   |                  |                    |
   +------------------+--------------------+---> [ Cancelled ]
```

### Service Level Agreement (SLA) Rules
- Any order in **`New`** status that is not acknowledged by hotel staff within **15 minutes** of creation automatically triggers an **`URGENT SLA Breach (>15m)`** pulsing visual alert.
- Highlighted prominently on the Staff Dashboard and Order Management list for immediate priority response.

---

## 🚀 Installation & Local Setup with Bun

### 1. Prerequisites
Ensure **Bun** is installed on your environment:
```bash
bun --version
```

### 2. Clone Repository & Install Dependencies
```bash
git clone https://github.com/Himdeunn/deskwise.git
cd deskwise
bun install
```

### 3. Environment Variables (`.env`)
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://neondb_owner:npg_Ziqjvzc0a2Uf@ep-green-poetry-ayftud1i-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEXTAUTH_SECRET="deskwise-secret-key-production-grade-2026-cmpnion"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup & Seeding
Push the Prisma schema to Neon PostgreSQL and seed test accounts and orders:
```bash
# Push Prisma schema to database
bun run db:push

# Seed test users and initial orders
bun run db:seed
```

### 5. Run Development Server
```bash
bun run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## 🔑 Testing Credentials (Seed Users)

Test the application across different access levels using these pre-configured seed accounts (Password for all: `Password123!`):

| Role | Email | Password | Access & Purpose |
| :--- | :--- | :--- | :--- |
| **`SUPER_ADMIN`** | `superadmin@deskwise.com` | `Password123!` | Full Access & Staff Management |
| **`ADMIN`** | `admin.budi@deskwise.com` | `Password123!` | Front Desk & Order Operations |
| **`ADMIN`** | `admin.siti@deskwise.com` | `Password123!` | Guest Relations Staff |
| **`CUSTOMER`** | `guest.ahmad@gmail.com` | `Password123!` | Room 101 Guest |
| **`CUSTOMER`** | `guest.dewi@gmail.com` | `Password123!` | Room 204 Guest |

---

## 📂 Project Structure

```
deskwise/
├── app/                        # Next.js App Router (pages, layouts, API routes)
│   ├── (auth)/                 # Public login & registration routes
│   ├── (staff)/                # Staff dashboard (/dashboard, /orders, /revenue, /admin-management)
│   ├── (customer)/             # Guest self-service portal (/my-orders)
│   ├── api/                    # REST API Route Handlers with Zod validation
│   ├── profile/                # Universal user profile page
│   ├── globals.css             # Tailwind CSS global styles & utilities
│   └── page.tsx                # Public 5-section Landing Page
├── components/                 # Modular React components & UI primitives
│   ├── admin/                  # Admin management tables & modals
│   ├── auth/                   # LoginForm & RegisterForm
│   ├── dashboard/              # Metric Cards & Top Services List
│   ├── landing/                # Landing Navbar, Hero, About, Services, FAQ, Contact
│   ├── layout/                 # Navbar & Responsive Sidebar per role
│   ├── orders/                 # Order Table, Filter Bar, Detail Drawer, SLA Badges
│   └── ui/                     # Primitives (Button, Card, Badge, Input, Select, Modal, Skeleton)
├── features/                   # Domain hooks & TanStack Query fetchers
├── lib/                        # Prisma singleton, NextAuth configuration
├── prisma/                     # Database schema & seeding scripts
├── public/                     # Static assets (logo.png, favicon.ico)
└── types/                      # TypeScript definitions & NextAuth type augmentation
```

---

## 🏛 Technical Decisions & State Architecture

1. **State Management**:
   - **Server / Async State**: Managed entirely by **TanStack Query** for automatic caching, refetching, and query invalidation upon status mutations.
   - **Form State**: Managed via **React Hook Form** + **Zod** to eliminate unnecessary parent re-renders and enforce strict validation.
   - **UI State**: Filter values, modal open states, and mobile drawers are kept in local component state (`useState`).

2. **Responsive Mobile Ergonomics**:
   - Mobile navigation utilizes a slide-in drawer with backdrop overlay.
   - Data tables gracefully convert into stacked vertical cards on small screens (`< md`).
   - Order detail drawers act as bottom-sheets on mobile devices.

3. **Production Readiness & Security**:
   - Middleware-enforced authorization rules.
   - Passwords hashed using `bcrypt` (10 rounds).
   - Zero synthetic filler copy — 100% humanized, actionable microcopy.
