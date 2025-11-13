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
  {
    id: "6",
    fullName: "نسترن کاظمی",
    profileUrl: "/customers/profile/6",
    mobile: "09120000006",
    email: "nastaran@example.com",
    code: "CUST-001239",
    level: "نقره",
    totalPoints: 6120,
    usablePoints: 5400,
    lastPurchaseDate: "2025-09-18",
    lastPurchaseAmount: 1480000,
    createdAt: "2024-08-02",
    status: "فعال",
  },
  {
    id: "7",
    fullName: "پویان شریفی",
    profileUrl: "/customers/profile/7",
    mobile: "09120000007",
    email: "pooyan@example.com",
    code: "CUST-001240",
    level: "برنز",
    totalPoints: 1550,
    usablePoints: 1200,
    lastPurchaseDate: "2025-05-27",
    lastPurchaseAmount: 420000,
    createdAt: "2024-05-11",
    status: "فعال",
  },
  {
    id: "8",
    fullName: "روژین نادری",
    profileUrl: "/customers/profile/8",
    mobile: "09120000008",
    email: "rozhin@example.com",
    code: "CUST-001241",
    level: "طلا",
    totalPoints: 10200,
    usablePoints: 9000,
    lastPurchaseDate: "2025-10-05",
    lastPurchaseAmount: 2510000,
    createdAt: "2024-12-01",
    status: "فعال",
  },
  {
    id: "9",
    fullName: "میلاد اکبری",
    profileUrl: "/customers/profile/9",
    mobile: "09120000009",
    email: "milad@example.com",
    code: "CUST-001242",
    level: "نقره",
    totalPoints: 4700,
    usablePoints: 3500,
    lastPurchaseDate: "2025-07-14",
    lastPurchaseAmount: 780000,
    createdAt: "2024-06-20",
    status: "غیرفعال",
  },
  {
    id: "10",
    fullName: "نگار بهمنی",
    profileUrl: "/customers/profile/10",
    mobile: "09120000010",
    email: "negar@example.com",
    code: "CUST-001243",
    level: "الماس",
    totalPoints: 15250,
    usablePoints: 13000,
    lastPurchaseDate: "2025-10-09",
    lastPurchaseAmount: 5120000,
    createdAt: "2023-12-29",
    status: "فعال",
  },
  {
    id: "11",
    fullName: "اشکان سعادتی",
    profileUrl: "/customers/profile/11",
    mobile: "09120000011",
    email: "ashkan@example.com",
    code: "CUST-001244",
    level: "طلا",
    totalPoints: 9200,
    usablePoints: 8400,
    lastPurchaseDate: "2025-09-22",
    lastPurchaseAmount: 1840000,
    createdAt: "2024-09-09",
    status: "فعال",
  },
  {
    id: "12",
    fullName: "فرشاد موحد",
    profileUrl: "/customers/profile/12",
    mobile: "09120000012",
    email: "farshad@example.com",
    code: "CUST-001245",
    level: "برنز",
    totalPoints: 1300,
    usablePoints: 600,
    lastPurchaseDate: "2025-04-01",
    lastPurchaseAmount: 350000,
    createdAt: "2023-11-15",
    status: "مسدود",
  },
  {
    id: "13",
    fullName: "نازنین یگانه",
    profileUrl: "/customers/profile/13",
    mobile: "09120000013",
    email: "nazanin@example.com",
    code: "CUST-001246",
    level: "نقره",
    totalPoints: 5980,
    usablePoints: 4700,
    lastPurchaseDate: "2025-08-29",
    lastPurchaseAmount: 1100000,
    createdAt: "2024-03-01",
    status: "فعال",
  },
  {
    id: "14",
    fullName: "بردیا فلاح",
    profileUrl: "/customers/profile/14",
    mobile: "09120000014",
    email: "bardia@example.com",
    code: "CUST-001247",
    level: "طلا",
    totalPoints: 11050,
    usablePoints: 9500,
    lastPurchaseDate: "2025-10-10",
    lastPurchaseAmount: 2990000,
    createdAt: "2024-01-07",
    status: "فعال",
  },
  {
    id: "15",
    fullName: "الهام صادقی",
    profileUrl: "/customers/profile/15",
    mobile: "09120000015",
    email: "elham@example.com",
    code: "CUST-001248",
    level: "برنز",
    totalPoints: 2050,
    usablePoints: 1500,
    lastPurchaseDate: "2025-02-18",
    lastPurchaseAmount: 480000,
    createdAt: "2023-10-25",
    status: "غیرفعال",
  },
];

export type PurchaseRow = {
  id: string;
  date: string;
  channel: "آنلاین" | "POS";
  amount: number;
  earnedPoints: number;
  invoiceNo: string;
};
export type VoucherRow = {
  id: string;
  title: string;
  status: "فعال" | "استفاده‌شده" | "منقضی";
  gainedAt: string;
};
export type MessageRow = {
  id: string;
  via: "پیامک" | "ایمیل" | "چت";
  date: string;
  subject: string;
  answered: boolean;
};
export type FriendRow = { id: string; name: string; code: string };
export type NoteRow = {
  id: string;
  text: string;
  createdAt: string;
  author: string;
};
export type ActivityRow = {
  id: string;
  when: string;
  type: string;
  detail: string;
};

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
      {
        id: "p1",
        date: "2025-10-11",
        channel: "POS",
        amount: 4850000,
        earnedPoints: 480,
        invoiceNo: "INV-9148",
      },
      {
        id: "p2",
        date: "2025-09-30",
        channel: "آنلاین",
        amount: 2750000,
        earnedPoints: 270,
        invoiceNo: "INV-9031",
      },
    ],
    vouchers: [
      { id: "v1", title: "کوپن 10٪", status: "فعال", gainedAt: "2025-09-01" },
      {
        id: "v2",
        title: "ارسال رایگان",
        status: "استفاده‌شده",
        gainedAt: "2025-08-15",
      },
    ],
    messages: [
      {
        id: "m1",
        via: "پیامک",
        date: "2025-10-12",
        subject: "پیگیری سفارش",
        answered: true,
      },
      {
        id: "m2",
        via: "ایمیل",
        date: "2025-09-21",
        subject: "پرسش گارانتی",
        answered: false,
      },
    ],
    friends: [
      { id: "f1", name: "نگین رستگار", code: "CUST-001235" },
      { id: "f2", name: "مانی محمدی", code: "CUST-001236" },
    ],
    notes: [
      {
        id: "n1",
        text: "مشتری VIP؛ تماس گرفته شود.",
        createdAt: "2025-10-05",
        author: "ادمین",
      },
    ],
    activities: [
      {
        id: "a1",
        when: "2025-10-12 12:10",
        type: "خرید",
        detail: "پرداخت فاکتور INV-9148",
      },
      {
        id: "a2",
        when: "2025-09-30 09:22",
        type: "ورود",
        detail: "لاگین موفق",
      },
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
    purchases: [
      {
        id: "p1",
        date: "2025-09-30",
        channel: "آنلاین",
        amount: 2750000,
        earnedPoints: 270,
        invoiceNo: "INV-9031",
      },
    ],
    vouchers: [
      { id: "v1", title: "کوپن 5٪", status: "فعال", gainedAt: "2025-09-10" },
    ],
    messages: [
      {
        id: "m1",
        via: "ایمیل",
        date: "2025-09-21",
        subject: "پرسش گارانتی",
        answered: true,
      },
    ],
    friends: [{ id: "f1", name: "آرمان قاسمی", code: "CUST-001234" }],
    notes: [],
    activities: [
      {
        id: "a1",
        when: "2025-09-30 10:00",
        type: "خرید",
        detail: "پرداخت فاکتور INV-9031",
      },
    ],
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
    purchases: [
      {
        id: "p1",
        date: "2025-08-21",
        channel: "آنلاین",
        amount: 990000,
        earnedPoints: 95,
        invoiceNo: "INV-8870",
      },
    ],
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
    purchases: [
      {
        id: "p1",
        date: "2025-06-12",
        channel: "POS",
        amount: 380000,
        earnedPoints: 38,
        invoiceNo: "INV-8001",
      },
    ],
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
    purchases: [
      {
        id: "p1",
        date: "2025-10-01",
        channel: "آنلاین",
        amount: 3320000,
        earnedPoints: 330,
        invoiceNo: "INV-9102",
      },
    ],
    vouchers: [
      {
        id: "v1",
        title: "کوپن ارسال رایگان",
        status: "منقضی",
        gainedAt: "2025-07-01",
      },
    ],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2025-03-09",
    lastPurchaseAt: "2025-10-01",
  },
  {
    id: "6",
    fullName: "نسترن کاظمی",
    avatarUrl: "https://i.pravatar.cc/80?img=16",
    nationalId: "0076543210",
    birthDate: "1999-07-12",
    gender: "زن",
    mobile: "09120000006",
    email: "nastaran@example.com",
    address: "کرمانشاه، طاق‌بستان ...",
    postalCode: "6719999999",
    customerCode: "CUST-001239",
    level: "نقره",
    totalPoints: 6120,
    usablePoints: 5400,
    purchases: [
      {
        id: "p1",
        date: "2025-09-18",
        channel: "آنلاین",
        amount: 1480000,
        earnedPoints: 145,
        invoiceNo: "INV-9055",
      },
    ],
    vouchers: [
      { id: "v1", title: "کوپن 3٪", status: "فعال", gainedAt: "2025-09-01" },
    ],
    messages: [],
    friends: [],
    notes: [],
    activities: [
      {
        id: "a1",
        when: "2025-09-18 19:42",
        type: "خرید",
        detail: "پرداخت فاکتور INV-9055",
      },
    ],
    createdAt: "2024-08-02",
    lastPurchaseAt: "2025-09-18",
  },
  // 7
  {
    id: "7",
    fullName: "پویان شریفی",
    avatarUrl: "https://i.pravatar.cc/80?img=17",
    customerCode: "CUST-001240",
    level: "برنز",
    totalPoints: 1550,
    usablePoints: 1200,
    mobile: "09120000007",
    email: "pooyan@example.com",
    address: "قم، صفاییه ...",
    purchases: [
      {
        id: "p1",
        date: "2025-05-27",
        channel: "POS",
        amount: 420000,
        earnedPoints: 42,
        invoiceNo: "INV-8801",
      },
    ],
    vouchers: [],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2024-05-11",
    lastPurchaseAt: "2025-05-27",
  },
  // 8
  {
    id: "8",
    fullName: "روژین نادری",
    avatarUrl: "https://i.pravatar.cc/80?img=18",
    customerCode: "CUST-001241",
    level: "طلا",
    totalPoints: 10200,
    usablePoints: 9000,
    mobile: "09120000008",
    email: "rozhin@example.com",
    address: "سنندج، پاسداران ...",
    purchases: [
      {
        id: "p1",
        date: "2025-10-05",
        channel: "آنلاین",
        amount: 2510000,
        earnedPoints: 250,
        invoiceNo: "INV-9120",
      },
    ],
    vouchers: [
      { id: "v1", title: "کوپن 7٪", status: "فعال", gainedAt: "2025-09-25" },
    ],
    messages: [
      {
        id: "m1",
        via: "ایمیل",
        date: "2025-10-06",
        subject: "ارسال فاکتور",
        answered: true,
      },
    ],
    friends: [],
    notes: [],
    activities: [
      {
        id: "a1",
        when: "2025-10-05 11:08",
        type: "خرید",
        detail: "پرداخت فاکتور INV-9120",
      },
    ],
    createdAt: "2024-12-01",
    lastPurchaseAt: "2025-10-05",
  },
  // 9
  {
    id: "9",
    fullName: "میلاد اکبری",
    avatarUrl: "https://i.pravatar.cc/80?img=19",
    customerCode: "CUST-001242",
    level: "نقره",
    totalPoints: 4700,
    usablePoints: 3500,
    mobile: "09120000009",
    email: "milad@example.com",
    address: "یزد، صفائیه ...",
    purchases: [
      {
        id: "p1",
        date: "2025-07-14",
        channel: "آنلاین",
        amount: 780000,
        earnedPoints: 78,
        invoiceNo: "INV-8902",
      },
    ],
    vouchers: [],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2024-06-20",
    lastPurchaseAt: "2025-07-14",
  },
  // 10
  {
    id: "10",
    fullName: "نگار بهمنی",
    avatarUrl: "https://i.pravatar.cc/80?img=20",
    customerCode: "CUST-001243",
    level: "الماس",
    totalPoints: 15250,
    usablePoints: 13000,
    mobile: "09120000010",
    email: "negar@example.com",
    address: "مشهد، هفت‌تیر ...",
    purchases: [
      {
        id: "p1",
        date: "2025-10-09",
        channel: "POS",
        amount: 5120000,
        earnedPoints: 510,
        invoiceNo: "INV-9133",
      },
    ],
    vouchers: [
      { id: "v1", title: "کوپن 12٪", status: "فعال", gainedAt: "2025-10-01" },
    ],
    messages: [],
    friends: [],
    notes: [
      {
        id: "n1",
        text: "مشتری وفادار سطح الماس",
        createdAt: "2025-10-10",
        author: "ادمین",
      },
    ],
    activities: [
      {
        id: "a1",
        when: "2025-10-09 18:22",
        type: "خرید",
        detail: "پرداخت فاکتور INV-9133",
      },
    ],
    createdAt: "2023-12-29",
    lastPurchaseAt: "2025-10-09",
  },
  // 11
  {
    id: "11",
    fullName: "اشکان سعادتی",
    avatarUrl: "https://i.pravatar.cc/80?img=21",
    customerCode: "CUST-001244",
    level: "طلا",
    totalPoints: 9200,
    usablePoints: 8400,
    mobile: "09120000011",
    email: "ashkan@example.com",
    address: "اهواز، گلستان ...",
    purchases: [
      {
        id: "p1",
        date: "2025-09-22",
        channel: "آنلاین",
        amount: 1840000,
        earnedPoints: 184,
        invoiceNo: "INV-9066",
      },
    ],
    vouchers: [],
    messages: [
      {
        id: "m1",
        via: "پیامک",
        date: "2025-09-23",
        subject: "رضایت از خرید",
        answered: true,
      },
    ],
    friends: [],
    notes: [],
    activities: [
      {
        id: "a1",
        when: "2025-09-22 14:05",
        type: "خرید",
        detail: "پرداخت فاکتور INV-9066",
      },
    ],
    createdAt: "2024-09-09",
    lastPurchaseAt: "2025-09-22",
  },
  // 12
  {
    id: "12",
    fullName: "فرشاد موحد",
    avatarUrl: "https://i.pravatar.cc/80?img=22",
    customerCode: "CUST-001245",
    level: "برنز",
    totalPoints: 1300,
    usablePoints: 600,
    mobile: "09120000012",
    email: "farshad@example.com",
    address: "کرمان، کوثر ...",
    purchases: [
      {
        id: "p1",
        date: "2025-04-01",
        channel: "POS",
        amount: 350000,
        earnedPoints: 35,
        invoiceNo: "INV-8600",
      },
    ],
    vouchers: [],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2023-11-15",
    lastPurchaseAt: "2025-04-01",
  },
  // 13
  {
    id: "13",
    fullName: "نازنین یگانه",
    avatarUrl: "https://i.pravatar.cc/80?img=23",
    customerCode: "CUST-001246",
    level: "نقره",
    totalPoints: 5980,
    usablePoints: 4700,
    mobile: "09120000013",
    email: "nazanin@example.com",
    address: "قزوین، بلوار دانشگاه ...",
    purchases: [
      {
        id: "p1",
        date: "2025-08-29",
        channel: "آنلاین",
        amount: 1100000,
        earnedPoints: 110,
        invoiceNo: "INV-8980",
      },
    ],
    vouchers: [
      { id: "v1", title: "کوپن 4٪", status: "فعال", gainedAt: "2025-08-20" },
    ],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2024-03-01",
    lastPurchaseAt: "2025-08-29",
  },
  // 14
  {
    id: "14",
    fullName: "بردیا فلاح",
    avatarUrl: "https://i.pravatar.cc/80?img=24",
    customerCode: "CUST-001247",
    level: "طلا",
    totalPoints: 11050,
    usablePoints: 9500,
    mobile: "09120000014",
    email: "bardia@example.com",
    address: "گرگان، ناهارخوران ...",
    purchases: [
      {
        id: "p1",
        date: "2025-10-10",
        channel: "آنلاین",
        amount: 2990000,
        earnedPoints: 299,
        invoiceNo: "INV-9139",
      },
    ],
    vouchers: [],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2024-01-07",
    lastPurchaseAt: "2025-10-10",
  },
  // 15
  {
    id: "15",
    fullName: "الهام صادقی",
    avatarUrl: "https://i.pravatar.cc/80?img=25",
    customerCode: "CUST-001248",
    level: "برنز",
    totalPoints: 2050,
    usablePoints: 1500,
    mobile: "09120000015",
    email: "elham@example.com",
    address: "رشت، منظریه ...",
    purchases: [
      {
        id: "p1",
        date: "2025-02-18",
        channel: "POS",
        amount: 480000,
        earnedPoints: 48,
        invoiceNo: "INV-8702",
      },
    ],
    vouchers: [],
    messages: [],
    friends: [],
    notes: [],
    activities: [],
    createdAt: "2023-10-25",
    lastPurchaseAt: "2025-02-18",
  },
];
