import { Sidebar } from "@/components/admin/sidebar";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-muted">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-[1440px] mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
