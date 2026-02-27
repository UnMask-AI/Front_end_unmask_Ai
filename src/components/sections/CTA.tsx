"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, MessageCircle } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_CONFIG } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <div className="w-16 h-16 rounded-2xl bg-primary/40 flex items-center justify-center mx-auto mb-8 glow-pulse">
              <Shield className="w-8 h-8 text-accent" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-6xl font-bold tracking-tight mb-6"
          >
            Ready to <span className="gradient-text">Unmask</span>
            <br />
            the Truth?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-xl mx-auto mb-10"
          >
            Start detecting audio deepfakes today. Free to begin, powerful
            enough for enterprise.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#analyze"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent-muted transition-all shadow-xl shadow-accent/20"
              >
                Start Analyzing Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`${WHATSAPP_CONFIG.botUrl}?text=${encodeURIComponent(WHATSAPP_CONFIG.message)}`}
                target="_blank"
                className="inline-flex items-center gap-2 px-8 py-4 glass text-foreground font-medium rounded-full hover:bg-primary/20 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                Try WhatsApp Bot
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
