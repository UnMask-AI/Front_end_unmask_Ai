import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — UnMask AI",
  description: "UnMask AI privacy policy. Learn how we protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <h1 className="text-4xl font-bold mb-8">
        Privacy <span className="gradient-text">Policy</span>
      </h1>
      <p className="text-sm text-muted mb-8">Last updated: February 2026</p>

      <div className="prose prose-invert prose-green max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
          <p className="text-muted leading-relaxed">
            UnMask AI collects minimal information necessary to provide our
            deepfake detection service. When you upload an audio file, the file
            is processed in real-time and is <strong className="text-foreground">never stored</strong> on our
            servers after analysis is complete.
          </p>
          <ul className="list-disc list-inside text-muted space-y-2 mt-4">
            <li>Account information (email, name) for registered users</li>
            <li>Usage statistics (number of analyses, timestamps)</li>
            <li>API access logs for security purposes</li>
            <li>Payment information (processed by Stripe, never stored by us)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Audio File Processing</h2>
          <p className="text-muted leading-relaxed">
            Audio files uploaded for analysis are encrypted using AES-256 during
            transit and processed in isolated sandbox environments. Files are
            immediately deleted after analysis is complete. We do not retain,
            cache, or use your audio files for model training or any other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Data Sharing</h2>
          <p className="text-muted leading-relaxed">
            We do not sell, rent, or share your personal data with third parties.
            We may share anonymized, aggregated usage statistics for research
            purposes, but this data cannot be used to identify individual users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. WhatsApp Integration</h2>
          <p className="text-muted leading-relaxed">
            When using our WhatsApp bot, audio files sent are processed with the
            same privacy standards as our web interface. WhatsApp messages are
            not stored beyond what is necessary for providing analysis results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
          <p className="text-muted leading-relaxed">
            Under GDPR and CCPA, you have the right to access, correct, or
            delete your personal data. You may also request a copy of all data
            we hold about you. Contact us at privacy@unmask.ai for any
            data-related requests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Contact</h2>
          <p className="text-muted leading-relaxed">
            For privacy-related questions or concerns, contact our Data
            Protection Officer at{" "}
            <a href="mailto:privacy@unmask.ai" className="text-accent hover:underline">
              privacy@unmask.ai
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
