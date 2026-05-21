import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-rtm-ink border-t-2 border-rtm-cobalt">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img
                src="https://media.base44.com/images/public/69dd75d09559acb6fb908761/71e10e810_image.png"
                alt="RTM Imports Logo"
                className="h-24 w-auto"
              />
            </Link>
            <p className="font-body text-sm text-rtm-stone leading-relaxed max-w-xs">
              America's specialist beverage importer. Thirty years of category depth, producer relationships, and national wholesale infrastructure, focused exclusively on the B2B channel.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep mb-6">Navigate</h4>
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
                  className="block font-body text-sm text-rtm-stone hover:text-rtm-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-rtm-yellow-deep mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rtm-cobalt-light mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-rtm-stone leading-relaxed">
                  755 East Mulberry Ave.<br />
                  San Antonio, TX 78212
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rtm-cobalt-light flex-shrink-0" />
                <a
                  href="mailto:contact@rtm-imports.com"
                  className="font-body text-sm text-rtm-stone hover:text-rtm-white transition-colors duration-200"
                >
                  contact@rtm-imports.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-rtm-ink-soft pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-rtm-stone">
            © {new Date().getFullYear()} RTM Imports, LLC. All rights reserved.
          </p>
          <p className="font-body text-xs text-rtm-stone">
            Please drink responsibly. Must be 21+.
          </p>
        </div>
      </div>
    </footer>
  );
}