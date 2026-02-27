"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { API_CODE_EXAMPLES } from "@/lib/constants";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";

type Language = "curl" | "python" | "javascript";

export default function ApiSection() {
  const [activeTab, setActiveTab] = useState<Language>("python");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(API_CODE_EXAMPLES[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="relative py-24 sm:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
              <Code2 className="w-4 h-4" />
              Developer API
            </motion.div>
            <motion.h2
              variants={fadeInLeft}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            >
              Integrate <span className="gradient-text">Deepfake Detection</span>
              <br />
              Into Your App
            </motion.h2>
            <motion.p
              variants={fadeInLeft}
              className="text-lg text-muted mb-8 leading-relaxed"
            >
              Our REST API makes it easy to add audio deepfake detection to any
              application. Simple endpoints, comprehensive documentation, and
              SDKs for popular languages.
            </motion.p>

            <motion.div variants={fadeInLeft} className="space-y-4 mb-8">
              {[
                "Simple REST API with JSON responses",
                "API keys with granular permissions",
                "Rate limiting & usage dashboard",
                "Webhook notifications",
                "Python, JavaScript, and cURL examples",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-muted">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent-muted transition-all shadow-lg shadow-accent/20"
              >
                View API Docs
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Code Preview */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
          >
            <div className="rounded-2xl overflow-hidden border border-border bg-code-bg">
              {/* Tab bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface-light border-b border-border">
                <div className="flex gap-1">
                  {(["curl", "python", "javascript"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveTab(lang)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-mono transition-all ${
                        activeTab === lang
                          ? "bg-primary text-accent"
                          : "text-muted hover:text-foreground hover:bg-primary/20"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted hover:text-accent rounded-lg hover:bg-primary/20 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Code */}
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-foreground/80 leading-relaxed">
                  <code>{API_CODE_EXAMPLES[activeTab]}</code>
                </pre>
              </div>

              {/* Response preview */}
              <div className="px-6 pb-6">
                <div className="p-4 rounded-xl bg-primary/20 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-3 h-3 text-accent" />
                    <span className="text-xs text-muted font-mono">Response</span>
                  </div>
                  <pre className="text-xs font-mono text-accent/80">
{`{
  "is_fake": false,
  "confidence": 98.7,
  "analysis_details": {
    "spectral_score": 97.2,
    "temporal_score": 99.1,
    "processing_time_ms": 1247
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
