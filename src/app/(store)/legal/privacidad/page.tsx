import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — NutriMood",
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">
        Política de Privacidad
      </h1>
      <p className="text-sm text-muted-foreground mb-8">Última actualización: abril 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Responsable del tratamiento</h2>
          <p>
            NutriMood (en adelante, &quot;la empresa&quot;) es responsable del tratamiento de los datos
            personales recogidos a través de este sitio web. Contacto: hola@nutrimood.es
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. Datos que recopilamos</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre y apellidos</li>
            <li>Dirección de email</li>
            <li>Dirección de envío</li>
            <li>Teléfono (opcional)</li>
            <li>Datos de navegación (cookies técnicas de Stripe)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Finalidad del tratamiento</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Gestión y envío de pedidos</li>
            <li>Comunicaciones relacionadas con el pedido (confirmación, envío)</li>
            <li>Cumplimiento de obligaciones legales y fiscales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Base legal</h2>
          <p>
            El tratamiento se basa en la ejecución del contrato de compraventa (Art. 6.1.b RGPD)
            y en el cumplimiento de obligaciones legales (Art. 6.1.c RGPD).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">5. Destinatarios</h2>
          <p>
            Tus datos pueden ser compartidos con: Stripe Inc. (procesador de pagos), empresas de
            transporte para la entrega del pedido, y Resend Inc. (envío de emails transaccionales).
            Todos los encargados de tratamiento están sujetos a acuerdos de protección de datos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">6. Conservación de datos</h2>
          <p>
            Conservamos tus datos durante el tiempo necesario para gestionar tu relación comercial
            con nosotros y cumplir con las obligaciones legales (generalmente 5 años para datos
            fiscales en España).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">7. Tus derechos (RGPD)</h2>
          <p>
            Tienes derecho de acceso, rectificación, supresión, limitación, portabilidad y oposición.
            Para ejercerlos, escríbenos a hola@nutrimood.es indicando tu solicitud. También puedes
            presentar una reclamación ante la AEPD (aepd.es).
          </p>
        </section>
      </div>
    </div>
  );
}
