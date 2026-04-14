import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pedido confirmado — NutriMood",
};

interface ConfirmacionPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function ConfirmacionPage({ searchParams }: ConfirmacionPageProps) {
  const { session_id } = await searchParams;

  let customerName = "";
  let customerEmail = "";

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      customerName = session.customer_details?.name ?? "";
      customerEmail = session.customer_details?.email ?? "";
    } catch {
      // ignore — mostrar página genérica
    }
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 text-center">
      <CheckCircle size={72} strokeWidth={1} className="mx-auto text-success mb-6" />

      <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-3">
        ¡Pedido confirmado!
      </h1>

      {customerName ? (
        <p className="text-lg text-muted-foreground mb-2">
          Gracias, <strong className="text-foreground">{customerName}</strong>.
        </p>
      ) : null}

      {customerEmail ? (
        <p className="text-muted-foreground mb-8">
          Te hemos enviado la confirmación a{" "}
          <strong className="text-foreground">{customerEmail}</strong>.
        </p>
      ) : (
        <p className="text-muted-foreground mb-8">
          Recibirás un email de confirmación en breve.
        </p>
      )}

      <div className="bg-muted border border-border rounded-lg p-6 max-w-md mx-auto mb-8 text-sm text-muted-foreground">
        <p>📦 Tu pedido será preparado en 24h</p>
        <p className="mt-2">🚚 Entrega estimada en 2–4 días laborables</p>
        <p className="mt-2">📧 Te avisaremos cuando esté en camino</p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-muted transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
