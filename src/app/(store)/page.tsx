export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { SP } from "@/lib/social-proof";
import Link from "next/link";
import { Brain, Moon, Zap, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Hero } from "@/components/store/hero";
import { TrustBadges } from "@/components/store/trust-badges";
import { PainSection } from "@/components/store/pain-section";
import { IngredientsTable } from "@/components/store/ingredients-table";
import { ComparisonTable } from "@/components/store/comparison-table";
import { ForWhom } from "@/components/store/for-whom";
import { Testimonials } from "@/components/store/testimonials";
import { FounderStory } from "@/components/store/founder-story";
import { FAQ } from "@/components/store/faq";

export const metadata: Metadata = {
  title: "NutriMood — Controla el cortisol. Recupera tu calma.",
};

const benefits = [
  {
    icon: Brain,
    title: "Menos ansiedad matutina",
    description:
      "El KSM-66 reduce el cortisol sérico hasta un 27% en estudios clínicos. Despierta sin ese peso en el pecho.",
  },
  {
    icon: Moon,
    title: "Duerme como antes",
    description:
      "El magnesio glicinato activa el sistema nervioso parasimpático. Tu cuerpo aprende a apagar el modo alerta.",
  },
  {
    icon: Zap,
    title: "Rinde sin agotarte",
    description:
      "La L-Theanine da foco y calma sin cafeína. Trabaja a fondo sin acabar vacío a las 6 de la tarde.",
  },
];

const steps = [
  {
    num: "01",
    title: "Tomar",
    desc: "Un cacito en agua o batido cada mañana. 30 segundos de tu rutina.",
  },
  {
    num: "02",
    title: "Sentir",
    desc: "En 2–4 semanas tu sistema nervioso empieza a recalibrar. Menos picos de cortisol.",
  },
  {
    num: "03",
    title: "Controlar",
    desc: "A los 2 meses, gestionas el estrés desde un estado de base más estable.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — propuesta de valor + CTA inmediato */}
      <Hero />

      {/* 2. Social Proof bar — validación rápida */}
      <section className="py-10 border-y border-border bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">⭐ {SP.reviewScore}/5 · +{SP.totalCustomers} clientes</span>
            <span className="hidden sm:block text-border">|</span>
            <span>Formulado por nutricionistas</span>
            <span className="hidden sm:block text-border">|</span>
            <span>Certificado GMP</span>
            <span className="hidden sm:block text-border">|</span>
            <span>KSM-66® Ashwagandha patentado</span>
            <span className="hidden sm:block text-border">|</span>
            <span>Garantía 30 días</span>
          </div>
        </div>
      </section>

      {/* 3. Trust badges — confianza visual */}
      <TrustBadges />

      {/* 4. Dolor/problema — identificación emocional */}
      <PainSection />

      {/* 5. Beneficios — solución concreta */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
              ¿Qué hace MoodCalm por ti?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              No es relajarse. Es recuperar tu capacidad natural de gestionar el estrés.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <b.icon size={24} strokeWidth={1.5} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Ingredientes — prueba científica */}
      <IngredientsTable />

      {/* 7. CTA intermedio — capturar a los ya convencidos */}
      <section className="py-12 bg-muted border-y border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
            <div>
              <p className="font-heading font-bold text-xl text-primary">
                MoodCalm · 20 sobres · 32 €
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Solo 1,60 €/sobre · Envío 24–48h · Garantía 30 días
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/productos/moodcalm"
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold transition-colors"
              >
                Comprar ahora
              </Link>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-success" /> 30 días garantía</span>
                <span className="flex items-center gap-1"><Truck size={12} className="text-primary" /> Envío gratis +50 €</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Cómo funciona */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
              Cómo funciona
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Un ritual de 30 segundos. Resultados que se construyen semana a semana.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4">
                <span className="text-3xl font-heading font-bold text-accent/30 shrink-0">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Comparativa — diferenciación */}
      <ComparisonTable />

      {/* 10. Para quién es — honestidad que convierte */}
      <ForWhom />

      {/* 11. Historia del fundador — conexión emocional */}
      <FounderStory />

      {/* 12. Testimonios — prueba social ampliada */}
      <Testimonials />

      {/* 12. FAQ */}
      <FAQ />

      {/* 13. CTA Final con garantías prominentes */}
      <section className="py-16 sm:py-24 bg-primary">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Sin riesgo
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground">
            Tómalo 3 semanas. Si no notas nada, te devolvemos el dinero.
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md mx-auto">
            MoodCalm por solo <strong className="text-primary-foreground">32 €</strong> (20 sobres · 1,60 €/sobre).
            Los ingredientes necesitan tiempo para actuar. Dales 3 semanas — si no notas diferencia, te reembolsamos el 100%. Sin complicaciones.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/productos/moodcalm"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-base transition-colors"
            >
              Comprar MoodCalm — 32 €
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-primary-foreground/70">
            {[
              { icon: ShieldCheck, text: "Garantía 30 días" },
              { icon: Truck, text: "Envío 24–48h" },
              { icon: RotateCcw, text: "Devolución gratis" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={14} strokeWidth={1.5} className="text-accent" />
                {text}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xs text-primary-foreground/50">
            IVA incluido · Pago seguro con Stripe · Datos protegidos
          </p>
        </div>
      </section>
    </>
  );
}
