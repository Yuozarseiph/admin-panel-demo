// app/api/actions/campaign/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let lastId = 1000;

export async function POST(req: Request) {
  const { title, summary, filters, count } = await req.json();
  const id = ++lastId;
  const record = {
    id,
    title: title ?? `کمپین-${id}`,
    summary: summary ?? "",
    filters,
    count,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ ok: true, campaign: record });
}
