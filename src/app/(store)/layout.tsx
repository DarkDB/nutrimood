import { CartProvider } from "@/components/store/cart-provider";
import { Navbar } from "@/components/store/navbar";
import { Footer } from "@/components/store/footer";
import { StickyBuyBar } from "@/components/store/sticky-buy-bar";
import { CookieBanner } from "@/components/store/cookie-banner";
import { EmailPopup } from "@/components/store/email-popup";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="flex-1 pb-16 sm:pb-0">{children}</main>
      <Footer />
      <StickyBuyBar />
      <CookieBanner />
      <EmailPopup />
    </CartProvider>
  );
}
