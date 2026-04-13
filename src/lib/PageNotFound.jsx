import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center">
        <h1 className="font-display text-8xl text-primary/20 mb-4">404</h1>
        <div className="w-12 h-px bg-primary mx-auto mb-8" />
        <h2 className="font-display text-2xl text-foreground mb-3">Page Not Found</h2>
        <p className="font-body text-sm text-muted-foreground mb-10 leading-relaxed">
          The page "{location.pathname.substring(1)}" doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-6 py-3 border border-border text-foreground font-body text-xs tracking-widest uppercase hover:border-primary hover:text-primary transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}