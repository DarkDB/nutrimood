"use client";

import { useRef } from "react";
import { StickyProductCta } from "@/components/store/sticky-product-cta";

interface Props {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
  };
  children: React.ReactNode;
}

export function ProductPageClient({ product, children }: Props) {
  const ctaTriggerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* Referencia que observa cuándo el bloque de compra sale de vista */}
      <div ref={ctaTriggerRef}>{children}</div>

      <StickyProductCta
        productId={product.id}
        productName={product.name}
        productSlug={product.slug}
        price={product.price}
        stock={product.stock}
        triggerRef={ctaTriggerRef}
      />
    </div>
  );
}
