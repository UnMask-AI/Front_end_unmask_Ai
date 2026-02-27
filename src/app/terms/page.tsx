import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — UnMask AI",
  description: "UnMask AI terms of service and usage policies.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <h1 className="text-4xl font-bold mb-8">
        Terms of <span className="gradient-text">Service</span>
      </h1>
      <p className="text-sm text-muted mb-8">Last updated: February 2026</p>

      <div className="prose prose-invert prose-green max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
          <p className="text-muted leading-relaxed">
            By accessing or using UnMask AI (&ldquo;the Service&rdquo;), you agree to
            be bound by these Terms of Service. If you do not agree to these
            terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Service Description</h2>
          <p className="text-muted leading-relaxed">
            UnMask AI provides AI-powered audio deepfake detection through a web
            interface, REST API, and WhatsApp bot. The service analyzes audio
            files and provides a confidence score indicating whether the audio
            is authentic or AI-generated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Usage Limits</h2>
          <p className="text-muted leading-relaxed">
            Usage is subject to the limits of your subscription plan. Exceeding
            your plan limits may result in temporary service restrictions until
            the next billing cycle or plan upgrade.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Acceptable Use</h2>
          <p className="text-muted leading-relaxed">
            You may not use the Service for any illegal purpose, to harass or
            harm others, to reverse-engineer our detection models, or to
            circumvent usage limits through automated means.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Disclaimer</h2>
          <p className="text-muted leading-relaxed">
            While UnMask AI strives for the highest accuracy, no deepfake
            detection system is 100% accurate. Results should be used as one
            factor in your assessment and should not be the sole basis for
            critical decisions. The Service is provided &ldquo;as is&rdquo; without
            warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Contact</h2>
          <p className="text-muted leading-relaxed">
            For questions about these terms, contact us at{" "}
            <a href="mailto:legal@unmask.ai" className="text-accent hover:underline">
              legal@unmask.ai
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
