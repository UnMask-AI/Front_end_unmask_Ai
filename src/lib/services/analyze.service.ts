import { api, type ApiResponse, type AudioAnalysisResult, type UploadProgress } from "@/lib/api";

export async function analyzeAudioFile(
  file: File,
  token?: string,
  onProgress?: (p: UploadProgress) => void
): Promise<ApiResponse<AudioAnalysisResult>> {
  return api.analyzeAudio(file, token, onProgress);
}
