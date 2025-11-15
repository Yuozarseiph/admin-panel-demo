// data/customers.ts
export type CustomerKPIType = {
  title: string;
  value: string;
  delta: string;
  ok: boolean;
  note: string;
};

export const customerKPI: CustomerKPIType[] = [
  {
    title: "کل مشتریان",
    value: "۲۶,۰۸۵",
    delta: "افزایش ۳۲.۴۰٪ نسبت به ماه گذشته",
    ok: true,
    note: "",
  },
  {
    title: "مشتریان زمان‌بندی شده",
    value: "۱۵,۷۸۶",
    delta: "افزایش ۳۲.۴۰٪ نسبت به ماه گذشته",
    ok: true,
    note: "",
  },
  {
    title: "لیست انتظار",
    value: "۸,۵۰۳",
    delta: "کاهش ۳۲.۴۰٪ نسبت به ماه گذشته",
    ok: false,
    note: "",
  },
  {
    title: "لغو شده",
    value: "۲,۴۳۰",
    delta: "افزایش ۳۲.۴۰٪ نسبت به ماه گذشته",
    ok: true,
    note: "",
  },
];
