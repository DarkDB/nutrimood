import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Truck, RotateCcw, Star, Zap, Users } from "lucide-react";
import { PackSelector } from "@/components/store/pack-selector";
import { PaymentBadges } from "@/components/store/payment-badges";
import { ProductPageClient } from "./product-page-client";
import { FounderStory } from "@/components/store/founder-story";
import { db } from "@/lib/db";
import { SP } from "@/lib/social-proof";

export const metadata: Metadata = {
  title: "MoodCalm — Suplemento para el control del estrés",
  description:
    "MoodCalm con 300 mg KSM-66® Ashwagandha, 400 mg L-Theanine y Magnesio Glicinato. Sin azúcar, sin OGM. Reduce el cortisol y recupera tu calma. 32 € · 20 sobres · Envío a España.",
};

const ingredientsDetail = [
  {
    name: "KSM-66® Ashwagandha",
    dose: "300 mg",
    desc: "El extracto de raíz más estudiado del mercado con más de 22 estudios clínicos. A 300 mg/día — la dosis exacta de los estudios — reduce el cortisol sérico hasta un 27% y mejora la resistencia al estrés.",
  },
  {
    name: "L-Theanine",
    dose: "400 mg",
    desc: "Dosis clínica superior de este aminoácido del té verde. Induce ondas alfa cerebrales — relajación alerta, sin somnolencia. Acción visible en 30–60 minutos.",
  },
  {
    name: "Magnesio Glicinato",
    dose: "100 mg",
    desc: "La forma de magnesio con mejor absorción intestinal. Se une directamente al sistema nervioso para calmar la hiperactivación neuronal sin efectos secundarios.",
  },
  {
    name: "Vitamina D3",
    dose: "1.000 UI",
    desc: "El 70% de los españoles tiene déficit de vitamina D. Influye directamente en el estado de ánimo, la inmunidad y la recuperación del sistema nervioso.",
  },
];

const reviews = [
  {
    name: "Laura M.",
    location: "Madrid",
    rating: 5,
    date: "Hace 3 días",
    verified: true,
    text: "Llevaba meses con ansiedad matutina. Desde la tercera semana noto una diferencia brutal. Lo recomiendo a todo el mundo.",
  },
  {
    name: "Carlos P.",
    location: "Barcelona",
    rating: 5,
    date: "Hace 1 semana",
    verified: true,
    text: "Soy escéptico con los suplementos pero los ingredientes y las dosis me convencieron. El cortisol ha bajado según mi analítica.",
  },
  {
    name: "Sara G.",
    location: "Valencia",
    rating: 5,
    date: "Hace 2 semanas",
    verified: true,
    text: "El magnesio glicinato marca la diferencia antes de dormir. Duermo mejor y me levanto más descansada.",
  },
];

export default async function MoodCalmPage() {
  const product = await db.product.findUnique({
    where: { slug: "moodcalm", active: true },
  });

  const p = product ?? {
    id: "dev-moodcalm",
    name: "MoodCalm",
    slug: "moodcalm",
    price: 3200,
    stock: 100,
    description: "",
  };

  const stockPct = Math.min(100, Math.round((p.stock / 150) * 100));
  const isLowStock = p.stock > 0 && p.stock <= 20;
  const pricePerSachet = (p.price / 100 / 20).toFixed(2);

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-6">
          <span>Inicio</span>
          <span className="mx-1.5">›</span>
          <span className="text-foreground font-medium">MoodCalm</span>
        </nav>

        {/* Producto principal */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Imagen */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl bg-muted overflow-hidden border border-border">
              <Image
                src="/moodcalm-producto.png"
                alt="MoodCalm suplemento en polvo"
                fill
                className="object-contain p-12"
                priority
              />
              {isLowStock && (
                <div className="absolute top-3 left-3 bg-destructive text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  ¡Últimas unidades!
                </div>
              )}
            </div>

            {/* Social proof flotante */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users size={14} strokeWidth={1.5} className="text-primary" />
                <strong className="text-foreground">{SP.totalCustomers}</strong> clientes
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="fill-accent text-accent" />
                <strong className="text-foreground">{SP.reviewScore}/5</strong> valoración
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={14} strokeWidth={1.5} className="text-accent" />
                Envío 24–48h
              </span>
            </div>
          </div>

          {/* Info + compra — wrapeado en client component para sticky CTA */}
          <ProductPageClient product={p}>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-1">
                  NutriMood
                </p>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
                  MoodCalm
                </h1>
                <p className="text-muted-foreground mt-1">
                  Polvo para disolver · 20 sobres · Frambuesa y limón
                </p>
              </div>

              {/* Valoraciones */}
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{SP.reviewScore}</span>
                <span className="text-sm text-muted-foreground">({SP.reviewCount} valoraciones verificadas)</span>
              </div>

              {/* Precio base */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-heading font-bold text-primary">desde 32 €</span>
                <span className="text-sm text-muted-foreground">
                  · <strong className="text-foreground">{pricePerSachet} €/sobre</strong> el pack individual
                </span>
              </div>

              {/* Stock */}
              {p.stock > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={isLowStock ? "text-destructive font-semibold" : "text-muted-foreground"}>
                      {isLowStock ? `⚠ Solo quedan ${p.stock} unidades` : `Stock disponible: ${p.stock} uds`}
                    </span>
                    <span className="text-muted-foreground">{stockPct}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isLowStock ? "bg-destructive" : "bg-success"
                      }`}
                      style={{ width: `${stockPct}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Descripción corta */}
              <p className="text-muted-foreground leading-relaxed border-l-2 border-accent pl-4">
                300 mg KSM-66® · 400 mg L-Theanine · 100 mg Magnesio Glicinato · 1.000 UI D3.
                Sin azúcar, sin OGM, sin ingredientes artificiales. Resultados visibles a partir de la 2ª–3ª semana.
              </p>

              {/* Garantías rápidas */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-border">
                {[
                  { icon: Shield, text: "Garantía 30 días" },
                  { icon: Truck, text: "Envío gratis +50 €" },
                  { icon: RotateCcw, text: "Devolución gratis" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center text-center gap-1">
                    <Icon size={18} strokeWidth={1.5} className="text-primary" />
                    <span className="text-xs text-muted-foreground font-medium leading-tight">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTA — selector de pack */}
              <div id="comprar">
                <PackSelector
                  productId={p.id}
                  productName={p.name}
                  productSlug={p.slug}
                  basePrice={p.price}
                  stock={p.stock}
                />
              </div>

              {/* Métodos de pago */}
              <PaymentBadges />

              {/* Social proof urgencia */}
              <p className="text-xs text-center text-muted-foreground bg-muted rounded-lg py-2 px-3">
                🔥 <strong className="text-foreground">{SP.weeklyBuyers} personas</strong> han comprado MoodCalm esta semana
              </p>
            </div>
          </ProductPageClient>
        </div>

        {/* Beneficios clave */}
        <div className="mt-16 sm:mt-20 grid sm:grid-cols-3 gap-6 py-10 border-y border-border">
          {[
            { emoji: "🧠", title: "Calma el sistema nervioso", desc: "El KSM-66 actúa sobre el eje HPA regulando la producción de cortisol desde la raíz." },
            { emoji: "😴", title: "Mejora el sueño profundo", desc: "El magnesio glicinato activa el sistema parasimpático para que el cuerpo entre en modo recuperación." },
            { emoji: "⚡", title: "Más foco, menos agotamiento", desc: "La L-Theanine genera ondas alfa. Trabajas a fondo sin vaciar las reservas." },
          ].map((b) => (
            <div key={b.title} className="flex gap-4">
              <span className="text-2xl shrink-0">{b.emoji}</span>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ingredientes detalle */}
        <div className="mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            Fórmula sin secretos
          </h2>
          <p className="text-muted-foreground mb-8">
            Sin proprietary blends. Sin rellenos. Cada ingrediente tiene una razón de estar y una dosis que funciona.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ingredientsDetail.map((ing) => (
              <div key={ing.name} className="bg-muted border border-border rounded-xl p-5">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-semibold text-foreground">{ing.name}</h3>
                  <span className="text-sm font-bold text-accent shrink-0">{ing.dose}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Historia del fundador */}
        <div className="mt-16 sm:mt-20 -mx-4 sm:-mx-6">
          <FounderStory />
        </div>

        {/* Reviews */}
        <div className="mt-0 sm:mt-4">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                Opiniones verificadas
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{SP.reviewScore}/5 · {SP.reviewCount} opiniones</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div key={r.name} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={13} className="fill-accent text-accent" />
                    ))}
                  </div>
                  {r.verified && (
                    <span className="text-[10px] text-success font-semibold bg-success/10 px-2 py-0.5 rounded-full">
                      ✓ Compra verificada
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">&quot;{r.text}&quot;</p>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.location}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garantía prominente */}
        <div className="mt-16 sm:mt-20 bg-primary rounded-2xl p-8 sm:p-10 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-foreground mb-3">
            Garantía de satisfacción 30 días
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto text-sm leading-relaxed mb-6">
            Si en 30 días no notas diferencia en cómo gestionas el estrés, te devolvemos el 100% del dinero.
            Sin preguntas, sin complicaciones. Solo escríbenos a hola@nutrimood.es.
          </p>
          <a
            href="#comprar"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            Elegir mi pack
          </a>
          <p className="mt-4 text-xs text-primary-foreground/50">
            Desde 32 € · Envío 24–48h · Devolución gratuita
          </p>
        </div>
      </div>
    </>
  );
}
