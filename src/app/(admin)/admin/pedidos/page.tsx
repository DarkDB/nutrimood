import type { Metadata } from "next";
import { db } from "@/lib/db";
import { OrdersTable } from "@/components/admin/orders-table";
import type { OrderStatus } from "@/types";

export const metadata: Metadata = { title: "Pedidos — Admin NutriMood" };

interface PedidosPageProps {
  searchParams: Promise<{ estado?: string }>;
}

const ALL_STATUSES: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export default async function PedidosPage({ searchParams }: PedidosPageProps) {
  const { estado } = await searchParams;
  const statusFilter = ALL_STATUSES.includes(estado as OrderStatus)
    ? (estado as OrderStatus)
    : undefined;

  const orders = await db.order.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: "desc" },
    select: { id: true, customerName: true, customerEmail: true, total: true, status: true, createdAt: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-primary">Pedidos</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <a
          href="/admin/pedidos"
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            !statusFilter
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:border-primary"
          }`}
        >
          Todos ({orders.length})
        </a>
        {ALL_STATUSES.map((s) => (
          <a
            key={s}
            href={`/admin/pedidos?estado=${s}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              statusFilter === s
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary"
            }`}
          >
            {statusLabels[s]}
          </a>
        ))}
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
