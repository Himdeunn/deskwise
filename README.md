# DeskWise — Hotel Service Management Dashboard

> *"DeskWise — Smarter Desk, Faster Service."*

DeskWise adalah platform **Hotel Service Management Dashboard** modern berbasis Next.js App Router yang dirancang khusus untuk menyederhanakan, memantau, dan mempercepat alur penanganan permintaan layanan tamu (*guest requests*) di hotel secara terpusat.

---

## 📖 Table of Contents
- [Filosofi & Makna Nama](#-filosofi--makna-nama)
- [Fitur Utama & Akses Role](#-fitur-utama--akses-role)
- [Teknologi & Tech Stack](#-teknologi--tech-stack)
- [Arsitektur & Aturan SLA](#-arsitektur--aturan-sla)
- [Panduan Instalasi & Jalankan Aplikasi](#-panduan-instalasi--jalankan-aplikasi)
- [Kredensial Pengujian (Seed Users)](#-kredensial-pengujian-seed-users)
- [Struktur Direktori](#-struktur-direktori)

---

## 💡 Filosofi & Makna Nama

Nama **DeskWise** berasal dari perpaduan dua kata utama:
- **Desk**: Merepresentasikan *front desk* atau meja kerja staf operasional hotel tempat seluruh permintaan tamu bermula dan diproses.
- **Wise**: Berarti cerdas dan bijaksana. Sistem membantu staf hotel mengambil keputusan cerdas secara cepat — memprioritaskan permintaan mendesak (*urgent*), mengawasi potensi pelanggaran SLA, dan meminimalkan kesalahan manusia.

---

## 👥 Fitur Utama & Akses Role

Sistem DeskWise dilengkapi dengan **Role-Based Access Control (RBAC)** ketat di sisi server (Middleware & API Route Handlers):

1. **`SUPER_ADMIN` (Manajemen Puncak / IT Manager)**
   - Mengakses seluruh statistik operasional hotel.
   - Mengelola pemrosesan pesanan layanan tamu.
   - Memiliki menu khusus `/dashboard/admin-management` untuk membuat, mengedit, dan menghapus akun Admin/Staf hotel.

2. **`ADMIN` (Staf Operasional / Front Desk / Guest Relation)**
   - Mengakses `/dashboard` (Overview Metrik & Order Management).
   - Memproses siklus status order (*Acknowledge*, *In Progress*, *Complete*, *Cancel*).
   - Tidak dapat mengelola akun staf lain atau pengaturan sistem global.

3. **`CUSTOMER` (Tamu Hotel)**
   - Mengakses area mandiri `/my-orders`.
   - Mengajukan permintaan layanan kamar baru (*Room Service*, *Housekeeping*, *Laundry*, *Extra Bed*, *Spa & Massage*).
   - Melacak status pesanan pribadi secara real-time tanpa dapat melihat pesanan tamu lain atau dashboard staf.

---

## 🛠 Teknologi & Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Runtime & Tooling**: [Bun](https://bun.sh/) (Package Manager, Execution Engine, DAN Test Runner)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Tema *Full Responsive Modern Minimalist and Simplicity*)
- **Database**: [Neon PostgreSQL](https://neon.tech/) (Serverless Cloud Postgres)
- **ORM**: [Prisma ORM](https://www.prisma.io/) (Type-safe schema, migrations & seed)
- **Autentikasi**: [NextAuth.js v5](https://authjs.dev/) Credentials Provider (`bcryptjs` password hashing)
- **State Management**: [TanStack Query v5](https://tanstack.com/query) + React Hooks
- **Validasi Schema**: [Zod](https://zod.dev/) + React Hook Form

---

## ⏱ Arsitektur & Aturan SLA

### Lifecycle Order Status
```
[ New ] ---> [ Acknowledged ] ---> [ In Progress ] ---> [ Completed ]
   |                  |                    |
   +------------------+--------------------+---> [ Cancelled ]
```

### Aturan SLA (Service Level Agreement) Breach
- Setiap pesanan dengan status **`New`** yang tidak diakui (*acknowledged*) oleh staf dalam waktu **> 15 menit** sejak dibuat akan memicu indikator visual **`URGENT SLA Breach`** (badge berkedip merah lembut dengan durasi keterlambatan).
- Indikator ini langsung terlihat pada Dashboard Staf untuk penanganan prioritas tinggi.

---

## 🚀 Panduan Instalasi & Jalankan Aplikasi

### 1. Prasyarat
Pastikan Anda telah menginstall **Bun** di komputer Anda:
```bash
bun --version
```

### 2. Kloning Repositori & Install Dependensi
```bash
git clone https://github.com/Himdeunn/deskwise.git
cd deskwise
bun install
```

### 3. Konfigurasi Environment Variables (`.env`)
Buat berkas `.env` di direktori utama:
```env
DATABASE_URL="postgresql://neondb_owner:npg_Ziqjvzc0a2Uf@ep-green-poetry-ayftud1i-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEXTAUTH_SECRET="deskwise-secret-key-production-grade-2026-cmpnion"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Setup Database & Seeding
Sinkronkan skema database ke Neon PostgreSQL dan jalankan penyemaian data contoh:
```bash
# Push skema Prisma ke database Neon PostgreSQL
bun run db:push

# Seed data pengguna (3 role) dan data order awal (termasuk contoh SLA breach)
bun run db:seed
```

### 5. Jalankan Server Pengembang
```bash
bun run dev
```
Akses aplikasi melalui browser pada `http://localhost:3000`.

---

## 🔑 Kredensial Pengujian (Seed Users)

Gunakan akun berikut untuk menguji berbagai tingkat hak akses:

| Role | Email | Password | Keterangan |
| :--- | :--- | :--- | :--- |
| **`SUPER_ADMIN`** | `superadmin@deskwise.com` | `Password123!` | Akses Penuh & Manajemen Admin |
| **`ADMIN`** | `admin.budi@deskwise.com` | `Password123!` | Staf Front Desk Operasional |
| **`ADMIN`** | `admin.siti@deskwise.com` | `Password123!` | Staf Guest Relation |
| **`CUSTOMER`** | `guest.ahmad@gmail.com` | `Password123!` | Tamu Kamar 101 |
| **`CUSTOMER`** | `guest.dewi@gmail.com` | `Password123!` | Tamu Kamar 204 |

---

## 📂 Struktur Direktori

```
deskwise/
├── app/                        # Next.js App Router (pages, layouts, & API routes)
│   ├── (auth)/                 # Route publik login & register
│   ├── (staff)/                # Dashboard operasional staf & super admin
│   ├── (customer)/             # Portal self-service order tamu
│   └── api/                    # Server-side API route handlers dengan otorisasi Zod
├── components/                 # Standard UI components & design system primitives
│   ├── ui/                     # Button, Card, Badge, Input, Select, Modal, Skeleton
│   ├── orders/                 # Table, Filter, Detail Drawer, Status Badges
│   ├── dashboard/              # Metric Cards, Top Services Chart
│   └── layout/                 # Navbar & Responsive Sidebar per role
├── features/                   # Core business domain logic & TanStack Query hooks
├── lib/                        # Prisma client singleton, NextAuth config
├── prisma/                     # Database schema & seed script
├── types/                      # TypeScript definitions & NextAuth type augmentation
└── docs/                       # PRD & Arsitektur Dokumen
```
