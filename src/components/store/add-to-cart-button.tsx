"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/store/cart-provider";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  stock: number;
}

export function AddToCartButton({ productId, productName, productSlug, price, stock }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({ productId, productName, productSlug, unitPrice: price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={stock === 0}
      className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
    >
      <ShoppingCart size={18} strokeWidth={1.5} />
      {added ? "¡Añadido al carrito!" : stock === 0 ? "Sin stock" : "Añadir al carrito — 32 €"}
    </button>
  );
}
