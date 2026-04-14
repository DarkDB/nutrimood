import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CheckoutItem[] = body.items;
    const customerEmail: string | undefined = body.customerEmail;

    if (!items?.length) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    // Verificar stock
    const products = await db.product.findMany({
      where: { id: { in: items.map((i) => i.productId) }, active: true },
    });

    for (const item of items) {
      const product = products.find((p: { id: string }) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Producto no encontrado: ${item.productId}` },
          { status: 400 }
        );
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${product.name}` },
          { status: 400 }
        );
      }
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => {
        const product = products.find((p: { id: string }) => p.id === item.productId)!;
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              metadata: { productId: product.id },
            },
            unit_amount: product.price,
          },
          quantity: item.quantity,
        };
      }),
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ["ES"] },
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      success_url: `${baseUrl}/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/carrito`,
      metadata: {
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
