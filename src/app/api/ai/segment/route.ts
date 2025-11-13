// app/api/ai/segment/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({
  apiKey: process.env.AIMLAPI_KEY ?? "",
  baseURL: "https://api.aimlapi.com/v1",
});

export async function POST(req: Request) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };
    if (!prompt?.trim()) return NextResponse.json({ error: "prompt is required" }, { status: 400 });

    const system =
      "فقط JSON با {filters:{province:string[],lastPurchaseDays:number,tags:string[]}, count:number, summary:string} برگردان. اگر فیلتر معتبری نتوانستی بسازی، فقط این JSON را برگردان: {\"error\":\"No valid filters\"}.";

    const rsp = await client.chat.completions.create({
      model: process.env.AIMLAPI_MODEL ?? "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const raw = rsp.choices[0]?.message?.content ?? "{}";
    const s = raw.indexOf("{");
    const e = raw.lastIndexOf("}");
    const j = JSON.parse(raw.slice(s, e + 1));

    if (j?.error) {
      return NextResponse.json({ error: "No valid filters extracted" }, { status: 422 });
    }

    // شمارش را فعلاً mock می‌گذاریم تا ساده بماند
    const filters = {
      province: Array.isArray(j.filters?.province) ? j.filters.province : [],
      lastPurchaseDays: typeof j.filters?.lastPurchaseDays === "number" ? j.filters.lastPurchaseDays : undefined,
      tags: Array.isArray(j.filters?.tags) ? j.filters.tags : [],
    };
    const count = typeof j.count === "number" ? j.count : 1274;

    return NextResponse.json({ filters, count, summary: j.summary ?? "" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Internal error" }, { status: 500 });
  }
}
