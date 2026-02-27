"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Target,
  Code2,
  MessageCircle,
  Layers,
  Shield,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Target,
  Code2,
  MessageCircle,
  Layers,
  Shield,
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            <Zap className="w-4 h-4" />
            Features
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Everything You Need to
            <br />
            <span className="gradient-text">Fight Deepfakes</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            Our platform combines cutting-edge AI with an intuitive interface to
            make deepfake detection accessible to everyone.
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-8 rounded-2xl glass hover:bg-primary/10 transition-all duration-300 cursor-default"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/5 to-transparent" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/40 flex items-center justify-center mb-5 group-hover:bg-primary/60 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
