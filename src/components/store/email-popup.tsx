"use client";

import { useEffect, useState } from "react";
import { X, Mail, Gift } from "lucide-react";

const STORAGE_KEY = "nm_popup_dismissed";
const DELAY_MS = 25000; // 25 segundos

export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // No mostrar si ya fue visto
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setOpen(true), DELAY_MS);

    // Exit intent en desktop
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        clearTimeout(timer);
        if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al suscribirse");
      setDiscountCode(data.discountCode);
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Oferta exclusiva"
        className="fixed z-50 inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header decorativo */}
          <div className="bg-primary px-6 pt-8 pb-6 text-center relative">
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 p-1.5 rounded-full text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <X size={16} strokeWidth={2} />
            </button>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
              <Gift size={22} strokeWidth={1.5} className="text-accent" />
            </div>
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">
              Oferta exclusiva
            </p>
            <h2 className="text-2xl font-heading font-bold text-primary-foreground leading-tight">
              10% de descuento<br />en tu primer pedido
            </h2>
          </div>

          <div className="px-6 py-6">
            {discountCode ? (
              /* Estado éxito */
              <div className="text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  ¡Genial! Tu código es:
                </p>
                <div className="bg-muted border-2 border-dashed border-accent/40 rounded-xl py-3 px-4">
                  <p className="text-2xl font-heading font-bold text-accent tracking-widest">
                    {discountCode}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Aplícalo al finalizar tu compra. También te lo hemos enviado al email.
                </p>
                <button
                  onClick={dismiss}
                  className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Ir a comprar MoodCalm
                </button>
              </div>
            ) : (
              /* Formulario */
              <>
                <p className="text-sm text-muted-foreground text-center mb-5">
                  Suscríbete y recibe el código al instante. Además te enviaremos guías, consejos
                  y novedades sobre bienestar — sin spam.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>

                  {error && <p className="text-xs text-destructive">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                  >
                    {loading ? "Enviando…" : "Quiero mi 10% de descuento"}
                  </button>
                </form>

                <p className="mt-4 text-[10px] text-muted-foreground text-center">
                  Sin spam. Puedes darte de baja cuando quieras. Al suscribirte aceptas nuestra{" "}
                  <a href="/legal/privacidad" className="underline hover:text-foreground">
                    política de privacidad
                  </a>.
                </p>

                <button
                  onClick={dismiss}
                  className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground text-center transition-colors"
                >
                  No, prefiero pagar el precio completo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
