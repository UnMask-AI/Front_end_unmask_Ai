"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const BAR_DURATIONS = [1.4, 1.6, 1.3, 1.7, 1.5, 1.2, 1.6, 1.4, 1.3, 1.5, 1.7, 1.2, 1.4, 1.6, 1.3, 1.5, 1.7, 1.4, 1.2, 1.6, 1.3, 1.5, 1.4, 1.7];

function AudioWaveVisual() {
  const bars = [3, 6, 4, 8, 5, 9, 3, 7, 4, 6, 8, 5, 3, 7, 9, 4, 6, 3, 5, 8, 4, 7, 3, 6];
  return (
    <div className="flex items-center justify-center gap-[3px] h-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-accent/60"
          animate={{ height: [h * 3, h * 6, h * 3] }}
          transition={{
            duration: BAR_DURATIONS[i],
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent">
              <ShieldCheck className="w-4 h-4" />
              <span>AI-Powered Audio Deepfake Detection</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Detect Audio
            <br />
            <span className="gradient-text">Deepfakes</span> Instantly
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload any audio file and our AI will tell you if it&apos;s real or
            AI-generated. Protecting truth in the age of synthetic media.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#analyze"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent-muted transition-all shadow-xl shadow-accent/20"
              >
                Analyze Audio Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 glass text-foreground font-medium rounded-full hover:bg-primary/20 transition-all"
              >
                <Play className="w-4 h-4 text-accent" />
                See How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* Audio Wave Visual */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="max-w-3xl mx-auto glass rounded-2xl p-8 glow-pulse">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-muted font-mono">Analyzing audio...</span>
                <div className="flex-1" />
                <span className="text-xs text-accent font-mono">98.7% confidence</span>
              </div>
              <AudioWaveVisual />
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm text-green-400 font-medium">AUTHENTIC</span>
                </div>
                <span className="text-xs text-muted font-mono">0:00 / 0:32</span>
              </div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>98.7% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>No Data Stored</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Free to Start</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
