"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Briefcase, MapPin, Clock, Building2, Upload, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  experience: string;
  department: string;
  employmentType: "Full-Time" | "Part-Time" | "Internship" | "Contract" | "Remote";
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    currentLocation: "",
    currentJobTitle: "",
    experience: "",
    relevantExperience: "",
    noticePeriod: "",
    portfolioLink: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const defaultJobs: Job[] = [
    {
      _id: "demo-job-1",
      title: "Senior Full-Stack Engineer (Next.js & Node)",
      description: "We are seeking an experienced Full-Stack Engineer to architect and build Next.js App Router applications, REST APIs, and MongoDB integrations.",
      location: "San Francisco, CA (Remote Allowed)",
      experience: "4+ Years",
      department: "Engineering",
      employmentType: "Full-Time",
    },
    {
      _id: "demo-job-2",
      title: "Lead UI/UX Designer & Design System Specialist",
      description: "Own our component libraries, design systems, and user interfaces across client web & mobile applications using Tailwind CSS and Figma.",
      location: "New York, NY (Hybrid)",
      experience: "3+ Years",
      department: "Design",
      employmentType: "Full-Time",
    },
    {
      _id: "demo-job-3",
      title: "DevOps & Cloud Infrastructure Engineer",
      description: "Manage deployment pipelines, Docker containers, AWS/Vercel hosting, database clusters, and monitoring alerts.",
      location: "Remote",
      experience: "3+ Years",
      department: "DevOps",
      employmentType: "Remote",
    },
  ];

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/v1/careers/get-job-openings");
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setJobs(data.data);
      } else {
        setJobs(defaultJobs);
      }
    } catch (err) {
      setJobs(defaultJobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filteredJobs = selectedDepartment === "All"
    ? jobs
    : jobs.filter((j) => j.department === selectedDepartment);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob) return;

    if (!resumeFile) {
      toast.error("Please select or upload your resume file.");
      return;
    }

    setSubmitting(true);
    try {
      const bodyFormData = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        bodyFormData.append(key, val);
      });
      bodyFormData.append("resume", resumeFile);

      const res = await fetch(`/api/v1/careers/apply-for-job/${activeJob._id}`, {
        method: "POST",
        body: bodyFormData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Application submitted successfully! We will review your profile shortly.");
        setActiveJob(null);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          currentLocation: "",
          currentJobTitle: "",
          experience: "",
          relevantExperience: "",
          noticePeriod: "",
          portfolioLink: "",
          coverLetter: "",
        });
        setResumeFile(null);
      } else {
        toast.error(data.message || "Failed to submit application");
      }
    } catch (err: any) {
      toast.error(err.message || "Network error submitting application");
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

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge
          variant="outline"
          className="fade-up px-3 py-1 border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        >
          Join Our Team
        </Badge>
        <h1 className="fade-up fade-up-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Build Great Products With <span className="gradient-text">Lexvra InFinology Pvt ltd.</span>
        </h1>
        <p className="fade-up fade-up-2 text-lg text-muted-foreground leading-relaxed">
          Explore current career openings and become part of our engineering and design team.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="fade-up fade-up-3 flex flex-wrap justify-center gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDepartment(dept)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedDepartment === dept
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md scale-[1.03]"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-36 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No job openings currently available in this department.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job, idx) => (
            <Card
              key={job._id}
              style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
              className="stagger-card border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/40 transition-all duration-300"
            >
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{job.department}</Badge>
                    <Badge variant="outline">{job.employmentType}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                </div>
                <Button
                  onClick={() => setActiveJob(job)}
                  size="lg"
                  className="gap-2 shrink-0 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-transform hover:translate-x-0.5"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground pt-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-zinc-900 dark:text-white" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-zinc-900 dark:text-white" /> {job.experience} Exp
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Application Dialog */}
      <Dialog
        open={!!activeJob}
        onOpenChange={(open) => !open && setActiveJob(null)}
        title={`Apply for ${activeJob?.title}`}
        description="Please fill in your professional details below."
      >
        <form onSubmit={handleApplySubmit} className="space-y-4 text-left pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Full Name *</label>
              <Input
                required
                placeholder="John Doe"
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
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Mobile Phone *</label>
              <Input
                required
                placeholder="+1 555-0199"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Current Location *</label>
              <Input
                required
                placeholder="New York, NY"
                value={formData.currentLocation}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Current Job Title *</label>
              <Input
                required
                placeholder="Frontend Developer"
                value={formData.currentJobTitle}
                onChange={(e) => setFormData({ ...formData, currentJobTitle: e.target.value })}
                className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Total Experience *</label>
              <Input
                required
                placeholder="3 Years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Relevant Experience *</label>
              <Input
                required
                placeholder="2.5 Years"
                value={formData.relevantExperience}
                onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Notice Period *</label>
              <Input
                required
                placeholder="30 Days / Immediate"
                value={formData.noticePeriod}
                onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Portfolio Link (Optional)</label>
            <Input
              type="url"
              placeholder="https://github.com/username or portfolio link"
              value={formData.portfolioLink}
              onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
              className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold">Resume File (PDF / DOC) *</label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold">Cover Letter (Optional)</label>
            <Textarea
              rows={3}
              placeholder="Tell us why you are a great fit..."
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              className="focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {submitting ? "Submitting Application..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
