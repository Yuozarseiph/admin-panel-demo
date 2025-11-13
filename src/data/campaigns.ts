// data/campaigns.ts
export type CampaignType = "تخفیف" | "امتیاز دوبل" | "هدیه" | "چالش";
export type CampaignStatus = "فعال" | "زمان‌بندی" | "تمام‌شده" | "متوقف";

export type CampaignRow = {
  id: string;
  name: string;
  href: string;
  type: CampaignType;
  status: CampaignStatus;
  startAt: string;
  endAt?: string;
  participantsTotal: number;
  participantsToday: number;
  conversionRate: number;
};

export const campaigns: CampaignRow[] = [
  {
    id: "CMP-1001",
    name: "حراج آخر فصل",
    href: "/sales/campaigns/CMP-1001",
    type: "تخفیف",
    status: "فعال",
    startAt: "2025-09-01",
    endAt: "2025-10-01",
    participantsTotal: 4820,
    participantsToday: 120,
    conversionRate: 0.083,
  },
  {
    id: "CMP-1002",
    name: "امتیاز دوبل پاییزه",
    href: "/sales/campaigns/CMP-1002",
    type: "امتیاز دوبل",
    status: "زمان‌بندی",
    startAt: "2025-11-20",
    endAt: "2025-12-05",
    participantsTotal: 0,
    participantsToday: 0,
    conversionRate: 0.0,
  },
  {
    id: "CMP-1003",
    name: "قرعه‌کشی هدیه ویژه",
    href: "/sales/campaigns/CMP-1003",
    type: "هدیه",
    status: "تمام‌شده",
    startAt: "2025-08-05",
    endAt: "2025-08-25",
    participantsTotal: 9100,
    participantsToday: 0,
    conversionRate: 0.121,
  },
  {
    id: "CMP-1004",
    name: "چالش عکس محصول",
    href: "/sales/campaigns/CMP-1004",
    type: "چالش",
    status: "متوقف",
    startAt: "2025-06-01",
    endAt: "2025-06-30",
    participantsTotal: 1450,
    participantsToday: 0,
    conversionRate: 0.042,
  },
  {
    id: "CMP-1005",
    name: "هفته طلایی",
    href: "/sales/campaigns/CMP-1005",
    type: "تخفیف",
    status: "فعال",
    startAt: "2025-10-20",
    endAt: "2025-11-20",
    participantsTotal: 2330,
    participantsToday: 78,
    conversionRate: 0.095,
  },
];
