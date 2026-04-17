import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Button,
  Hr,
  Preview,
} from "@react-email/components";

interface WelcomeDiscountProps {
  discountCode: string;
  productUrl: string;
}

export default function WelcomeDiscount({
  discountCode,
  productUrl,
}: WelcomeDiscountProps) {
  return (
    <Html>
      <Head />
      <Preview>Tu código exclusivo {discountCode} — 10% de descuento en MoodCalm</Preview>
      <Body style={{ backgroundColor: "#FAFAF9", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: "580px", margin: "0 auto", padding: "32px 16px" }}>
          {/* Header */}
          <Section style={{ textAlign: "center", marginBottom: "32px" }}>
            <Heading
              style={{ color: "#2D4A3E", fontSize: "28px", fontWeight: "700", margin: "0" }}
            >
              NutriMood
            </Heading>
          </Section>

          <Heading
            style={{ color: "#1C1917", fontSize: "22px", fontWeight: "600", margin: "0 0 12px" }}
          >
            Aquí tienes tu 10% de descuento
          </Heading>

          <Text style={{ color: "#78716C", marginTop: "0", lineHeight: "1.6" }}>
            Gracias por unirte a la comunidad NutriMood. Te hemos reservado este código
            exclusivo para tu primer pedido:
          </Text>

          {/* Código */}
          <Section
            style={{
              border: "2px dashed #D4845A",
              borderRadius: "8px",
              padding: "20px",
              margin: "24px 0",
              textAlign: "center",
              backgroundColor: "#FFF8F5",
            }}
          >
            <Text style={{ margin: "0 0 6px", color: "#78716C", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Tu código
            </Text>
            <Text
              style={{
                margin: "0",
                color: "#D4845A",
                fontSize: "32px",
                fontWeight: "800",
                letterSpacing: "4px",
              }}
            >
              {discountCode}
            </Text>
            <Text style={{ margin: "8px 0 0", color: "#78716C", fontSize: "13px" }}>
              10% de descuento · Aplicar al finalizar la compra
            </Text>
          </Section>

          {/* Qué es MoodCalm */}
          <Section
            style={{
              backgroundColor: "#F0EDEB",
              borderRadius: "8px",
              padding: "20px",
              margin: "0 0 24px",
            }}
          >
            <Text style={{ margin: "0 0 8px", fontWeight: "700", color: "#1C1917" }}>
              MoodCalm — ¿qué es?
            </Text>
            <Text style={{ margin: "0", color: "#78716C", fontSize: "14px", lineHeight: "1.6" }}>
              Un suplemento en polvo con dosis clínicas de KSM-66® Ashwagandha, L-Theanine
              y Magnesio Glicinato para ayudar a tu cuerpo a regular el cortisol de forma natural.
              Sin estimulantes. Sin azúcar. Resultados visibles a partir de la 2ª–3ª semana.
            </Text>
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: "center", margin: "0 0 28px" }}>
            <Button
              href={productUrl}
              style={{
                backgroundColor: "#D4845A",
                color: "#ffffff",
                padding: "14px 32px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "15px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Usar mi descuento ahora
            </Button>
            <Text style={{ margin: "8px 0 0", color: "#A8A29E", fontSize: "12px" }}>
              Garantía de satisfacción 30 días · Envío 24–48h
            </Text>
          </Section>

          <Text style={{ color: "#78716C", fontSize: "13px", lineHeight: "1.6" }}>
            Próximamente recibirás también guías, consejos y novedades sobre bienestar y
            gestión del estrés. Sin spam — solo contenido útil.
          </Text>

          <Hr style={{ borderColor: "#D6D3D1", margin: "24px 0" }} />
          <Text style={{ color: "#A8A29E", fontSize: "12px", textAlign: "center" }}>
            NutriMood · hola@nutrimood.es · España
            <br />
            <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={{ color: "#A8A29E" }}>
              Darse de baja
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
