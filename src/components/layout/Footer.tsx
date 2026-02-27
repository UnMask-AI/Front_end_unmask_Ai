"use client";

import { Shield, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "API Docs", href: "#api" },
      { label: "WhatsApp Bot", href: "#whatsapp" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#vision" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "#faq" },
      { label: "Status", href: "/status" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Un<span className="gradient-text">Mask</span>{" "}
                <span className="text-muted font-light">AI</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>{SITE_CONFIG.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>+1 (555) 000-0000</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
