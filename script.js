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
      r:      Math.random() * 20 + 10,         // radius
      speed:  Math.random() * 0.3 + 0.2,         // upward velocity
      alpha:  Math.random() * 0.5 + 0.3        // transparency
    };
  }

  // populate an array of bubbles
  const bubbles = Array.from({ length: 30 }, createBubble);

  // animation loop
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let b of bubbles) {
      b.y -= b.speed;
      // recycle when off-screen
      if (b.y < -b.r) {
        Object.assign(b, createBubble());
        b.y = canvas.height + b.r;
      }
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(173,216,230,${b.alpha})`;  // a gentle light-blue
      ctx.fill();
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