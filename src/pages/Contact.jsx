import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { base44 } from '@/api/base44Client';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    await base44.integrations.Core.SendEmail({
      to: 'contact@rtm-imports.com',
      subject: `New Inquiry from ${form.name} — ${form.interest}`,
      body: `
        Name: ${form.name}
        Email: ${form.email}
        Company: ${form.company}
        Interest: ${form.interest}
        
        Message:
        ${form.message}
      `,
    });

    setSending(false);
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 md:pt-36 pb-20 min-h-[40vh] flex items-end"
        style={{ background: '#0A2454', borderBottom: '1px solid rgba(244,196,48,0.45)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-eyebrow text-xs tracking-widest uppercase block mb-8" style={{ color: 'rgba(244,196,48,0.9)' }}>Contact</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl" style={{ color: '#F8F3E8' }}>
              Let us start the <span className="italic" style={{ color: '#F4C430' }}>conversation.</span>
            </h1>
            <p className="font-body text-lg mt-6 max-w-xl leading-relaxed" style={{ color: 'rgba(248,243,232,0.85)' }}>
              Whether you are a producer seeking U.S. market entry, a retailer building a private-label program, or a wholesale partner evaluating your beverage portfolio, we would like to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {sent ? (
                <div className="p-12 text-center rounded-[18px] border" style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}>
                  <CheckCircle className="w-12 h-12 text-rtm-cobalt mx-auto mb-6" />
                  <h3 className="font-display text-2xl text-rtm-ink mb-3">Message Sent</h3>
                  <p className="font-body text-base" style={{ color: '#0A2454' }}>
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-eyebrow text-xs tracking-widest uppercase" style={{ color: 'rgba(26,24,20,0.55)' }}>Full Name</Label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="font-body text-rtm-ink h-12 rounded-lg"
                        style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-eyebrow text-xs tracking-widest uppercase" style={{ color: 'rgba(26,24,20,0.55)' }}>Email</Label>
                      <Input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="font-body text-rtm-ink h-12 rounded-lg"
                        style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-eyebrow text-xs tracking-widest uppercase" style={{ color: 'rgba(26,24,20,0.55)' }}>Company</Label>
                      <Input
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company name"
                        className="font-body text-rtm-ink h-12 rounded-lg"
                        style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-eyebrow text-xs tracking-widest uppercase" style={{ color: 'rgba(26,24,20,0.55)' }}>Interest</Label>
                      <Select onValueChange={(val) => setForm({ ...form, interest: val })}>
                        <SelectTrigger className="font-body text-rtm-ink h-12 rounded-lg" style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}>
                          <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Products & Portfolio">Products & Portfolio</SelectItem>
                          <SelectItem value="Custom Labels">Custom Labels</SelectItem>
                          <SelectItem value="Compliance">Compliance & Licensing</SelectItem>
                          <SelectItem value="Wholesale Partnership">Wholesale Partnership</SelectItem>
                          <SelectItem value="Distribution">Distribution Inquiry</SelectItem>
                          <SelectItem value="General">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-eyebrow text-xs tracking-widest uppercase" style={{ color: 'rgba(26,24,20,0.55)' }}>Message</Label>
                    <Textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your brand or inquiry..."
                      rows={6}
                      className="font-body text-rtm-ink resize-none rounded-lg"
                      style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-3 px-8 py-4 font-eyebrow text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 rounded-lg"
                    style={{ background: '#0A2454', color: '#F4C430', border: '1px solid rgba(244,196,48,0.45)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F4C430'; e.currentTarget.style.color = '#0A2454'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#0A2454'; e.currentTarget.style.color = '#F4C430'; }}
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="p-8 space-y-8 rounded-[18px] border" style={{ background: '#FFFCF5', borderColor: 'rgba(244,196,48,0.45)' }}>
                <div>
                  <h3 className="font-display text-xl text-rtm-ink mb-6">Get in Touch</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#0A2454' }}>
                    We respond to all inquiries within 24 business hours. For urgent matters, contact us directly via email.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border" style={{ borderColor: 'rgba(244,196,48,0.45)' }}>
                      <MapPin className="w-4 h-4 text-rtm-cobalt" />
                    </div>
                    <div>
                      <h4 className="font-eyebrow text-xs tracking-widest uppercase text-rtm-ink mb-1">Office</h4>
                      <p className="font-body text-sm leading-relaxed" style={{ color: '#0A2454' }}>
                        755 East Mulberry Ave.<br />
                        San Antonio, TX 78212
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border" style={{ borderColor: 'rgba(244,196,48,0.45)' }}>
                      <Mail className="w-4 h-4 text-rtm-cobalt" />
                    </div>
                    <div>
                      <h4 className="font-eyebrow text-xs tracking-widest uppercase text-rtm-ink mb-1">Email</h4>
                      <a
                        href="mailto:contact@rtm-imports.com"
                        className="font-body text-sm text-rtm-cobalt hover:text-rtm-yellow transition-colors duration-300"
                      >
                        contact@rtm-imports.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}