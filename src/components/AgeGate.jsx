import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgeGate({ onConfirm }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary opacity-80" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 text-center px-6 max-w-md"
        >
          {/* Logo mark */}
          <div className="mb-10">
            <div className="w-16 h-16 mx-auto border border-primary rounded-full flex items-center justify-center mb-6">
              <span className="font-display text-primary text-xl font-semibold">R</span>
            </div>
            <h1 className="font-display text-2xl text-foreground tracking-wide">
              RTM Imports
            </h1>
          </div>

          <p className="font-display text-3xl md:text-4xl text-foreground mb-2">
            Are you of
          </p>
          <p className="font-display text-3xl md:text-4xl italic text-primary mb-10">
            legal drinking age?
          </p>

          <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
            You must be 21 years of age or older to enter this site.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = 'https://google.com'}
              className="px-10 py-3 border border-border text-muted-foreground font-body text-sm tracking-widest uppercase hover:border-foreground hover:text-foreground transition-all duration-300"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="px-10 py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
            >
              Yes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}