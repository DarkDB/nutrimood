import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-heading font-bold text-lg text-primary">NutriMood</p>
            <p className="text-sm text-muted-foreground mt-1">
              Suplementos premium para el bienestar
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted-foreground">
            <div className="space-y-1.5">
              <p className="font-medium text-foreground text-xs uppercase tracking-wide">Legal</p>
              <ul className="space-y-1">
                <li><Link href="/legal/privacidad" className="hover:text-primary transition-colors">Política de privacidad</Link></li>
                <li><Link href="/legal/terminos" className="hover:text-primary transition-colors">Términos y condiciones</Link></li>
                <li><Link href="/legal/cookies" className="hover:text-primary transition-colors">Política de cookies</Link></li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <p className="font-medium text-foreground text-xs uppercase tracking-wide">Contacto</p>
              <ul className="space-y-1">
                <li>
                  <a
                    href="mailto:hola@nutrimood.es"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Mail size={14} strokeWidth={1.5} />
                    hola@nutrimood.es
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/nutrimood"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NutriMood. Todos los derechos reservados.</p>
          <p>Fabricado en España · IVA incluido</p>
        </div>
      </div>
    </footer>
  );
}
