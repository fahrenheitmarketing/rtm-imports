import { useState, useEffect, useRef } from 'react';

export default function useCountUp(target, duration = 1500, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.3 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    const numTarget = parseInt(target, 10);
    if (isNaN(numTarget) || numTarget === 0) { setCount(numTarget || 0); return; }
    let start = 0;
    const increment = numTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numTarget) { setCount(numTarget); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return { count, ref };
}