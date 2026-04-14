import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const DISCOUNT_CODE = "CALMA10";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  try {
    await db.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source: body?.source ?? "popup", discount: DISCOUNT_CODE },
    });

    return NextResponse.json({ discountCode: DISCOUNT_CODE });
  } catch {
    return NextResponse.json({ error: "Error al guardar el email" }, { status: 500 });
  }
}
