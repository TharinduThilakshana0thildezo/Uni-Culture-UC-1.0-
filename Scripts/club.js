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

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initRevealAnimations();
    initSearchFunctionality();
    initFilterFunctionality();
    initSmoothScrolling();
    initJoinButtons();
    initEventButtons();
    initParticleEffects();
    initFloatingElements();
    initResponsiveNavigation();
    initBackgroundElements();
});

// Reveal Animations on Scroll
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => observer.observe(element));
    revealTexts.forEach(element => observer.observe(element));
    
    // Trigger initial animations for hero section
    setTimeout(() => {
        const heroTexts = document.querySelectorAll('.hero .reveal-text');
        heroTexts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('active');
            }, index * 200);
        });
    }, 500);
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('clubSearch');
    const searchButton = document.querySelector('.search-button');
    const clubCards = document.querySelectorAll('.club-card');
    
    if (!searchInput) return;
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        clubCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) || 
                           tags.some(tag => tag.includes(searchTerm));
            
            if (searchTerm === '' || matches) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show no results message if needed
        const visibleCards = document.querySelectorAll('.club-card[style*="block"]');
        showNoResultsMessage(visibleCards.length === 0 && searchTerm !== '');
    }
    
    function showNoResultsMessage(show) {
        let noResults = document.querySelector('.no-results-message');
        
        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results-message';
            noResults.innerHTML = `
                <div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.7);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3>No clubs found</h3>
                    <p>Try searching with different keywords or browse all clubs.</p>
                </div>
            `;
            document.querySelector('.clubs-grid').appendChild(noResults);
        } else if (!show && noResults) {
            noResults.remove();
        }
    }
    
    // Event listeners
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Add CSS animation for fade in
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Filter Functionality
function initFilterFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clubCards = document.querySelectorAll('.club-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter clubs
            clubCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Add ripple effect to button
            addRippleEffect(button);
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-item[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Join Buttons
function initJoinButtons() {
    const joinButtons = document.querySelectorAll('.join-button');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Show join confirmation
            showJoinConfirmation(button);
        });
    });
}

// Event Buttons
function initEventButtons() {
    const eventButtons = document.querySelectorAll('.event-btn');
    
    eventButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Show registration confirmation
            showEventRegistration(button);
        });
    });
}

// Particle Effects
function initParticleEffects() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Create additional particles dynamically
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Floating Elements
function initFloatingElements() {
    // Add parallax effect to floating book
    const floatingBook = document.querySelector('.floating-book');
    if (floatingBook) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            floatingBook.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add mouse move effect to abstract shape
    const abstractShape = document.querySelector('.abstract-shape');
    if (abstractShape) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            abstractShape.style.transform = `translate(${x * 20}px, ${y * 20}px) rotate(${x * 360}deg)`;
        });
    }
}

// Responsive Navigation
function initResponsiveNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
        });
    });
    
    // Add scroll-based navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-item');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}` || 
                (current === '' && item.getAttribute('href') === '#home')) {
                item.classList.add('active');
            }
        });
    });
}

// Utility Functions
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showJoinConfirmation(button) {
    const clubName = button.closest('.club-card').querySelector('h3').textContent;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'join-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Join Club</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>You're about to join <strong>${clubName}</strong></p>
                <p>You'll receive updates about club activities and events.</p>
                <div class="modal-actions">
                    <button class="confirm-join">Confirm Join</button>
                    <button class="cancel-join">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .join-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        .modal-content {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideUp 0.3s ease-out;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-header h3 {
            color: white;
            margin: 0;
        }
        .close-modal {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        .close-modal:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        .modal-body p {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 15px;
        }
        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }
        .confirm-join, .cancel-join {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .confirm-join {
            background: linear-gradient(45deg, #4CAF50, #8BC34A);
            color: white;
        }
        .cancel-join {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .confirm-join:hover {
            transform: scale(1.05);
        }
        .cancel-join:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-join').addEventListener('click', () => modal.remove());
    modal.querySelector('.confirm-join').addEventListener('click', () => {
        modal.remove();
        showSuccessMessage(`Successfully joined ${clubName}!`);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function showEventRegistration(button) {
    const eventName = button.closest('.event-card').querySelector('h3').textContent;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Event Registration</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Register for <strong>${eventName}</strong></p>
                <p>You'll receive a confirmation email with event details.</p>
                <div class="modal-actions">
                    <button class="confirm-register">Register Now</button>
                    <button class="cancel-register">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles (reuse from join modal)
    const style = document.createElement('style');
    style.textContent = `
        .event-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        .event-modal .modal-content {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideUp 0.3s ease-out;
        }
        .event-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .event-modal .modal-header h3 {
            color: white;
            margin: 0;
        }
        .event-modal .close-modal {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        .event-modal .close-modal:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        .event-modal .modal-body p {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 15px;
        }
        .event-modal .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }
        .event-modal .confirm-register, .event-modal .cancel-register {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .event-modal .confirm-register {
            background: linear-gradient(45deg, #FF6B6B, #FF8E53);
            color: white;
        }
        .event-modal .cancel-register {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .event-modal .confirm-register:hover {
            transform: scale(1.05);
        }
        .event-modal .cancel-register:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('.cancel-register').addEventListener('click', () => modal.remove());
    modal.querySelector('.confirm-register').addEventListener('click', () => {
        modal.remove();
        showSuccessMessage(`Successfully registered for ${eventName}!`);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .success-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4CAF50, #8BC34A);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            animation: slideInRight 0.5s ease-out;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-content i {
            font-size: 1.2rem;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
    
    // Add slide out animation
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(slideOutStyle);
}

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16)); // ~60fps

// Background Elements Initialization
function initBackgroundElements() {
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
            // Remove active class from all items
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            // Add active class to clicked item
            item.classList.add('active');
        });
    });

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
        // Add random variations to particle animations
        const randomDelay = Math.random() * 2;
        const randomDuration = 2 + Math.random() * 2;
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
        
        // Add sparkle effect on some particles
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
            // Show the text
            unCultureFlash.classList.add('visible');
            // Hide after 5 seconds
            setTimeout(() => {
                unCultureFlash.classList.remove('visible');
            }, 5000);
        }
    }
    
    // Start the flashing animation after page load
    setTimeout(() => {
        animateUnCultureFlash();
        // Set up the interval to repeat every 10 seconds (5 seconds visible, 5 seconds hidden)
        setInterval(animateUnCultureFlash, 10000);
    }, 3000); // Start 3 seconds after page load
}
