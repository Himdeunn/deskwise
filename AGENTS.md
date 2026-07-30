# DeskWise Project Conventions & Agent Guidelines

Dokumen ini berisi panduan pengkodean, arsitektur, dan prinsip pengembang yang wajib dipatuhi saat bekerja di dalam repositori **DeskWise**.

## 1. Core Principles & Philosophy

1. **Clean Code & Modularity**
   - Satu berkas = satu tanggung jawab utama (*Single Responsibility Principle*).
   - Panjang berkas komponen UI dianjurkan tidak melebihi 150-200 baris. Komponen presentational wajib dipisahkan dari container component (penangan logic/fetching).
2. **Type Safety Strictness**
   - Gunakan TypeScript dalam Strict Mode. Hindari penggunaan tipe `any`. Selalu definisikan antarmuka/tipe data yang presisi di direktori `types/`.
3. **Security-First Mindset**
   - Otorisasi hak akses wajib diperiksa di sisi server (Server-Side Validation) pada setiap Route Handler (`app/api/**`) dan Next.js Middleware.
   - Jangan pernah mempercayai masukan dari klien tanpa validasi Zod.
   - Password pengguna wajib di-hash menggunakan `bcrypt` sebelum disimpan ke database.

## 2. Design System & Style Guide

- **Theme**: *Full Responsive Modern Minimalist and Simplicity*.
- **Palette**: Netral lembut (slate/zinc/white) dengan aksen warna yang bermakna untuk status (misal: Emerald untuk Completed, Amber/Rose untuk Pending/Urgent SLA).
- **Icons**: Gunakan `lucide-react`.
- **UI Components**: Tempatkan komponen murni tampilan tanpa logic bisnis di `components/ui/`.

## 3. Directory Layout Standard

- `app/`: Next.js App Router routes, layouts, pages, & API route handlers.
- `components/`: Reusable UI elements, auth forms, order tables, dashboard widgets, layouts.
- `features/`: Logic khusus domain (custom hooks seperti `useOrders`, utility helper).
- `lib/`: Integrasi instance (Prisma singleton, NextAuth config, API client).
- `prisma/`: Schema Prisma dan script database seed (`seed.ts`).
- `types/`: Definition type global (Order, User, NextAuth session augmentation).
- `docs/`: Dokumentasi arsitektur & PRD.
