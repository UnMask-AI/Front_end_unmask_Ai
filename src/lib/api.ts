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
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  }

  async register(email: string, password: string, name: string): Promise<ApiResponse> {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password, name }),
    });
    return res.json();
  }

  // ─── Subscription / Pricing ────────────────────
  async getPlans(): Promise<ApiResponse> {
    const res = await fetch(`${this.baseUrl}/plans`, {
      headers: this.headers,
    });
    return res.json();
  }

  async createCheckoutSession(planId: string, token: string): Promise<ApiResponse> {
    const res = await fetch(`${this.baseUrl}/checkout`, {
      method: "POST",
      headers: this.getAuthHeaders(token),
      body: JSON.stringify({ plan_id: planId }),
    });
    return res.json();
  }

  // ─── Usage / History ───────────────────────────
  async getAnalysisHistory(token: string, page = 1, limit = 10): Promise<ApiResponse> {
    const res = await fetch(
      `${this.baseUrl}/history?page=${page}&limit=${limit}`,
      { headers: this.getAuthHeaders(token) }
    );
    return res.json();
  }

  // ─── API Key Management ────────────────────────
  async getApiKeys(token: string): Promise<ApiResponse> {
    const res = await fetch(`${this.baseUrl}/api-keys`, {
      headers: this.getAuthHeaders(token),
    });
    return res.json();
  }

  async createApiKey(token: string, name: string): Promise<ApiResponse> {
    const res = await fetch(`${this.baseUrl}/api-keys`, {
      method: "POST",
      headers: this.getAuthHeaders(token),
      body: JSON.stringify({ name }),
    });
    return res.json();
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
