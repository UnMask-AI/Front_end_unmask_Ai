"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { fetchPlans } from "@/lib/services/plans.service";
import {
  fetchSubscriptionMe,
  startPaymobCheckout,
  startStripeCheckout,
} from "@/lib/services/billing.service";
import type { PlanFromApi, SubscriptionMe } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function BillingPage() {
  const { token } = useAuth();
  const [plans, setPlans] = useState<PlanFromApi[]>([]);
  const [sub, setSub] = useState<SubscriptionMe | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans()
      .then((p) => setPlans(p.plans || []))
      .catch(() => setPlans([]));
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchSubscriptionMe(token)
      .then(setSub)
      .catch(() => setSub({ has_active: false }));
  }, [token]);

  async function checkoutStripe(planId: string) {
    if (!token) return;
    setBusyId(planId);
    setMsg(null);
    try {
      const res = await startStripeCheckout(planId, token);
      if (res.detail) {
        setMsg(res.detail);
        return;
      }
      if (res.url) {
        window.location.href = res.url;
        return;
      }
      setMsg("Stripe checkout URL not returned. Ensure checkout is configured on the API.");
    } catch {
      setMsg("Network error starting Stripe checkout.");
    } finally {
      setBusyId(null);
    }
  }

  async function checkoutPaymob(planId: string) {
    if (!token) return;
    setBusyId(`paymob:${planId}`);
    setMsg(null);
    try {
      const res = await startPaymobCheckout(planId, token);
      if (res.detail) {
        setMsg(res.detail);
        return;
      }
      if (res.iframe_url) {
        window.location.href = res.iframe_url;
        return;
      }
      setMsg("Unexpected response from Paymob checkout.");
    } catch {
      setMsg("Network error starting checkout.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold">Billing</h1>
      <p className="text-sm text-muted">
        Upgrade with Stripe when your API exposes a checkout session URL, or use Paymob where
        configured (<code className="text-xs">PAYMOB_*</code> on the server).
      </p>
      {msg && (
        <p className="text-sm text-amber-400 border border-amber-500/30 rounded-lg px-3 py-2 bg-amber-500/5">
          {msg}
        </p>
      )}
      <Card>
        <CardHeader>
          <CardDescription>Current plan</CardDescription>
          <CardTitle className="text-base">
            {sub?.has_active ? (
              <span className="capitalize">{sub.plan_name}</span>
            ) : (
              <span className="text-muted font-normal text-sm">No active paid subscription</span>
            )}
          </CardTitle>
        </CardHeader>
        {sub?.has_active && (
          <CardContent className="text-sm text-muted">
            Renews / expires{" "}
            {sub.expires_at ? new Date(sub.expires_at).toLocaleString() : "—"}
          </CardContent>
        )}
      </Card>

      <div>
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
          Available plans
        </h2>
        <div className="space-y-4">
          {plans
            .filter((p) => p.name !== "free")
            .map((p) => (
              <Card key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardContent className="p-6 sm:p-6 flex-1">
                  <p className="font-semibold capitalize">{p.name}</p>
                  <p className="text-xs text-muted mt-1">
                    {p.max_requests_per_month} analyses / month · up to{" "}
                    {Math.round(p.max_audio_duration_sec / 60)} min / file
                  </p>
                </CardContent>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-6 pb-6 sm:pb-6 sm:pr-6 sm:pl-0">
                  <span className="text-lg font-bold sm:mr-2">${p.price}</span>
                  <Button
                    type="button"
                    disabled={!!busyId}
                    onClick={() => checkoutStripe(p.id)}
                  >
                    {busyId === p.id ? "Redirecting…" : "Stripe checkout"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={!!busyId}
                    onClick={() => checkoutPaymob(p.id)}
                  >
                    {busyId === `paymob:${p.id}` ? "Redirecting…" : "Paymob"}
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 text-xs text-muted space-y-2">
          <p>
            <strong className="text-foreground">Invoices:</strong> read-only invoice history will
            appear here when the billing API exposes it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
