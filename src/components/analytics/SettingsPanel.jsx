import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function SettingsPanel({ open, onClose, password, onSaved }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({ brand_terms: ['rtm'], blog_path_prefix: '/news/', digital_assets_path: '/digital-assets/', tracking_start_date: '' });
  const [brandInput, setBrandInput] = useState('rtm');
  const [keywords, setKeywords] = useState([]);
  const [newKw, setNewKw] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke('analyticsDashboard', { password, action: 'getSettings' });
      setSettings(res.data.settings);
      setBrandInput((res.data.settings.brand_terms || ['rtm']).join(', '));
      setKeywords(res.data.keywords);
    } catch (e) { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { if (open) load(); }, [open]);

  const saveSettings = async () => {
    setSaving(true);
    const terms = brandInput.split(',').map((t) => t.trim()).filter(Boolean);
    try {
      await base44.functions.invoke('analyticsDashboard', {
        password, action: 'saveSettings',
        brand_terms: terms, blog_path_prefix: settings.blog_path_prefix,
        digital_assets_path: settings.digital_assets_path, tracking_start_date: settings.tracking_start_date,
      });
      onSaved?.();
    } catch (e) { /* ignore */ }
    setSaving(false);
  };

  const addKeyword = async () => {
    if (!newKw.trim()) return;
    await base44.functions.invoke('analyticsDashboard', { password, action: 'addKeyword', keyword: newKw.trim(), notes: newNotes.trim() });
    setNewKw(''); setNewNotes('');
    load();
  };
  const delKeyword = async (id) => {
    await base44.functions.invoke('analyticsDashboard', { password, action: 'deleteKeyword', id });
    load();
  };

  const inputStyle = { background: 'rgba(10,36,84,0.8)', border: '1px solid rgba(244,196,48,0.3)', color: '#F8F3E8' };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg" style={{ background: '#0f2d61', border: '1px solid rgba(244,196,48,0.3)' }}>
        <DialogHeader>
          <DialogTitle className="font-display" style={{ color: '#F8F3E8' }}>Dashboard Settings</DialogTitle>
          <DialogDescription style={{ color: 'rgba(248,243,232,0.6)' }}>Configure brand terms, paths and priority keywords.</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin" style={{ color: '#F4C430' }} /></div>
        ) : (
          <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
            <div className="space-y-3">
              <div>
                <Label style={{ color: 'rgba(248,243,232,0.8)' }}>Brand terms (comma separated)</Label>
                <Input value={brandInput} onChange={(e) => setBrandInput(e.target.value)} style={inputStyle} className="mt-1" />
              </div>
              <div>
                <Label style={{ color: 'rgba(248,243,232,0.8)' }}>Blog path prefix</Label>
                <Input value={settings.blog_path_prefix} onChange={(e) => setSettings({ ...settings, blog_path_prefix: e.target.value })} style={inputStyle} className="mt-1" />
              </div>
              <div>
                <Label style={{ color: 'rgba(248,243,232,0.8)' }}>Digital Assets path</Label>
                <Input value={settings.digital_assets_path} onChange={(e) => setSettings({ ...settings, digital_assets_path: e.target.value })} style={inputStyle} className="mt-1" />
              </div>
              <div>
                <Label style={{ color: 'rgba(248,243,232,0.8)' }}>Tracking start date</Label>
                <Input type="date" value={settings.tracking_start_date || ''} onChange={(e) => setSettings({ ...settings, tracking_start_date: e.target.value })} style={inputStyle} className="mt-1" />
              </div>
              <Button onClick={saveSettings} disabled={saving} className="w-full" style={{ background: '#F4C430', color: '#0A2454' }}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Save Settings
              </Button>
            </div>

            <div className="border-t pt-4" style={{ borderColor: 'rgba(244,196,48,0.2)' }}>
              <h4 className="font-display text-sm mb-3" style={{ color: '#F8F3E8' }}>Priority Keywords</h4>
              <div className="space-y-2 mb-3">
                {keywords.length === 0 && <p className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.5)' }}>No priority keywords yet.</p>}
                {keywords.map((k) => (
                  <div key={k.id} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(10,36,84,0.6)' }}>
                    <div>
                      <p className="font-body text-sm" style={{ color: '#F8F3E8' }}>{k.keyword}</p>
                      {k.notes && <p className="font-body text-xs" style={{ color: 'rgba(248,243,232,0.5)' }}>{k.notes}</p>}
                    </div>
                    <button onClick={() => delKeyword(k.id)} className="p-1" style={{ color: '#f87171' }}><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newKw} onChange={(e) => setNewKw(e.target.value)} placeholder="Keyword" style={inputStyle} className="flex-1" />
                <Input value={newNotes} onChange={(e) => setNewNotes(e.target.value)} placeholder="Notes (optional)" style={inputStyle} className="flex-1" />
                <Button onClick={addKeyword} size="icon" style={{ background: '#F4C430', color: '#0A2454' }}><Plus className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}