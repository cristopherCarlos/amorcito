(() => {
  // ========== CONFIGURATION ==========
  const HEART_COLORS = ['#f48fb1', '#f8bbd0', '#ce93d8', '#e1bee7', '#80cbc4', '#a5d6a7', '#ffab91', '#ef9a9a', '#fff59d', '#b39ddb'];
  const MAX_FLOATING_HEARTS = 35;
  const HEART_SPAWN_INTERVAL = 400;
  const BURST_COUNT = 12;

  // ========== FLOATING HEARTS ==========
  const heartsContainer = document.getElementById('heartsContainer');

  function createFloatingHeart() {
    if (heartsContainer.children.length >= MAX_FLOATING_HEARTS) return;

    const heart = document.createElement('div');
    heart.className = 'floating-heart';

    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
    const size = Math.random() * 18 + 14;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 10;
    const drift = (Math.random() - 0.5) * 120;
    const endRotation = (Math.random() - 0.5) * 60;
    const swayDuration = Math.random() * 2 + 2;

    heart.style.left = `${left}%`;
    heart.style.setProperty('--heart-color', color);
    heart.style.setProperty('--heart-size', `${size}px`);
    heart.style.setProperty('--drift', `${drift}px`);
    heart.style.setProperty('--end-rotation', `${endRotation}deg`);
    heart.style.setProperty('--sway-duration', `${swayDuration}s`);
    heart.style.animationDuration = `${duration}s`;

    const isEmoji = Math.random() > 0.5;
    if (isEmoji) {
      heart.textContent = '❤';
      const shape = heart;
      shape.style.fontSize = `${size}px`;
      shape.style.color = color;
    } else {
      const shape = document.createElement('span');
      shape.className = 'heart-shape';
      shape.textContent = '❤';
      heart.appendChild(shape);
    }

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  setInterval(createFloatingHeart, HEART_SPAWN_INTERVAL);
  for (let i = 0; i < 10; i++) setTimeout(createFloatingHeart, i * 200);

  // ========== CLICK BURST ==========
  document.addEventListener('click', (e) => {
    for (let i = 0; i < BURST_COUNT; i++) {
      const burst = document.createElement('div');
      burst.className = 'burst-heart';
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
      const angle = (Math.PI * 2 * i) / BURST_COUNT + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 100 + 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = Math.random() * 720 - 360;

      burst.textContent = Math.random() > 0.4 ? '❤' : '💖';
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      burst.style.color = color;
      burst.style.fontSize = `${Math.random() * 12 + 14}px`;
      burst.style.setProperty('--tx', `${tx}px`);
      burst.style.setProperty('--ty', `${ty}px`);
      burst.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 1200);
    }
  });

  // ========== FIREWORKS (Canvas) ==========
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const FIREWORK_COLORS = [
    '#f8bbd0', '#f48fb1', '#f06292',
    '#ce93d8', '#ba68c8', '#ab47bc',
    '#90caf9', '#64b5f6',
    '#a5d6a7', '#81c784',
    '#fff59d', '#ffd54f',
    '#ffab91', '#ff8a65',
    '#b39ddb'
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

    draw() {
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

  function explode(x, y) {
    const count = Math.floor(Math.random() * 40) + 30;
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  function launchRandomFirework() {
    const x = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
    const y = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
    explode(x, y);
  }

  setInterval(launchRandomFirework, 2200);
  setTimeout(() => setInterval(launchRandomFirework, 3500), 800);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    animFrame = requestAnimationFrame(animate);
  }
  animate();
})();
