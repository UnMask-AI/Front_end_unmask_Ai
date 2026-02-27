"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { navbarVariant, fadeInDown, staggerContainerFast } from "@/lib/animations";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      variants={navbarVariant}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong shadow-lg shadow-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center"
            >
              <Shield className="w-5 h-5 text-accent" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">
              Un<span className="gradient-text">Mask</span>{" "}
              <span className="text-muted font-light">AI</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.href} variants={fadeInDown}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-sm text-muted hover:text-accent transition-colors duration-300 rounded-lg hover:bg-primary/10"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="#analyze"
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#analyze"
                className="px-5 py-2.5 text-sm font-medium bg-accent text-primary-dark rounded-full hover:bg-accent-muted transition-colors shadow-lg shadow-accent/20"
              >
                Try Free
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-muted hover:text-foreground"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong border-t border-border"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 text-muted hover:text-accent hover:bg-primary/10 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <Link
                  href="#analyze"
                  className="block text-center px-4 py-3 text-sm text-muted hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="#analyze"
                  className="block text-center px-4 py-3 text-sm font-medium bg-accent text-primary-dark rounded-full"
                >
                  Try Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
