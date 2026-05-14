// ============================================
// API Configuration & Helper Functions
// ============================================
// This module provides a centralized API client for
// communicating with the FastAPI/Django backend.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AudioAnalysisResult {
  id: string;
  filename: string;
  is_fake: boolean;
  confidence: number;
  analysis_details: {
    spectral_score: number;
    temporal_score: number;
    model_version: string;
    processing_time_ms: number;
  };
  created_at: string;
}

export interface PlanFromApi {
  id: string;
  name: string;
  price: number;
  max_requests_per_month: number;
  max_audio_duration_sec: number;
  duration_days: number;
}

export interface PlansResponse {
  plans: PlanFromApi[];
}

export interface HistoryResponse {
  items: AudioAnalysisResult[];
  total: number;
  page: number;
  limit: number;
}

export interface SubscriptionMe {
  has_active: boolean;
  plan_id?: string | null;
  plan_name?: string | null;
  price?: number | null;
  expires_at?: string | null;
  max_requests_per_month?: number | null;
  max_audio_duration_sec?: number | null;
}

export interface PaymobCheckoutResponse {
  iframe_url: string;
  merchant_order_id: string;
  paymob_order_id: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  private getAuthHeaders(token?: string): HeadersInit {
    const headers: Record<string, string> = {
      ...this.headers as Record<string, string>,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  /** Browser fetch failures (offline, wrong host, CORS) surface as TypeError / "Failed to fetch". */
  private rethrowNetworkError(error: unknown): never {
    const isFetchFailure =
      error instanceof TypeError ||
      (error instanceof Error && error.message === "Failed to fetch");
    if (isFetchFailure) {
      throw new Error(
        `Cannot reach the API at ${this.baseUrl}. Start the backend (see backend_UnMask-AI/README.md), ` +
          `then set NEXT_PUBLIC_API_URL in Front_end_unmask_Ai/.env.local if it differs (copy from .env.example).`
      );
    }
    throw error;
  }

  // ─── Audio Analysis ────────────────────────────
  async analyzeAudio(
    file: File,
    token?: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<ApiResponse<AudioAnalysisResult>> {
    const formData = new FormData();
    formData.append("audio_file", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${this.baseUrl}/analyze`);

      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          onProgress({
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((event.loaded / event.total) * 100),
          });
        }
      };

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ success: true, data: response });
          } else {
            resolve({ success: false, error: response.detail || "Analysis failed" });
          }
        } catch {
          resolve({ success: false, error: "Invalid response from server" });
        }
      };

      xhr.onerror = () => reject({ success: false, error: "Network error" });
      xhr.send(formData);
    });
  }

  // ─── Auth Endpoints ────────────────────────────
  async login(email: string, password: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ email, password }),
      });
      return res.json();
    } catch (e) {
      this.rethrowNetworkError(e);
    }
  }

  async register(email: string, password: string, name: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/register`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ email, password, name }),
      });
      return res.json();
    } catch (e) {
      this.rethrowNetworkError(e);
    }
  }

  /** Returns the authenticated user (validates token); throws on network failure. */
  async getMe(token: string): Promise<{
    id?: string;
    name?: string;
    email?: string;
    phone?: string | null;
    detail?: string;
    status?: number;
  }> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/me`, {
        headers: this.getAuthHeaders(token),
      });
      const json = (await res.json()) as Record<string, unknown>;
      return { ...json, status: res.status };
    } catch (e) {
      this.rethrowNetworkError(e);
    }
  }

  /** Build a download URL for an uploaded audio (only when the API stored it locally). */
  getDetectionFileUrl(detectionId: string): string {
    return `${this.baseUrl}/files/${detectionId}`;
  }

  // ─── Subscription / Pricing ────────────────────
  async getPlans(): Promise<PlansResponse> {
    const res = await fetch(`${this.baseUrl}/plans`, {
      headers: this.headers,
    });
    return res.json() as Promise<PlansResponse>;
  }

  async createCheckoutSession(planId: string, token: string): Promise<ApiResponse> {
    const res = await fetch(`${this.baseUrl}/checkout`, {
      method: "POST",
      headers: this.getAuthHeaders(token),
      body: JSON.stringify({ plan_id: planId }),
    });
    return res.json();
  }

  async createPaymobCheckout(
    planId: string,
    token: string
  ): Promise<PaymobCheckoutResponse & { detail?: string }> {
    const res = await fetch(`${this.baseUrl}/checkout/paymob`, {
      method: "POST",
      headers: this.getAuthHeaders(token),
      body: JSON.stringify({ plan_id: planId }),
    });
    return res.json() as Promise<PaymobCheckoutResponse & { detail?: string }>;
  }

  async getSubscriptionMe(token: string): Promise<SubscriptionMe> {
    const res = await fetch(`${this.baseUrl}/subscriptions/me`, {
      headers: this.getAuthHeaders(token),
    });
    return res.json() as Promise<SubscriptionMe>;
  }

  // ─── Usage / History ───────────────────────────
  async getAnalysisHistory(
    token: string,
    page = 1,
    limit = 10
  ): Promise<HistoryResponse & { detail?: string }> {
    const res = await fetch(
      `${this.baseUrl}/history?page=${page}&limit=${limit}`,
      { headers: this.getAuthHeaders(token) }
    );
    return res.json() as Promise<HistoryResponse & { detail?: string }>;
  }

  // ─── WhatsApp Webhook ──────────────────────────
  async getWhatsAppStatus(): Promise<ApiResponse> {
    const res = await fetch(`${this.baseUrl}/whatsapp/status`, {
      headers: this.headers,
    });
    return res.json();
  }

  // ─── Health Check ──────────────────────────────
  async healthCheck(): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/health`);
      return { success: res.ok, data: await res.json() };
    } catch {
      return { success: false, error: "Backend unreachable" };
    }
  }
}

// Singleton export
export const api = new ApiClient();
export default api;
