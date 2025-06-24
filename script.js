// script.js
// Handles theme toggle + bubble background animation

document.addEventListener('DOMContentLoaded', () => {
  // —— THEME TOGGLE —— 
  // Grab both desktop and mobile toggle links/buttons
  const toggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
  console.log('Found theme toggles:', toggles);

  // Apply saved theme on load
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }

  // Bind click handler to each toggle element
  toggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();                        // stop the href="#" jump
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });

  if (toggles.length === 0) {
    console.error('No theme-toggle elements found (check your IDs!)');
  }

  // —— BUBBLE BACKGROUND —— 
  const canvas = document.getElementById('bubble-canvas');
  const ctx    = canvas.getContext('2d');

  // Make canvas fill viewport
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Factory for new bubbles
  function createBubble() {
    return {
      x:      Math.random() * canvas.width,
      y:      canvas.height + Math.random() * 100,
      r:      Math.random() * 50 + 0.5,        // radius 0.5–50px
      speed:  Math.random() * 0.3 + 0.1,      // velocity 0.1–0.4px/frame
      alpha:  Math.random() * 0.4 + 0.2       // transparency 0.2–0.6
    };
  }

  const bubbles = Array.from({ length: 50 }, createBubble);

  // Animation loop
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Read current theme’s bubble colors
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

      // Fill + stroke using CSS vars
      ctx.fillStyle   = `rgba(${fillRGB},${b.alpha})`;
      ctx.fill();
      ctx.lineWidth   = 1;
      ctx.strokeStyle = `rgba(${strokeRGB},${b.alpha})`;
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  })();
});

// (Unrelated) hamburger menu toggle remains outside
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}
