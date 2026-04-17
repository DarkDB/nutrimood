import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { render } from "@react-email/components";
import WelcomeDiscount from "@/../emails/welcome-discount";

const DISCOUNT_CODE = "CALMA10";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  try {
    const existing = await db.subscriber.findUnique({ where: { email } });

    await db.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, source: body?.source ?? "popup", discount: DISCOUNT_CODE },
    });

    // Solo enviar email si es suscriptor nuevo
    if (!existing) {
      const baseUrl = process.env.NEXTAUTH_URL ?? "https://nutrimood.es";
      const html = await render(
        WelcomeDiscount({
          discountCode: DISCOUNT_CODE,
          productUrl: `${baseUrl}/productos/moodcalm`,
        })
      );
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Tu código ${DISCOUNT_CODE} — 10% de descuento en MoodCalm`,
        html,
      });
    }

    return NextResponse.json({ discountCode: DISCOUNT_CODE });
  } catch {
    return NextResponse.json({ error: "Error al guardar el email" }, { status: 500 });
  }
}
