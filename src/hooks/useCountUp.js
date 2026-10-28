import { useState, useEffect, useRef } from 'react';

export default function useCountUp(target, duration = 1500, startOnView = true) {
  const numTarget = parseInt(target, 10);
  const finalValue = isNaN(numTarget) ? 0 : numTarget;

  // The final number is what renders first, so it stays put if the animation
  // never runs (no JavaScript, no IntersectionObserver, reduced motion).
  const [count, setCount] = useState(finalValue);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !startOnView) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    if (finalValue === 0) { setCount(0); return; }

    setCount(0);
    let current = 0;
    const increment = finalValue / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= finalValue) { setCount(finalValue); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, finalValue, duration]);

  return { count, ref };
}