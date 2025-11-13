// app/api/actions/sms/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { filters, count } = await req.json();
  // TODO: اتصال به سرویس پیامک
  const listId = `sms-${Date.now()}`;
  return NextResponse.json({ ok: true, listId, estimated: count ?? 0, filters });
}
