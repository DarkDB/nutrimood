import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { stock } = await req.json();

  if (typeof stock !== "number" || stock < 0) {
    return NextResponse.json({ error: "Invalid stock value" }, { status: 400 });
  }

  const product = await db.product.update({ where: { id }, data: { stock } });
  return NextResponse.json(product);
}
