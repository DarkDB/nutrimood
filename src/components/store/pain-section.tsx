export function PainSection() {
  const pains = [
    {
      emoji: "😮‍💨",
      text: "Te despiertas ya cansado, con el peso del día encima antes de que empiece",
    },
    {
      emoji: "😤",
      text: "Pequeñas cosas te afectan más de lo que deberían. Tu umbral de estrés ha bajado",
    },
    {
      emoji: "🌀",
      text: "Tu cabeza no para por la noche. Te quedas dando vueltas a todo sin poder desconectar",
    },
    {
      emoji: "☕",
      text: "Cada vez necesitas más café para funcionar — y luego te sientes más ansioso, no menos",
    },
    {
      emoji: "📉",
      text: "Tu rendimiento ha bajado. Antes podías con todo; ahora llegas vacío a media tarde",
    },
    {
      emoji: "😶",
      text: "Has probado técnicas de relajación, apps, pastillas. Nada funciona de forma consistente",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Reconoces esto
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            El estrés crónico no desaparece solo
          </h2>
          <p className="mt-4 text-muted-foreground">
            No es debilidad. Es química. El cortisol elevado de forma sostenida colapsa tu sistema nervioso. Y el cuerpo no sabe cómo salir solo de ese bucle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {pains.map((p) => (
            <div
              key={p.text}
              className="flex items-start gap-3 bg-muted border border-border rounded-xl px-4 py-3.5"
            >
              <span className="text-xl shrink-0 mt-0.5">{p.emoji}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-xl mx-auto text-center">
          <p className="text-base font-medium text-foreground">
            MoodCalm no enmascara el síntoma.{" "}
            <span className="text-accent font-semibold">Actúa sobre el eje HPA</span>, el mecanismo
            fisiológico que regula cuánto cortisol produce tu cuerpo.
          </p>
        </div>
      </div>
    </section>
  );
}
