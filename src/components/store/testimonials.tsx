import { Star } from "lucide-react";
import { SP } from "@/lib/social-proof";

const testimonials = [
  {
    name: "Laura M.",
    location: "Madrid",
    rating: 5,
    date: "Hace 3 días",
    text: "Llevaba meses con ansiedad matutina y no encontraba nada que funcionara sin efectos secundarios. Desde la tercera semana de MoodCalm noto una diferencia brutal en cómo gestiono el estrés del trabajo.",
    initials: "LM",
  },
  {
    name: "Carlos P.",
    location: "Barcelona",
    rating: 5,
    date: "Hace 1 semana",
    text: "Soy muy escéptico con los suplementos pero me convenció la transparencia de los ingredientes y las dosis. El sabor es suave y se mezcla bien. Seguimiento del cortisol y está bajando.",
    initials: "CP",
  },
  {
    name: "Sara G.",
    location: "Valencia",
    rating: 5,
    date: "Hace 2 semanas",
    text: "El punto clave para mí fue el magnesio glicinato — el estándar tiene un sabor horrible y me sentaba mal. MoodCalm se nota inmediatamente antes de dormir. Duermo mucho mejor.",
    initials: "SG",
  },
  {
    name: "Javier R.",
    location: "Sevilla",
    rating: 5,
    date: "Hace 3 semanas",
    text: "Trabajo en banca de inversión, el nivel de estrés es constante. Llevo 6 semanas tomándolo y la diferencia en cómo llego al final del día es notable. Sigo rindiendo pero sin ese agotamiento mental.",
    initials: "JR",
  },
  {
    name: "Ana T.",
    location: "Bilbao",
    rating: 5,
    date: "Hace 1 mes",
    text: "Lo probé con escepticismo y ahora no lo dejaría. Me ayuda especialmente en los ciclos de estrés previos a presentaciones importantes. Menos tensión, más claridad.",
    initials: "AT",
  },
  {
    name: "Miguel F.",
    location: "Zaragoza",
    rating: 5,
    date: "Hace 5 semanas",
    text: "Probé el magnesio por separado durante un año. MoodCalm combina todo en la dosis correcta y se nota la diferencia. El sueño ha mejorado significativamente desde la segunda semana.",
    initials: "MF",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-accent text-accent" />
      ))}
    </div>
  );
}

const avatarColors = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-white",
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-white",
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Stars count={5} />
            <span className="text-sm text-muted-foreground">{SP.reviewScore}/5 · {SP.reviewCount} opiniones verificadas</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-xl p-5 flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center justify-between mb-3">
                <Stars count={t.rating} />
                <span className="text-[10px] text-success font-semibold bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">
                  ✓ Compra verificada
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">&quot;{t.text}&quot;</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[i]}`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location} · {t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
