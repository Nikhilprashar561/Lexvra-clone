import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Layers, Zap, TrendingUp, ShieldCheck, Check } from "lucide-react";

export default function ServicesPage() {
  const serviceList = [
    {
      icon: Code2,
      title: "Full-Stack Web Development",
      description: "Modern, scalable web applications built with Next.js, React 18, TypeScript, and MongoDB.",
      features: ["Server Components & SSR", "Rest API / GraphQL", "MongoDB & Mongoose", "Zod Data Validation"],
    },
    {
      icon: Palette,
      title: "UI/UX & Design Systems",
      description: "Crafting beautiful interfaces with Shadcn UI, Tailwind CSS, and custom accessibility tokens.",
      features: ["Light & Dark Mode", "Responsive Components", "Design Token Libraries", "Figma to Code Workflow"],
    },
    {
      icon: Layers,
      title: "Custom Admin Dashboards",
      description: "Tailored management interfaces with real-time data visualization, charts, and metrics.",
      features: ["Recharts Analytics", "Job & Applicant Trackers", "Contact Form Inboxes", "Cloudinary Image Managers"],
    },
    {
      icon: Zap,
      title: "Speed & SEO Optimization",
      description: "Boosting Lighthouse scores, reducing load times, and dominating search rankings.",
      features: ["Dynamic Metadata", "Image Compression", "Caching Strategies", "Core Web Vitals Audit"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 [font-family:'Geist',ui-sans-serif,system-ui,sans-serif]">
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

          .stagger-card { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

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
          What We Do
        </Badge>
        <h1 className="fade-up fade-up-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Comprehensive <span className="gradient-text">Agency Services</span>
        </h1>
        <p className="fade-up fade-up-2 text-lg text-muted-foreground leading-relaxed">
          From concept to deployment, we deliver end-to-end technical expertise for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {serviceList.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card
              key={idx}
              style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
              className="stagger-card group flex flex-col justify-between border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/40"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">{s.title}</CardTitle>
                <CardDescription className="text-base pt-2">{s.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t border-border/50">
                <ul className="space-y-2">
                  {s.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-zinc-900 dark:text-white" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}