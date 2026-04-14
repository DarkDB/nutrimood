import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — NutriMood",
  robots: { index: false },
};

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">
        Términos y Condiciones de Venta
      </h1>
      <p className="text-sm text-muted-foreground mb-8">Última actualización: abril 2026</p>

      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Identificación</h2>
          <p>
            NutriMood opera este sitio web de venta online. Contacto: hola@nutrimood.es
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. Productos y precios</h2>
          <p>
            Los precios indicados incluyen el IVA aplicable (21%). NutriMood se reserva el
            derecho de modificar precios en cualquier momento, pero los cambios no afectarán a
            pedidos ya confirmados.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Proceso de compra</h2>
          <p>
            El contrato de compraventa se perfecciona cuando recibes el email de confirmación del
            pedido. El pago se procesa de forma segura a través de Stripe.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Envíos</h2>
          <p>
            Enviamos exclusivamente a España peninsular, Baleares y Canarias. Plazo estimado de
            entrega: 2–4 días laborables desde la confirmación del pago. El envío es gratuito para
            pedidos superiores a 50 €.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            5. Derecho de desistimiento (14 días)
          </h2>
          <p>
            De acuerdo con la Directiva 2011/83/UE y el Real Decreto Legislativo 1/2007, tienes
            derecho a desistir del contrato en un plazo de 14 días naturales desde la recepción
            del producto, sin necesidad de justificación. Para ejercer este derecho, comunícalo a
            hola@nutrimood.es. Los gastos de devolución corren a cargo del cliente, salvo defecto
            del producto.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">6. Garantía de satisfacción</h2>
          <p>
            Adicionalmente a los derechos legales, ofrecemos una garantía de satisfacción de 30
            días. Si no estás satisfecho con el resultado, te devolvemos el importe íntegro previa
            devolución del producto.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">7. Legislación aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para cualquier
            controversia, las partes se someten a los juzgados y tribunales del domicilio del
            consumidor.
          </p>
        </section>
      </div>
    </div>
  );
}
