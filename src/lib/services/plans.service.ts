import { api, type PlansResponse } from "@/lib/api";

export async function fetchPlans(): Promise<PlansResponse> {
  return api.getPlans();
}
