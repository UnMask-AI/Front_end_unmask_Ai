"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  History,
  CreditCard,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, ready, logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !token) {
      router.replace("/auth/login");
    }
  }, [ready, token, router]);

  if (!ready || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted text-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-surface/50">
        <div className="p-6 flex items-center gap-2 border-b border-border">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <span className="font-bold text-sm">UnMask</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-primary/30 text-accent"
                    : "text-muted hover:text-foreground hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted truncate mb-2">{user?.email}</p>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-muted hover:bg-primary/10 hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-sm">Dashboard</span>
          <button
            type="button"
            onClick={logout}
            className="text-xs text-muted flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" /> Out
          </button>
        </header>
        <div className="flex-1 p-6 md:p-10 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
