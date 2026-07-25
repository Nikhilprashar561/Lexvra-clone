"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { Plus, Trash2, ImageIcon, Calendar, Upload } from "lucide-react";

interface GalleryItem {
  _id: string;
  name: string;
  image: string;
  description: string;
  date: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/v1/gallery/get-gallery");
      const data = await res.json();
      if (data.success) {
        setItems(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load gallery", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      const res = await fetch(`/api/v1/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Gallery item deleted");
        fetchGallery();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Error deleting item");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile && !imageUrlInput) {
      toast.error("Please provide an image file or image URL");
      return;
    }

    setSubmitting(true);
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("name", formData.name);
      bodyFormData.append("description", formData.description);
      if (formData.date) bodyFormData.append("date", formData.date);

      if (imageFile) {
        bodyFormData.append("image", imageFile);
      } else {
        bodyFormData.append("image", imageUrlInput);
      }

      const res = await fetch("/api/v1/gallery/create-gallery", {
        method: "POST",
        body: bodyFormData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Showcase item uploaded successfully!");
        setDialogOpen(false);
        setFormData({ name: "", description: "", date: "" });
        setImageFile(null);
        setImageUrlInput("");
        fetchGallery();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Error creating gallery item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Portfolio & Gallery Manager</h2>
          <p className="text-sm text-muted-foreground">
            Upload new showcase projects to display on the public website.
          </p>
        </div>

        <Button onClick={() => setDialogOpen(true)} className="gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Upload New Item
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 rounded-xl bg-card border border-border" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">
          No gallery items uploaded yet. Click "Upload New Item" above to publish your first project.
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item._id} className="overflow-hidden flex flex-col justify-between">
              <div className="relative h-48 w-full bg-muted overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-600/80 text-white hover:bg-red-600 transition-colors shadow-md"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-base text-foreground">{item.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="pt-2 flex items-center gap-1 text-[11px] text-muted-foreground border-t border-border">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" /> {formatDate(item.date)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Upload New Gallery Showcase Item"
        description="Provide project details and an image preview."
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-semibold">Project Title *</label>
            <Input
              required
              placeholder="e.g. Next.js E-Commerce Platform"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold">Image Upload (File or URL) *</label>
            <div className="space-y-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <p className="text-[11px] text-center text-muted-foreground">OR enter direct image URL:</p>
              <Input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Project Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold">Description *</label>
            <Textarea
              required
              rows={3}
              placeholder="Key technologies, features, and achievements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Uploading..." : "Publish to Gallery"}
          </Button>
        </form>
      </Dialog>
    </div>
  );
}
