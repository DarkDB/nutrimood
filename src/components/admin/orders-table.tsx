import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Order } from "@/types";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING: { label: "Pendiente", variant: "secondary" },
  PAID: { label: "Pagado", variant: "default" },
  SHIPPED: { label: "Enviado", variant: "outline" },
  DELIVERED: { label: "Entregado", variant: "default" },
  CANCELLED: { label: "Cancelado", variant: "destructive" },
};

interface OrdersTableProps {
  orders: Pick<Order, "id" | "customerName" | "customerEmail" | "total" | "status" | "createdAt">[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return <p className="text-muted-foreground text-sm py-8 text-center">Sin pedidos todavía.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted border-b border-border">
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Fecha</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Cliente</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Email</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Total</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Estado</th>
            <th className="text-right px-4 py-3 font-medium text-muted-foreground">Acción</th>
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {orders.map((order) => {
            const status = statusConfig[order.status] ?? { label: order.status, variant: "secondary" as const };
            return (
              <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{order.customerName}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                  {order.customerEmail}
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">
                  {formatPrice(order.total)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/pedidos/${order.id}`}
                    className="text-primary hover:underline font-medium text-xs"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
