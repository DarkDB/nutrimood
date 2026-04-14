import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { render } from "@react-email/components";
import ShippingUpdate from "@/../emails/shipping-update";
import type { OrderStatus } from "@/types";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { status, notes }: { status: OrderStatus; notes?: string } = body;

  const current = await db.order.findUnique({ where: { id }, include: { items: true } });
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await db.order.update({
    where: { id },
    data: { status, ...(notes !== undefined ? { notes } : {}) },
  });

  if (status === "SHIPPED" && current.status !== "SHIPPED") {
    const html = await render(
      ShippingUpdate({ customerName: current.customerName, orderId: id })
    );
    await resend.emails.send({
      from: FROM_EMAIL,
      to: current.customerEmail,
      subject: "Tu MoodCalm está en camino — NutriMood",
      html,
    });
  }

  if (status === "CANCELLED" && current.status !== "CANCELLED") {
    for (const item of current.items) {
      if (item.productId !== "unknown") {
        await db.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }
  }

  return NextResponse.json(updated);
}
