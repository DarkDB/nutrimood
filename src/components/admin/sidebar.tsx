"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Package, Users, Mail, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag, exact: false },
  { href: "/admin/inventario", label: "Inventario", icon: Package, exact: false },
  { href: "/admin/clientes", label: "Clientes", icon: Users, exact: false },
  { href: "/admin/suscriptores", label: "Suscriptores", icon: Mail, exact: false },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0">
      <div className="px-5 py-6 border-b border-sidebar-border">
        <Link href="/admin" className="font-heading font-bold text-lg text-sidebar-foreground">
          NutriMood
        </Link>
        <p className="text-xs text-sidebar-foreground/60 mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon size={18} strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border">
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors w-full"
        >
          <LogOut size={18} strokeWidth={1.5} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
