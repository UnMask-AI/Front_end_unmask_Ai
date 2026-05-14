"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const DEMO_ACCOUNTS = [
  { label: "Pro", email: "demo.pro@unmask.local" },
  { label: "Basic", email: "demo.basic@unmask.local" },
  { label: "Free", email: "demo.free@unmask.local" },
] as const;

const DEMO_PASSWORD = "demo1234";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function applyDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword(DEMO_PASSWORD);
    setError(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 border border-border">
        <h1 className="text-2xl font-bold mb-2">Sign in</h1>
        <p className="text-sm text-muted mb-8">
          Access your dashboard, analysis history, and subscription.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 text-sm">
          <Link href="/auth/forgot-password" className="text-muted hover:text-accent">
            Forgot password?
          </Link>
          <span className="text-muted">
            No account?{" "}
            <Link href="/auth/register" className="text-accent hover:underline">
              Register
            </Link>
          </span>
        </div>
        <div className="mt-6 rounded-xl border border-border/70 bg-primary/10 p-3 text-xs text-muted">
          <p className="font-medium text-foreground mb-2">Demo accounts</p>
          <p className="mb-2">
            All accounts use password{" "}
            <code className="font-mono text-accent">{DEMO_PASSWORD}</code>. Click to autofill.
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => applyDemo(account.email)}
                className="rounded-lg border border-border bg-surface/60 px-2.5 py-1.5 font-mono hover:border-accent hover:text-accent transition-colors"
              >
                {account.label}: {account.email}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
