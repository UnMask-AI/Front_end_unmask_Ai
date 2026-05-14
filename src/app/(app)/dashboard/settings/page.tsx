"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-xl space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardDescription>Profile</CardDescription>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="text-xs text-muted uppercase tracking-wide mb-1">Name</p>
            <p>{user?.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted uppercase tracking-wide mb-1">Email</p>
            <p>{user?.email}</p>
          </div>
          {user?.phone && (
            <div>
              <p className="text-xs text-muted uppercase tracking-wide mb-1">Phone</p>
              <p>{user.phone}</p>
            </div>
          )}
          <p className="text-xs text-muted pt-2 border-t border-border">
            Password changes and email verification will use dedicated API endpoints when available.{" "}
            <Link href="/auth/forgot-password" className="text-accent hover:underline">
              Forgot password flow
            </Link>
          </p>
        </CardContent>
      </Card>
      <Button type="button" variant="danger" onClick={logout}>
        Sign out on this device
      </Button>
    </div>
  );
}
