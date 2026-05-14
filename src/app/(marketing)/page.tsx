import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Accuracy from "@/components/sections/Accuracy";
import AudioAnalyzer from "@/components/sections/AudioAnalyzer";
import Pricing from "@/components/sections/Pricing";
import WhatsAppSection from "@/components/sections/WhatsAppSection";
import Vision from "@/components/sections/Vision";
import PrivacySection from "@/components/sections/PrivacySection";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Accuracy />
      <AudioAnalyzer />
      <WhatsAppSection />
      <Pricing />
      <Vision />
      <PrivacySection />
      <FAQSection />
      <ContactSection />
      <Testimonials />
      <CTA />
    </>
  );
}
