"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Users,
  ImageIcon,
  LogOut,
  Shield,
  Menu,
  X,
  Rocket
} from "lucide-react";
import { toast } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/v1/admin/me");
        const data = await res.json();
        if (data.authenticated && data.data) {
          setAdminUser(data.data);
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/admin/logout", { method: "POST" });
      toast.success("Logged out of Admin Portal");
      router.push("/admin/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-background text-foreground flex flex-col">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-muted-foreground">Authenticating Admin Workspace...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/contacts", label: "Contact Inquiries", icon: MessageSquare },
    { href: "/admin/applications", label: "Job Applications", icon: Users },
    { href: "/admin/jobs", label: "Job Management", icon: Briefcase },
    { href: "/admin/gallery", label: "Gallery Manager", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card p-4 space-y-6">
        <div className="flex items-center gap-3 px-2 py-3 border-b border-border/50">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm leading-tight">Admin Console</h2>
            <p className="text-xs text-muted-foreground">Lexvra InFinology Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Admin Footer */}
        <div className="pt-4 border-t border-border space-y-3">
          {adminUser && (
            <div className="px-2">
              <p className="text-xs font-semibold text-foreground truncate">{adminUser.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{adminUser.email}</p>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout} className="w-full gap-2 text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg border border-border hover:bg-muted"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold capitalize text-foreground">
              {pathname.replace("/admin/", "").replace("-", " ") || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/" target="_blank">
              <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
                <Rocket className="w-3.5 h-3.5" /> View Website
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex">
            <div className="w-64 bg-card p-4 space-y-6 flex flex-col h-full border-r border-border">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Admin Navigation</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                        isActive
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full gap-2 text-destructive">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* Main Content View */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
