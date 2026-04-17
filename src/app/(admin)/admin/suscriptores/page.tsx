import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Suscriptores — Admin NutriMood" };

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function SuscriptoresPage() {
  const subscribers = await db.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">Suscriptores</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {subscribers.length} emails recogidos via popup
          </p>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">Todavía no hay suscriptores.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Aparecerán aquí cuando alguien se suscriba desde el popup de la web.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Código descuento</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Origen</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{s.email}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {s.discount ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                        {s.discount}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell capitalize">
                    {s.source ?? "popup"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {formatDate(s.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
