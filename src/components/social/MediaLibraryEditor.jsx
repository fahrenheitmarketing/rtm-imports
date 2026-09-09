import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2, Trash2, ExternalLink } from "lucide-react";

export default function MediaLibraryEditor({ value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = [];
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        uploaded.push({ file_url, label: file.name, usage_notes: "" });
      }
      onChange([...items, ...uploaded]);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const update = (i, field, val) => {
    onChange(items.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)));
  };

  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-xs text-muted-foreground">No images uploaded yet. Add bottle shots and lifestyle imagery from the partner brand's media kit.</p>
      )}
      {items.map((item, i) => (
        <div key={i} className="rounded-md border border-border p-3 space-y-2">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded overflow-hidden border border-border flex-shrink-0 bg-secondary">
              <img src={item.file_url} alt={item.label || "Media library image"} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[11px]">Label</Label>
                  <Input className="h-8 text-xs" value={item.label || ""} onChange={(e) => update(i, "label", e.target.value)} placeholder="e.g. Bottle shot — front" />
                </div>
                <div>
                  <Label className="text-[11px]">Usage notes</Label>
                  <Input className="h-8 text-xs" value={item.usage_notes || ""} onChange={(e) => update(i, "usage_notes", e.target.value)} placeholder="e.g. Use for Soju posts" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground" onClick={() => window.open(item.file_url, "_blank")}>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => remove(i)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
      <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
        {uploading ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5 mr-1" />}
        {uploading ? "Uploading..." : "Upload images"}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}