// app/api/actions/export-excel/route.ts
import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { filters, rows = [] } = (await req.json()) as {
    filters: { province?: string[]; lastPurchaseDays?: number; tags?: string[] };
    rows: Array<Record<string, any>>;
  };

  const data = rows.length
    ? rows
    : [
        { name: "کاربر ۱", phone: "09xxxxxxxxx", province: filters.province?.[0] ?? "نامشخص" },
        { name: "کاربر ۲", phone: "09yyyyyyyyy", province: filters.province?.[0] ?? "نامشخص" },
      ];

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Segment");
  ws.columns = [
    { header: "نام", key: "name", width: 24 },
    { header: "موبایل", key: "phone", width: 18 },
    { header: "استان", key: "province", width: 18 },
  ];
  ws.addRows(data);

  const buffer = await wb.xlsx.writeBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="segment.xlsx"`,
    },
  });
}
