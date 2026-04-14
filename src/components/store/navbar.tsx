"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/store/cart-provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-nutrimood.jpg"
            alt="NutriMood"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/productos/moodcalm"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Comprar
          </Link>

          <Link
            href="/carrito"
            className="relative inline-flex items-center text-foreground hover:text-primary transition-colors"
            aria-label={`Carrito (${itemCount} productos)`}
          >
            <ShoppingCart size={22} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span
                className={cn(
                  "absolute -top-2 -right-2 flex items-center justify-center",
                  "w-5 h-5 rounded-full text-[10px] font-semibold",
                  "bg-accent text-white"
                )}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
