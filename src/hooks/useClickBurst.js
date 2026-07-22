import { useState, useCallback, useRef } from 'react';

const BURST_COLORS = ['#f48fb1', '#f8bbd0', '#ce93d8', '#e1bee7', '#ef9a9a', '#ffab91', '#b39ddb'];
const BURST_COUNT = 14;

let burstId = 0;

export function useClickBurst() {
  const [bursts, setBursts] = useState([]);
  const timeoutRefs = useRef({});

  const triggerBurst = useCallback((e) => {
    const newBursts = [];

    for (let i = 0; i < BURST_COUNT; i++) {
      const id = ++burstId;
      const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
      const angle = (Math.PI * 2 * i) / BURST_COUNT + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 100 + 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = Math.random() * 720 - 360;

      newBursts.push({
        id,
        x: e.clientX,
        y: e.clientY,
        color,
        tx,
        ty,
        rot,
        char: Math.random() > 0.3 ? '\u2665' : '\uD83D\uDC96',
        fontSize: Math.random() * 14 + 14,
      });

      timeoutRefs.current[id] = setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
        delete timeoutRefs.current[id];
      }, 1200);
    }

    setBursts((prev) => [...prev, ...newBursts]);
  }, []);

  return { bursts, triggerBurst };
}
