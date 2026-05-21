import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { base44 } from '@/api/base44Client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', interest: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: 'contact@rtm-imports.com',
      subject: `New Inquiry from ${form.name} — ${form.interest}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nInterest: ${form.interest}\n\nMessage:\n${form.message}`,
    });
    setSending(false);
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 min-h-[60vh] flex items-end pb-20 overflow-hidden"
        style={{ backgroundImage: 'url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/4af9a8ea6_generated_image.png)', backgroundRepeat: 'repeat', backgroundSize: '500px' }}
      >
        <div className="absolute inset-0 bg-rtm-ink/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep block mb-8">Contact</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.01em] text-rtm-white leading-tight max-w-2xl">
              Let us start the{' '}
              <span className="font-display font-normal normal-case italic text-rtm-yellow">conversation.</span>
            </h1>
            <p className="font-body text-lg text-rtm-stone-light mt-6 max-w-xl leading-relaxed">
              Whether you are a producer seeking U.S. market entry, a retailer building a private-label program, or a wholesale partner evaluating your beverage portfolio, we would like to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-24 bg-rtm-cream">
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
                <div className="bg-rtm-white border border-rtm-stone-light p-12 text-center" style={{ borderRadius: '4px' }}>
                  <CheckCircle className="w-12 h-12 text-rtm-cobalt mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-[0.04em] text-rtm-ink mb-3">Message Sent</h3>
                  <p className="font-body text-base text-rtm-ink-soft">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-ink-soft">Full Name</Label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="bg-rtm-white border-rtm-stone-light font-body text-rtm-ink placeholder:text-rtm-stone h-12"
                        style={{ borderRadius: '2px' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-ink-soft">Email</Label>
                      <Input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-rtm-white border-rtm-stone-light font-body text-rtm-ink placeholder:text-rtm-stone h-12"
                        style={{ borderRadius: '2px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-ink-soft">Company</Label>
                      <Input
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company name"
                        className="bg-rtm-white border-rtm-stone-light font-body text-rtm-ink placeholder:text-rtm-stone h-12"
                        style={{ borderRadius: '2px' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-ink-soft">Interest</Label>
                      <Select onValueChange={(val) => setForm({ ...form, interest: val })}>
                        <SelectTrigger className="bg-rtm-white border-rtm-stone-light font-body text-rtm-ink h-12" style={{ borderRadius: '2px' }}>
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
                    <Label className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-ink-soft">Message</Label>
                    <Textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your brand or inquiry..."
                      rows={6}
                      className="bg-rtm-white border-rtm-stone-light font-body text-rtm-ink placeholder:text-rtm-stone resize-none"
                      style={{ borderRadius: '2px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-3 px-7 py-3.5 bg-rtm-cobalt text-white font-heading text-xs font-semibold uppercase tracking-[0.08em] hover:bg-rtm-cobalt-deep transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderRadius: '2px' }}
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
              <div className="bg-rtm-white border border-rtm-stone-light p-8 space-y-8" style={{ borderRadius: '4px' }}>
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-[0.04em] text-rtm-ink mb-4">Get in Touch</h3>
                  <p className="font-body text-sm text-rtm-ink-soft leading-relaxed">
                    We respond to all inquiries within 24 business hours. For urgent matters, contact us directly via email.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-rtm-cobalt/20 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '2px' }}>
                      <MapPin className="w-4 h-4 text-rtm-cobalt" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-ink mb-1">Office</h4>
                      <p className="font-body text-sm text-rtm-ink-soft leading-relaxed">
                        755 East Mulberry Ave.<br />
                        San Antonio, TX 78212
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-rtm-cobalt/20 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '2px' }}>
                      <Mail className="w-4 h-4 text-rtm-cobalt" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-rtm-ink mb-1">Email</h4>
                      <a
                        href="mailto:contact@rtm-imports.com"
                        className="font-body text-sm text-rtm-cobalt hover:text-rtm-cobalt-deep transition-colors duration-200"
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