import { ShieldCheck, Leaf, Wheat, FlaskConical, Package, Award } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Certificado GMP", sub: "Fabricación controlada" },
  { icon: Leaf, label: "100% Vegano", sub: "Sin productos animales" },
  { icon: Wheat, label: "Sin gluten", sub: "Apto celíacos" },
  { icon: FlaskConical, label: "Dosis clínicas", sub: "Validadas en estudios" },
  { icon: Package, label: "Sin rellenos", sub: "Fórmula transparente" },
  { icon: Award, label: "KSM-66® Patentado", sub: "Extracto premium" },
];

export function TrustBadges() {
  return (
    <section className="py-10 bg-muted border-y border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {badges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon size={18} strokeWidth={1.5} className="text-primary" />
              </div>
              <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
