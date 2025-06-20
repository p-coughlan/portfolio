// — BUBBLE BACKGROUND — 
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bubble-canvas');
  const ctx    = canvas.getContext('2d');
  
  // resize to full window
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // bubble factory
  function createBubble() {
    return {
      x:      Math.random() * canvas.width,
      y:      canvas.height + Math.random() * 100,
      r:      Math.random() * 50 + 0.5,         // radius 20 is max, 10 is min
      speed:  Math.random() * 0.3 + 0.2,         // upward velocity 0.3 is max, 0.2 is min
      alpha:  Math.random() * 0.4 + 0.2        // transparency 0.5 is max, 0.3 is min
    };
  }

  // populate an array of bubbles
  const bubbles = Array.from({ length: 50 }, createBubble); //

  // animation loop
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
for (let b of bubbles) {
  // move & recycle
  b.y -= b.speed;
  if (b.y < -b.r) {
    Object.assign(b, createBubble());
    b.y = canvas.height + b.r;
  }

  // draw path
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);

  // pale-blue fill
  ctx.fillStyle = `rgba(173,216,230,${b.alpha})`;
  ctx.fill();

  // subtle blue border
  ctx.lineWidth   = 1;
  ctx.strokeStyle = `rgba(135,206,235,${b.alpha})`;  // a tad darker sky-blue
  ctx.stroke();
}

    requestAnimationFrame(animate);
  })();
});


function toggleMenu() {
    // Toggle the menu and icon classes to show/hide the menu and change the icon appearance
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}