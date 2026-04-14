import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { OrdersTable } from "@/components/admin/orders-table";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Cliente — Admin NutriMood" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClienteDetailPage({ params }: PageProps) {
  const { id } = await params;

  const customer = await db.customer.findUnique({ where: { id } });
  if (!customer) notFound();

  const orders = await db.order.findMany({
    where: { customerEmail: customer.email },
    orderBy: { createdAt: "desc" },
    select: { id: true, customerName: true, customerEmail: true, total: true, status: true, createdAt: true },
  });

  const totalSpent = orders
    .filter((o: { status: string }) => ["PAID", "SHIPPED", "DELIVERED"].includes(o.status))
    .reduce((sum: number, o: { total: number }) => sum + o.total, 0);

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-heading font-bold text-primary">{customer.name}</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Email</p>
          <p className="font-medium text-sm">{customer.email}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Cliente desde</p>
          <p className="font-medium text-sm">{formatDate(customer.createdAt)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total gastado</p>
          <p className="font-bold text-lg text-primary">
            {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(totalSpent / 100)}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Historial de pedidos</h2>
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
