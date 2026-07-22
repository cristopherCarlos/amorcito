import { useState, useEffect, useRef } from 'react';
import styles from './FloatingHearts.module.css';

const HEART_COLORS = ['#f48fb1', '#f8bbd0', '#ce93d8', '#e1bee7', '#80cbc4', '#a5d6a7', '#ffab91', '#ef9a9a', '#b39ddb'];
const MAX_HEARTS = 25;
const SPAWN_INTERVAL = 600;

let heartId = 0;

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);
  const timeoutRefs = useRef({});

  useEffect(() => {
    function spawnHeart() {
      setHearts((prev) => {
        if (prev.length >= MAX_HEARTS) return prev;

        const id = ++heartId;
        const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
        const size = Math.random() * 14 + 12;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 12;
        const drift = (Math.random() - 0.5) * 100;
        const endRotation = (Math.random() - 0.5) * 50;

        const heart = {
          id,
          color,
          size,
          left,
          duration,
          drift,
          endRotation,
        };

        timeoutRefs.current[id] = setTimeout(() => {
          setHearts((p) => p.filter((h) => h.id !== id));
          delete timeoutRefs.current[id];
        }, duration * 1000);

        return [...prev, heart];
      });
    }

    for (let i = 0; i < 8; i++) {
      setTimeout(spawnHeart, i * 250);
    }

    const interval = setInterval(spawnHeart, SPAWN_INTERVAL);
    return () => {
      clearInterval(interval);
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={styles.container}>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className={styles.heart}
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            '--heart-color': heart.color,
            '--heart-size': `${heart.size}px`,
            '--drift': `${heart.drift}px`,
            '--end-rotation': `${heart.endRotation}deg`,
          }}
        >
          {'\u2665'}
        </span>
      ))}
    </div>
  );
}
