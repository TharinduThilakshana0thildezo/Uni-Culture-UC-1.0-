// Resources page interactions - simple client-side search filter

window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('resourceSearch');
  const cards = document.querySelectorAll('.resource-card');

  function applyFilter(term) {
    const needle = term.trim().toLowerCase();
    cards.forEach(card => {
      const hay = (card.dataset.search || '').toLowerCase();
      card.style.display = needle && !hay.includes(needle) ? 'none' : '';
    });
  }

  input?.addEventListener('input', (e) => applyFilter(e.target.value));
  document.getElementById('resourceSearchBtn')?.addEventListener('click', () => applyFilter(input?.value || ''));

  // Particle effect enhancement (falling particles)
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 2 + Math.random() * 2;
    const randomLeft = Math.random() * 100;
    particle.style.left = `${randomLeft}%`;
    particle.style.animationDelay = `${randomDelay}s`;
    particle.style.animationDuration = `${randomDuration}s`;
    if (index % 3 === 0) {
      particle.style.boxShadow = '0 0 8px rgba(170, 245, 194, 0.8)';
    }
  });

  function createDynamicParticle() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(particle);
    setTimeout(() => { particle.remove(); }, 5000);
  }

  setInterval(createDynamicParticle, 1200);
});


