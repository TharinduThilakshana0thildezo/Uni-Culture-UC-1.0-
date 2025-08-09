// Page Loader Animation
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
    
    // Staggered text reveal for login card
    const loginElements = document.querySelectorAll('.login-title, .login-subtitle, .auth-tabs, .login-form');
    loginElements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 800 + i * 200);
    });
    
    // Side logo appears after 1.2 seconds
    setTimeout(() => {
      const sideLogo = document.querySelector('.side-logo');
      if (sideLogo) {
        sideLogo.classList.add('visible');
      }
    }, 1200);
    
    // Delayed navigation appearance
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

// Tab switching functionality
function switchTab(tab) {
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  const signinTab = document.querySelector('.auth-tab[onclick="switchTab(\'signin\')"]');
  const signupTab = document.querySelector('.auth-tab[onclick="switchTab(\'signup\')"]');
  
  if (tab === 'signin') {
    signinTab.classList.add('active');
    signupTab.classList.remove('active');
    signinForm.classList.add('active');
    signupForm.classList.remove('active');
  } else {
    signupTab.classList.add('active');
    signinTab.classList.remove('active');
    signupForm.classList.add('active');
    signinForm.classList.remove('active');
  }
}

// Form validation and submission
document.getElementById('signin-form').addEventListener('submit', function(e) {
  e.preventDefault();
  handleSignIn();
});

document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  handleSignUp();
});

function handleSignIn() {
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  const rememberMe = document.getElementById('remember-me').checked;
  
  if (!email || !password) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  const loginBtn = document.querySelector('#signin-form .login-btn');
  loginBtn.classList.add('loading');
  loginBtn.querySelector('span').textContent = 'Signing in...';
  
  // Simulate API call
  setTimeout(() => {
    loginBtn.classList.remove('loading');
    loginBtn.querySelector('span').textContent = 'Sign In';
    showNotification('Successfully signed in!', 'success');
    
    // Redirect to dashboard or home page
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }, 2000);
}

function handleSignUp() {
  const firstName = document.getElementById('signup-firstname').value;
  const lastName = document.getElementById('signup-lastname').value;
  const email = document.getElementById('signup-email').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  const agreeTerms = document.getElementById('agree-terms').checked;
  
  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match.', 'error');
    return;
  }
  
  if (password.length < 8) {
    showNotification('Password must be at least 8 characters long.', 'error');
    return;
  }
  
  if (!agreeTerms) {
    showNotification('Please agree to the Terms & Conditions.', 'error');
    return;
  }
  
  // Show loading state
  const signupBtn = document.querySelector('#signup-form .login-btn');
  signupBtn.classList.add('loading');
  signupBtn.querySelector('span').textContent = 'Creating account...';
  
  // Simulate API call
  setTimeout(() => {
    signupBtn.classList.remove('loading');
    signupBtn.querySelector('span').textContent = 'Create Account';
    showNotification('Account created successfully!', 'success');
    
    // Switch to sign in tab
    setTimeout(() => {
      switchTab('signin');
    }, 1500);
  }, 2000);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'rgba(170, 245, 194, 0.9)' : type === 'error' ? 'rgba(255, 107, 107, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
    color: ${type === 'success' || type === 'error' ? '#0a0d0c' : '#0a0d0c'};
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    border: 1px solid ${type === 'success' ? 'rgba(170, 245, 194, 0.3)' : type === 'error' ? 'rgba(255, 107, 107, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 400px;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });
}

// Enhanced scroll-triggered reveal
const revealEls = document.querySelectorAll('.login-card, .form-group');
const observer = new window.IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});
revealEls.forEach(el => observer.observe(el));

// Micro-interactions for form inputs
document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  });
  
  input.addEventListener('input', () => {
    if (input.value) {
      input.parentElement.classList.add('has-value');
    } else {
      input.parentElement.classList.remove('has-value');
    }
  });
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const platform = btn.classList.contains('google') ? 'Google' : 
                    btn.classList.contains('apple') ? 'Apple' : 'Facebook';
    showNotification(`${platform} login coming soon!`, 'info');
  });
});

// Floating navigation scroll effect
window.addEventListener('scroll', () => {
  const navCircle = document.querySelector('.nav-circle');
  if (window.scrollY > 100) {
    navCircle.style.background = 'rgba(10, 13, 12, 0.95)';
    navCircle.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
  } else {
    navCircle.style.background = 'rgba(10, 13, 12, 0.8)';
    navCircle.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
  }
});

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

// Book page flip sound effect simulation
function simulatePageFlip() {
  const book = document.querySelector('.book');
  if (book && !document.querySelector('.floating-book').classList.contains('hidden')) {
    book.style.filter = 'brightness(1.1)';
    setTimeout(() => {
      book.style.filter = 'brightness(1)';
    }, 100);
  }
}

// Trigger page flip effect every 4 seconds
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

// Animate NSBM logo every 6 seconds
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
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 3 + 's';
  particle.style.animationDuration = (2 + Math.random() * 2) + 's';
  
  particlesContainer.appendChild(particle);
  
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 5000);
}

// Create dynamic particles every 2 seconds
setInterval(createDynamicParticle, 2000);

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

// Book scroll-based disappearance
window.addEventListener('scroll', () => {
  const floatingBook = document.querySelector('.floating-book');
  const scrolled = window.pageYOffset;
  
  if (floatingBook) {
    if (scrolled > 300) {
      floatingBook.classList.add('hidden');
    } else {
      floatingBook.classList.remove('hidden');
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

// Start the flashing animation after page load
setTimeout(() => {
  animateUnCultureFlash();
  setInterval(animateUnCultureFlash, 10000);
}, 3000);

// Password strength indicator
document.getElementById('signup-password').addEventListener('input', function() {
  const password = this.value;
  const strengthIndicator = document.querySelector('.password-strength') || createPasswordStrengthIndicator();
  
  const strength = calculatePasswordStrength(password);
  updatePasswordStrengthIndicator(strengthIndicator, strength);
});

function createPasswordStrengthIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'password-strength';
  indicator.innerHTML = `
    <div class="strength-bar">
      <div class="strength-fill"></div>
    </div>
    <span class="strength-text">Password strength</span>
  `;
  
  const passwordGroup = document.getElementById('signup-password').parentElement;
  passwordGroup.appendChild(indicator);
  
  return indicator;
}

function calculatePasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 8) strength += 25;
  if (password.match(/[a-z]/)) strength += 25;
  if (password.match(/[A-Z]/)) strength += 25;
  if (password.match(/[0-9]/)) strength += 25;
  if (password.match(/[^a-zA-Z0-9]/)) strength += 25;
  
  return Math.min(strength, 100);
}

function updatePasswordStrengthIndicator(indicator, strength) {
  const fill = indicator.querySelector('.strength-fill');
  const text = indicator.querySelector('.strength-text');
  
  fill.style.width = strength + '%';
  
  if (strength < 25) {
    fill.style.background = '#ff6b6b';
    text.textContent = 'Weak';
  } else if (strength < 50) {
    fill.style.background = '#ffa726';
    text.textContent = 'Fair';
  } else if (strength < 75) {
    fill.style.background = '#ffd54f';
    text.textContent = 'Good';
  } else {
    fill.style.background = '#66bb6a';
    text.textContent = 'Strong';
  }
}

// Add CSS for password strength indicator
const style = document.createElement('style');
style.textContent = `
  .password-strength {
    margin-top: 8px;
  }
  
  .strength-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
  }
  
  .strength-fill {
    height: 100%;
    transition: width 0.3s ease, background 0.3s ease;
  }
  
  .strength-text {
    font-size: 0.8rem;
    color: #b6cfc2;
    margin-top: 4px;
    display: block;
  }
`;
document.head.appendChild(style); 