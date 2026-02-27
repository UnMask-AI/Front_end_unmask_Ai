"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileX, Server, Globe } from "lucide-react";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const policies = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All audio files are encrypted using AES-256 during transit and processing. Your data is never exposed.",
  },
  {
    icon: FileX,
    title: "Zero Data Retention",
    description:
      "Audio files are automatically deleted after analysis. We never store, cache, or use your files for any purpose.",
  },
  {
    icon: Eye,
    title: "No Third-Party Sharing",
    description:
      "Your data is never shared with third parties. Analysis happens on our secure servers with no external access.",
  },
  {
    icon: Server,
    title: "Isolated Processing",
    description:
      "Each audio analysis runs in an isolated sandbox environment. No cross-contamination between user sessions.",
  },
  {
    icon: Globe,
    title: "GDPR Compliant",
    description:
      "Fully compliant with GDPR, CCPA, and other privacy regulations. You have full control over your data.",
  },
  {
    icon: Shield,
    title: "SOC 2 Certified",
    description:
      "Our infrastructure is SOC 2 Type II certified, ensuring the highest standards of security and availability.",
  },
];

export default function PrivacySection() {
  return (
    <section id="privacy" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            <Shield className="w-4 h-4" />
            Privacy & Security
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Your Privacy is <span className="gradient-text">Non-Negotiable</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            We built UnMask AI with privacy at its core. Your audio files are
            yours — we just analyze them.
          </motion.p>
        </motion.div>

        {/* Policy Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {policies.map((policy) => (
            <motion.div
              key={policy.title}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-2xl glass hover:bg-primary/10 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/40 flex items-center justify-center mb-4 group-hover:bg-primary/60 transition-colors">
                <policy.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-base font-semibold mb-2 group-hover:text-accent transition-colors">
                {policy.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {policy.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/privacy"
            className="text-sm text-accent hover:text-accent-muted underline underline-offset-4 transition-colors"
          >
            Read our full Privacy Policy →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
