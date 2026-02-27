"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send, Check, Smartphone } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_CONFIG } from "@/lib/constants";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";

const WAVE_HEIGHTS = [8, 14, 6, 18, 10, 16, 4, 12, 20, 8, 14, 6, 18, 10, 16, 4, 12, 20, 8, 14];

function WhatsAppMockup() {
  const messages = [
    { from: "user", text: "🎵 audio_sample.wav", time: "10:32 AM", type: "audio" },
    {
      from: "bot",
      text: "🔍 Analyzing your audio file...",
      time: "10:32 AM",
      type: "text",
    },
    {
      from: "bot",
      text: "✅ Analysis Complete!\n\n🎯 Result: AUTHENTIC\n📊 Confidence: 98.7%\n⏱ Processing: 1.2s\n\nThis audio appears to be genuine human speech with no signs of AI generation or manipulation.",
      time: "10:33 AM",
      type: "text",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="rounded-3xl overflow-hidden border border-border bg-surface shadow-2xl shadow-accent/5">
        {/* WhatsApp Header */}
        <div className="bg-primary px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">UnMask AI Bot</p>
            <p className="text-xs text-accent">online</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="p-4 space-y-3 min-h-[320px] bg-chat-bg">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 + 0.5.valueOf(), duration: 0.4 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === "user"
                    ? "bg-primary rounded-br-md"
                    : "bg-surface-light rounded-bl-md"
                }`}
              >
                {msg.type === "audio" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Send className="w-3 h-3 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-[2px] items-center h-6">
                        {WAVE_HEIGHTS.map((h, j) => (
                          <div
                            key={j}
                            className="w-[3px] rounded-full bg-accent/50"
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="whitespace-pre-line leading-relaxed text-foreground/90">
                    {msg.text}
                  </p>
                )}
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-muted">{msg.time}</span>
                  {msg.from === "user" && (
                    <Check className="w-3 h-3 text-accent" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input bar */}
        <div className="bg-surface-light px-3 py-2 flex items-center gap-2 border-t border-border">
          <div className="flex-1 bg-primary/30 rounded-full px-4 py-2 text-xs text-muted">
            Send audio to analyze...
          </div>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <Send className="w-3.5 h-3.5 text-primary-dark" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppSection() {
  return (
    <section id="whatsapp" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Integration
            </motion.div>
            <motion.h2
              variants={fadeInLeft}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            >
              Detect Deepfakes
              <br />
              <span className="gradient-text">via WhatsApp</span>
            </motion.h2>
            <motion.p
              variants={fadeInLeft}
              className="text-lg text-muted mb-8 leading-relaxed"
            >
              Simply send your audio file to our WhatsApp bot and receive
              instant analysis results. No app to install, no account needed
              for basic checks.
            </motion.p>

            <motion.div variants={fadeInLeft} className="space-y-4 mb-10">
              {[
                "Send any audio file via WhatsApp",
                "Get instant real/fake verdict",
                "Detailed confidence scores",
                "Works on any phone, anywhere",
                "No app installation required",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-muted">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInLeft} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`${WHATSAPP_CONFIG.botUrl}?text=${encodeURIComponent(WHATSAPP_CONFIG.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Link>
              </motion.div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Smartphone className="w-4 h-4" />
                <span>{WHATSAPP_CONFIG.number}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Mockup */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
          >
            <WhatsAppMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
