"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Mic,
  FileAudio,
  X,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Send,
} from "lucide-react";
import { AUDIO_CONFIG } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { api } from "@/lib/api";
import type { UploadState } from "@/lib/types";

export default function AudioAnalyzer() {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    progress: 0,
  });
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const maxBytes = AUDIO_CONFIG.maxFileSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File too large. Maximum size is ${AUDIO_CONFIG.maxFileSizeMB}MB.`;
    }
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!AUDIO_CONFIG.allowedFormats.includes(ext)) {
      return `Unsupported format. Allowed: ${AUDIO_CONFIG.allowedFormats.join(", ")}`;
    }
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadState({ status: "error", progress: 0, error });
      return;
    }
    setSelectedFile(file);
    setUploadState({ status: "idle", progress: 0 });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setUploadState({ status: "uploading", progress: 0 });

    try {
      const result = await api.analyzeAudio(selectedFile, undefined, (progress) => {
        setUploadState((prev) => ({
          ...prev,
          status: "uploading",
          progress: progress.percentage,
        }));
      });

      if (result.success && result.data) {
        setUploadState({
          status: "complete",
          progress: 100,
          result: result.data,
        });
      } else {
        setUploadState({
          status: "error",
          progress: 0,
          error: result.error || "Analysis failed. Please try again.",
        });
      }
    } catch {
      setUploadState({
        status: "error",
        progress: 0,
        error: "Could not connect to backend. Make sure the API server is running.",
      });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadState({ status: "idle", progress: 0 });
  };

  return (
    <section id="analyze" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            <Mic className="w-4 h-4" />
            Try It Now
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Analyze Your <span className="gradient-text">Audio</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-xl mx-auto"
          >
            Upload an audio file and our AI model will instantly determine if
            it&apos;s authentic or AI-generated.
          </motion.p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="glass rounded-3xl p-8 sm:p-12">
            {/* Drop Zone */}
            {!selectedFile && uploadState.status !== "complete" && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/40 hover:bg-primary/5"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={AUDIO_CONFIG.allowedFormats.join(",")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                  className="hidden"
                />
                <motion.div
                  animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/40 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-1">
                      Drop your audio file here
                    </p>
                    <p className="text-sm text-muted">
                      or click to browse •{" "}
                      {AUDIO_CONFIG.allowedFormats.join(", ")} •{" "}
                      Max {AUDIO_CONFIG.maxFileSizeMB}MB
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Selected File */}
            {selectedFile && uploadState.status !== "complete" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/20">
                  <FileAudio className="w-10 h-10 text-accent" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="p-2 hover:bg-primary/30 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-muted" />
                  </button>
                </div>

                {/* Progress */}
                {uploadState.status === "uploading" && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted">Uploading & analyzing...</span>
                      <span className="text-accent font-mono">
                        {uploadState.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-primary/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadState.progress}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                      />
                    </div>
                  </div>
                )}

                {/* Analyze Button */}
                {uploadState.status === "idle" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnalyze}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent-muted transition-all shadow-lg shadow-accent/20"
                  >
                    <Send className="w-4 h-4" />
                    Analyze Audio
                  </motion.button>
                )}

                {uploadState.status === "uploading" && (
                  <div className="flex items-center justify-center gap-2 py-4 text-accent">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Processing...</span>
                  </div>
                )}
              </div>
            )}

            {/* Result */}
            <AnimatePresence>
              {uploadState.status === "complete" && uploadState.result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div
                    className={`p-6 rounded-2xl border-2 ${
                      uploadState.result.is_fake
                        ? "border-red-500/30 bg-red-500/5"
                        : "border-accent/30 bg-accent/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {uploadState.result.is_fake ? (
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                      ) : (
                        <CheckCircle2 className="w-8 h-8 text-accent" />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold">
                          {uploadState.result.is_fake
                            ? "DEEPFAKE DETECTED"
                            : "AUTHENTIC AUDIO"}
                        </h3>
                        <p className="text-sm text-muted">
                          Confidence: {uploadState.result.confidence}%
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <p className="text-xs text-muted">Spectral Score</p>
                        <p className="text-lg font-mono font-bold text-accent">
                          {uploadState.result.analysis_details.spectral_score}%
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/20">
                        <p className="text-xs text-muted">Temporal Score</p>
                        <p className="text-lg font-mono font-bold text-accent">
                          {uploadState.result.analysis_details.temporal_score}%
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted">
                      Model: {uploadState.result.analysis_details.model_version} •
                      Processed in {uploadState.result.analysis_details.processing_time_ms}ms
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full py-3 glass rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Analyze Another File
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {uploadState.status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{uploadState.error}</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-3 text-xs text-muted hover:text-foreground underline"
                  >
                    Try again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
