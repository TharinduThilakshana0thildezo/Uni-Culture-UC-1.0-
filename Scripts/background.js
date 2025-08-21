// Page Loader Animation
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
    
    // Staggered text reveal for hero
    const heroTexts = document.querySelectorAll('.hero .reveal-text');
    heroTexts.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 800 + i * 200);
    });
    
    // Side logo appears after 1.2 seconds
    setTimeout(() => {
      const sideLogo = document.querySelector('.side-logo');
      if (sideLogo) {
        sideLogo.classList.add('visible');
      }
    }, 1200);
    
    // Delayed navigation appearance (appears after site loads)
    setTimeout(() => {
      const navCircle = document.querySelector('.nav-circle');
      if (navCircle) {
        navCircle.classList.add('visible');
      }
    }, 2000);
    
    // Animate navigation items with delay
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, i) => {
      setTimeout(() => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50);
      }, 2500 + i * 100);
    });
    
    // Animate floating book with delay
    const floatingBook = document.querySelector('.floating-book');
    if (floatingBook) {
      floatingBook.style.opacity = '0';
      floatingBook.style.transform = 'translateY(-50%) scale(0.8) rotateY(20deg)';
      floatingBook.style.transition = 'all 3.2s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        floatingBook.style.opacity = '0.2';
        floatingBook.style.transform = 'translateY(-50%) scale(1) rotateY(0deg)';
      }, 3000);
    }
  }, 400);
});

// Enhanced scroll-triggered reveal with better timing
const revealEls = document.querySelectorAll('.reveal, .service-card');
const observer = new window.IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => observer.observe(el));

// Micro-interactions for cards with enhanced feedback
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousedown', () => {
    card.style.transform = 'scale(0.98) translateY(-4px)';
    card.style.transition = 'all 0.1s ease';
  });
  
  card.addEventListener('mouseup', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(.77,0,.18,1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(.77,0,.18,1)';
  });
});

// Navigation hover effects with enhanced animations
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-2px) scale(1.05)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0) scale(1)';
  });
  
  // Active state management
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(navItem => {
      navItem.classList.remove('active');
    });
    item.classList.add('active');
  });
});

// CTA button enhanced interactions
const heroCta = document.querySelector('.hero-cta');
if (heroCta) {
  heroCta.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)';
  });
  heroCta.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
}

// Smooth parallax effect for abstract background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const abstractShape = document.querySelector('.abstract-shape');
  
  if (abstractShape) {
    const rate = scrolled * -0.5;
    abstractShape.style.transform = `rotate(45deg) translateY(${rate}px)`;
  }
});

// Floating navigation scroll effect
window.addEventListener('scroll', () => {
  const navCircle = document.querySelector('.nav-circle');
  if (!navCircle) return;
  if (window.scrollY > 100) {
    navCircle.style.background = 'rgba(10, 13, 12, 0.95)';
    navCircle.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
  } else {
    navCircle.style.background = 'rgba(10, 13, 12, 0.8)';
    navCircle.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
  }
});

// Enhanced text reveal animation for title words
const titleWords = document.querySelectorAll('.title-word');
titleWords.forEach((word, i) => {
  word.style.opacity = '0';
  word.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    word.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    word.style.opacity = '1';
    word.style.transform = 'translateY(0)';
  }, 1000 + i * 300);
});

// Smooth reveal for abstract background
setTimeout(() => {
  const abstractShape = document.querySelector('.abstract-shape');
  if (abstractShape) {
    abstractShape.style.opacity = '0';
    abstractShape.style.transform = 'rotate(45deg) scale(0.8)';
    abstractShape.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      abstractShape.style.opacity = '1';
      abstractShape.style.transform = 'rotate(45deg) scale(1)';
    }, 500);
  }
}, 1500);

// Enhanced book interaction effects
const floatingBook = document.querySelector('.floating-book');
if (floatingBook) {
  floatingBook.addEventListener('mouseenter', () => {
    if (!floatingBook.classList.contains('hidden')) {
      floatingBook.style.transform = 'translateY(-50%) scale(1.1) rotateY(-5deg)';
      floatingBook.style.transition = 'all 0.3s ease';
    }
  });
  
  floatingBook.addEventListener('mouseleave', () => {
    if (!floatingBook.classList.contains('hidden')) {
      floatingBook.style.transform = 'translateY(-50%) scale(1) rotateY(0deg)';
      floatingBook.style.transition = 'all 0.3s ease';
    }
  });
}

// Book page flip effect simulation
function simulatePageFlip() {
  const book = document.querySelector('.book');
  if (book && !document.querySelector('.floating-book').classList.contains('hidden')) {
    book.style.filter = 'brightness(1.1)';
    setTimeout(() => {
      book.style.filter = 'brightness(1)';
    }, 100);
  }
}
setInterval(simulatePageFlip, 4000);

// NSBM logo animation
function animateNSBMLogo() {
  const logoShape = document.querySelector('.logo-shape');
  if (logoShape) {
    logoShape.style.transform = 'scale(1.1) rotate(5deg)';
    logoShape.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      logoShape.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }
}
setInterval(animateNSBMLogo, 6000);

// Side logo hover effects
const sideLogo = document.querySelector('.side-logo');
if (sideLogo) {
  sideLogo.addEventListener('mouseenter', () => {
    sideLogo.style.transform = 'translateY(-50%) scale(1.05)';
    sideLogo.style.transition = 'all 0.3s ease';
  });
  
  sideLogo.addEventListener('mouseleave', () => {
    sideLogo.style.transform = 'translateY(-50%) scale(1)';
    sideLogo.style.transition = 'all 0.3s ease';
  });
}

// Particle effect enhancement
const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
  const randomDelay = Math.random() * 2;
  const randomDuration = 2 + Math.random() * 2;
  
  particle.style.animationDelay = `${randomDelay}s`;
  particle.style.animationDuration = `${randomDuration}s`;
  
  if (index % 3 === 0) {
    particle.style.boxShadow = '0 0 8px rgba(170, 245, 194, 0.8)';
  }
});

// Create additional dynamic particles
function createDynamicParticle() {
  const particlesContainer = document.querySelector('.particles-container');
  if (!particlesContainer) return;
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 3 + 's';
  particle.style.animationDuration = (2 + Math.random() * 2) + 's';
  
  particlesContainer.appendChild(particle);
  
  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 5000);
}
setInterval(createDynamicParticle, 2000);

// Social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-3px) scale(1.1)';
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateY(0) scale(1)';
  });
});

// Book scroll-based disappearance
window.addEventListener('scroll', () => {
  const floatingBookEl = document.querySelector('.floating-book');
  const scrolled = window.pageYOffset;
  
  if (floatingBookEl) {
    if (scrolled > 300) {
      floatingBookEl.classList.add('hidden');
    } else {
      floatingBookEl.classList.remove('hidden');
    }
  }
});

// Un Culture Flashing Text Animation
function animateUnCultureFlash() {
  const unCultureFlash = document.querySelector('.un-culture-flash');
  if (unCultureFlash) {
    unCultureFlash.classList.add('visible');
    setTimeout(() => {
      unCultureFlash.classList.remove('visible');
    }, 5000);
  }
}
setTimeout(() => {
  animateUnCultureFlash();
  setInterval(animateUnCultureFlash, 10000);
}, 3000);


