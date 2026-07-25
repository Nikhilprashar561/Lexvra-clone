"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Search, Mail, Phone, Calendar, Eye, MessageSquare } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/v1/admin/contacts");
        const data = await res.json();
        if (data.success) {
          setContacts(data.data || []);
        }
      } catch (err) {
        console.error("Failed to load contacts", err);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contact Inquiries</h2>
          <p className="text-sm text-muted-foreground">
            Manage incoming inquiries from website visitors.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search inquiries..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground animate-pulse">Loading inquiries...</div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No contact inquiries found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date Received</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell className="font-semibold text-foreground">{contact.name}</TableCell>
                    <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                    <TableCell className="text-sm">{contact.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">{contact.subject}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">2026</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedContact(contact)} className="gap-1">
                        <Eye className="w-4 h-4 text-blue-600" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
        title={selectedContact?.subject}
        description={`From: ${selectedContact?.name}`}
      >
        {selectedContact && (
          <div className="space-y-4 pt-2 text-sm">
            <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-semibold">{selectedContact.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-semibold">{selectedContact.phone}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Message Body</p>
              <div className="p-4 rounded-lg bg-card border border-border leading-relaxed text-foreground whitespace-pre-line">
                {selectedContact.message}
              </div>
            </div>

            <div className="text-xs text-muted-foreground pt-2 flex items-center gap-1.5 border-t border-border">
              <Calendar className="w-3.5 h-3.5" /> Received on 2026
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
