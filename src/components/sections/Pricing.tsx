"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { PRICING_PLANS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { PlanFromApi } from "@/lib/api";
import { fetchPlans } from "@/lib/services/plans.service";
import type { PricingPlan } from "@/lib/types";

function plansFromApi(rows: PlanFromApi[]): PricingPlan[] {
  return rows.map((p) => {
    const nameLabel =
      p.name.length > 0 ? p.name[0].toUpperCase() + p.name.slice(1) : p.name;
    const period =
      p.duration_days >= 300 ? "year" : p.duration_days >= 28 ? "month" : "period";
    const features = [
      `${p.max_requests_per_month} analyses per month`,
      `Up to ${Math.round(p.max_audio_duration_sec / 60)} min audio per file`,
      `Billed every ${p.duration_days} days`,
    ];
    return {
      id: p.name,
      name: nameLabel,
      price: p.price,
      period,
      description:
        p.name === "free"
          ? "Try deepfake detection with monthly limits"
          : p.name === "basic"
            ? "More analyses for individuals"
            : "Best for teams and power users",
      features,
      cta: p.name === "free" ? "Get Started" : "Go to analyze",
      highlighted: p.name === "pro",
    };
  });
}

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>(() =>
    PRICING_PLANS.map((p) => ({
      ...p,
      features: [...p.features],
    }))
  );

  useEffect(() => {
    let cancelled = false;
    fetchPlans()
      .then((data) => {
        if (cancelled || !data?.plans?.length) return;
        setPlans(plansFromApi(data.plans));
      })
      .catch(() => {
        /* keep static PRICING_PLANS */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-6"
          >
            <Star className="w-4 h-4" />
            Pricing
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            Start free and scale as you grow. No hidden fees, no surprises.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-primary/30 border-2 border-accent/40 shadow-2xl shadow-accent/10"
                  : "glass"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 bg-accent text-primary-dark text-xs font-bold rounded-full shadow-lg shadow-accent/30">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold gradient-text">
                    ${plan.price}
                  </span>
                  <span className="text-muted text-sm">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#analyze"
                  className={`block text-center py-3.5 rounded-full font-medium text-sm transition-all ${
                    plan.highlighted
                      ? "bg-accent text-primary-dark hover:bg-accent-muted shadow-lg shadow-accent/20"
                      : "glass hover:bg-primary/20 text-foreground"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted mt-12"
        >
          All plans include SSL encryption, GDPR compliance, and automatic data deletion.
        </motion.p>
      </div>
    </section>
  );
}
