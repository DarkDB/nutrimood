import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { SP } from "@/lib/social-proof";

export function Hero() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-muted border border-border rounded-full px-3 py-1 text-xs font-medium text-secondary">
              <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
              Science-backed · Sin estimulantes · Envío a España
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight">
              Controla el cortisol.{" "}
              <span className="text-accent">Recupera tu calma.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              MoodCalm es el suplemento en polvo con KSM-66 Ashwagandha, L-Theanine y
              Magnesio Glicinato que ayuda a tu cuerpo a gestionar el estrés desde dentro.
              Sin nervios. Sin cafeína. Solo calma de verdad.
            </p>

            {/* Social proof mini */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["LP", "CR", "SA", "JM", "AT"].map((init, i) => (
                  <div
                    key={init}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: ["#2D4A3E","#D4845A","#5C7A6E","#2D4A3E","#D4845A"][i], zIndex: 5 - i }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">{SP.totalCustomers} personas</strong> ya lo tienen
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/productos/moodcalm"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-base transition-colors"
              >
                Comprar MoodCalm — 32 €
              </Link>
              <a
                href="#ingredientes"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary font-semibold text-base hover:bg-muted transition-colors"
              >
                Ver ingredientes
              </a>
            </div>

            <p className="text-xs text-muted-foreground">
              ✓ Garantía de satisfacción 30 días · ✓ Envío gratis +50€ · ✓ IVA incluido
            </p>

            {/* Urgency pulse */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 text-xs text-accent font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
              🔥 {SP.weeklyBuyers} personas han comprado MoodCalm esta semana
            </div>
          </div>

          {/* Imagen producto */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl bg-muted flex items-center justify-center">
              <Image
                src="/moodcalm-producto.png"
                alt="MoodCalm — suplemento en polvo para el estrés"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
