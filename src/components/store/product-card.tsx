"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/store/cart-provider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  stock: number;
}

export function ProductCard({ productId, productName, productSlug, price, stock }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({ productId, productName, productSlug, unitPrice: price, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-muted transition-colors"
            aria-label="Reducir cantidad"
          >
            <Minus size={16} strokeWidth={1.5} />
          </button>
          <span className="px-4 py-2 text-sm font-medium min-w-[2.5rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            className="px-3 py-2 hover:bg-muted transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus size={16} strokeWidth={1.5} />
          </button>
        </div>
        <span className="text-2xl font-heading font-bold text-primary">
          {formatPrice(price * quantity)}
        </span>
      </div>

      <Button
        onClick={handleAdd}
        disabled={stock === 0}
        className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 h-auto rounded-lg"
      >
        <ShoppingCart size={18} strokeWidth={1.5} className="mr-2" />
        {added ? "¡Añadido!" : stock === 0 ? "Sin stock" : "Añadir al carrito"}
      </Button>

      {stock > 0 && stock <= 10 && (
        <p className="text-sm text-destructive">¡Solo quedan {stock} unidades!</p>
      )}
    </div>
  );
}
