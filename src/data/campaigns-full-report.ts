// data/campaigns-full-report.ts

export const campaignsTopSummary = {
  active: 32,
  finished: 187,
  running: 18,
  highROI: 9,
};

export const campaignsStats = {
  ordersCount: 38900,
  ordersPercent: 89,
  totalAmount: 98543000000,
  amountPercent: 54,
};

export type SimpleSeriesPoint = {
  name: string;
  value: number;
};

export const campaignsSeries: {
  inventory: SimpleSeriesPoint[];
  customer: SimpleSeriesPoint[];
  profit: SimpleSeriesPoint[];
  sales: SimpleSeriesPoint[];
} = {
  inventory: [
    { name: "دوشنبه", value: 40 },
    { name: "سه‌شنبه", value: 95 },
    { name: "چهارشنبه", value: 70 },
    { name: "پنج‌شنبه", value: 105 },
    { name: "جمعه", value: 50 },
    { name: "یکشنبه", value: 72 },
  ],
  customer: [
    { name: "دوشنبه", value: 35 },
    { name: "سه‌شنبه", value: 88 },
    { name: "چهارشنبه", value: 63 },
    { name: "پنج‌شنبه", value: 100 },
    { name: "جمعه", value: 52 },
    { name: "یکشنبه", value: 70 },
  ],
  profit: [
    { name: "دوشنبه", value: 42 },
    { name: "سه‌شنبه", value: 92 },
    { name: "چهارشنبه", value: 69 },
    { name: "پنج‌شنبه", value: 108 },
    { name: "جمعه", value: 53 },
    { name: "یکشنبه", value: 73 },
  ],
  sales: [
    { name: "دوشنبه", value: 41 },
    { name: "سه‌شنبه", value: 96 },
    { name: "چهارشنبه", value: 71 },
    { name: "پنج‌شنبه", value: 109 },
    { name: "جمعه", value: 51 },
    { name: "یکشنبه", value: 74 },
  ],
};
