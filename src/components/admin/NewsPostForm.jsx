import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CATEGORIES = ['Industry Trend', 'Partnership', 'Press Release', 'Market Data', 'Company Update'];

const EMPTY = {
  title: '',
  category: '',
  summary: '',
  body: '',
  author: 'RTM Imports Team',
  published_date: new Date().toISOString().split('T')[0],
  is_published: false,
  is_featured: false,
  external_url: '',
  image_url: '',
  tags: [],
};

export default function NewsPostForm({ post, onSave, onCancel }) {
  const [form, setForm] = useState(post ? { ...post } : { ...EMPTY });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().toLowerCase();
      if (!form.tags?.includes(t)) set('tags', [...(form.tags || []), t]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => set('tags', form.tags.filter((t) => t !== tag));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={onCancel} className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="font-display text-3xl text-foreground mb-8">
          {post ? 'Edit Post' : 'New Post'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2 space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Title *</Label>
              <Input required value={form.title} onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. Soju Market Hits $935M in the U.S." className="bg-card border-border h-12 font-body text-foreground" />
            </div>

            <div className="space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Category *</Label>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger className="bg-card border-border h-12 font-body text-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Published Date *</Label>
              <Input type="date" required value={form.published_date} onChange={(e) => set('published_date', e.target.value)}
                className="bg-card border-border h-12 font-body text-foreground" />
            </div>

            <div className="space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Author</Label>
              <Input value={form.author} onChange={(e) => set('author', e.target.value)}
                placeholder="Benjamin Roberts" className="bg-card border-border h-12 font-body text-foreground" />
            </div>

            <div className="space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">External Source URL</Label>
              <Input value={form.external_url} onChange={(e) => set('external_url', e.target.value)}
                placeholder="https://drinksbusiness.com/..." className="bg-card border-border h-12 font-body text-foreground" />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Image URL</Label>
              <Input value={form.image_url} onChange={(e) => set('image_url', e.target.value)}
                placeholder="https://..." className="bg-card border-border h-12 font-body text-foreground" />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Summary * (shown in cards)</Label>
              <Textarea required value={form.summary} onChange={(e) => set('summary', e.target.value)}
                placeholder="2–3 sentence overview..." rows={3} className="bg-card border-border font-body text-foreground resize-none" />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Full Body (Markdown supported)</Label>
              <Textarea value={form.body} onChange={(e) => set('body', e.target.value)}
                placeholder="Full article content... Leave blank to show summary only." rows={10}
                className="bg-card border-border font-body text-foreground resize-none font-mono text-sm" />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Tags (press Enter to add)</Label>
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={addTag}
                placeholder="soju, k-culture, market-data..." className="bg-card border-border h-12 font-body text-foreground" />
              {form.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.tags.map((tag) => (
                    <button key={tag} type="button" onClick={() => removeTag(tag)}
                      className="font-body text-xs text-muted-foreground border border-border px-3 py-1 hover:border-destructive hover:text-destructive transition-colors">
                      #{tag} ×
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-8 py-4 border-y border-border">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)}
                className="w-4 h-4 accent-primary" />
              <span className="font-body text-sm text-foreground">Published</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)}
                className="w-4 h-4 accent-primary" />
              <span className="font-body text-sm text-foreground">Featured (hero placement)</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-200 disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? 'Saving…' : 'Save Post'}
            </button>
            <button type="button" onClick={onCancel}
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-muted-foreground font-body text-sm tracking-widest uppercase hover:border-foreground hover:text-foreground transition-all duration-200">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}