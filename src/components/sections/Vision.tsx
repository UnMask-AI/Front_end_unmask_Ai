"use client";

import { motion } from "framer-motion";
import { Eye, Globe, Heart, Lock } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Vision() {
  return (
    <section id="vision" className="relative py-24 sm:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            <Eye className="w-4 h-4" />
            Our Vision
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Protecting <span className="gradient-text">Truth</span> in the
            <br />
            Age of AI
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-3xl mx-auto leading-relaxed"
          >
            As AI-generated audio becomes indistinguishable from real speech,
            we&apos;re building the tools to keep trust intact. Our mission is to
            make deepfake detection accessible, accurate, and privacy-preserving
            for everyone.
          </motion.p>
        </motion.div>

        {/* Vision Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Globe,
              title: "Accessible to All",
              description:
                "Everyone deserves access to truth verification tools. Our free tier ensures that individuals, journalists, and small organizations can protect themselves from audio manipulation.",
            },
            {
              icon: Heart,
              title: "Ethical AI",
              description:
                "We believe AI should be used to protect, not deceive. Our models are developed with strict ethical guidelines and we actively contribute to the fight against misinformation.",
            },
            {
              icon: Lock,
              title: "Privacy by Design",
              description:
                "Your audio is never stored, shared, or used for training. Files are encrypted in transit, analyzed in isolated environments, and immediately deleted after processing.",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-2xl glass hover:bg-primary/10 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/40 flex items-center justify-center mb-6 group-hover:bg-primary/60 transition-colors">
                <card.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
