// data/customers-list.ts
export type MemberLevel = "برنز" | "نقره" | "طلا" | "الماس";
export type MemberStatus = "فعال" | "غیرفعال" | "مسدود";

export type CustomerRow = {
  id: string;
  fullName: string;
  profileUrl: string;
  mobile?: string;
  email?: string;
  code: string;
  level: MemberLevel;
  totalPoints: number;
  usablePoints: number;
  lastPurchaseDate?: string;
  lastPurchaseAmount?: number;
  createdAt: string;
  status: MemberStatus;
};

export const customersAll: CustomerRow[] = [
  {
    id: "1",
    fullName: "آرمان قاسمی",
    profileUrl: "/customers/profile/1",
    mobile: "09120000001",
    email: "arman@example.com",
    code: "CUST-001234",
    level: "الماس",
    totalPoints: 12850,
    usablePoints: 11200,
    lastPurchaseDate: "2025-10-11",
    lastPurchaseAmount: 4850000,
    createdAt: "2024-12-20",
    status: "فعال",
  },
  {
    id: "2",
    fullName: "نگین رستگار",
    profileUrl: "/customers/profile/2",
    mobile: "09120000002",
    email: "negin@example.com",
    code: "CUST-001235",
    level: "طلا",
    totalPoints: 8650,
    usablePoints: 7200,
    lastPurchaseDate: "2025-09-30",
    lastPurchaseAmount: 2750000,
    createdAt: "2025-01-05",
    status: "فعال",
  },
  {
    id: "3",
    fullName: "مانی محمدی",
    profileUrl: "/customers/profile/3",
    mobile: "09120000003",
    email: "mani@example.com",
    code: "CUST-001236",
    level: "نقره",
    totalPoints: 4200,
    usablePoints: 3100,
    lastPurchaseDate: "2025-08-21",
    lastPurchaseAmount: 990000,
    createdAt: "2024-11-01",
    status: "غیرفعال",
  },
  {
    id: "4",
    fullName: "سمانه امیری",
    profileUrl: "/customers/profile/4",
    mobile: "09120000004",
    email: "samaneh@example.com",
    code: "CUST-001237",
    level: "برنز",
    totalPoints: 1850,
    usablePoints: 900,
    lastPurchaseDate: "2025-06-12",
    lastPurchaseAmount: 380000,
    createdAt: "2024-10-15",
    status: "مسدود",
  },
  {
    id: "5",
    fullName: "کاوه بهرامی",
    profileUrl: "/customers/profile/5",
    mobile: "09120000005",
    email: "kaveh@example.com",
    code: "CUST-001238",
    level: "طلا",
    totalPoints: 9900,
    usablePoints: 8300,
    lastPurchaseDate: "2025-10-01",
    lastPurchaseAmount: 3320000,
    createdAt: "2025-03-09",
    status: "فعال",
  },
];

export type PurchaseRow = { id: string; date: string; channel: "آنلاین" | "POS"; amount: number; earnedPoints: number; invoiceNo: string };
export type VoucherRow = { id: string; title: string; status: "فعال" | "استفاده‌شده" | "منقضی"; gainedAt: string };
export type MessageRow = { id: string; via: "پیامک" | "ایمیل" | "چت"; date: string; subject: string; answered: boolean };
export type FriendRow = { id: string; name: string; code: string };
export type NoteRow = { id: string; text: string; createdAt: string; author: string };
export type ActivityRow = { id: string; when: string; type: string; detail: string };

export type CustomerProfile = {
  id: string;
  fullName: string;
  avatarUrl?: string;
  nationalId?: string;
  birthDate?: string;
  gender?: "مرد" | "زن" | "سایر";
  mobile?: string;
  email?: string;
  address?: string;
  postalCode?: string;
  customerCode: string;
  level: MemberLevel;
  totalPoints: number;
  usablePoints: number;
  purchases: PurchaseRow[];
  vouchers: VoucherRow[];
  messages: MessageRow[];
  friends: FriendRow[];
  notes: NoteRow[];
  activities: ActivityRow[];
  createdAt: string;
  lastPurchaseAt?: string;
};

export const customerProfiles: CustomerProfile[] = [
  {
    id: "1",
    fullName: "آرمان قاسمی",
    avatarUrl: "https://i.pravatar.cc/80?img=11",
    nationalId: "1234567890",
    birthDate: "1998-04-21",
    gender: "مرد",
    mobile: "09120000001",
    email: "arman@example.com",
    address: "تهران، سعادت‌آباد، خیابان ...",
    postalCode: "1999999999",
    customerCode: "CUST-001234",
    level: "الماس",
    totalPoints: 12850,
    usablePoints: 11200,
    purchases: [
      { id: "p1", date: "2025-10-11", channel: "POS", amount: 4850000, earnedPoints: 480, invoiceNo: "INV-9148" },
      { id: "p2", date: "2025-09-30", channel: "آنلاین", amount: 2750000, earnedPoints: 270, invoiceNo: "INV-9031" },
    ],
    vouchers: [
      { id: "v1", title: "کوپن 10٪", status: "فعال", gainedAt: "2025-09-01" },
      { id: "v2", title: "ارسال رایگان", status: "استفاده‌شده", gainedAt: "2025-08-15" },
    ],
    messages: [
      { id: "m1", via: "پیامک", date: "2025-10-12", subject: "پیگیری سفارش", answered: true },
      { id: "m2", via: "ایمیل", date: "2025-09-21", subject: "پرسش گارانتی", answered: false },
    ],
    friends: [
      { id: "f1", name: "نگین رستگار", code: "CUST-001235" },
      { id: "f2", name: "مانی محمدی", code: "CUST-001236" },
    ],
    notes: [{ id: "n1", text: "مشتری VIP؛ تماس گرفته شود.", createdAt: "2025-10-05", author: "ادمین" }],
    activities: [
      { id: "a1", when: "2025-10-12 12:10", type: "خرید", detail: "پرداخت فاکتور INV-9148" },
      { id: "a2", when: "2025-09-30 09:22", type: "ورود", detail: "لاگین موفق" },
    ],
    createdAt: "2024-12-20",
    lastPurchaseAt: "2025-10-11",
  },
  {
    id: "2",
    fullName: "نگین رستگار",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
    nationalId: "0987654321",
    birthDate: "1996-02-14",
    gender: "زن",
    mobile: "09120000002",
    email: "negin@example.com",
    address: "اصفهان، مرداویج، کوچه ...",
    postalCode: "8169999999",
    customerCode: "CUST-001235",
    level: "طلا",
    totalPoints: 8650,
    usablePoints: 7200,
    purchases: [{ id: "p1", date: "2025-09-30", channel: "آنلاین", amount: 2750000, earnedPoints: 270, invoiceNo: "INV-9031" }],
    vouchers: [{ id: "v1", title: "کوپن 5٪", status: "فعال", gainedAt: "2025-09-10" }],
    messages: [{ id: "m1", via: "ایمیل", date: "2025-09-21", subject: "پرسش گارانتی", answered: true }],
    friends: [{ id: "f1", name: "آرمان قاسمی", code: "CUST-001234" }],
    notes: [],
    activities: [{ id: "a1", when: "2025-09-30 10:00", type: "خرید", detail: "پرداخت فاکتور INV-9031" }],
    createdAt: "2025-01-05",
    lastPurchaseAt: "2025-09-30",
  },
  {
    id: "3",
    fullName: "مانی محمدی",
    avatarUrl: "https://i.pravatar.cc/80?img=13",
    customerCode: "CUST-001236",
    level: "نقره",
    totalPoints: 4200,
    usablePoints: 3100,
    mobile: "09120000003",
    email: "mani@example.com",
    address: "شیراز، ملاصدرا ...",
    purchases: [{ id: "p1", date: "2025-08-21", channel: "آنلاین", amount: 990000, earnedPoints: 95, invoiceNo: "INV-8870" }],
    vouchers: [],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2024-11-01",
    lastPurchaseAt: "2025-08-21",
  },
  {
    id: "4",
    fullName: "سمانه امیری",
    avatarUrl: "https://i.pravatar.cc/80?img=14",
    customerCode: "CUST-001237",
    level: "برنز",
    totalPoints: 1850,
    usablePoints: 900,
    mobile: "09120000004",
    email: "samaneh@example.com",
    address: "تبریز، ولیعصر ...",
    purchases: [{ id: "p1", date: "2025-06-12", channel: "POS", amount: 380000, earnedPoints: 38, invoiceNo: "INV-8001" }],
    vouchers: [],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2024-10-15",
    lastPurchaseAt: "2025-06-12",
  },
  {
    id: "5",
    fullName: "کاوه بهرامی",
    avatarUrl: "https://i.pravatar.cc/80?img=15",
    customerCode: "CUST-001238",
    level: "طلا",
    totalPoints: 9900,
    usablePoints: 8300,
    mobile: "09120000005",
    email: "kaveh@example.com",
    address: "کرج، جهانشهر ...",
    purchases: [{ id: "p1", date: "2025-10-01", channel: "آنلاین", amount: 3320000, earnedPoints: 330, invoiceNo: "INV-9102" }],
    vouchers: [{ id: "v1", title: "کوپن ارسال رایگان", status: "منقضی", gainedAt: "2025-07-01" }],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2025-03-09",
    lastPurchaseAt: "2025-10-01",
  },
];
