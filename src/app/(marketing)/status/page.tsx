"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";

export default function StatusPage() {
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const [wa, setWa] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const h = await api.healthCheck();
        if (!cancelled) setApiOk(!!h.success);
        const w = (await api.getWhatsAppStatus()) as unknown as Record<string, unknown>;
        if (!cancelled && w && typeof w === "object")
          setWa(w);
      } catch {
        if (!cancelled) setApiOk(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 lg:py-24">
      <h1 className="text-3xl font-bold mb-2">System status</h1>
      <p className="text-sm text-muted mb-10">
        Live checks against your configured <code className="text-accent/80">NEXT_PUBLIC_API_URL</code>.
      </p>
      <div className="space-y-6">
        <div className="glass rounded-2xl border border-border p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">API</p>
            <p className="text-xs text-muted">GET /health</p>
          </div>
          {loading ? (
            <Skeleton className="h-7 w-24 rounded-full" />
          ) : (
            <Badge variant={apiOk ? "success" : "danger"}>
              {apiOk ? "Operational" : "Unreachable"}
            </Badge>
          )}
        </div>
        <div className="glass rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-sm font-medium">WhatsApp integration</p>
            {loading ? (
              <Skeleton className="h-7 w-28 rounded-full" />
            ) : (
              <Badge variant={wa?.evolution_configured ? "success" : "warning"}>
                {wa?.evolution_configured ? "Configured" : "Not configured"}
              </Badge>
            )}
          </div>
          {!loading && wa && (
            <pre className="text-xs text-muted font-mono overflow-x-auto">
              {JSON.stringify(wa, null, 2)}
            </pre>
          )}
        </div>
      </div>
      <Link href="/" className="inline-block mt-10 text-sm text-accent hover:underline">
        Back to home
      </Link>
    </div>
  );
}
