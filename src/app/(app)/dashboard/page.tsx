"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { fetchHistory } from "@/lib/services/history.service";
import { fetchSubscriptionMe } from "@/lib/services/billing.service";
import type { SubscriptionMe } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardHome() {
  const { token, user } = useAuth();
  const [sub, setSub] = useState<SubscriptionMe | null>(null);
  const [totalAnalyses, setTotalAnalyses] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [me, hist] = await Promise.all([
          fetchSubscriptionMe(token).catch(() => ({ has_active: false } as SubscriptionMe)),
          fetchHistory(token, 1, 1),
        ]);
        if (!cancelled) {
          setSub(me);
          if ("detail" in hist && hist.detail) setTotalAnalyses(0);
          else setTotalAnalyses(hist.total ?? 0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted text-sm">
          Run analyses from the dedicated page, review history, and manage your subscription.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Subscription</CardDescription>
            <CardTitle className="text-base font-semibold">
              {loading ? (
                <Skeleton className="h-6 w-32" />
              ) : sub?.has_active ? (
                <span className="capitalize">{sub.plan_name}</span>
              ) : (
                <span className="text-muted font-normal text-sm">Free tier</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted space-y-2">
            {!loading && sub?.has_active ? (
              <p>
                Renews / expires{" "}
                {sub.expires_at ? new Date(sub.expires_at).toLocaleDateString() : "—"}
              </p>
            ) : null}
            <Link href="/dashboard/billing" className="inline-block text-accent hover:underline">
              Manage billing
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total analyses</CardDescription>
            <CardTitle className="text-base font-semibold">
              {loading ? <Skeleton className="h-6 w-16" /> : String(totalAnalyses ?? 0)}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted">
            <p>All-time count from your account history.</p>
            <Link href="/dashboard/history" className="inline-block mt-2 text-accent hover:underline">
              View history
            </Link>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>Quick links</CardDescription>
          <CardTitle className="text-base">Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/analyze" className="text-accent hover:underline">
                Analyze audio
              </Link>
            </li>
            <li>
              <Link href="/dashboard/history" className="text-accent hover:underline">
                Analysis history
              </Link>
            </li>
            <li>
              <Link href="/dashboard/billing" className="text-accent hover:underline">
                Manage billing
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
