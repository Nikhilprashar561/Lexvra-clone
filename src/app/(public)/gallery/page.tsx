"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
// import { formatDate } from "@/lib/utils";
import { ImageIcon, Calendar, Sparkles, Eye } from "lucide-react";

interface GalleryItem {
  _id: string;
  name: string;
  image: string;
  description: string;
  date: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const fallbackItems: GalleryItem[] = [
    {
      _id: "demo-1",
      name: "Fintech Dashboard Platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive financial analytics dashboard with real-time charts and multi-currency reporting.",
      date: new Date().toISOString(),
    },
    {
      _id: "demo-2",
      name: "E-Commerce Luxury Portal",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      description: "High-conversion retail store with seamless checkout, inventory tracking, and Shadcn UI components.",
      date: new Date().toISOString(),
    },
    {
      _id: "demo-3",
      name: "AI SaaS Mobile Companion",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
      description: "Cross-platform mobile application powered by Next.js backend and automated workflow triggers.",
      date: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/v1/gallery/get-gallery");
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setItems(data.data);
        } else {
          setItems(fallbackItems);
        }
      } catch (err) {
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

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
          Our Showcase
        </Badge>
        <h1 className="fade-up fade-up-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Featured Projects & <span className="gradient-text">Gallery</span>
        </h1>
        <p className="fade-up fade-up-2 text-lg text-muted-foreground leading-relaxed">
          Explore our recent digital creations, client achievements, and technological implementations.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <Card
              key={item._id}
              onClick={() => setSelectedItem(item)}
              style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
              className="stagger-card group cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-300 border-zinc-200 dark:border-zinc-800 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/40"
            >
              <div className="relative h-56 w-full overflow-hidden bg-muted">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-zinc-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white gap-2 font-medium">
                  <Eye className="w-5 h-5" /> View Details
                </div>
              </div>

              <CardContent className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {item.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
                  2026
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
        title={selectedItem?.name}
      >
        {selectedItem && (
          <div className="space-y-4 pt-2">
            <div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden bg-muted">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedItem.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
              <Calendar className="w-4 h-4 text-zinc-900 dark:text-zinc-100" /> Published on 2026
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}