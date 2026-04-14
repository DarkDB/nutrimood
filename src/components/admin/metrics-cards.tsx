import { TrendingUp, ShoppingBag, Users, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface MetricsCardsProps {
  revenueToday: number;
  revenueWeek: number;
  revenueMonth: number;
  ordersTotal: number;
  ordersPending: number;
  customersTotal: number;
  stockCritical: boolean;
}

export function MetricsCards({
  revenueToday,
  revenueWeek,
  revenueMonth,
  ordersTotal,
  ordersPending,
  customersTotal,
  stockCritical,
}: MetricsCardsProps) {
  const cards = [
    {
      label: "Revenue hoy",
      value: formatPrice(revenueToday),
      sub: `Esta semana: ${formatPrice(revenueWeek)}`,
      icon: TrendingUp,
      accent: false,
    },
    {
      label: "Revenue este mes",
      value: formatPrice(revenueMonth),
      sub: null,
      icon: TrendingUp,
      accent: false,
    },
    {
      label: "Pedidos totales",
      value: String(ordersTotal),
      sub: `${ordersPending} pendientes`,
      icon: ShoppingBag,
      accent: ordersPending > 0,
    },
    {
      label: "Clientes",
      value: String(customersTotal),
      sub: null,
      icon: Users,
      accent: false,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-card border border-border rounded-lg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {c.label}
            </p>
            <c.icon size={18} strokeWidth={1.5} className="text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">{c.value}</p>
          {c.sub && (
            <p
              className={`text-xs mt-1 ${
                c.accent ? "text-accent font-medium" : "text-muted-foreground"
              }`}
            >
              {c.sub}
            </p>
          )}
        </div>
      ))}

      {stockCritical && (
        <div className="sm:col-span-2 lg:col-span-4 bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-center gap-3">
          <Package size={18} strokeWidth={1.5} className="text-destructive shrink-0" />
          <p className="text-sm text-destructive font-medium">
            ⚠ Stock bajo en uno o más productos. Revisa la sección Inventario.
          </p>
        </div>
      )}
    </div>
  );
}
