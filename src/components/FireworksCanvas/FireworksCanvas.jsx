import { useRef, useEffect } from 'react';
import styles from './FireworksCanvas.module.css';

const FW_COLORS = [
  '#f8bbd0', '#f48fb1', '#f06292', '#ec407a',
  '#ce93d8', '#ba68c8', '#ab47bc',
  '#90caf9', '#64b5f6',
  '#a5d6a7', '#81c784',
  '#fff59d', '#ffd54f',
  '#ffab91', '#ff8a65',
  '#b39ddb', '#ef9a9a',
];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3.5 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.012;
    this.size = Math.random() * 2.5 + 1;
    this.gravity = 0.03;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.99;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function explode(particles, x, y) {
  const count = Math.floor(Math.random() * 40) + 30;
  const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, color));
  }
}

export default function FireworksCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    function resize() {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function launchRandom() {
      const x = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
      const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
      explode(particlesRef.current, x, y);
    }

    const interval1 = setInterval(launchRandom, 2200);
    const interval2 = setTimeout(() => setInterval(launchRandom, 3500), 800);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);
      for (const p of particlesRef.current) {
        p.update();
        p.draw(ctx);
      }
      animFrameRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval1);
      clearTimeout(interval2);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
