"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const FAQ_ITEMS = [
  {
    q: "How accurate is UnMask AI?",
    a: "Our models are benchmarked on public deepfake datasets. Results depend on audio quality, length, and manipulation type; always treat outputs as probabilistic signals, not legal proof.",
  },
  {
    q: "What audio formats are supported?",
    a: "Common formats like WAV, MP3, FLAC, OGG, M4A, and AAC are accepted up to the size limit shown on the analyzer. Longer clips may require a paid plan.",
  },
  {
    q: "Do you store my audio?",
    a: "Audio is processed for detection and associated with your account when you are signed in. Configure retention with your deployment policy; production setups often use object storage with lifecycle rules.",
  },
  {
    q: "Do I need to create an account?",
    a: "You can run a free analysis on the homepage without signing in. Creating an account unlocks history, longer audio, larger files, and paid plans for higher quotas.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes. Visit Dashboard → Billing to cancel at any time. You keep your plan until the end of the current billing period.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-surface/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Frequently asked <span className="gradient-text">questions</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted">
            Quick answers about detection, privacy, and how the platform works.
          </motion.p>
        </motion.div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-2xl border border-border overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
                >
                  {item.q}
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-muted transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-muted leading-relaxed border-t border-border/60 pt-3">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
