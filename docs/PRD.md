# Product Requirement Document (PRD) — DeskWise

## 1. Product Summary & Philosophy

### Branding & Etymology
**DeskWise** adalah platform Hotel Service Management Dashboard modern yang dirancang untuk merasionalisasi pengelolaan dan pemrosesan setiap permintaan layanan hotel dari tamu (*guest requests*).

- **Desk**: Simbol dari *front desk* dan meja kerja operasional staf hotel. Tempat terpusat di mana setiap kebutuhan tamu diterima, dipetakan, dan dipantau.
- **Wise**: Merepresentasikan kecerdasan operasional. Sistem tidak hanya bertindak sebagai pencatat log, melainkan membantu staf mengambil keputusan bijaksana secara responsif (memprioritaskan order mendesak, memantau risiko pelanggaran SLA, dan memangkas friksi alur kerja).

### Tagline
> *"DeskWise — Smarter Desk, Faster Service."*

### Core Value Proposition
1. **Clarity**: Antarmuka bersih, informatif, berpedoman pada prinsip *Modern Minimalist*, tanpa *clutter*.
2. **Efficiency**: Mempercepat durasi dari penerimaan permintaan hingga penyelesaian layanan oleh tim operasional.
3. **Intelligence**: Peringatan otomatis untuk indikator kritis seperti pesanan yang melebihi batas waktu (SLA breach > 15 menit).
4. **Trust**: Sistem terukur dengan *role-based access control* (RBAC) yang menjamin kerahasiaan data dan pembagian wewenang yang tepat.

---

## 2. User Roles & Access Matrix

Sistem DeskWise membedakan hak akses pengguna menjadi tiga tingkatan utama:

| Peran | Deskripsi Akses | Hak Akses Utama |
| :--- | :--- | :--- |
| **`SUPER_ADMIN`** | Akses Manajerial & Pengawas Utama | Full sistem, Manajemen Akun Admin/Staf, Mengakses seluruh data hotel & metrik global. |
| **`ADMIN`** | Staf Operasional Hotel | Mengakses Dashboard Overview & Order Management, Mengubah status pesanan (Acknowledge, In Progress, Complete, Cancel). |
| **`CUSTOMER`** | Tamu Hotel (Self-Service) | Mengakses portal `/my-orders`, Membuat pesanan layanan baru, Melacak status pesanan pribadi secara real-time. |

---

## 3. Architecture & Tech Stack

- **Framework**: Next.js (App Router) + React + TypeScript (Strict Mode)
- **Runtime & Tooling**: Bun (Runtime, Package Manager, Test Runner)
- **Styling**: Tailwind CSS + Shadcn UI primitives (Prinsip Modern Minimalist, Sans-serif, Clean Whitespace)
- **Database & ORM**: Neon PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (Auth.js v5) Credentials Provider (Password hashed menggunakan `bcrypt`)
- **State & Data Fetching**: TanStack Query + React Hook Form + Zod Schema Validation

---

## 4. Operational Lifecycle & SLA Rules

### Order Status Lifecycle
```
[ New ] ---> [ Acknowledged ] ---> [ In Progress ] ---> [ Completed ]
   |                  |                    |
   +------------------+--------------------+---> [ Cancelled ]
```

### SLA (Service Level Agreement) Breach Rule
- Setiap pesanan berkategori **`New`** yang belum diakui (*acknowledged*) dalam durasi **> 15 menit** dikategorikan sebagai **URGENT / SLA Breach**.
- Indikator SLA Breach wajib ditampilkan sebagai *visual pulse/badge* khusus baik pada Dashboard Staf (`ADMIN`/`SUPER_ADMIN`) maupun pada riwayat pesanan milik tamu (`CUSTOMER`).

---

## 5. Screen & Feature Specifications

### 5.1 Auth Area (`/login`, `/register`)
- Form autentikasi yang bersih, teruji dengan Zod schema.
- Login mengarahkan otomatis sesuai role:
  - `SUPER_ADMIN` / `ADMIN` -> `/dashboard`
  - `CUSTOMER` -> `/my-orders`
- Registrasi mandiri hanya diperuntukkan bagi role `CUSTOMER`.

### 5.2 Staff Dashboard (`/dashboard`)
- **Metrics Overview**: Total Tamu Aktif, Pesanan Pending, Pendapatan Hari Ini, Pesanan Selesai, Rata-rata Nilai Pesanan.
- **Top Services**: Visualisasi daftar layanan terpopuler (Room Service, Housekeeping, Laundry, Extra Bed, Spa & Massage).
- **Order Management Table**:
  - Filter pencarian instan (Nama tamu, Nomor kamar, Service Type).
  - Sorting berdasar tanggal atau SLA urgency.
  - Action drawer & button konfirmasi perubahan status.

### 5.3 Customer Portal (`/my-orders`, `/my-orders/new`)
- Daftar riwayat layanan beserta status terkini dan nomor kamar.
- Form pengajuan pesanan layanan baru dengan pilihan jumlah (*quantity*) dan catatan khusus (*special request*).

### 5.4 Super Admin Management (`/dashboard/admin-management`)
- Manajemen pengguna internal hotel (Tambah staf Admin baru, edit detail, nonaktifkan akun).

---

## 6. Non-Functional & Security Requirements

1. **Server-Side Validation**: Seluruh Route Handler (`/api/**`) wajib memvalidasi sesi dan role server-side via `NextAuth`. Input divalidasi ketat dengan Zod.
2. **Responsif & Aksesibel**: Layout bertransformasi secara elegan dari desktop table menjadi card list di tampilan ponsel (*mobile-first design*).
3. **Data Isolation**: Tamu hanya diperbolehkan membaca dan menulis data pesanan miliknya sendiri (`guestId = session.user.id`).
