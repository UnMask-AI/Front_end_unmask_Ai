"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { ACCURACY_STATS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.replace(/[0-9.]+/, "").replace(suffix, "");

    if (isNaN(numericPart)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = numericPart / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numericPart);
      const formatted = numericPart % 1 === 0 ? Math.round(current).toString() : current.toFixed(1);
      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value, suffix]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Accuracy() {
  return (
    <section id="accuracy" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            <BarChart3 className="w-4 h-4" />
            Performance
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Industry-Leading <span className="gradient-text">Accuracy</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            Our model is trained on millions of audio samples and continuously
            updated to detect the latest deepfake techniques.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ACCURACY_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl glass"
            >
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual bar chart */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mt-16 max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="glass rounded-2xl p-8">
            <h4 className="text-sm font-medium text-muted mb-6">
              Detection accuracy by audio type
            </h4>
            {[
              { label: "Text-to-Speech", value: 99.1 },
              { label: "Voice Cloning", value: 98.4 },
              { label: "Voice Conversion", value: 97.8 },
              { label: "Audio Splicing", value: 98.9 },
            ].map((item, i) => (
              <div key={item.label} className="mb-4 last:mb-0">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted">{item.label}</span>
                  <span className="text-accent font-mono">{item.value}%</span>
                </div>
                <div className="h-2 bg-primary/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
