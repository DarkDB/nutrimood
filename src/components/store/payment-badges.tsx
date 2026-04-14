import { Lock } from "lucide-react";

export function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Lock size={12} strokeWidth={2} />
        Pago seguro
      </span>
      <span className="flex items-center gap-1.5">
        <PaymentIcon label="Visa" />
        <PaymentIcon label="MC" />
        <PaymentIcon label="Amex" />
        <PaymentIcon label="Apple Pay" />
        <PaymentIcon label="Google Pay" />
      </span>
    </div>
  );
}

function PaymentIcon({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center bg-muted border border-border rounded px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground whitespace-nowrap">
      {label}
    </span>
  );
}
