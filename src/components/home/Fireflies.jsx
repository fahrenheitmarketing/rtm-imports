import React, { useEffect, useRef } from 'react';

const QUANTITY = 15;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Fireflies() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fireflies = [];
    const styleSheet = document.createElement('style');
    let css = `
      @keyframes drift {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes flash {
        0%, 30%, 100% { opacity: 0; box-shadow: 0 0 0vw 0vw #F5C02A; }
        5% { opacity: 1; box-shadow: 0 0 2vw 0.4vw #F5C02A; }
      }
    `;

    for (let i = 0; i < QUANTITY; i++) {
      const steps = Math.floor(randomBetween(16, 28));
      const rotationSpeed = randomBetween(8, 18).toFixed(1) + 's';
      const flashDuration = randomBetween(5000, 11000).toFixed(0) + 'ms';
      const flashDelay = randomBetween(500, 8500).toFixed(0) + 'ms';

      let keyframe = `@keyframes move${i} {`;
      for (let s = 0; s <= steps; s++) {
        const pct = ((s / steps) * 100).toFixed(1);
        const tx = (randomBetween(-50, 50)).toFixed(1);
        const ty = (randomBetween(-50, 50)).toFixed(1);
        const scale = (randomBetween(0.25, 1)).toFixed(2);
        keyframe += `${pct}% { transform: translateX(${tx}vw) translateY(${ty}vh) scale(${scale}); }`;
      }
      keyframe += '}';
      css += keyframe;

      const el = document.createElement('div');
      el.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.4vw;
        height: 0.4vw;
        margin: -0.2vw 0 0 9.8vw;
        animation: move${i} ease ${randomBetween(60, 200).toFixed(0)}s alternate infinite;
        pointer-events: none;
      `;

      const before = document.createElement('span');
      before.style.cssText = `
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transform-origin: -10vw;
        background: black;
        opacity: 0.4;
        animation: drift ease ${rotationSpeed} alternate infinite;
      `;

      const after = document.createElement('span');
      after.style.cssText = `
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transform-origin: -10vw;
        background: white;
        opacity: 0;
        box-shadow: 0 0 0vw 0vw #F5C02A;
        animation: drift ease ${rotationSpeed} alternate infinite, flash ease ${flashDuration} ${flashDelay} infinite;
      `;

      el.appendChild(before);
      el.appendChild(after);
      container.appendChild(el);
      fireflies.push(el);
    }

    styleSheet.textContent = css;
    document.head.appendChild(styleSheet);

    return () => {
      fireflies.forEach(f => f.remove());
      styleSheet.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
}