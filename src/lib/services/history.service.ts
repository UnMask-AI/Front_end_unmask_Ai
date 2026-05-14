import { api, type HistoryResponse } from "@/lib/api";

export async function fetchHistory(
  token: string,
  page = 1,
  limit = 10
): Promise<HistoryResponse & { detail?: string }> {
  return api.getAnalysisHistory(token, page, limit);
}
