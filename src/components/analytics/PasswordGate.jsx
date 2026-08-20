import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

export default function PasswordGate({ onAuth, loading, error }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0A2454' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5" style={{ background: 'rgba(244,196,48,0.12)', border: '1px solid rgba(244,196,48,0.3)' }}>
            <Lock className="w-6 h-6" style={{ color: '#F4C430' }} />
          </div>
          <h1 className="font-display text-2xl mb-2" style={{ color: '#F8F3E8' }}>Performance Dashboard</h1>
          <p className="font-body text-sm" style={{ color: 'rgba(248,243,232,0.6)' }}>Enter your password to access analytics and insights.</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-xl p-6 border" style={{ background: 'rgba(10,36,84,0.6)', borderColor: 'rgba(244,196,48,0.25)' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded-lg font-body text-sm mb-4 outline-none"
            style={{ background: 'rgba(10,36,84,0.8)', border: '1px solid rgba(244,196,48,0.3)', color: '#F8F3E8' }}
          />
          {error && <p className="font-body text-sm mb-4" style={{ color: '#ef4444' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-body text-xs uppercase tracking-widest transition-opacity disabled:opacity-50"
            style={{ background: '#F4C430', color: '#0A2454' }}
          >
            {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight className="w-3 h-3" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}