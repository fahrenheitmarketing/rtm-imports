import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
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
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-body text-xs tracking-widest uppercase text-primary block mb-4">Contact</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-2xl">
              Let us start the <span className="italic text-primary">conversation.</span>
            </h1>
            <p className="font-body text-lg text-foreground/80 mt-6 max-w-xl leading-relaxed">
              Whether you are a producer seeking U.S. market entry, a retailer building a private-label program, or a wholesale partner evaluating your beverage portfolio, we respond to all inquiries within 24 business hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-24 md:pb-32 bg-background">
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
                <div className="bg-card border border-border p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="font-display text-2xl text-foreground mb-3">Message Sent</h3>
                  <p className="font-body text-base text-foreground/80">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Full Name</Label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="bg-card border-border font-body text-foreground placeholder:text-muted-foreground/50 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Email</Label>
                      <Input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-card border-border font-body text-foreground placeholder:text-muted-foreground/50 h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Company</Label>
                      <Input
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company name"
                        className="bg-card border-border font-body text-foreground placeholder:text-muted-foreground/50 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Interest</Label>
                      <Select onValueChange={(val) => setForm({ ...form, interest: val })}>
                        <SelectTrigger className="bg-card border-border font-body text-foreground h-12">
                          <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asian Beverage">Asian Beverage</SelectItem>
                          <SelectItem value="Custom Labels">Custom Labels</SelectItem>
                          <SelectItem value="Compliance">Compliance & Licensing</SelectItem>
                          <SelectItem value="Distribution">Distribution Partnership</SelectItem>
                          <SelectItem value="General">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Message</Label>
                    <Textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      rows={6}
                      className="bg-card border-border font-body text-foreground placeholder:text-muted-foreground/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
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
              <div className="bg-card border border-border p-8 space-y-8">
                <div>
                  <h3 className="font-display text-xl text-foreground mb-6">Get in Touch</h3>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    We respond to all inquiries within 24 business hours. For urgent matters, don't hesitate to reach out directly via email.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-body text-sm text-foreground font-medium mb-1">Office</h4>
                      <p className="font-body text-sm text-foreground/80 leading-relaxed">
                        755 East Mulberry Ave.<br />
                        San Antonio, TX 78212
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-body text-sm text-foreground font-medium mb-1">Email</h4>
                      <a
                        href="mailto:contact@rtm-imports.com"
                        className="font-body text-sm text-primary hover:text-foreground transition-colors duration-300"
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