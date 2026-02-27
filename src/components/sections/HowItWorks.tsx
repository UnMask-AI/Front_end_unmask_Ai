"use client";

import { motion } from "framer-motion";
import { Upload, Brain, FileCheck } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const stepIcons = [Upload, Brain, FileCheck];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-surface/50">
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
            <Brain className="w-4 h-4" />
            How It Works
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Three Simple <span className="gradient-text">Steps</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            Detecting deepfakes has never been easier. Upload, analyze, and get
            results in seconds.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 -translate-y-1/2" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="relative text-center"
                >
                  {/* Step number */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative mx-auto w-20 h-20 rounded-2xl bg-primary/40 border border-accent/20 flex items-center justify-center mb-6 glow-pulse"
                  >
                    <Icon className="w-8 h-8 text-accent" />
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-primary-dark text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
