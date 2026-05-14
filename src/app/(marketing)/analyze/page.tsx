import Link from "next/link";
import AudioAnalyzer from "@/components/sections/AudioAnalyzer";

export const metadata = {
  title: "Analyze audio — UnMask AI",
};

export default function AnalyzePage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Analyze audio</h1>
        <p className="text-sm text-muted">
          Signed-in users attach results to their account.{" "}
          <Link href="/auth/login" className="text-accent hover:underline">
            Sign in
          </Link>{" "}
          for history and quotas.
        </p>
      </div>
      <AudioAnalyzer />
    </div>
  );
}
