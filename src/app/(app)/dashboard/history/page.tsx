"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Download, ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { fetchHistory } from "@/lib/services/history.service";
import { api, type AudioAnalysisResult } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PAGE_SIZE = 10;

export default function HistoryPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<AudioAnalysisResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!token) return;
    setError(null);
    fetchHistory(token, page, PAGE_SIZE)
      .then((res) => {
        if ("detail" in res && res.detail) {
          setError(String(res.detail));
          return;
        }
        setItems(res.items || []);
        setTotal(res.total ?? 0);
      })
      .catch(() => setError("Could not load history"));
  }, [token, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analysis history</h1>
        <p className="text-sm text-muted mt-1">
          Every audio file you upload is recorded with verdict, confidence, and analysis details.
          Files stored on the API can be re-downloaded here.
        </p>
      </div>
      {error && (
        <p className="text-sm text-red-400 border border-red-500/20 rounded-lg px-3 py-2 bg-red-500/5">
          {error}
        </p>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>File</TableHead>
            <TableHead>Verdict</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>When</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 && !error ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted py-10">
                No analyses yet.{" "}
                <Link href="/analyze" className="text-accent hover:underline">
                  Run one
                </Link>
                .
              </TableCell>
            </TableRow>
          ) : (
            items.map((row) => {
              const isOpen = !!expanded[row.id];
              return (
                <Fragment key={row.id}>
                  <TableRow>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => toggle(row.id)}
                        className="text-muted hover:text-foreground"
                        aria-label={isOpen ? "Collapse" : "Expand"}
                      >
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{row.filename}</TableCell>
                    <TableCell>
                      {row.is_fake ? (
                        <Badge variant="danger">Deepfake</Badge>
                      ) : (
                        <Badge variant="success">Authentic</Badge>
                      )}
                    </TableCell>
                    <TableCell>{Math.round(row.confidence)}%</TableCell>
                    <TableCell className="text-muted text-xs">
                      {new Date(row.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <a
                        href={api.getDetectionFileUrl(row.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                        title="Download original audio (404 if hosted on object storage)"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </a>
                    </TableCell>
                  </TableRow>
                  {isOpen && (
                    <TableRow>
                      <TableCell />
                      <TableCell colSpan={5} className="bg-primary/5">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 py-2 text-xs">
                          <div>
                            <dt className="text-muted uppercase tracking-wide">Detection ID</dt>
                            <dd className="font-mono break-all">{row.id}</dd>
                          </div>
                          <div>
                            <dt className="text-muted uppercase tracking-wide">
                              Model version
                            </dt>
                            <dd className="font-mono">
                              {row.analysis_details.model_version}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted uppercase tracking-wide">
                              Spectral score
                            </dt>
                            <dd>{row.analysis_details.spectral_score.toFixed(3)}</dd>
                          </div>
                          <div>
                            <dt className="text-muted uppercase tracking-wide">
                              Temporal score
                            </dt>
                            <dd>{row.analysis_details.temporal_score.toFixed(3)}</dd>
                          </div>
                          <div>
                            <dt className="text-muted uppercase tracking-wide">
                              Processing time
                            </dt>
                            <dd>{row.analysis_details.processing_time_ms} ms</dd>
                          </div>
                        </dl>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })
          )}
        </TableBody>
      </Table>
      {total > PAGE_SIZE && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-muted">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
