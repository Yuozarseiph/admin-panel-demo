// data/customers.ts
export const provincesCustomers: Record<string, number> = {
  tehran: 73000,
  alborz: 15000,
  isfahan: 32000,
  khorasanRazavi: 21000,
  fars: 18000,
  mazandaran: 12000,
  gilan: 10000,
  eastAzerbaijan: 14000,
  westAzerbaijan: 9000,
  kerman: 11000,
  khuzestan: 13000,
  qom: 8000,
  yazd: 7000,
  bushehr: 5000,
  hormozgan: 6000,
  zanjan: 4000,
  qazvin: 6000,
  markazi: 5000,
  kermanshah: 6000,
  kurdistan: 5000,
  lorestan: 5000,
  kohgiluyehAndBoyerAhmad: 3000,
  chaharmahalAndBakhtiari: 4000,
  sistanAndBaluchestan: 9000,
  northKhorasan: 4000,
  southKhorasan: 3000,
  golestan: 7000,
  semnan: 3000,
  ilam: 2000,
  ardabil: 3000,
  hamedan: 5000,
};

export const platformShare = [
  { name: "آمازون", value: 45, color: "#6366F1" },
  { name: "علی‌اکسپرس", value: 25, color: "#60A5FA" },
  { name: "TF", value: 15, color: "#F59E0B" },
  { name: "علی‌بابا", value: 15, color: "#10B981" },
];

export const customerKPI = [
  { title: "مشتریان ویژه", value: "۲,۷۷۷", delta: "+۲۵.۲٪", note: "نسبت به ماه قبل: ۲,۸۴۶", ok: true },
  { title: "مشتریان تکراری", value: "۴,۲۵۰", delta: "+۲۵.۲٪", note: "نسبت به ماه قبل: ۳,۹۸۷", ok: true },
  { title: "مشتریان جدید", value: "۸,۷۸۵", delta: "−۱۸.۲٪", note: "نسبت به ماه قبل: ۱۰,۵۸۷", ok: false },
  { title: "کل مشتریان", value: "۱۲,۷۸۶", delta: "+۲۵.۲٪", note: "نسبت به ماه قبل: ۱۰,۲۵۸", ok: true },
];
