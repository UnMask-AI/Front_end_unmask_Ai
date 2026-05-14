import Link from "next/link";

export const metadata = {
  title: "Cookie policy — UnMask AI",
};

export default function CookiesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 lg:py-24 prose prose-invert prose-sm">
      <h1 className="text-3xl font-bold mb-6 not-prose">Cookies</h1>
      <p className="text-muted mb-4">
        UnMask AI uses strictly necessary cookies and local storage for theme preference
        (<code>theme</code>) and, when you sign in, session identifiers stored in{" "}
        <code>localStorage</code> for API authentication in this demo web app.
      </p>
      <p className="text-muted mb-4">
        We do not use third-party advertising cookies on this marketing site. Analytics may be
        added later and this page will be updated.
      </p>
      <Link href="/privacy" className="text-accent text-sm hover:underline">
        Privacy policy
      </Link>
    </div>
  );
}
