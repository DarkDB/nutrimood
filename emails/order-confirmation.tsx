import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Row,
  Column,
  Hr,
  Preview,
} from "@react-email/components";

interface OrderConfirmationProps {
  customerName: string;
  customerEmail: string;
  orderId: string;
  items: Array<{ name: string; quantity: number; unitPrice: number }>;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    cents / 100
  );
}

export default function OrderConfirmation({
  customerName,
  orderId,
  items,
  subtotal,
  tax,
  shippingCost,
  total,
  shippingAddress,
}: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>¡Gracias por tu pedido, {customerName}! Tu MoodCalm está en camino.</Preview>
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
            style={{ color: "#1C1917", fontSize: "24px", fontWeight: "600", margin: "0 0 8px" }}
          >
            ¡Gracias por tu pedido, {customerName}!
          </Heading>
          <Text style={{ color: "#78716C", marginTop: "0" }}>
            Pedido #{orderId.slice(0, 8).toUpperCase()}
          </Text>

          {/* Items */}
          <Section
            style={{
              backgroundColor: "#F0EDEB",
              borderRadius: "8px",
              padding: "16px",
              margin: "24px 0",
            }}
          >
            {items.map((item) => (
              <Row key={item.name} style={{ marginBottom: "8px" }}>
                <Column>
                  <Text style={{ margin: "0", color: "#1C1917", fontWeight: "500" }}>
                    {item.name} × {item.quantity}
                  </Text>
                </Column>
                <Column style={{ textAlign: "right" }}>
                  <Text style={{ margin: "0", color: "#1C1917" }}>
                    {formatPrice(item.unitPrice * item.quantity)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={{ borderColor: "#D6D3D1", margin: "12px 0" }} />

            <Row>
              <Column><Text style={{ margin: "2px 0", color: "#78716C", fontSize: "14px" }}>Subtotal</Text></Column>
              <Column style={{ textAlign: "right" }}><Text style={{ margin: "2px 0", fontSize: "14px" }}>{formatPrice(subtotal)}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={{ margin: "2px 0", color: "#78716C", fontSize: "14px" }}>IVA (21%)</Text></Column>
              <Column style={{ textAlign: "right" }}><Text style={{ margin: "2px 0", fontSize: "14px" }}>{formatPrice(tax)}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={{ margin: "2px 0", color: "#78716C", fontSize: "14px" }}>Envío</Text></Column>
              <Column style={{ textAlign: "right" }}><Text style={{ margin: "2px 0", fontSize: "14px" }}>{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={{ margin: "8px 0 2px", fontWeight: "700", color: "#2D4A3E" }}>Total</Text></Column>
              <Column style={{ textAlign: "right" }}><Text style={{ margin: "8px 0 2px", fontWeight: "700", color: "#2D4A3E", fontSize: "18px" }}>{formatPrice(total)}</Text></Column>
            </Row>
          </Section>

          {/* Dirección */}
          <Section style={{ marginBottom: "24px" }}>
            <Text style={{ fontWeight: "600", color: "#1C1917", marginBottom: "4px" }}>
              Dirección de envío:
            </Text>
            <Text style={{ color: "#78716C", margin: "0" }}>
              {shippingAddress.street}
              <br />
              {shippingAddress.postcode} {shippingAddress.city}
              <br />
              {shippingAddress.country}
            </Text>
          </Section>

          <Text style={{ color: "#78716C" }}>
            Te avisaremos cuando tu pedido esté en camino. Si tienes alguna duda, escríbenos
            a{" "}
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
