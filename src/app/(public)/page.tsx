"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Palette,
  Layers,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Star,
  Users,
  Award,
  Globe2
} from "lucide-react";

export default function HomePage() {
  const services = [
    {
      icon: Code2,
      title: "Full-Stack Web Development",
      description: "Custom web applications built with Next.js, React, Node.js, and cloud native microservices.",
    },
    {
      icon: Palette,
      title: "UI/UX & Brand Design",
      description: "High-converting user interfaces, accessible design systems, and cohesive brand identities.",
    },
    {
      icon: Layers,
      title: "Mobile App Development",
      description: "Cross-platform iOS and Android applications engineered for performance and scalability.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Core Web Vitals enhancement, API caching, and database query tuning for maximum speed.",
    },
    {
      icon: TrendingUp,
      title: "Growth Engineering & SEO",
      description: "Data-driven marketing tech, search engine optimization, and conversion rate optimization.",
    },
    {
      icon: ShieldCheck,
      title: "Cloud & DevOps Architecture",
      description: "Automated CI/CD pipelines, containerized deployments, and robust cloud infrastructure.",
    },
  ];

  const metrics = [
    { label: "Projects Completed", value: "150+", icon: Award },
    { label: "Client Satisfaction", value: "99.4%", icon: Star },
    { label: "Active Enterprises", value: "45+", icon: Users },
    { label: "Global Reach", value: "24 Countries", icon: Globe2 },
  ];

  return (
    <div className="space-y-20 pb-20 [font-family:'Geist',ui-sans-serif,system-ui,sans-serif]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
          .fade-up-1 { animation-delay: 0.05s; }
          .fade-up-2 { animation-delay: 0.15s; }
          .fade-up-3 { animation-delay: 0.25s; }
          .fade-up-4 { animation-delay: 0.35s; }

          @keyframes shimmer {
            to { background-position: 200% center; }
          }
          .gradient-text {
            background-image: linear-gradient(
              110deg,
              currentColor 30%,
              #737373 45%,
              currentColor 60%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 4.5s linear infinite;
          }
          .dark .gradient-text {
            background-image: linear-gradient(
              110deg,
              currentColor 30%,
              #a3a3a3 45%,
              currentColor 60%
            );
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-500/10 via-transparent to-transparent dark:from-zinc-300/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <Badge
            variant="secondary"
            className="fade-up px-4 py-1.5 text-sm gap-2 border border-zinc-200 bg-[#fff] text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <Sparkles className="w-4 h-4" />
            Top-Rated Digital Product Agency
          </Badge>

          <h1 className="fade-up fade-up-1 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] text-zinc-950 dark:text-white">
            We Build Digital Products That <span className="gradient-text">Transform Industries</span>
          </h1>

          <p className="fade-up fade-up-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From intuitive UI/UX design to robust Next.js and MongoDB web applications, we partner with visionary teams to turn complex ideas into seamless user experiences.
          </p>

          <div className="fade-up fade-up-3 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="gap-2 shadow-lg shadow-zinc-900/10 text-base font-semibold w-full sm:w-auto bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-transform hover:-translate-y-0.5"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold w-full sm:w-auto border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900 transition-transform hover:-translate-y-0.5"
              >
                Explore Our Portfolio
              </Button>
            </Link>
          </div>

          {/* Key Feature Pills */}
          <div className="fade-up fade-up-4 flex flex-wrap justify-center items-center gap-6 pt-8 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white" /> Next.js App Router API
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white" /> Shadcn & Tailwind Design
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white" /> MongoDB & Zod Validation
            </span>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl border border-border bg-card shadow-sm">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center text-center space-y-2"
              >
                <div className="p-3 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold text-foreground">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Our Core Expertise
          </h2>
          <p className="text-muted-foreground text-base">
            End-to-end digital solutions tailored to elevate your business performance and user engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card
                key={idx}
                className="group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/40 transition-all duration-300 border-zinc-200 dark:border-zinc-800"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white p-8 md:p-16 text-center space-y-6 shadow-2xl dark:bg-white dark:text-zinc-950">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] dark:[background-image:radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] [background-size:22px_22px]" />

          <h2 className="relative text-3xl sm:text-5xl font-bold">Have a Project in Mind?</h2>
          <p className="relative text-zinc-300 dark:text-zinc-600 max-w-2xl mx-auto text-base sm:text-lg">
            Let's collaborate to build something extraordinary. Get in touch with our team of engineers and designers today.
          </p>
          <div className="relative">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800 font-bold px-8 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Get Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}