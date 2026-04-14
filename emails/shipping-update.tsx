import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
  Preview,
} from "@react-email/components";

interface ShippingUpdateProps {
  customerName: string;
  orderId: string;
  trackingNumber?: string;
}

export default function ShippingUpdate({
  customerName,
  orderId,
  trackingNumber,
}: ShippingUpdateProps) {
  return (
    <Html>
      <Head />
      <Preview>Tu MoodCalm está en camino, {customerName} 🚀</Preview>
      <Body style={{ backgroundColor: "#FAFAF9", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: "580px", margin: "0 auto", padding: "32px 16px" }}>
          <Section style={{ textAlign: "center", marginBottom: "32px" }}>
            <Heading
              style={{ color: "#2D4A3E", fontSize: "28px", fontWeight: "700", margin: "0" }}
            >
              NutriMood
            </Heading>
          </Section>

          <Heading
            style={{ color: "#1C1917", fontSize: "24px", fontWeight: "600", margin: "0 0 8px" }}
          >
            Tu MoodCalm está en camino 🚀
          </Heading>

          <Text style={{ color: "#78716C" }}>
            Hola {customerName}, tu pedido #{orderId.slice(0, 8).toUpperCase()} ha sido enviado
            y llegará en los próximos 1–3 días laborables.
          </Text>

          {trackingNumber && (
            <Section
              style={{
                backgroundColor: "#F0EDEB",
                borderRadius: "8px",
                padding: "16px",
                margin: "24px 0",
              }}
            >
              <Text style={{ margin: "0", color: "#1C1917", fontWeight: "600" }}>
                Número de seguimiento:
              </Text>
              <Text style={{ margin: "4px 0 0", color: "#2D4A3E", fontWeight: "700", fontSize: "18px" }}>
                {trackingNumber}
              </Text>
            </Section>
          )}

          <Text style={{ color: "#78716C" }}>
            Si tienes alguna duda sobre tu envío, escríbenos a{" "}
            <a href="mailto:hola@nutrimood.es" style={{ color: "#2D4A3E" }}>
              hola@nutrimood.es
            </a>
            .
          </Text>

          <Hr style={{ borderColor: "#D6D3D1", margin: "24px 0" }} />
          <Text style={{ color: "#78716C", fontSize: "12px", textAlign: "center" }}>
            NutriMood · hola@nutrimood.es · España
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
