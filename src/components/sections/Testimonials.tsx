"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Investigative Journalist",
    company: "The Daily Report",
    content:
      "UnMask AI has become an essential tool in our newsroom. We use it to verify audio clips before publication. The accuracy is remarkable — it caught a sophisticated deepfake that fooled our entire team.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Dr. Michael Rivera",
    role: "Forensic Audio Analyst",
    company: "CyberSec Labs",
    content:
      "As a forensic expert, I&apos;ve tested many deepfake detection tools. UnMask AI consistently outperforms competitors with its spectral analysis accuracy. The API integration makes it perfect for our workflow.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Priya Sharma",
    role: "Head of Security",
    company: "FinTech Corp",
    content:
      "We integrated UnMask AI into our voice authentication pipeline. It's caught multiple social engineering attacks using AI-cloned voices. The WhatsApp bot feature is a game-changer for quick checks.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "James O'Brien",
    role: "Podcast Producer",
    company: "AudioFirst Media",
    content:
      "Before publishing guest interviews, we now run them through UnMask AI. It gives us peace of mind that we're sharing authentic content. The processing speed is impressive — results in seconds.",
    rating: 5,
    avatar: "JO",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6">
            <Users className="w-4 h-4" />
            Testimonials
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Trusted by <span className="gradient-text">Professionals</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            See what security experts, journalists, and developers say about
            UnMask AI.
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative glass rounded-3xl p-8 sm:p-12">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-accent/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-lg text-foreground/90 leading-relaxed mb-8">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-accent font-bold">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-muted">
                      {testimonials[current].role} at {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-accent w-6" : "bg-muted/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-muted" />
                </button>
                <button
                  onClick={next}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-muted" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
