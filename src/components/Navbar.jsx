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
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-36">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://media.base44.com/images/public/69dd75d09559acb6fb908761/71e10e810_image.png"
              alt="RTM Imports Logo"
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.path} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex items-center gap-1.5 font-body text-xs tracking-widest uppercase transition-colors duration-300 ${
                      isServicesActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
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
                        className="absolute top-full right-0 mt-3 w-64 bg-card border border-border shadow-2xl"
                      >
                        <div className="py-2">
                          <Link
                            to="/products"
                            className="block px-5 py-3 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200 border-b border-border"
                          >
                            All Products
                          </Link>
                          {SERVICE_LINKS.map((sl) => (
                            <Link
                              key={sl.path}
                              to={sl.path}
                              className={`flex items-center gap-3 px-5 py-3 font-body text-sm transition-colors duration-200 hover:bg-secondary ${
                                location.pathname === sl.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <sl.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
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
                  className={`font-body text-xs tracking-widest uppercase transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
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
            className="md:hidden text-foreground p-2"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <Link
                to="/about"
                className={`block font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                About
              </Link>

              {/* Services with mobile submenu */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`flex items-center justify-between w-full font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                    isServicesActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Services
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
                      <Link to="/products" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                        All Products
                      </Link>
                      {SERVICE_LINKS.map((sl) => (
                        <Link
                          key={sl.path}
                          to={sl.path}
                          className={`flex items-center gap-2 font-body text-sm transition-colors duration-200 ${
                            location.pathname === sl.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <sl.icon className="w-3 h-3 text-primary" />
                          {sl.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/portfolio"
                className={`block font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === '/portfolio' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Portfolio
              </Link>
              <Link
                to="/wholesalers"
                className={`block font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === '/wholesalers' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Wholesalers
              </Link>
              <Link
                to="/news"
                className={`block font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === '/news' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                News
              </Link>
              <Link
                to="/contact"
                className={`block font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}