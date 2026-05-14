import { api, type PaymobCheckoutResponse, type SubscriptionMe } from "@/lib/api";

export async function fetchSubscriptionMe(token: string): Promise<SubscriptionMe> {
  return api.getSubscriptionMe(token);
}

export async function startPaymobCheckout(planId: string, token: string) {
  return api.createPaymobCheckout(planId, token) as Promise<
    PaymobCheckoutResponse & { detail?: string }
  >;
}

export async function startStripeCheckout(planId: string, token: string) {
  return api.createCheckoutSession(planId, token) as Promise<{
    url?: string;
    detail?: string;
  }>;
}
