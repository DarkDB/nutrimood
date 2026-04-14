import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Clientes — Admin NutriMood" };

export default async function ClientesPage() {
  const customers = await db.customer.findMany({ orderBy: { createdAt: "desc" } });

  // Enriquecer con datos de pedidos
  const enriched = await Promise.all(
    customers.map(async (c: { id: string; email: string; name: string; phone: string | null; createdAt: Date }) => {
      const agg = await db.order.aggregate({
        where: { customerEmail: c.email, status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
        _count: true,
        _sum: { total: true },
      });
      return { ...c, totalOrders: agg._count, totalSpent: agg._sum.total ?? 0 };
    })
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-primary">Clientes</h1>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Nombre</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Pedidos</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Total gastado</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Cliente desde</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {enriched.map((c: { id: string; email: string; name: string; createdAt: Date; totalOrders: number; totalSpent: number }) => (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium text-primary">
                  <Link href={`/admin/clientes/${c.id}`} className="hover:underline">
                    {c.email}
                  </Link>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.totalOrders}</td>
                <td className="px-4 py-3 font-semibold">
                  {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(c.totalSpent / 100)}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {formatDate(c.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
