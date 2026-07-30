import { PrismaClient, Role, OrderStatus, PaymentStatus, ServiceType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Inisialisasi database seed DeskWise...");

  // Hapus data lama jika ada
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();

  const defaultPasswordHash = bcrypt.hashSync("Password123!", 10);

  // 1. Buat Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      name: "Bambang Utama (Super Admin)",
      email: "superadmin@deskwise.com",
      passwordHash: defaultPasswordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  // 2. Buat Staf Admin Hotel
  const admin1 = await prisma.user.create({
    data: {
      name: "Budi Santoso (Front Desk)",
      email: "admin.budi@deskwise.com",
      passwordHash: defaultPasswordHash,
      role: Role.ADMIN,
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      name: "Siti Rahma (Guest Relation)",
      email: "admin.siti@deskwise.com",
      passwordHash: defaultPasswordHash,
      role: Role.ADMIN,
    },
  });

  // 3. Buat Tamu / Customers
  const customer1 = await prisma.user.create({
    data: {
      name: "Ahmad Subagja",
      email: "guest.ahmad@gmail.com",
      passwordHash: defaultPasswordHash,
      role: Role.CUSTOMER,
      roomNumber: "101",
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      name: "Dewi Lestari",
      email: "guest.dewi@gmail.com",
      passwordHash: defaultPasswordHash,
      role: Role.CUSTOMER,
      roomNumber: "204",
    },
  });

  const customer3 = await prisma.user.create({
    data: {
      name: "John Miller",
      email: "guest.john@gmail.com",
      passwordHash: defaultPasswordHash,
      role: Role.CUSTOMER,
      roomNumber: "305",
    },
  });

  const customer4 = await prisma.user.create({
    data: {
      name: "Sarah Jenkins",
      email: "guest.sarah@gmail.com",
      passwordHash: defaultPasswordHash,
      role: Role.CUSTOMER,
      roomNumber: "412",
    },
  });

  const customer5 = await prisma.user.create({
    data: {
      name: "Michael Chen",
      email: "guest.michael@gmail.com",
      passwordHash: defaultPasswordHash,
      role: Role.CUSTOMER,
      roomNumber: "501",
    },
  });

  const customer6 = await prisma.user.create({
    data: {
      name: "Linda Kusuma",
      email: "guest.linda@gmail.com",
      passwordHash: defaultPasswordHash,
      role: Role.CUSTOMER,
      roomNumber: "208",
    },
  });

  console.log("✅ Akun berhasil dibuat:");
  console.log(` - Super Admin: superadmin@deskwise.com / Password123!`);
  console.log(` - Admin: admin.budi@deskwise.com / Password123!`);
  console.log(` - Customer: guest.ahmad@gmail.com / Password123!`);

  // Waktu referensi
  const now = new Date();
  const minsAgo = (m: number) => new Date(now.getTime() - m * 60 * 1000);

  // 4. Buat Mock Orders
  const mockOrders = [
    // --- Order Lewat SLA (>15 Menit & Status New) ---
    {
      guestId: customer1.id,
      roomNumber: customer1.roomNumber!,
      service: ServiceType.RoomService,
      quantity: 2,
      amount: 250000,
      specialRequest: "Nasi Goreng Wagyu pedas sedang & Es Teh Manis tanpa gula",
      status: OrderStatus.New,
      paymentStatus: PaymentStatus.Paid,
      createdAt: minsAgo(25), // URGENT: 25 menit yang lalu
    },
    {
      guestId: customer2.id,
      roomNumber: customer2.roomNumber!,
      service: ServiceType.ExtraBed,
      quantity: 1,
      amount: 350000,
      specialRequest: "Mohon siapkan selimut ekstra dan bantal empuk",
      status: OrderStatus.New,
      paymentStatus: PaymentStatus.Pending,
      createdAt: minsAgo(40), // URGENT: 40 menit yang lalu
    },
    {
      guestId: customer3.id,
      roomNumber: customer3.roomNumber!,
      service: ServiceType.Housekeeping,
      quantity: 1,
      amount: 0,
      specialRequest: "Pembersihan kamar dan penggantian handuk mandi",
      status: OrderStatus.New,
      paymentStatus: PaymentStatus.Paid,
      createdAt: minsAgo(18), // URGENT: 18 menit yang lalu
    },

    // --- Order Baru (<15 Menit) ---
    {
      guestId: customer4.id,
      roomNumber: customer4.roomNumber!,
      service: ServiceType.SpaMassage,
      quantity: 1,
      amount: 450000,
      specialRequest: "Aromatherapy Traditional Swedish Massage jam 16.00",
      status: OrderStatus.New,
      paymentStatus: PaymentStatus.Paid,
      createdAt: minsAgo(5),
    },
    {
      guestId: customer5.id,
      roomNumber: customer5.roomNumber!,
      service: ServiceType.Laundry,
      quantity: 3,
      amount: 120000,
      specialRequest: "Cuci kilat 2 kemeja dan 1 celana bahan",
      status: OrderStatus.New,
      paymentStatus: PaymentStatus.Pending,
      createdAt: minsAgo(2),
    },

    // --- Order Acknowledged & In Progress ---
    {
      guestId: customer6.id,
      roomNumber: customer6.roomNumber!,
      service: ServiceType.RoomService,
      quantity: 1,
      amount: 175000,
      specialRequest: "Club Sandwich dengan French Fries",
      status: OrderStatus.Acknowledged,
      paymentStatus: PaymentStatus.Paid,
      handledById: admin1.id,
      createdAt: minsAgo(15),
    },
    {
      guestId: customer1.id,
      roomNumber: customer1.roomNumber!,
      service: ServiceType.Housekeeping,
      quantity: 1,
      amount: 0,
      specialRequest: "Minta tambahan 2 botol air mineral",
      status: OrderStatus.InProgress,
      paymentStatus: PaymentStatus.Paid,
      handledById: admin2.id,
      createdAt: minsAgo(30),
    },
    {
      guestId: customer2.id,
      roomNumber: customer2.roomNumber!,
      service: ServiceType.Laundry,
      quantity: 5,
      amount: 180000,
      specialRequest: "Dry cleaning gaun malam",
      status: OrderStatus.InProgress,
      paymentStatus: PaymentStatus.Paid,
      handledById: admin1.id,
      createdAt: minsAgo(50),
    },

    // --- Order Completed ---
    {
      guestId: customer3.id,
      roomNumber: customer3.roomNumber!,
      service: ServiceType.SpaMassage,
      quantity: 2,
      amount: 900000,
      specialRequest: "Couple Spa package",
      status: OrderStatus.Completed,
      paymentStatus: PaymentStatus.Paid,
      handledById: admin2.id,
      createdAt: minsAgo(120),
    },
    {
      guestId: customer4.id,
      roomNumber: customer4.roomNumber!,
      service: ServiceType.RoomService,
      quantity: 1,
      amount: 150000,
      specialRequest: "American Breakfast set",
      status: OrderStatus.Completed,
      paymentStatus: PaymentStatus.Paid,
      handledById: admin1.id,
      createdAt: minsAgo(180),
    },
    {
      guestId: customer5.id,
      roomNumber: customer5.roomNumber!,
      service: ServiceType.ExtraBed,
      quantity: 1,
      amount: 350000,
      specialRequest: "Sudah dipasang saat check-in",
      status: OrderStatus.Completed,
      paymentStatus: PaymentStatus.Paid,
      handledById: admin2.id,
      createdAt: minsAgo(240),
    },
    {
      guestId: customer6.id,
      roomNumber: customer6.roomNumber!,
      service: ServiceType.Housekeeping,
      quantity: 1,
      amount: 0,
      specialRequest: "Ganti sprei",
      status: OrderStatus.Completed,
      paymentStatus: PaymentStatus.Paid,
      handledById: admin1.id,
      createdAt: minsAgo(300),
    },

    // --- Order Cancelled & Failed Payment ---
    {
      guestId: customer1.id,
      roomNumber: customer1.roomNumber!,
      service: ServiceType.SpaMassage,
      quantity: 1,
      amount: 450000,
      specialRequest: "Dibatalkan oleh tamu via telepon",
      status: OrderStatus.Cancelled,
      paymentStatus: PaymentStatus.Failed,
      createdAt: minsAgo(90),
    },
  ];

  for (const orderData of mockOrders) {
    await prisma.order.create({
      data: orderData,
    });
  }

  console.log(`✅ Berhasil menyemaikan ${mockOrders.length} data order contoh.`);
}

main()
  .catch((e) => {
    console.error("❌ Terjadi kesalahan saat seed database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
