"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`UnMask contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent mb-4"
          >
            <Mail className="w-4 h-4" />
            Contact
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
          >
            Get in <span className="gradient-text">touch</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted text-sm">
            Sales, partnerships, or product questions — we read every message.
          </motion.p>
        </motion.div>
        {sent ? (
          <p className="text-center text-sm text-accent">
            Your mail client should open with a draft. You can also email us
            directly at {SITE_CONFIG.email}.
          </p>
        ) : (
          <motion.form
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="glass rounded-3xl p-8 border border-border space-y-4"
          >
            <div>
              <Label htmlFor="c-name">Name</Label>
              <Input
                id="c-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="c-email">Email</Label>
              <Input
                id="c-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="c-msg">Message</Label>
              <textarea
                id="c-msg"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl bg-primary/20 border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-accent resize-y min-h-[120px]"
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="w-4 h-4" />
              Open email draft
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
