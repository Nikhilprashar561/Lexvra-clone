"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import {
  MessageSquare,
  Users,
  Briefcase,
  ImageIcon,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

interface StatsData {
  metrics: {
    totalContacts: number;
    totalApplications: number;
    totalJobs: number;
    totalGallery: number;
  };
  recentContacts: any[];
  recentApplications: any[];
  departmentChartData: { name: string; value: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/v1/admin/stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard metrics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const defaultDepartmentData = [
    { name: "Engineering", value: 4 },
    { name: "Design", value: 3 },
    { name: "DevOps", value: 2 },
    { name: "Marketing", value: 2 },
  ];

  const activityData = [
    { month: "Jan", Inquiries: 12, Applications: 8 },
    { month: "Feb", Inquiries: 19, Applications: 14 },
    { month: "Mar", Inquiries: 25, Applications: 22 },
    { month: "Apr", Inquiries: 32, Applications: 29 },
    { month: "May", Inquiries: 45, Applications: 36 },
    { month: "Jun", Inquiries: 58, Applications: 42 },
  ];

  const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#10b981"];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-32 rounded-xl bg-card border border-border" />
          ))}
        </div>
        <div className="h-80 rounded-xl bg-card border border-border" />
      </div>
    );
  }

  const metrics = stats?.metrics || {
    totalContacts: 0,
    totalApplications: 0,
    totalJobs: 0,
    totalGallery: 0,
  };

  const departmentData =
    stats?.departmentChartData && stats.departmentChartData.length > 0
      ? stats.departmentChartData
      : defaultDepartmentData;

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Agency Overview</h2>
          <p className="text-sm text-muted-foreground">
            Real-time analytics, applicant metrics, and agency operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/jobs">
            <Button size="sm" className="gap-1.5 shadow-sm">
              <Plus className="w-4 h-4" /> Post New Job
            </Button>
          </Link>
          <Link href="/admin/gallery">
            <Button size="sm" variant="outline" className="gap-1.5">
              <ImageIcon className="w-4 h-4" /> Upload Showcase
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contact Inquiries</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{metrics.totalContacts}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Job Applications</CardTitle>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{metrics.totalApplications}</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18% applicant growth
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Job Postings</CardTitle>
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{metrics.totalJobs}</div>
            <p className="text-xs text-muted-foreground mt-1">Open positions across teams</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Showcase</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ImageIcon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground">{metrics.totalGallery}</div>
            <p className="text-xs text-muted-foreground mt-1">Published project items</p>
          </CardContent>
        </Card>
      </div>

      {/* Visualizations Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Growth Area Chart */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle className="text-lg">Inquiries & Applications Growth</CardTitle>
            <CardDescription>Monthly trend visualization</CardDescription>
          </CardHeader>
          <CardContent className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area type="monotone" dataKey="Inquiries" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInquiries)" />
                <Area type="monotone" dataKey="Applications" stroke="#6366f1" fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution Donut */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg">Department Openings</CardTitle>
            <CardDescription>Breakdown by department</CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Contacts Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Contact Inquiries</CardTitle>
            <CardDescription>Latest submissions from contact page</CardDescription>
          </div>
          <Link href="/admin/contacts">
            <Button size="sm" variant="outline" className="gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {stats?.recentContacts && stats.recentContacts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentContacts.slice(0, 5).map((contact: any) => (
                  <TableRow key={contact._id}>
                    <TableCell className="font-semibold">{contact.name}</TableCell>
                    <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                    <TableCell>{contact.subject}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{formatDate(contact.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No recent contact inquiries recorded yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
