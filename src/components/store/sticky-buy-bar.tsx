"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Aparece cuando el hero (~600px) sale de vista
      setVisible(window.scrollY > 550);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary border-t border-primary-light shadow-lg transform transition-transform duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-primary-foreground font-heading font-bold text-base leading-none">
            MoodCalm
          </p>
          <p className="text-primary-foreground/70 text-xs mt-0.5">
            Controla el cortisol. Recupera tu calma.
          </p>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="text-right hidden xs:block">
            <p className="text-primary-foreground/70 text-xs">Precio</p>
            <p className="text-primary-foreground font-bold text-lg leading-none">32 €</p>
          </div>
          <Link
            href="/productos/moodcalm"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            <ShoppingCart size={16} strokeWidth={1.5} />
            Comprar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
