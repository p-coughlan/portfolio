// script.js
// Handles theme toggle + bubble background animation

document.addEventListener('DOMContentLoaded', () => {
  // —— THEME TOGGLE —— 
  const themeToggle = document.getElementById('theme-toggle');
  console.log('DOMContentLoaded: themeToggle is', themeToggle);

  // Apply saved theme on load
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', e => {
      e.preventDefault();  // stop the href="#" jump
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  } else {
    console.error('No #theme-toggle element found');
  }

  // —— BUBBLE BACKGROUND —— 
  const canvas = document.getElementById('bubble-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createBubble() {
    return {
      x:      Math.random() * canvas.width,
      y:      canvas.height + Math.random() * 100,
      r:      Math.random() * 50 + 0.5,        // radius 0.5–50px
      speed:  Math.random() * 0.3 + 0.2,      // velocity 0.2–0.5px/frame
      alpha:  Math.random() * 0.4 + 0.2       // transparency 0.2–0.6
    };
  }

  const bubbles = Array.from({ length: 50 }, createBubble);

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // pick up the current CSS vars for bubbles
    const styles    = getComputedStyle(document.documentElement);
    const fillRGB   = styles.getPropertyValue('--bubble-fill').trim();
    const strokeRGB = styles.getPropertyValue('--bubble-stroke').trim();

    for (let b of bubbles) {
      b.y -= b.speed;
      if (b.y < -b.r) {
        Object.assign(b, createBubble());
        b.y = canvas.height + b.r;
      }

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);

      ctx.fillStyle   = `rgba(${fillRGB},${b.alpha})`;
      ctx.fill();

      ctx.lineWidth   = 1;
      ctx.strokeStyle = `rgba(${strokeRGB},${b.alpha})`;
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  })();
});

// (Unrelated) menu toggle can stay outside if you like
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}
