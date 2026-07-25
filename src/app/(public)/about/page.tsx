import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Target, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Precision Execution",
      description: "We ship clean, tested, and reliable software with strict adherence to architectural standards.",
    },
    {
      icon: Heart,
      title: "User-Centric Design",
      description: "Every pixel, animation, and flow is engineered to delight users and drive real business metrics.",
    },
    {
      icon: ShieldCheck,
      title: "Security & Trust",
      description: "Built-in Zod validation, JWT authentication, and enterprise-grade data protection.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 [font-family:'Geist',ui-sans-serif,system-ui,sans-serif]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
          .fade-up-1 { animation-delay: 0.08s; }
          .fade-up-2 { animation-delay: 0.16s; }
          .fade-up-3 { animation-delay: 0.24s; }

          .stagger-card { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
          .stagger-row { animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

          @keyframes shimmer {
            to { background-position: 200% center; }
          }
          .gradient-text {
            background-image: linear-gradient(110deg, currentColor 30%, #737373 45%, currentColor 60%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 4.5s linear infinite;
          }
          .dark .gradient-text {
            background-image: linear-gradient(110deg, currentColor 30%, #a3a3a3 45%, currentColor 60%);
          }
        `}
      </style>

      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge
          variant="outline"
          className="fade-up px-3 py-1 border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        >
          About AuraAgency
        </Badge>
        <h1 className="fade-up fade-up-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Crafting the Future of <span className="gradient-text">Web & Software</span>
        </h1>
        <p className="fade-up fade-up-2 text-lg text-muted-foreground leading-relaxed">
          We are a full-service agency specializing in Next.js web applications, modern UI/UX design, cloud architecture, and high-growth digital strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((v, idx) => {
          const Icon = v.icon;
          return (
            <Card
              key={idx}
              style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              className="stagger-card group border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/40"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle>{v.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{v.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="fade-up fade-up-3 p-8 rounded-2xl border border-border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">Why Partner With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
          {[
            "Next.js App Router Native APIs & Middleware",
            "Full TypeScript strict safety",
            "Responsive Light & Dark Mode support",
            "Integrated Admin Dashboard & Analytics",
          ].map((item, idx) => (
            <div
              key={item}
              style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
              className="stagger-row flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-zinc-900 dark:text-white shrink-0" /> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
