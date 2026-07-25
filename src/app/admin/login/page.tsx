"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { Shield, KeyRound, UserPlus, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Login form state
  const [code, setCode] = useState("");

  // Register form state
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    code: "",
  });

  useEffect(() => {
    async function checkAdminState() {
      try {
        const res = await fetch("/api/v1/admin/me");
        const data = await res.json();
        if (data.authenticated) {
          router.push("/admin/dashboard");
          return;
        }
        setIsRegistered(data.isRegistered);
      } catch (err) {
        setIsRegistered(true);
      } finally {
        setLoading(false);
      }
    }
    checkAdminState();
  }, [router]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/v1/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Admin login successful!");
        router.push("/admin/dashboard");
      } else {
        toast.error(data.message || "Invalid admin secret code");
      }
    } catch (err: any) {
      toast.error("Login request failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/v1/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Admin account created! Now log in with your secret code.");
        setIsRegistered(true);
        setCode(regData.code);
      } else {
        toast.error(data.message || "Admin registration failed");
      }
    } catch (err) {
      toast.error("Registration request failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal Access</h1>
          <p className="text-sm text-muted-foreground">
            {isRegistered ? "Enter your secret access code to enter dashboard" : "Initialize agency admin account"}
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {isRegistered ? <KeyRound className="w-5 h-5 text-blue-600" /> : <UserPlus className="w-5 h-5 text-blue-600" />}
              {isRegistered ? "Admin Verification" : "Create Admin Account"}
            </CardTitle>
            <CardDescription>
              {isRegistered ? "Protected route for authorized agency managers." : "Initial setup for the master admin."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isRegistered ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold">Admin Secret Code *</label>
                  <div className="relative mt-1">
                    <Input
                      type="password"
                      required
                      placeholder="Enter code..."
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" disabled={submitting} className="w-full font-semibold">
                  {submitting ? "Verifying..." : "Enter Admin Dashboard"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold">Admin Name *</label>
                  <Input
                    required
                    placeholder="Master Admin"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Admin Email *</label>
                  <Input
                    type="email"
                    required
                    placeholder="admin@agency.com"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Secret Access Code *</label>
                  <Input
                    type="password"
                    required
                    placeholder="Create a strong secret code"
                    value={regData.code}
                    onChange={(e) => setRegData({ ...regData, code: e.target.value })}
                  />
                </div>

                <Button type="submit" disabled={submitting} className="w-full font-semibold">
                  {submitting ? "Creating Admin..." : "Initialize Admin Account"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
