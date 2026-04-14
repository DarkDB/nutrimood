"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/components/store/cart-provider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CarritoPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, unitPrice: i.unitPrice })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al iniciar el pago");
      }

      const { checkoutUrl } = await res.json();
      clearCart();
      window.location.href = checkoutUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 text-center">
        <ShoppingCart size={64} strokeWidth={1} className="mx-auto text-muted-foreground mb-6" />
        <h1 className="text-2xl font-heading font-bold text-primary mb-3">
          Tu carrito está vacío
        </h1>
        <p className="text-muted-foreground mb-8">
          Descubre MoodCalm y empieza tu camino hacia el control del estrés.
        </p>
        <Link
          href="/productos/moodcalm"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold transition-colors"
        >
          Ver MoodCalm
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    );
  }

  const shipping = total >= 5000 ? 0 : 395;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-8">
        Tu carrito
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 items-center bg-card border border-border rounded-lg p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.productName}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {formatPrice(item.unitPrice)} por unidad
                </p>
              </div>

              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="px-3 py-1.5 hover:bg-muted transition-colors text-sm"
                >
                  −
                </button>
                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="px-3 py-1.5 hover:bg-muted transition-colors text-sm"
                >
                  +
                </button>
              </div>

              <div className="text-right min-w-[72px]">
                <p className="font-semibold text-foreground">
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.productId)}
                className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Eliminar producto"
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit space-y-4">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Resumen del pedido
          </h2>

          {/* Barra de progreso envío gratis */}
          {shipping === 0 ? (
            <div className="bg-success/10 border border-success/30 rounded-lg px-3 py-2 text-xs text-success font-medium">
              ✓ ¡Envío gratis aplicado!
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Te faltan <strong className="text-foreground">{formatPrice(5000 - total)}</strong> para envío gratis
                </span>
                <span className="text-muted-foreground">{Math.round((total / 5000) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (total / 5000) * 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Envío</span>
              <span className={shipping === 0 ? "text-success font-medium" : ""}>
                {shipping === 0 ? "Gratis" : formatPrice(shipping)}
              </span>
            </div>
          </div>

          <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
            <span>Total</span>
            <span className="text-primary">{formatPrice(total + shipping)}</span>
          </div>

          <p className="text-xs text-muted-foreground">IVA (21%) incluido · Garantía 30 días</p>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover text-white font-semibold h-11"
          >
            {loading ? "Redirigiendo..." : "Pagar ahora"}
            {!loading && <ArrowRight size={16} strokeWidth={1.5} className="ml-2" />}
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
            {["Visa", "MC", "Amex", "Apple Pay", "Google Pay"].map((m) => (
              <span key={m} className="border border-border rounded px-1.5 py-0.5 font-medium bg-muted">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
