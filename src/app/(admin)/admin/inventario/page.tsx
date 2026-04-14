import type { Metadata } from "next";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Inventario — Admin NutriMood" };

export default async function InventarioPage() {
  const products = await db.product.findMany({ orderBy: { name: "asc" } });

  async function updateStock(formData: FormData) {
    "use server";
    const productId = formData.get("productId") as string;
    const newStock = parseInt(formData.get("stock") as string, 10);
    if (isNaN(newStock) || newStock < 0) return;

    await db.product.update({ where: { id: productId }, data: { stock: newStock } });
    revalidatePath("/admin/inventario");
    redirect("/admin/inventario");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-primary">Inventario</h1>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Producto</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Precio</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Stock</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Estado</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actualizar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p: { id: string; name: string; price: number; stock: number; lowStockAlert: number; active: boolean }) => {
              const isCritical = p.stock <= p.lowStockAlert;
              const isOut = p.stock === 0;
              return (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{p.stock}</td>
                  <td className="px-4 py-3">
                    {isOut ? (
                      <Badge variant="destructive">Sin stock</Badge>
                    ) : isCritical ? (
                      <Badge variant="outline" className="text-accent border-accent">
                        Stock bajo
                      </Badge>
                    ) : (
                      <Badge variant="secondary">OK</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateStock} className="flex items-center gap-2">
                      <input type="hidden" name="productId" value={p.id} />
                      <input
                        type="number"
                        name="stock"
                        defaultValue={p.stock}
                        min={0}
                        className="w-20 px-2 py-1 border border-input rounded text-sm"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary-light transition-colors"
                      >
                        Guardar
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
