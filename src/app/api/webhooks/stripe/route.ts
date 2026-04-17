import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { render } from "@react-email/components";
import OrderConfirmation from "@/../emails/order-confirmation";
import AbandonedCart from "@/../emails/abandoned-cart";
import type { ShippingAddress } from "@/types";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Idempotencia
      const existing = await db.order.findUnique({
        where: { stripeSessionId: session.id },
      });
      if (existing) {
        return NextResponse.json({ ok: true });
      }

      const customerName = session.customer_details?.name ?? "Cliente";
      const customerEmail = session.customer_details?.email ?? "";
      const customerPhone = session.customer_details?.phone ?? null;

      // shipping_details is available on expanded sessions
      const shippingDetails = (session as unknown as { shipping_details?: { address?: { line1?: string; line2?: string | null; city?: string; postal_code?: string; country?: string } } }).shipping_details;
      const addr = shippingDetails?.address;
      const shippingAddress: ShippingAddress = {
        street: `${addr?.line1 ?? ""}${addr?.line2 ? ` ${addr.line2}` : ""}`,
        city: addr?.city ?? "",
        postcode: addr?.postal_code ?? "",
        country: addr?.country ?? "ES",
      };

      // Recuperar line items de Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      const subtotal = session.amount_subtotal ?? 0;
      const tax = session.total_details?.amount_tax ?? 0;
      const shippingCost = session.total_details?.amount_shipping ?? 0;
      const total = session.amount_total ?? 0;

      // Crear Order en DB
      const order = await db.order.create({
        data: {
          stripeSessionId: session.id,
          stripePaymentIntent: session.payment_intent as string | undefined,
          status: "PAID",
          customerEmail,
          customerName,
          customerPhone,
          shippingAddress: shippingAddress as unknown as Record<string, string>,
          subtotal,
          tax,
          shippingCost,
          total,
          items: {
            create: await Promise.all(
              lineItems.data.map(async (li) => {
                const productMeta =
                  (li.price?.product as { metadata?: { productId?: string } })?.metadata;
                const productId = productMeta?.productId;

                if (productId) {
                  await db.product.update({
                    where: { id: productId },
                    data: { stock: { decrement: li.quantity ?? 1 } },
                  });
                }

                return {
                  productId: productId ?? "unknown",
                  quantity: li.quantity ?? 1,
                  unitPrice: li.price?.unit_amount ?? 0,
                };
              })
            ),
          },
        },
      });

      // Upsert Customer
      await db.customer.upsert({
        where: { email: customerEmail },
        update: {},
        create: {
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
        },
      });

      // Enviar email de confirmación
      const emailHtml = await render(
        OrderConfirmation({
          customerName,
          customerEmail,
          orderId: order.id,
          items: lineItems.data.map((li) => {
            const prod = li.price?.product;
            const productName = typeof prod === "object" && prod !== null && "name" in prod
              ? (prod as { name: string }).name
              : (li.description ?? "Producto");
            return { name: productName, quantity: li.quantity ?? 1, unitPrice: li.price?.unit_amount ?? 0 };
          }),
          subtotal,
          tax,
          shippingCost,
          total,
          shippingAddress,
        })
      );

      await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: `Confirmación de pedido #${order.id.slice(0, 8).toUpperCase()} — NutriMood`,
        html: emailHtml,
      });
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email ?? session.customer_email;
      const customerName = session.customer_details?.name ?? undefined;

      if (customerEmail) {
        const baseUrl = process.env.NEXTAUTH_URL ?? "https://nutrimood.es";
        const html = await render(
          AbandonedCart({
            customerName: customerName ?? undefined,
            productUrl: `${baseUrl}/productos/moodcalm`,
          })
        );
        await resend.emails.send({
          from: FROM_EMAIL,
          to: customerEmail,
          subject: "¿Olvidaste algo? Tu MoodCalm te sigue esperando — NutriMood",
          html,
        });
      }
    }

    if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object;
      await db.order.updateMany({
        where: { stripePaymentIntent: pi.id },
        data: { status: "CANCELLED" },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[webhook] Handler error:", error);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }
}
