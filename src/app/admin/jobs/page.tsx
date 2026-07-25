"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Briefcase, MapPin } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  experience: string;
  department: string;
  employmentType: "Full-Time" | "Part-Time" | "Internship" | "Contract" | "Remote";
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    experience: "",
    department: "",
    employmentType: "Full-Time",
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/v1/careers/get-job-openings");
      const data = await res.json();
      if (data.success) {
        setJobs(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenAdd = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      experience: "",
      department: "",
      employmentType: "Full-Time",
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      experience: job.experience,
      department: job.department,
      employmentType: job.employmentType,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;
    try {
      const res = await fetch(`/api/v1/careers/delete-job-opening/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Job opening deleted");
        fetchJobs();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Error deleting job");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingJob
        ? `/api/v1/careers/update-job-opening/${editingJob._id}`
        : "/api/v1/careers/new-job-opening";
      const method = editingJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingJob ? "Job opening updated!" : "New job opening posted!");
        setDialogOpen(false);
        fetchJobs();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (err) {
      toast.error("Error submitting job data");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Job Openings Management</h2>
          <p className="text-sm text-muted-foreground">
            Create, update, and manage career positions for your agency.
          </p>
        </div>

        <Button onClick={handleOpenAdd} className="gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Post New Job
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground animate-pulse">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No job openings created yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell className="font-semibold text-foreground">{job.title}</TableCell>
                    <TableCell><Badge variant="secondary">{job.department}</Badge></TableCell>
                    <TableCell><Badge variant="outline">{job.employmentType}</Badge></TableCell>
                    <TableCell className="text-sm">{job.location}</TableCell>
                    <TableCell className="text-sm">{job.experience}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="sm" variant="ghost" onClick={() => handleOpenEdit(job)}>
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(job._id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingJob ? "Edit Job Opening" : "Create New Job Opening"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-semibold">Job Title *</label>
            <Input
              required
              placeholder="e.g. Senior Full-Stack Engineer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Department *</label>
              <Input
                required
                placeholder="e.g. Engineering / Design"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Employment Type *</label>
              <select
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.employmentType}
                onChange={(e: any) => setFormData({ ...formData, employmentType: e.target.value })}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Location *</label>
              <Input
                required
                placeholder="e.g. Remote / San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Required Experience *</label>
              <Input
                required
                placeholder="e.g. 3+ Years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Job Description *</label>
            <Textarea
              required
              rows={4}
              placeholder="Detailed roles, responsibilities, and requirements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Saving..." : editingJob ? "Update Position" : "Publish Job Opening"}
          </Button>
        </form>
      </Dialog>
    </div>
  );
}
