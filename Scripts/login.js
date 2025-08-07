function toggleAuth(mode) {
    const container = document.getElementById('authContainer');
    const title = document.getElementById('authTitle');
    const button = document.getElementById('authButton');
    if (mode === 'sign-in') {
        container.classList.add('sign-in');
        title.textContent = 'Sign in';
        button.textContent = 'Sign in';
    } else {
        container.classList.remove('sign-in');
        title.textContent = 'Create an account';
        button.textContent = 'Create an account';
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 5 + 5 + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.5;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 10000);
}

function updateParticles(event) {
    const particles = document.querySelectorAll('.particle');
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    particles.forEach(particle => {
        const particleX = particle.getBoundingClientRect().left + window.scrollX;
        const particleY = particle.getBoundingClientRect().top + window.scrollY;
        const dx = cursorX - particleX;
        const dy = cursorY - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 10;
            particle.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`;
        } else {
            particle.style.transform = `translate(0, 0)`;
        }
    });

    if (Math.random() < 0.1) createParticle();
}

function handleSubmit(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all fields.');
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Account created successfully!');
    document.getElementById('authForm').reset();
}

document.addEventListener('mousemove', (event) => {
    updateParticles(event);
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
    document.body.appendChild(cursor);
    setTimeout(() => cursor.remove(), 100);
});

setInterval(createParticle, 200);