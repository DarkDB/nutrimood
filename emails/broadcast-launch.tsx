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

interface BroadcastLaunchProps {
  productUrl: string;
}

export default function BroadcastLaunch({
  productUrl = "https://nutrimood.es/productos/moodcalm",
}: BroadcastLaunchProps) {
  return (
    <Html>
      <Head />
      <Preview>Vi a mi mujer agotarse cada día. Por eso creé esto.</Preview>
      <Body style={{ backgroundColor: "#FAFAF9", fontFamily: "Georgia, serif" }}>
        <Container style={{ maxWidth: "580px", margin: "0 auto", padding: "40px 24px" }}>

          {/* Header */}
          <Section style={{ marginBottom: "36px" }}>
            <Text style={{
              margin: "0",
              fontFamily: "sans-serif",
              fontSize: "13px",
              fontWeight: "700",
              color: "#2D4A3E",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}>
              NutriMood
            </Text>
          </Section>

          {/* Headline */}
          <Heading style={{
            color: "#1C1917",
            fontSize: "26px",
            fontWeight: "700",
            lineHeight: "1.3",
            margin: "0 0 24px",
            fontFamily: "Georgia, serif",
          }}>
            Vi a mi mujer agotarse cada día.
            <br />
            Por eso creé MoodCalm.
          </Heading>

          {/* Story */}
          <Text style={{ color: "#57534E", lineHeight: "1.8", margin: "0 0 16px", fontSize: "15px" }}>
            Un martes por la mañana me di cuenta de que algo tenía que cambiar.
          </Text>

          <Text style={{ color: "#57534E", lineHeight: "1.8", margin: "0 0 16px", fontSize: "15px" }}>
            Mi mujer llevaba despierta desde las seis. Respondiendo mensajes,
            organizando el día, cargando con todo antes de que empezara nada.
            Dos niñas, mil proyectos, una cabeza que no para.
            No era ese martes. Era <em>todos los días</em>.
          </Text>

          <Text style={{ color: "#57534E", lineHeight: "1.8", margin: "0 0 16px", fontSize: "15px" }}>
            No le faltaban ganas ni fuerza de voluntad. Le sobraban. Pero a medida
            que avanzaban las horas, la veía vaciarse. La ansiedad le subía despacio,
            silenciosa, hasta que al final del día quedaba muy poco de ella.
          </Text>

          <Text style={{ color: "#57534E", lineHeight: "1.8", margin: "0 0 16px", fontSize: "15px" }}>
            Busqué algo natural. Sin fármacos, sin estimulantes. Junto a un nutricionista,
            investigamos durante meses qué ingredientes tienen respaldo científico real para
            ayudar al sistema nervioso a regular el cortisol desde dentro.
          </Text>

          {/* Pull quote */}
          <Section style={{
            borderLeft: "3px solid #D4845A",
            paddingLeft: "20px",
            margin: "28px 0",
          }}>
            <Text style={{
              color: "#2D4A3E",
              fontSize: "17px",
              fontStyle: "italic",
              fontWeight: "600",
              lineHeight: "1.5",
              margin: "0",
            }}>
              &ldquo;El momento de tomármelo es como un respiro.&rdquo;
            </Text>
            <Text style={{ color: "#A8A29E", fontSize: "13px", margin: "6px 0 0", fontFamily: "sans-serif" }}>
              Mi mujer. Semana 3.
            </Text>
          </Section>

          <Text style={{ color: "#57534E", lineHeight: "1.8", margin: "0 0 16px", fontSize: "15px" }}>
            No se le fue la ansiedad de golpe. Se fue suavizando, semana a semana.
            Hoy llega mejor al final del día. Se siente menos angustiada.
          </Text>

          <Text style={{ color: "#57534E", lineHeight: "1.8", margin: "0 0 28px", fontSize: "15px" }}>
            Eso es MoodCalm. No un milagro. Un pequeño respiro diario que,
            con el tiempo, marca la diferencia.
          </Text>

          {/* Producto */}
          <Section style={{
            backgroundColor: "#F0EDEB",
            borderRadius: "10px",
            padding: "20px 24px",
            margin: "0 0 28px",
          }}>
            <Text style={{
              margin: "0 0 6px",
              fontWeight: "700",
              color: "#1C1917",
              fontSize: "16px",
              fontFamily: "sans-serif",
            }}>
              MoodCalm — Suplemento en polvo
            </Text>
            <Text style={{ margin: "0 0 10px", color: "#78716C", fontSize: "13px", fontFamily: "sans-serif", lineHeight: "1.6" }}>
              300 mg KSM-66® Ashwagandha · 400 mg L-Theanine
              <br />
              100 mg Magnesio Glicinato · 1.000 UI Vitamina D3
              <br />
              Sin azúcar · Sin OGM · Sin estimulantes
            </Text>
            <Text style={{ margin: "0", color: "#2D4A3E", fontWeight: "700", fontSize: "15px", fontFamily: "sans-serif" }}>
              20 sobres · Desde 32 € · Envío 24–48h a España
            </Text>
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: "center", margin: "0 0 12px" }}>
            <Button
              href={productUrl}
              style={{
                backgroundColor: "#D4845A",
                color: "#ffffff",
                padding: "15px 40px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "15px",
                textDecoration: "none",
                display: "inline-block",
                fontFamily: "sans-serif",
              }}
            >
              Conocer MoodCalm
            </Button>
          </Section>
          <Text style={{
            textAlign: "center",
            color: "#A8A29E",
            fontSize: "12px",
            margin: "0 0 32px",
            fontFamily: "sans-serif",
          }}>
            Garantía de satisfacción 30 días · Sin riesgo
          </Text>

          {/* Sign-off */}
          <Text style={{ color: "#57534E", lineHeight: "1.8", margin: "0 0 8px", fontSize: "15px" }}>
            Si tienes cualquier duda, responde a este email.
            Las respondo yo personalmente.
          </Text>
          <Text style={{ color: "#57534E", lineHeight: "1.8", margin: "0 0 32px", fontSize: "15px" }}>
            Un saludo,
            <br />
            <strong style={{ color: "#2D4A3E" }}>El fundador de NutriMood</strong>
          </Text>

          <Hr style={{ borderColor: "#E7E5E4", margin: "0 0 20px" }} />

          <Text style={{
            color: "#A8A29E",
            fontSize: "11px",
            textAlign: "center",
            lineHeight: "1.6",
            fontFamily: "sans-serif",
            margin: "0",
          }}>
            NutriMood · hola@nutrimood.es · nutrimood.es
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
