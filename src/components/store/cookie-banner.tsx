"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("nutrimood_cookies");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("nutrimood_cookies", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-lg mx-auto sm:mx-0 sm:ml-auto bg-foreground text-background rounded-xl p-4 shadow-xl pointer-events-auto">
        <p className="text-sm leading-relaxed">
          Usamos cookies técnicas necesarias para el proceso de pago (Stripe) y para recordar tu carrito.{" "}
          <Link href="/legal/cookies" className="underline hover:no-underline opacity-80">
            Saber más
          </Link>
        </p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={accept}
            className="flex-1 bg-accent hover:bg-accent-hover text-white text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            Aceptar
          </button>
          <Link
            href="/legal/cookies"
            className="flex-1 text-center border border-background/30 hover:bg-background/10 text-background text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Más info
          </Link>
        </div>
      </div>
    </div>
  );
}
