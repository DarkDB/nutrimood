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

interface AbandonedCartProps {
  customerName?: string;
  productName?: string;
  productUrl: string;
}

export default function AbandonedCart({
  customerName,
  productName = "MoodCalm",
  productUrl,
}: AbandonedCartProps) {
  const greeting = customerName ? `Hola ${customerName},` : "Hola,";

  return (
    <Html>
      <Head />
      <Preview>Tu {productName} te sigue esperando — y tienes garantía de 30 días</Preview>
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
            {greeting} dejaste algo atrás
          </Heading>

          <Text style={{ color: "#78716C", marginTop: "0", lineHeight: "1.6" }}>
            Vimos que estabas a punto de hacerte con tu {productName} pero algo te interrumpió.
            Pasa — lo entendemos.
          </Text>

          <Text style={{ color: "#78716C", lineHeight: "1.6" }}>
            Tu carrito sigue guardado. Y si tienes alguna duda antes de comprar, escríbenos
            y te respondemos en menos de 24h.
          </Text>

          {/* Producto */}
          <Section
            style={{
              backgroundColor: "#F0EDEB",
              borderRadius: "8px",
              padding: "20px",
              margin: "24px 0",
            }}
          >
            <Text style={{ margin: "0 0 4px", fontWeight: "700", color: "#1C1917", fontSize: "16px" }}>
              {productName}
            </Text>
            <Text style={{ margin: "0 0 4px", color: "#78716C", fontSize: "14px" }}>
              300 mg KSM-66® · 400 mg L-Theanine · 100 mg Magnesio Glicinato
            </Text>
            <Text style={{ margin: "8px 0 0", color: "#2D4A3E", fontWeight: "600", fontSize: "15px" }}>
              Desde 32 € · 20 sobres
            </Text>
          </Section>

          {/* Garantía */}
          <Section
            style={{
              borderLeft: "3px solid #D4845A",
              paddingLeft: "16px",
              margin: "0 0 28px",
            }}
          >
            <Text style={{ margin: "0", color: "#1C1917", fontWeight: "600", fontSize: "14px" }}>
              Sin riesgo — garantía de satisfacción 30 días
            </Text>
            <Text style={{ margin: "4px 0 0", color: "#78716C", fontSize: "13px", lineHeight: "1.5" }}>
              Si en un mes no notas diferencia en cómo gestionas el estrés, te devolvemos
              el 100% del dinero. Sin preguntas, sin complicaciones.
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
              Retomar mi pedido
            </Button>
          </Section>

          <Text style={{ color: "#78716C", fontSize: "13px", lineHeight: "1.6" }}>
            ¿Tienes alguna duda? Escríbenos a{" "}
            <a href="mailto:hola@nutrimood.es" style={{ color: "#2D4A3E" }}>
              hola@nutrimood.es
            </a>{" "}
            y te ayudamos.
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
