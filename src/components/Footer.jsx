import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block px-2 py-2 mb-6" style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(https://media.base44.com/images/public/69dd75d09559acb6fb908761/a988dfd7c_ChatGPTImageMay20202609_37_01PM.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '4px'
            }}>
              <img
                src="https://media.base44.com/images/public/69dd75d09559acb6fb908761/71e10e810_image.png"
                alt="RTM Imports Logo"
                className="h-24 w-auto"
              />
            </Link>
            <p className="font-body text-sm text-foreground/80 leading-relaxed max-w-xs">
              America's specialist beverage importer. Thirty years of category depth, producer relationships, and national wholesale infrastructure, focused exclusively on the B2B channel.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-primary mb-6">Navigate</h4>
            <div className="space-y-3">
              {[
                { label: 'About', path: '/about' },
                { label: 'Products', path: '/products' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'Wholesalers', path: '/wholesalers' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block font-body text-sm text-foreground/80 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-primary mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  755 East Mulberry Ave.<br />
                  San Antonio, TX 78212
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@rtm-imports.com"
                  className="font-body text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  contact@rtm-imports.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-foreground/80">
            © {new Date().getFullYear()} RTM Imports, LLC. All rights reserved.
          </p>
          <p className="font-body text-xs text-foreground/80">
            Please drink responsibly. Must be 21+.
          </p>
        </div>
      </div>
    </footer>
  );
}