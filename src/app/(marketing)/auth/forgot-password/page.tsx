"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 border border-border">
        <h1 className="text-2xl font-bold mb-2">Reset password</h1>
        <p className="text-sm text-muted mb-8">
          Enter the email associated with your account. When email delivery is connected on
          the backend, you will receive a reset link. This UI is ready for that flow.
        </p>
        {done ? (
          <p className="text-sm text-accent">
            If an account exists for <strong>{email}</strong>, password reset instructions will
            be sent when the feature is enabled on the API.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fp-email">Email</Label>
              <Input
                id="fp-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Request reset link
            </Button>
          </form>
        )}
        <p className="text-sm text-muted mt-6 text-center">
          <Link href="/auth/login" className="text-accent hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
