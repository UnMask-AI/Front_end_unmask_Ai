import Link from "next/link";

export const metadata = {
  title: "Blog — UnMask AI",
  description: "Updates from the UnMask AI team.",
};

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="text-muted text-sm mb-8">
        We are preparing articles on audio forensics, model releases, and security best practices.
        Check back soon or contact us for press inquiries.
      </p>
      <Link href="/contact" className="text-accent text-sm hover:underline">
        Contact us
      </Link>
    </div>
  );
}
