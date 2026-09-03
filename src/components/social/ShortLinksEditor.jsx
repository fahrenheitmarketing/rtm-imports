import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

const PAGES = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Asian Beverage Sourcing", path: "/services/asian-beverage" },
  { label: "Custom Labels", path: "/services/custom-labels" },
  { label: "Compliance & Import Support", path: "/services/compliance" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Wholesalers", path: "/wholesalers" },
  { label: "Supplier Portal", path: "/suppliers" },
  { label: "News & Insights", path: "/news" },
  { label: "Contact", path: "/contact" },
];

const PLATFORMS = [
  { value: "all", label: "All Platforms" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "X (Twitter)" },
  { value: "google_business", label: "Google Business" },
];

export default function ShortLinksEditor({ value, onChange }) {
  const links = Array.isArray(value) ? value : [];

  const update = (i, field, val) => {
    onChange(links.map((l, idx) => (idx === i ? { ...l, [field]: val } : l)));
  };
  const add = () => onChange([...links, { page: "/", platform: "all", url: "" }]);
  const remove = (i) => onChange(links.filter((_, idx) => idx !== i));

  const pageLabel = (path) => PAGES.find((p) => p.path === path)?.label || path;

  return (
    <div className="space-y-2">
      {links.length > 0 && (
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-1">
          <div className="col-span-4">Page</div>
          <div className="col-span-3">Platform</div>
          <div className="col-span-4">Short Link URL</div>
          <div className="col-span-1" />
        </div>
      )}
      {links.length === 0 && (
        <p className="text-xs text-muted-foreground">No short links added yet.</p>
      )}
      {links.map((link, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-4">
            <Select value={link.page} onValueChange={(v) => update(i, "page", v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue>{pageLabel(link.page)}</SelectValue></SelectTrigger>
              <SelectContent>
                {PAGES.map((p) => (
                  <SelectItem key={p.path} value={p.path}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3">
            <Select value={link.platform} onValueChange={(v) => update(i, "platform", v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-4">
            <Input className="h-8 text-xs" value={link.url} onChange={(e) => update(i, "url", e.target.value)} placeholder="https://short.link/abc" />
          </div>
          <div className="col-span-1 flex justify-end">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => remove(i)}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={add}>
        <Plus className="w-3.5 h-3.5 mr-1" />
        Add short link
      </Button>
    </div>
  );
}