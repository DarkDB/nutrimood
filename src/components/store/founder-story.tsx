import { Quote } from "lucide-react";

export function FounderStory() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Eyebrow */}
          <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-4">
            Por qué existe MoodCalm
          </p>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-10 leading-tight">
            No lo creé para vender un suplemento.
            <br />
            <span className="text-accent">Lo creé para mi mujer.</span>
          </h2>

          {/* Story body */}
          <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px] sm:text-base">
            <p>
              La primera vez que me di cuenta de verdad fue un martes por la mañana.
              Las niñas dormían. Mi mujer llevaba despierta desde las seis: respondiendo
              mensajes, organizando el día mentalmente, cargando con todo antes de que
              empezara nada.
            </p>
            <p>
              No era ese martes. Era todos los días.
            </p>
            <p>
              Tiene proyectos que quiere sacar adelante, ideas que no paran, dos niñas
              a las que quiere darlo todo. No le falta motivación ni ganas. Pero a medida
              que avanzaban las horas, la veía vaciarse. La ansiedad le subía despacio,
              silenciosa, hasta que al final del día quedaba muy poco de ella.
            </p>
            <p>
              Busqué algo natural. Sin fármacos, sin estimulantes que la pusieran más
              al límite. Junto a un nutricionista especializado, investigamos durante meses
              qué ingredientes tienen respaldo científico real para ayudar al sistema
              nervioso a regular el cortisol desde dentro — no a taparlo, a regularlo.
            </p>
            <p>
              No fue rápido. Pero dimos con la combinación.
            </p>

            {/* Pull quote */}
            <blockquote className="relative my-8 pl-6 border-l-2 border-accent">
              <Quote
                size={20}
                className="absolute -left-1 -top-1 text-accent/40"
                strokeWidth={1.5}
              />
              <p className="text-base sm:text-xl font-heading font-semibold text-primary italic leading-snug">
                &ldquo;El momento de tomármelo es como un respiro.&rdquo;
              </p>
              <cite className="block mt-2 text-sm text-muted-foreground not-italic">
                Mi mujer. Semana 3.
              </cite>
            </blockquote>

            <p>
              Las primeras semanas no notamos gran cosa — y eso era de esperar. El cuerpo
              necesita tiempo para recalibrar. Pero hacia el final de la tercera semana,
              esa frase lo cambió todo para mí.
            </p>
            <p>
              No se le fue la ansiedad de golpe. Se fue suavizando. Hoy llega mejor al
              final del día. Se siente menos angustiada. Y yo lo noto.
            </p>
          </div>

          {/* Sign-off */}
          <div className="mt-10 pt-8 border-t border-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">NM</span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">El fundador de NutriMood</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Formulado junto a nutricionistas · Dosis clínicas reales · Sin atajos
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
