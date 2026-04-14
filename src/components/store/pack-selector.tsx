"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/components/store/cart-provider";
import { formatPrice } from "@/lib/utils";

interface Pack {
  qty: number;
  label: string;
  priceTotal: number; // en céntimos
  badge?: string;
  badgeVariant?: "accent" | "primary";
  savings?: number; // en céntimos
}

interface PackSelectorProps {
  productId: string;
  productName: string;
  productSlug: string;
  basePrice: number; // precio unitario en céntimos
  stock: number;
}

function buildPacks(basePrice: number): Pack[] {
  return [
    {
      qty: 1,
      label: "1 pack · 20 sobres",
      priceTotal: basePrice,
    },
    {
      qty: 2,
      label: "2 packs · 40 sobres",
      priceTotal: Math.round(basePrice * 2 * 0.859), // ~€55 si base=€32
      badge: "Más popular",
      badgeVariant: "accent",
      savings: Math.round(basePrice * 2 * 0.141),
    },
    {
      qty: 3,
      label: "3 packs · 60 sobres",
      priceTotal: Math.round(basePrice * 3 * 0.781), // ~€75 si base=€32
      badge: "Mejor precio",
      badgeVariant: "primary",
      savings: Math.round(basePrice * 3 * 0.219),
    },
  ];
}

export function PackSelector({
  productId,
  productName,
  productSlug,
  basePrice,
  stock,
}: PackSelectorProps) {
  const packs = buildPacks(basePrice);
  const [selected, setSelected] = useState(1); // 2-pack preseleccionado ("Más popular")
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const pack = packs[selected];
  const unitPrice = Math.round(pack.priceTotal / pack.qty);

  function handleAdd() {
    addItem({
      productId,
      productName: pack.qty > 1 ? `${productName} ×${pack.qty}` : productName,
      productSlug,
      unitPrice,
      quantity: pack.qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="space-y-4">
      {/* Opciones de pack */}
      <div className="space-y-2">
        {packs.map((p, i) => {
          const isSelected = selected === i;
          const perSachet = (p.priceTotal / 100 / p.qty / 20).toFixed(2);

          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left rounded-xl border-2 px-4 py-3.5 transition-all relative ${
                isSelected
                  ? "border-accent bg-accent/5"
                  : "border-border bg-card hover:border-accent/40"
              }`}
            >
              {/* Badge */}
              {p.badge && (
                <span
                  className={`absolute -top-2.5 left-4 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                    p.badgeVariant === "accent" ? "bg-accent" : "bg-primary"
                  }`}
                >
                  {p.badge}
                </span>
              )}

              <div className="flex items-center justify-between gap-3">
                {/* Radio + label */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-accent" : "border-muted-foreground"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{p.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {perSachet} €/sobre
                      {p.savings ? (
                        <span className="ml-1.5 text-success font-medium">
                          · Ahorras {formatPrice(p.savings)}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>

                {/* Precio */}
                <div className="text-right shrink-0">
                  {p.savings && (
                    <p className="text-xs text-muted-foreground line-through">
                      {formatPrice(basePrice * p.qty)}
                    </p>
                  )}
                  <p className={`font-bold text-base ${isSelected ? "text-accent" : "text-foreground"}`}>
                    {formatPrice(p.priceTotal)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={handleAdd}
        disabled={stock === 0}
        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
      >
        {added ? (
          <>
            <Check size={18} strokeWidth={2.5} />
            ¡Añadido al carrito!
          </>
        ) : (
          <>
            <ShoppingCart size={18} strokeWidth={1.5} />
            {stock === 0 ? "Sin stock" : `Añadir al carrito · ${formatPrice(pack.priceTotal)}`}
          </>
        )}
      </button>

      {stock > 0 && stock <= 10 && (
        <p className="text-xs text-destructive text-center">⚠ Solo quedan {stock} unidades</p>
      )}
    </div>
  );
}
