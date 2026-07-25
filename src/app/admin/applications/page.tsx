"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Search, Eye, FileText, ExternalLink, Briefcase, MapPin, Clock } from "lucide-react";

interface Application {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  currentLocation: string;
  currentJobTitle: string;
  experience: string;
  relevantExperience: string;
  noticePeriod: string;
  resume: string;
  portfolioLink?: string;
  coverLetter?: string;
  createdAt: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await fetch("/api/v1/admin/applications");
        const data = await res.json();
        if (data.success) {
          setApplications(data.data || []);
        }
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, []);

  const filteredApps = applications.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.currentJobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Job Applications</h2>
          <p className="text-sm text-muted-foreground">
            Review candidate profiles and resume submissions.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground animate-pulse">Loading applications...</div>
          ) : filteredApps.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No candidate applications received yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Notice Period</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApps.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>
                      <div className="font-semibold text-foreground">{app.name}</div>
                      <div className="text-xs text-muted-foreground">{app.email}</div>
                    </TableCell>
                    <TableCell className="font-medium">{app.currentJobTitle}</TableCell>
                    <TableCell className="text-sm">{app.experience}</TableCell>
                    <TableCell><Badge variant="secondary">{app.noticePeriod}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">2026</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedApp(app)} className="gap-1">
                        <Eye className="w-4 h-4 text-blue-600" /> Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Candidate Details Dialog */}
      <Dialog
        open={!!selectedApp}
        onOpenChange={(open) => !open && setSelectedApp(null)}
        title={selectedApp?.name}
        description={`Applicant for ${selectedApp?.currentJobTitle}`}
      >
        {selectedApp && (
          <div className="space-y-4 pt-2 text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-semibold">{selectedApp.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mobile</p>
                <p className="font-semibold">{selectedApp.mobile}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold">{selectedApp.currentLocation}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Notice Period</p>
                <p className="font-semibold">{selectedApp.noticePeriod}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Experience</p>
                <p className="font-semibold">{selectedApp.experience}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Relevant Exp</p>
                <p className="font-semibold">{selectedApp.relevantExperience}</p>
              </div>
            </div>

            {selectedApp.portfolioLink && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Portfolio Link</p>
                <a
                  href={selectedApp.portfolioLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                >
                  {selectedApp.portfolioLink} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {selectedApp.coverLetter && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Cover Letter</p>
                <p className="p-3 rounded-md bg-card border border-border mt-1 text-xs leading-relaxed">
                  {selectedApp.coverLetter}
                </p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-border">
              <a href={selectedApp.resume} target="_blank" rel="noreferrer">
                <Button size="sm" className="gap-2">
                  <FileText className="w-4 h-4" /> Download / Open Resume
                </Button>
              </a>
              <span className="text-xs text-muted-foreground">Applied 2026</span>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
