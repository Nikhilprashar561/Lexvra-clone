"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/v1/contact/create-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Thank you! Your message has been sent successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to send contact message");
      }
    } catch (err: any) {
      toast.error("An error occurred while sending message");
    } finally {
      setSubmitting(false);
    }
  };

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
          .fade-up-3 { animation-delay: 0.24s; }
          .fade-up-4 { animation-delay: 0.32s; }

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

          @keyframes pulseRing {
            0% { box-shadow: 0 0 0 0 rgba(24, 24, 27, 0.12); }
            70% { box-shadow: 0 0 0 8px rgba(24, 24, 27, 0); }
            100% { box-shadow: 0 0 0 0 rgba(24, 24, 27, 0); }
          }
          .dark .pulse-ring { animation-name: pulseRingDark; }
          @keyframes pulseRingDark {
            0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.14); }
            70% { box-shadow: 0 0 0 8px rgba(255, 255, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
          }
          .pulse-ring { animation: pulseRing 2.4s ease-out infinite; }
        `}
      </style>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge
          variant="outline"
          className="fade-up px-3 py-1 border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        >
          Contact Us
        </Badge>
        <h1 className="fade-up fade-up-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Let's Start a <span className="gradient-text">Conversation</span>
        </h1>
        <p className="fade-up fade-up-2 text-lg text-muted-foreground leading-relaxed">
          Have a project idea, question, or custom requirement? Send us a message and our team will get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 fade-up fade-up-3">
          <Card className="shadow-lg border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-zinc-900 dark:text-white" /> Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold">Your Name *</label>
                    <Input
                      required
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold">Email Address *</label>
                    <Input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold">Phone Number *</label>
                    <Input
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold">Subject *</label>
                    <Input
                      required
                      placeholder="Web App Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold">Message *</label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Describe your requirements or project details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full size-lg gap-2 text-base font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
                >
                  <Send className={submitting ? "w-4 h-4 animate-pulse" : "w-4 h-4"} />{" "}
                  {submitting ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Agency Info Sidebar */}
        <div className="lg:col-span-5 space-y-6 fade-up fade-up-4">
          <Card className="border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white transition-transform duration-300 group-hover:scale-110">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Email Us</h4>
                  <p className="text-sm text-muted-foreground">hello@lexvrainfinology.com</p>
                  <p className="text-sm text-muted-foreground">support@lexvrainfinology.com</p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white transition-transform duration-300 group-hover:scale-110">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Call Us</h4>
                  <p className="text-sm text-muted-foreground">+1 (555) 234-5678</p>
                  <p className="text-xs text-muted-foreground">Mon - Fri, 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Headquarters</h4>
                  <p className="text-sm text-muted-foreground">
                    100 Innovation Way, Suite 400<br />Tech City, CA 94103
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-zinc-950 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-zinc-200">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] dark:[background-image:radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] [background-size:20px_20px]" />
            <CardContent className="relative p-6 space-y-3">
              <div className="flex items-center gap-2 font-semibold">
                <span className="pulse-ring flex h-7 w-7 items-center justify-center rounded-full bg-white/10 dark:bg-zinc-950/10">
                  <Clock className="w-4 h-4" />
                </span>
                Fast Response Guarantee
              </div>
              <p className="text-xs text-zinc-300 dark:text-zinc-600 leading-relaxed">
                We review inquiries within 2 hours during business operations and provide detailed estimates for all custom web development projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
