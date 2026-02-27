// ============================================
// Shared TypeScript Types
// ============================================

export interface NavLink {
  label: string;
  href: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
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

export interface UploadState {
  status: "idle" | "uploading" | "analyzing" | "complete" | "error";
  progress: number;
  result?: AudioAnalysisResult;
  error?: string;
}

export interface Step {
  step: number;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
}
