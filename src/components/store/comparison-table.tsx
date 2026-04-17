import { Check, X, Minus } from "lucide-react";

type Val = "yes" | "no" | "partial";

const rows: { label: string; moodcalm: Val; farmacia: Val; nada: Val }[] = [
  { label: "Dosis clínicamente validadas",       moodcalm: "yes", farmacia: "partial", nada: "no" },
  { label: "Sin cafeína ni estimulantes",        moodcalm: "yes", farmacia: "no",      nada: "yes" },
  { label: "Actúa sobre la causa (cortisol)",    moodcalm: "yes", farmacia: "no",      nada: "no" },
  { label: "Ingredientes transparentes",         moodcalm: "yes", farmacia: "partial", nada: "no" },
  { label: "Sin dependencia ni tolerancia",      moodcalm: "yes", farmacia: "no",      nada: "yes" },
  { label: "Mejora el sueño profundo",           moodcalm: "yes", farmacia: "partial", nada: "no" },
  { label: "Garantía de satisfacción 30 días",   moodcalm: "yes", farmacia: "no",      nada: "no" },
];

function Icon({ val }: { val: Val }) {
  if (val === "yes") return <Check size={16} strokeWidth={2.5} className="text-success mx-auto" />;
  if (val === "no") return <X size={16} strokeWidth={2.5} className="text-destructive mx-auto" />;
  return <Minus size={16} strokeWidth={2} className="text-muted-foreground mx-auto" />;
}

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            ¿Por qué MoodCalm?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Hay muchas opciones para el estrés. No todas funcionan igual.
          </p>
        </div>

        <div className="max-w-2xl mx-auto overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 sm:px-5 py-3.5 text-muted-foreground font-medium w-[50%]" />
                <th className="px-2 sm:px-4 py-3.5 text-center">
                  <span className="inline-block bg-accent text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                    MoodCalm
                  </span>
                </th>
                <th className="px-2 sm:px-4 py-3.5 text-center text-[10px] sm:text-xs font-medium text-muted-foreground">
                  Pastillas<br />farmacia
                </th>
                <th className="px-2 sm:px-4 py-3.5 text-center text-[10px] sm:text-xs font-medium text-muted-foreground">
                  Sin<br />suplemento
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.label} className="hover:bg-muted/30 transition-colors">
                  <td className="px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-muted-foreground">{row.label}</td>
                  <td className="px-2 sm:px-4 py-2.5 sm:py-3 bg-accent/5 text-center">
                    <Icon val={row.moodcalm} />
                  </td>
                  <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-center">
                    <Icon val={row.farmacia} />
                  </td>
                  <td className="px-2 sm:px-4 py-2.5 sm:py-3 text-center">
                    <Icon val={row.nada} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
