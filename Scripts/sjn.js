// Reuse theme JS behavior where useful and add page-specific interactions

// Mark Senior-Junior link active if not already
document.querySelectorAll('.nav-item').forEach(link => {
  if (link.getAttribute('href') && link.getAttribute('href').includes('senior-junior')) {
    link.classList.add('active');
  }
});

// Animate hero title on load
window.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelectorAll('.sjn-hero-title .gradient-text');
  title.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all .6s cubic-bezier(.4,0,.2,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 200);
  });
});

// Smooth scroll reveal for sections
const srObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      srObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.feature-card, .mentor-card, .event-card, .contact-item, .contact-form').forEach(el => {
  el.classList.add('reveal');
  srObserver.observe(el);
});

// Button micro-interactions
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-2px)'; });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translateY(0)'; });
});

// Particle randomization (reuse class from home)
document.querySelectorAll('.particle').forEach((p, i) => {
  const d = 2 + Math.random() * 2;
  const delay = Math.random() * 2;
  p.style.animationDuration = `${d}s`;
  p.style.animationDelay = `${delay}s`;
  if (i % 3 === 0) p.style.boxShadow = '0 0 8px rgba(170,245,194,0.8)';
});


