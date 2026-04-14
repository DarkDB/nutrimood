"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/store/cart-provider";
import { formatPrice } from "@/lib/utils";

interface StickyProductCtaProps {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  stock: number;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function StickyProductCta({
  productId,
  productName,
  productSlug,
  price,
  stock,
  triggerRef,
}: StickyProductCtaProps) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [triggerRef]);

  function handleAdd() {
    addItem({ productId, productName, productSlug, unitPrice: price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-lg sm:hidden">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">{productName}</p>
          <p className="text-accent font-bold">{formatPrice(price)}</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={stock === 0}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
        >
          <ShoppingCart size={16} strokeWidth={1.5} />
          {added ? "¡Añadido!" : "Añadir"}
        </button>
      </div>
    </div>
  );
}
