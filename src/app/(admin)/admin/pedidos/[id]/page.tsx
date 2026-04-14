import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { render } from "@react-email/components";
import ShippingUpdate from "@/../emails/shipping-update";
import type { OrderStatus, ShippingAddress } from "@/types";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = { title: "Detalle de pedido — Admin NutriMood" };

interface PageProps {
  params: Promise<{ id: string }>;
}

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export default async function PedidoDetailPage({ params }: PageProps) {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order) notFound();

  const addr = order.shippingAddress as unknown as ShippingAddress;

  async function updateOrder(formData: FormData) {
    "use server";
    const newStatus = formData.get("status") as OrderStatus;
    const notes = formData.get("notes") as string;

    const updated = await db.order.update({
      where: { id },
      data: { status: newStatus, notes },
    });

    // Si el estado cambia a SHIPPED, enviar email
    if (newStatus === "SHIPPED" && order!.status !== "SHIPPED") {
      const html = await render(
        ShippingUpdate({ customerName: order!.customerName, orderId: id })
      );
      await resend.emails.send({
        from: FROM_EMAIL,
        to: order!.customerEmail,
        subject: `Tu MoodCalm está en camino — NutriMood`,
        html,
      });
    }

    // Si se cancela, devolver stock
    if (newStatus === "CANCELLED" && order!.status !== "CANCELLED") {
      for (const item of order!.items) {
        if (item.productId !== "unknown") {
          await db.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }
    }

    revalidatePath("/admin/pedidos");
    redirect(`/admin/pedidos/${id}`);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-primary">
          Pedido #{id.slice(0, 8).toUpperCase()}
        </h1>
        <Badge
          variant={
            order.status === "CANCELLED"
              ? "destructive"
              : order.status === "DELIVERED"
              ? "default"
              : "secondary"
          }
        >
          {statusLabels[order.status]}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Info cliente */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-2">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Cliente
          </h2>
          <p className="font-medium">{order.customerName}</p>
          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
          {order.customerPhone && (
            <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
          )}
        </div>

        {/* Dirección */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-2">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Dirección de envío
          </h2>
          <p className="text-sm">{addr.street}</p>
          <p className="text-sm">
            {addr.postcode} {addr.city}
          </p>
          <p className="text-sm">{addr.country}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Producto</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground">Cant.</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Precio unit.</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {order.items.map((item: { id: string; productId: string; quantity: number; unitPrice: number; product?: { name: string } | null }) => (
              <tr key={item.id}>
                <td className="px-4 py-3">{item.product?.name ?? "Producto eliminado"}</td>
                <td className="px-4 py-3 text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-right">{formatPrice(item.unitPrice)}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {formatPrice(item.unitPrice * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-muted border-t border-border">
            <tr>
              <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground text-xs">Subtotal</td>
              <td className="px-4 py-2 text-right">{formatPrice(order.subtotal)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground text-xs">IVA</td>
              <td className="px-4 py-2 text-right">{formatPrice(order.tax)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="px-4 py-2 text-right text-muted-foreground text-xs">Envío</td>
              <td className="px-4 py-2 text-right">
                {order.shippingCost === 0 ? "Gratis" : formatPrice(order.shippingCost)}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="px-4 py-3 text-right font-bold">Total</td>
              <td className="px-4 py-3 text-right font-bold text-primary">
                {formatPrice(order.total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Formulario de actualización */}
      <form action={updateOrder} className="bg-card border border-border rounded-lg p-5 space-y-4">
        <h2 className="font-semibold text-foreground">Actualizar pedido</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Estado</label>
            <select
              name="status"
              defaultValue={order.status}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              {(Object.keys(statusLabels) as OrderStatus[]).map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Notas internas</label>
          <textarea
            name="notes"
            defaultValue={order.notes ?? ""}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none"
            placeholder="Notas visibles solo para el admin..."
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-light transition-colors"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
