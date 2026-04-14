import { CheckCircle2, XCircle } from "lucide-react";

const forYou = [
  "Tienes estrés laboral sostenido y necesitas gestionarlo mejor",
  "Te cuesta desconectar por la noche o conciliar el sueño",
  "Has notado que tu umbral de tolerancia ha bajado",
  "Quieres un suplemento con evidencia científica real",
  "Buscas algo natural, sin cafeína ni estimulantes",
  "Llevas semanas o meses sintiéndote al límite",
];

const notForYou = [
  "Buscas un efecto inmediato tipo somnífero o ansiolítico",
  "Tienes un trastorno de ansiedad diagnosticado sin tratar médicamente",
  "Esperas resultados en menos de una semana",
];

export function ForWhom() {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            ¿MoodCalm es para ti?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Somos honestos. No somos la solución para todo el mundo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Para ti */}
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <CheckCircle2 size={18} className="text-success shrink-0" />
              Sí es para ti si…
            </p>
            <ul className="space-y-2.5">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 size={14} className="text-success shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* No para ti */}
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <XCircle size={18} className="text-muted-foreground shrink-0" />
              No es para ti si…
            </p>
            <ul className="space-y-2.5 mb-6">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <XCircle size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-muted rounded-lg px-4 py-3 text-xs text-muted-foreground border border-border">
              Si tienes dudas, consulta a tu médico antes de empezar. MoodCalm es un suplemento
              alimenticio, no un medicamento.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
