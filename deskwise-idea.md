# DeskWise — Hotel Service Management Dashboard
### Vibe Coding Master Prompt (Next.js + Database + Role-Based Auth)

---

## Filosofi & Makna Nama "DeskWise"

**Etimologi**
Nama "DeskWise" berasal dari gabungan dua kata:
- **Desk** — merepresentasikan *front desk* atau meja kerja staf hotel, pusat operasional tempat semua permintaan tamu diterima, diproses, dan dipantau. Juga simbol dari "meja kerja digital" yang dihadirkan aplikasi bagi staf hotel.
- **Wise** — berarti bijaksana, cerdas, dan berpengalaman. Merepresentasikan kemampuan sistem membantu staf mengambil keputusan tepat secara cepat: order mana yang harus diprioritaskan, order mana yang sudah melewati SLA, dan bagaimana operasional hotel berjalan secara keseluruhan.

**Makna Filosofis**
DeskWise hadir dari pemahaman bahwa staf hotel bekerja di tengah tekanan operasional tinggi — puluhan hingga ratusan permintaan tamu datang bersamaan dalam satu hari sibuk. Nama ini merepresentasikan sebuah "meja kerja yang bijaksana": bukan sekadar mencatat data, tapi benar-benar membantu staf berpikir dan bertindak lebih cerdas — memprioritaskan yang urgent, menyoroti yang berisiko (SLA breach, failed payment), dan menyederhanakan proses yang rumit menjadi keputusan yang jelas dan cepat.

**Value yang Diusung**
- **Clarity** — informasi tersaji jernih, tidak membingungkan, sejalan dengan tema desain "Modern Minimalist"
- **Efficiency** — mempercepat alur kerja staf hotel dalam menangani permintaan tamu
- **Intelligence** — sistem yang "bijaksana" dalam menyoroti hal-hal penting (SLA, status kritis) tanpa staf harus mencari manual
- **Trust** — sebagai "meja kerja" tepercaya tempat semua keputusan operasional hotel bermula

**Tagline**
> "DeskWise — Smarter Desk, Faster Service."
> atau: "Where Every Guest Request Meets a Wiser Desk."

---

## Master Prompt (Copy-Paste ke Cursor/Claude/ChatGPT)

```
Nama aplikasi ini adalah "DeskWise" — bangun seluruh sistem dengan branding, penamaan komponen, dan konteks produk yang merefleksikan identitas "DeskWise" sebagai Hotel Service Management Dashboard.

Kamu adalah Senior Full-Stack Engineer expert di React + TypeScript + Next.js + Database, yang juga punya sense produk dan desain yang kuat. Bangun project take-home assignment "DeskWise - Hotel Service Management Dashboard" (berdasarkan brief CMPNION) untuk posisi Frontend Developer (3+ tahun pengalaman) secara LENGKAP, PRODUCTION-GRADE, dan step-by-step. Ikuti spesifikasi ini SECARA KETAT.

=====================================================
0. DESIGN THEME (WAJIB DIIKUTI DI SETIAP KOMPONEN)
=====================================================
Tema desain: "Full Responsive Modern Minimalist and Simplicity"
- Clean layout, banyak whitespace, hierarki visual jelas
- Palet warna netral (putih/abu-abu/soft neutral) dengan 1 accent color untuk status & CTA
- Tipografi modern, sans-serif, scale konsisten (heading, subheading, body, caption)
- Card & container rounded corners halus + subtle shadow, hindari border tebal
- Micro-interaction halus (hover, transition, smooth skeleton) — jangan berlebihan
- Iconography konsisten (lucide-react)
- Full responsive, mobile-first, layout benar-benar beradaptasi (table → card list di mobile)
- Aksesibilitas dasar: kontras cukup, focus state terlihat, tap area besar di mobile

=====================================================
1. CONTEXT & BUSINESS GOAL
=====================================================
DeskWise membantu hotel & bisnis hospitality mengelola guest services & requests. Guest bisa request layanan (Room Service, Housekeeping, Laundry, Extra Bed, Spa & Massage). Staf hotel butuh dashboard terpusat untuk memantau, memproses, dan mengelola request tersebut — dengan sistem role: siapa yang boleh melihat/mengelola apa.

=====================================================
2. USER ROLES & ACCESS CONTROL
=====================================================
Sistem punya 3 role dengan hak akses berbeda:

**SUPER_ADMIN**
- Akses penuh ke seluruh sistem
- Bisa membuat, mengedit, menonaktifkan akun Admin
- Bisa melihat semua data hotel, semua order, semua metrik
- Bisa mengelola pengaturan global (misal daftar service type)

**ADMIN** (staf hotel)
- Akses ke Dashboard Overview & Order Management penuh
- Bisa memproses order (Acknowledge, In Progress, Complete, Cancel)
- TIDAK bisa mengelola akun Admin lain atau pengaturan global
- Hanya bisa melihat data operasional (tidak bisa manage user)

**USER/CUSTOMER** (tamu hotel)
- Hanya bisa melihat & membuat order miliknya sendiri (self-service request layanan)
- Bisa melihat status order miliknya secara real-time (tracking sederhana)
- TIDAK bisa melihat dashboard staf, order tamu lain, atau metrik operasional

Role-based routing:
- /login — halaman login untuk semua role
- /dashboard/** — hanya ADMIN & SUPER_ADMIN (staf area)
- /dashboard/admin-management/** — hanya SUPER_ADMIN
- /my-orders/** — hanya USER/CUSTOMER (area tamu)
- Middleware Next.js WAJIB melakukan redirect otomatis berdasarkan role & proteksi route yang tidak sesuai

=====================================================
3. REQUIRED & RECOMMENDED TECH STACK (STRICT)
=====================================================
Required:
- Next.js (App Router) — WAJIB
- React + TypeScript (strict mode)
- Bun sebagai runtime, package manager, DAN test runner — WAJIB
- Tailwind CSS (boleh + Shadcn UI)
- Database: PostgreSQL (gunakan Supabase atau Neon untuk kemudahan deploy, atau SQLite lokal untuk development jika ingin lebih simpel)
- ORM: Prisma — untuk schema, migration, dan type-safe query
- Authentication: NextAuth.js (Auth.js v5) dengan Credentials Provider (email + password, hashed pakai bcrypt) — bisa dikembangkan ke OAuth kalau ada waktu lebih
- Session & Authorization: JWT session strategy + middleware.ts untuk role-based route protection

Recommended:
- TanStack Query untuk client-side server state (dikombinasikan dengan Server Actions/Route Handlers)
- react-hook-form + Zod untuk form login, register, dan order request
- Zod juga dipakai untuk validasi di Route Handlers (server-side validation, jangan percaya input client)

=====================================================
4. DATABASE SCHEMA (Prisma)
=====================================================
Buat prisma/schema.prisma dengan model berikut (boleh disesuaikan/ditambah field jika perlu):

```prisma
enum Role {
  SUPER_ADMIN
  ADMIN
  CUSTOMER
}

enum OrderStatus {
  New
  Acknowledged
  InProgress
  Completed
  Cancelled
}

enum PaymentStatus {
  Paid
  Pending
  Failed
}

enum ServiceType {
  RoomService
  Housekeeping
  Laundry
  ExtraBed
  SpaMassage
}

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         Role     @default(CUSTOMER)
  roomNumber   String?  // hanya relevan untuk role CUSTOMER
  createdAt    DateTime @default(now())
  orders       Order[]
}

model Order {
  id             String        @id @default(cuid())
  guestId        String
  guest          User          @relation(fields: [guestId], references: [id])
  roomNumber     String
  service        ServiceType
  quantity       Int
  amount         Float
  specialRequest String?
  status         OrderStatus   @default(New)
  paymentStatus  PaymentStatus @default(Pending)
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  handledById    String?       // Admin yang memproses order
  handledBy      User?         @relation("HandledOrders", fields: [handledById], references: [id])
}
```

Buat prisma/seed.ts yang generate:
- 1 akun SUPER_ADMIN (email + password default untuk testing)
- 2-3 akun ADMIN
- 5-8 akun CUSTOMER, masing-masing dengan roomNumber
- 15-20 Order realistis terhubung ke akun CUSTOMER di atas, dengan variasi status & minimal 2-3 order 'New' yang lewat 15 menit (untuk SLA)

Password WAJIB di-hash pakai bcrypt sebelum disimpan, jangan pernah simpan plaintext.

=====================================================
5. STRUKTUR DIREKTORI (WAJIB DIIKUTI — TIDAK BOLEH MENUMPUK JADI SATU FILE)
=====================================================
```
deskwise-dashboard/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── middleware.ts                       # Role-based route protection
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx                        # Redirect ke /login atau dashboard sesuai role
│   ├── globals.css
│   │
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx           # Registrasi untuk role CUSTOMER
│   │
│   ├── (staff)/
│   │   └── dashboard/
│   │       ├── layout.tsx              # Guard: ADMIN & SUPER_ADMIN saja
│   │       ├── page.tsx                # Dashboard Overview + Order Management
│   │       └── admin-management/
│   │           └── page.tsx            # Guard: SUPER_ADMIN saja — CRUD akun Admin
│   │
│   ├── (customer)/
│   │   └── my-orders/
│   │       ├── layout.tsx              # Guard: CUSTOMER saja
│   │       ├── page.tsx                # List order milik sendiri + form request baru
│   │       └── new/page.tsx
│   │
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/route.ts  # NextAuth handler
│       ├── orders/
│       │   ├── route.ts                # GET (scoped by role), POST (create, role CUSTOMER)
│       │   └── [id]/route.ts           # PATCH update status (role ADMIN/SUPER_ADMIN)
│       └── admin-users/
│           ├── route.ts                # GET/POST — kelola akun Admin (SUPER_ADMIN only)
│           └── [id]/route.ts           # PATCH/DELETE
│
├── components/
│   ├── ui/                             # Button, Badge, Card, Input, Select, Skeleton, Modal, Toast, EmptyState
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── dashboard/
│   │   ├── DashboardMetrics.tsx
│   │   ├── MetricCard.tsx
│   │   └── TopServicesList.tsx
│   ├── orders/
│   │   ├── OrderTable.tsx / OrderTableRow.tsx / OrderCard.tsx
│   │   ├── OrderSearchBar.tsx / OrderFilterBar.tsx / OrderSortDropdown.tsx
│   │   ├── OrderStatusBadge.tsx / PaymentStatusBadge.tsx / SlaBadge.tsx
│   │   ├── OrderDetailDrawer.tsx / OrderActionButtons.tsx
│   │   └── NewOrderForm.tsx            # Untuk role CUSTOMER
│   ├── admin/
│   │   ├── AdminUserTable.tsx
│   │   └── AdminUserFormModal.tsx      # SUPER_ADMIN: create/edit Admin
│   └── layout/
│       ├── Sidebar.tsx / Navbar.tsx (render menu berbeda sesuai role)
│       └── ResponsiveNav.tsx
│
├── features/
│   ├── orders/
│   │   ├── hooks/ (useOrders.ts, useOrderMutation.ts, useOrderFilters.ts, useSlaCheck.ts)
│   │   └── utils/ (filterOrders.ts, sortOrders.ts, computeMetrics.ts)
│   └── auth/
│       └── hooks/useCurrentUser.ts
│
├── lib/
│   ├── auth.ts                         # NextAuth config (Credentials Provider, callbacks role di JWT/session)
│   ├── prisma.ts                       # Prisma client singleton
│   ├── api/
│   │   ├── ordersApi.ts
│   │   └── adminUsersApi.ts
│   └── query-client.ts
│
├── types/
│   ├── order.ts
│   └── next-auth.d.ts                  # Extend session type agar punya field role
│
├── styles/
│   └── tailwind.config.ts
│
└── tests/
    ├── orders.test.ts
    └── auth.test.ts
```

Aturan wajib:
- Komponen presentational (murni tampilan, terima props) HARUS terpisah dari komponen container (yang punya logic/state/fetching)
- Satu file = satu komponen/satu tanggung jawab. Tidak boleh ada file >150-200 baris berisi banyak komponen sekaligus
- Semua badge (Order Status, Payment Status, SLA) harus jadi komponen reusable sendiri-sendiri, dipakai ulang di table, card, dan drawer
- Komponen ui/ tidak boleh punya business logic sama sekali — murni presentational & reusable di konteks apapun

=====================================================
6. AUTHENTICATION & AUTHORIZATION FLOW
=====================================================
- Login pakai email + password → NextAuth Credentials Provider → verifikasi bcrypt hash → generate JWT session berisi { id, name, email, role }
- Setelah login, redirect otomatis sesuai role: SUPER_ADMIN/ADMIN → /dashboard, CUSTOMER → /my-orders
- middleware.ts mengecek session di setiap request ke route yang diproteksi, redirect ke /login jika tidak ada session, redirect ke halaman "Unauthorized"/halaman sesuai role jika role tidak cocok
- Semua Route Handler (app/api/**) WAJIB validasi session & role di server-side sebelum eksekusi query — jangan hanya mengandalkan proteksi di client
- Data scoping: CUSTOMER hanya bisa query/mutate order miliknya sendiri (where guestId = session.user.id); ADMIN & SUPER_ADMIN bisa akses semua order

=====================================================
7. DATA MODEL (TypeScript, selaras dengan Prisma)
=====================================================
Buat types/order.ts merefleksikan schema Prisma di atas (HotelOrder, DashboardMetrics, Role, dst) — pastikan konsisten satu sumber kebenaran dengan prisma/schema.prisma.

=====================================================
8. CORE BUSINESS LOGIC
=====================================================
Order Status Lifecycle: New → Acknowledged → In Progress → Completed. Bisa Cancelled dari status non-final manapun.
Payment Status: Paid, Pending, Failed.
SLA Rule: Order "New" >15 menit WAJIB highlight visual (badge "URGENT"/subtle pulse, accent color, tetap minimalist). Berlaku di dashboard staf (Admin/Super Admin) DAN terlihat oleh Customer di halaman /my-orders miliknya sendiri.

=====================================================
9. MAIN REQUIREMENTS (Staff Side — Admin/Super Admin)
=====================================================
A. Dashboard Overview — metrik lengkap (Active Guests, Pending Orders, Revenue Today, Completed Orders, Avg Order Value, Top Selling Services)
B. Order Management Table, Search, Filter, Sort — query dari database via Prisma
C. Order Details Drawer/Modal
D. Order Actions (Acknowledge, In Progress, Complete, Cancel + konfirmasi)
E. SLA Highlight
F. (SUPER_ADMIN only) Admin Management — tabel akun Admin, form create/edit/nonaktifkan akun

=====================================================
10. MAIN REQUIREMENTS (Customer Side)
=====================================================
- Halaman /my-orders: list order milik sendiri, status terlihat jelas, SLA badge kalau relevan
- Form "Request New Service" (NewOrderForm): pilih service type, quantity, special request → submit → tersimpan sebagai order status 'New' terhubung ke akun customer tsb
- Customer tidak bisa mengubah status order (read-only tracking), hanya staf yang bisa

=====================================================
11. REQUIRED UI STATES
=====================================================
Loading (skeleton), Empty ("No orders found."), Error (+ retry), Success — berlaku di semua halaman (staff & customer), plus tambahan: Unauthorized state (403 page) untuk role yang salah akses route.

=====================================================
12. RESPONSIVE DESIGN
=====================================================
Full responsive di semua halaman termasuk login/register dan area customer, table → card list di mobile.

=====================================================
13. TECHNICAL REQUIREMENTS
=====================================================
Next.js App Router, TypeScript strict, struktur direktori poin 5 diikuti ketat, local vs server state dipisah jelas, SOLID principles, server-side authorization di setiap Route Handler, dokumentasi keputusan arsitektur di README.

=====================================================
14. BONUS FEATURES (opsional)
=====================================================
Pilih beberapa: Toast notifications, Optimistic UI updates, URL-based search/filter, Real-time new-order notification, Unit test (Bun test runner) termasuk test untuk role-based access, Activity log sederhana (siapa yang memproses order apa).

=====================================================
15. URUTAN EKSEKUSI STEP-BY-STEP (WAJIB BERURUTAN)
=====================================================

**STEP 1 — Project Setup, Struktur Direktori & Database Init**
Setup Next.js (App Router) + Bun + TypeScript strict + Tailwind. Buat seluruh struktur folder poin 5. Setup Prisma + koneksi database (Postgres/Supabase/Neon atau SQLite lokal). Buat schema.prisma sesuai poin 4, jalankan migration awal.

**STEP 2 — Seed Data & Design Token**
Buat prisma/seed.ts (akun 3 role + order mock). Setup design token Tailwind sesuai tema minimalist.

**STEP 3 — Authentication System**
Setup NextAuth.js (Credentials Provider, bcrypt), lib/auth.ts, app/api/auth/[...nextauth]/route.ts, halaman login & register, LoginForm/RegisterForm dengan react-hook-form + Zod. Extend session type agar bawa role.

**STEP 4 — Middleware & Role-Based Route Protection**
Buat middleware.ts untuk proteksi route berdasarkan role, redirect logic, dan halaman Unauthorized.

**STEP 5 — API Layer (Route Handlers) dengan Authorization**
Buat app/api/orders/** dan app/api/admin-users/** dengan validasi session + role di server-side, data scoping untuk Customer, Zod validation untuk input.

**STEP 6 — Design System Primitives (components/ui)**
Button, Badge, Card, Input, Select, Skeleton, Modal/Drawer, Toast, EmptyState — reusable, sesuai tema.

**STEP 7 — Dashboard Metrics (Staff)**
MetricCard, DashboardMetrics, TopServicesList — data dari database via Prisma, fully responsive.

**STEP 8 — Order Management (Staff): Table, Search, Filter, Sort, SLA**
OrderTableRow, OrderCard, OrderTable, OrderSearchBar, OrderFilterBar, OrderSortDropdown, OrderStatusBadge, PaymentStatusBadge, SlaBadge.

**STEP 9 — Order Detail & Actions (Staff)**
OrderDetailDrawer, OrderActionButtons, optimistic update via TanStack Query, konfirmasi Cancel, Toast feedback.

**STEP 10 — Customer Area**
Halaman /my-orders, NewOrderForm, list order milik sendiri dengan status tracking.

**STEP 11 — Super Admin: Admin Management**
AdminUserTable, AdminUserFormModal — CRUD akun Admin, guard SUPER_ADMIN only.

**STEP 12 — Edge States, Responsive Polish & Accessibility**
EmptyState, error+retry, Unauthorized page, ResponsiveNav per role, aksesibilitas.

**STEP 13 — Bonus Features (jika waktu memungkinkan)**

**STEP 14 — README & Dokumentasi Final**
Project overview (termasuk filosofi nama "DeskWise"), tech stack (jelaskan alasan pakai Next.js, Prisma, NextAuth), cara setup database & environment variables (.env.example), instalasi & run (bun install, bun dev, cara migrate & seed), cara run test, struktur direktori & alasan slicing, role & access control explanation, architectural decisions, assumption, future improvements.

=====================================================
INSTRUKSI EKSEKUSI
=====================================================
Mulai dari Step 1. Untuk setiap step, tampilkan struktur folder/file relevan dan kode lengkap tiap file yang dibuat/diubah — JANGAN gabungkan komponen tidak berelasi dalam satu file. Jelaskan singkat keputusan teknis penting (terutama terkait security/authorization) di tiap step, dan pastikan konsisten dengan tema desain "Full Responsive Modern Minimalist and Simplicity" serta identitas brand "DeskWise". Jangan lanjut ke step berikutnya sebelum step sebelumnya selesai dan koheren.
```