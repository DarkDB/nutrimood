import type { Metadata } from "next";
import { db } from "@/lib/db";
import { MetricsCards } from "@/components/admin/metrics-cards";
import { OrdersTable } from "@/components/admin/orders-table";

export const metadata: Metadata = { title: "Dashboard — Admin NutriMood" };

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [revenueToday, revenueWeek, revenueMonth, ordersCount, pendingCount, customersCount, lowStockProducts, recentOrders] =
    await Promise.all([
      db.order.aggregate({ _sum: { total: true }, where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] }, createdAt: { gte: startOfToday } } }),
      db.order.aggregate({ _sum: { total: true }, where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] }, createdAt: { gte: startOfWeek } } }),
      db.order.aggregate({ _sum: { total: true }, where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] }, createdAt: { gte: startOfMonth } } }),
      db.order.count(),
      db.order.count({ where: { status: "PENDING" } }),
      db.customer.count(),
      db.product.findMany({ where: { active: true }, select: { stock: true, lowStockAlert: true } }),
      db.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, customerName: true, customerEmail: true, total: true, status: true, createdAt: true },
      }),
    ]);

  const stockCritical = lowStockProducts.some((p: { stock: number; lowStockAlert: number }) => p.stock <= p.lowStockAlert);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-heading font-bold text-primary">Dashboard</h1>

      <MetricsCards
        revenueToday={revenueToday._sum.total ?? 0}
        revenueWeek={revenueWeek._sum.total ?? 0}
        revenueMonth={revenueMonth._sum.total ?? 0}
        ordersTotal={ordersCount}
        ordersPending={pendingCount}
        customersTotal={customersCount}
        stockCritical={stockCritical}
      />

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Últimos pedidos</h2>
        <OrdersTable orders={recentOrders} />
      </div>
    </div>
  );
}
