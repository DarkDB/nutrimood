import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies — NutriMood",
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">
        Política de Cookies
      </h1>
      <p className="text-sm text-muted-foreground mb-8">Última actualización: abril 2026</p>

      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu
            dispositivo. Sirven para recordar tus preferencias y mejorar la experiencia.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Cookies que usamos
          </h2>

          <div className="overflow-x-auto rounded-lg border border-border mt-3">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Nombre</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Proveedor</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Finalidad</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-3 py-2 font-mono">__stripe_mid</td>
                  <td className="px-3 py-2">Stripe</td>
                  <td className="px-3 py-2">Prevención de fraude en pagos</td>
                  <td className="px-3 py-2">Técnica (necesaria)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">__stripe_sid</td>
                  <td className="px-3 py-2">Stripe</td>
                  <td className="px-3 py-2">Identificación de sesión de pago</td>
                  <td className="px-3 py-2">Técnica (necesaria)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">next-auth.session-token</td>
                  <td className="px-3 py-2">NutriMood</td>
                  <td className="px-3 py-2">Sesión del panel de administración</td>
                  <td className="px-3 py-2">Técnica (necesaria)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">nutrimood_cart</td>
                  <td className="px-3 py-2">NutriMood</td>
                  <td className="px-3 py-2">Persistencia del carrito (localStorage)</td>
                  <td className="px-3 py-2">Técnica (necesaria)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Cookies de terceros con fines analíticos o publicitarios
          </h2>
          <p>
            <strong className="text-foreground">No utilizamos</strong> cookies de analítica
            (Google Analytics, Facebook Pixel, etc.) ni de publicidad.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Gestión de cookies</h2>
          <p>
            Puedes configurar tu navegador para rechazar o eliminar cookies. Ten en cuenta que
            desactivar las cookies técnicas puede afectar al funcionamiento del proceso de pago.
            Consulta la ayuda de tu navegador para más información.
          </p>
        </section>
      </div>
    </div>
  );
}
