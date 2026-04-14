import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [revenueToday, revenueMonth, ordersTotal, customersTotal] = await Promise.all([
    db.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] }, createdAt: { gte: startOfToday } },
    }),
    db.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] }, createdAt: { gte: startOfMonth } },
    }),
    db.order.count(),
    db.customer.count(),
  ]);

  return NextResponse.json({
    revenueToday: revenueToday._sum.total ?? 0,
    revenueMonth: revenueMonth._sum.total ?? 0,
    ordersTotal,
    customersTotal,
  });
}
