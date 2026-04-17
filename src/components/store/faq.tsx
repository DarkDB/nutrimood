"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "¿Cuánto tiempo tarda en hacer efecto?",
    a: "La L-Theanine actúa en 30–60 minutos (calma inmediata). El KSM-66 necesita 4–8 semanas de uso consistente para reducir el cortisol de base. La mayoría nota cambios en la calidad del sueño y el estado de ánimo a partir de la segunda semana.",
  },
  {
    q: "¿Cómo se toma MoodCalm?",
    a: "Un cacito al día (1 dosis) mezclado en agua, zumo o batido. Recomendamos tomarlo por la mañana en tu ritual matutino o antes de la situación estresante que quieras gestionar mejor.",
  },
  {
    q: "¿Tiene cafeína o estimulantes?",
    a: "No. MoodCalm está formulado específicamente sin estimulantes. Puedes tomarlo por la noche sin que afecte a tu sueño — de hecho, el magnesio glicinato favorece la relajación antes de dormir.",
  },
  {
    q: "¿Es apto para veganos?",
    a: "Sí. Todos los ingredientes de MoodCalm son de origen vegetal o sintético. Sin productos animales, sin lactosa, sin gluten.",
  },
  {
    q: "¿Puedo devolverlo si no me funciona?",
    a: "Sí. Los ingredientes de MoodCalm necesitan tiempo para actuar — los estudios clínicos del KSM-66 se hacen a 4-8 semanas. Por eso te pedimos que lo tomes cada día durante al menos 3 semanas. Si tras ese tiempo no notas ninguna diferencia en cómo gestionas el estrés, te devolvemos el 100% del dinero. Sin complicaciones, solo escríbenos a hola@nutrimood.es. Además, como en toda la UE, tienes 14 días de derecho de desistimiento desde la entrega.",
  },
  {
    q: "¿Puedo tomarlo con otros suplementos o medicación?",
    a: "Si tomas medicación prescrita (especialmente para la tiroides, sedantes o inmunosupresores), consulta a tu médico antes de empezar. MoodCalm no interacciona con la mayoría de suplementos comunes.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  className={cn(
                    "shrink-0 ml-4 text-muted-foreground transition-transform duration-200",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
