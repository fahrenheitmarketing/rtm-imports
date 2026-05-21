import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Palette, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICE_LINKS = [
  { label: 'Asian Beverages', path: '/products/asian-beverage', icon: Globe },
  { label: 'Custom Labels', path: '/products/custom-labels', icon: Palette },
  { label: 'Compliance & Licensing', path: '/products/compliance', icon: FileCheck },
];

const NAV_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products', hasDropdown: true },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Wholesalers', path: '/wholesalers' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isServicesActive = location.pathname.startsWith('/products');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-rtm-ink/95 backdrop-blur-sm shadow-md' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24 md:h-36">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://media.base44.com/images/public/69dd75d09559acb6fb908761/71e10e810_image.png"
              alt="RTM Imports Logo"
              className="h-14 md:h-20 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.path} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                      isServicesActive ? 'text-rtm-yellow' : 'text-rtm-white hover:text-rtm-yellow'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-3 w-64 bg-rtm-white border border-rtm-stone-light shadow-lg"
                        style={{ borderRadius: '4px' }}
                      >
                        <div className="py-2">
                          <Link
                            to="/products"
                            className="block px-5 py-3 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-rtm-stone hover:text-rtm-cobalt hover:bg-rtm-cream-soft transition-colors duration-150 border-b border-rtm-stone-light"
                          >
                            All Products
                          </Link>
                          {SERVICE_LINKS.map((sl) => (
                            <Link
                              key={sl.path}
                              to={sl.path}
                              className={`flex items-center gap-3 px-5 py-3 font-body text-sm transition-colors duration-150 hover:bg-rtm-cream-soft ${
                                location.pathname === sl.path ? 'text-rtm-cobalt' : 'text-rtm-ink-soft hover:text-rtm-cobalt'
                              }`}
                            >
                              <sl.icon className="w-3.5 h-3.5 text-rtm-cobalt flex-shrink-0" />
                              {sl.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-heading text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                   location.pathname === link.path
                     ? 'text-rtm-yellow'
                     : 'text-rtm-white hover:text-rtm-yellow'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-rtm-white p-2"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Cobalt accent line */}
      <div className="h-[2px] w-full bg-rtm-cobalt" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-rtm-ink border-b border-rtm-ink-soft overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <Link
                to="/about"
                className={`block font-heading text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                  location.pathname === '/about' ? 'text-rtm-yellow' : 'text-rtm-stone hover:text-rtm-white'
                }`}
              >
                About
              </Link>

              {/* Products with mobile submenu */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`flex items-center justify-between w-full font-heading text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                    isServicesActive ? 'text-rtm-yellow' : 'text-rtm-stone hover:text-rtm-white'
                  }`}
                >
                  Products
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 ml-4 space-y-3 overflow-hidden"
                    >
                      <Link to="/products" className="block font-body text-sm text-rtm-stone hover:text-rtm-white transition-colors">
                        All Products
                      </Link>
                      {SERVICE_LINKS.map((sl) => (
                        <Link
                          key={sl.path}
                          to={sl.path}
                          className={`flex items-center gap-2 font-body text-sm transition-colors duration-200 ${
                            location.pathname === sl.path ? 'text-rtm-yellow' : 'text-rtm-stone hover:text-rtm-white'
                          }`}
                        >
                          <sl.icon className="w-3 h-3 text-rtm-cobalt-light" />
                          {sl.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {['portfolio', 'wholesalers', 'news', 'contact'].map((slug) => (
                <Link
                  key={slug}
                  to={`/${slug}`}
                  className={`block font-heading text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                    location.pathname === `/${slug}` ? 'text-rtm-yellow' : 'text-rtm-stone hover:text-rtm-white'
                  }`}
                >
                  {slug.charAt(0).toUpperCase() + slug.slice(1)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}