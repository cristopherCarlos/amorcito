(() => {
  const START_DATE = new Date(2025, 10, 1, 0, 0, 0);
  const HEART_COLORS = ['#f48fb1', '#f8bbd0', '#ce93d8', '#e1bee7', '#80cbc4', '#a5d6a7', '#ffab91', '#ef9a9a', '#b39ddb'];
  const MAX_FLOATING_HEARTS = 25;
  const HEART_SPAWN_INTERVAL = 600;

  console.log("te amo");

  const els = {
    years: document.getElementById('years'),
    months: document.getElementById('months'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function calculateElapsed(now) {
    let years = now.getFullYear() - START_DATE.getFullYear();
    let months = now.getMonth() - START_DATE.getMonth();
    let days = now.getDate() - START_DATE.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    let hours = now.getHours() - START_DATE.getHours();
    let minutes = now.getMinutes() - START_DATE.getMinutes();
    let seconds = now.getSeconds() - START_DATE.getSeconds();

    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    if (hours < 0) {
      days--;
      hours += 24;
    }

    return { years, months, days, hours, minutes, seconds };
  }

  let prevValues = {};

  function updateCounter() {
    const now = new Date();
    const elapsed = calculateElapsed(now);

    for (const key in els) {
      const val = pad(elapsed[key]);
      if (prevValues[key] !== val) {
        els[key].textContent = val;
        els[key].style.transform = 'scale(1.08)';
        setTimeout(() => { els[key].style.transform = 'scale(1)'; }, 150);
        prevValues[key] = val;
      }
    }
  }

  updateCounter();
  setInterval(updateCounter, 1000);

  // Floating Hearts
  const heartsContainer = document.getElementById('heartsContainer');

  function createFloatingHeart() {
    if (heartsContainer.children.length >= MAX_FLOATING_HEARTS) return;

    const heart = document.createElement('div');
    heart.className = 'floating-heart';

    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
    const size = Math.random() * 14 + 12;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 12;
    const drift = (Math.random() - 0.5) * 100;
    const endRotation = (Math.random() - 0.5) * 50;

    heart.style.left = `${left}%`;
    heart.style.setProperty('--heart-color', color);
    heart.style.setProperty('--heart-size', `${size}px`);
    heart.style.setProperty('--drift', `${drift}px`);
    heart.style.setProperty('--end-rotation', `${endRotation}deg`);
    heart.style.animationDuration = `${duration}s`;
    heart.textContent = '\u2665';

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  setInterval(createFloatingHeart, HEART_SPAWN_INTERVAL);
  for (let i = 0; i < 8; i++) setTimeout(createFloatingHeart, i * 250);

  // ========== FIREWORKS ==========
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    const section = canvas.parentElement;
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const FW_COLORS = [
    '#f8bbd0', '#f48fb1', '#f06292', '#ec407a',
    '#ce93d8', '#ba68c8', '#ab47bc',
    '#90caf9', '#64b5f6',
    '#a5d6a7', '#81c784',
    '#fff59d', '#ffd54f',
    '#ffab91', '#ff8a65',
    '#b39ddb', '#ef9a9a'
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
    const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  function launchRandomFirework() {
    const x = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
    const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
    explode(x, y);
  }

  setInterval(launchRandomFirework, 2200);
  setTimeout(() => setInterval(launchRandomFirework, 3500), 800);

  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateFireworks);
  }
  animateFireworks();

  // ========== CLICK HEART BURST ==========
  const loveSection = document.querySelector('.love-section');
  const BURST_COLORS = ['#f48fb1', '#f8bbd0', '#ce93d8', '#e1bee7', '#ef9a9a', '#ffab91', '#b39ddb'];
  const BURST_COUNT = 14;

  loveSection.addEventListener('click', (e) => {
    for (let i = 0; i < BURST_COUNT; i++) {
      const burst = document.createElement('div');
      burst.className = 'burst-heart';
      const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
      const angle = (Math.PI * 2 * i) / BURST_COUNT + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 100 + 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = Math.random() * 720 - 360;

      burst.textContent = Math.random() > 0.3 ? '\u2665' : '\uD83D\uDC96';
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      burst.style.color = color;
      burst.style.fontSize = `${Math.random() * 14 + 14}px`;
      burst.style.setProperty('--tx', `${tx}px`);
      burst.style.setProperty('--ty', `${ty}px`);
      burst.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 1200);
    }
  });
})();
