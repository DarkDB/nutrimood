const ingredients = [
  {
    name: "KSM-66® Ashwagandha",
    dose: "300 mg",
    benefit: "Reduce el cortisol sérico hasta un 27%. La dosis exacta de los estudios clínicos publicados.",
    evidence: "Alta",
  },
  {
    name: "L-Theanine",
    dose: "400 mg",
    benefit: "Dosis clínica superior. Induce ondas alfa cerebrales: relajación alerta sin somnolencia.",
    evidence: "Alta",
  },
  {
    name: "Magnesio Glicinato",
    dose: "100 mg",
    benefit: "Forma de magnesio con máxima biodisponibilidad. Clave para calmar el sistema nervioso.",
    evidence: "Alta",
  },
  {
    name: "Vitamina D3",
    dose: "1.000 UI",
    benefit: "El 70% de los españoles tiene déficit. Impacta directamente en el estado de ánimo.",
    evidence: "Media-Alta",
  },
];

const evidenceBadge: Record<string, string> = {
  Alta: "bg-success/10 text-success",
  "Media-Alta": "bg-secondary/10 text-secondary",
};

export function IngredientsTable() {
  return (
    <section id="ingredientes" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            Fórmula transparente
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Sin propietarios blend. Sin rellenos. Solo ingredientes con dosis clínicamente
            efectivas.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-4 py-3 font-semibold">Ingrediente</th>
                <th className="text-left px-4 py-3 font-semibold">Dosis</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Beneficio</th>
                <th className="text-left px-4 py-3 font-semibold">Evidencia</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {ingredients.map((ing) => (
                <tr key={ing.name} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{ing.name}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{ing.dose}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell max-w-xs">
                    {ing.benefit}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        evidenceBadge[ing.evidence] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {ing.evidence}
                    </span>
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
