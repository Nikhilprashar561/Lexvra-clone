"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const SERVICES_LINKS = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Development", href: "/services/mobile-development" },
  { label: "Cloud Solutions", href: "/services/cloud-solutions" },
  { label: "Consulting", href: "/services/consulting" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@400..600&display=swap');
          .navbar-font { font-family: "Geist", ui-sans-serif, system-ui, sans-serif; }
        `}
      </style>

      <header className="fixed inset-x-0 top-0 z-50 navbar-font">
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-4 sm:pt-4">
          <nav
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 sm:px-5",
              "border-zinc-800/60 bg-zinc-950/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]",
              "dark:border-zinc-800/60 dark:bg-zinc-950/90",
              "border-zinc-200 bg-white/90"
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                <span className="text-sm font-bold tracking-tight">Lx</span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-bold tracking-tight text-zinc-900 dark:text-white">
                  Lexvra <span className="font-semibold text-zinc-500 dark:text-zinc-300">InFinology</span>
                </span>
                <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                  Pvt Ltd
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-7 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  aria-expanded={servicesOpen}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      servicesOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "absolute left-1/2 top-full w-48 -translate-x-1/2 pt-3 transition-all duration-150",
                    servicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  )}
                >
                  <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white py-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                    {SERVICES_LINKS.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        className="block px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              <ThemeToggle />

              <Link href="/contact" className="hidden sm:block">
                <button
                  type="button"
                  className="group flex cursor-pointer items-center gap-2 rounded-full border-0 bg-zinc-900 py-2 pl-4 pr-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Get In Touch
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-900 transition-transform group-hover:translate-x-0.5 dark:bg-zinc-900 dark:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </Link>

              {/* Mobile toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent text-zinc-700 dark:text-zinc-200 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          <div
            className={cn(
              "grid overflow-hidden transition-all duration-200 lg:hidden",
              mobileOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="min-h-0">
              <div className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex items-center justify-between rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileServicesOpen && "rotate-180"
                    )}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="flex flex-col gap-0.5 pl-3">
                    {SERVICES_LINKS.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}

                <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-2">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-zinc-900 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
                  >
                    Get In Touch
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer so page content doesn't sit under the fixed navbar */}
      <div className="h-[20px] sm:h-[20px]" />
    </>
  );
}
