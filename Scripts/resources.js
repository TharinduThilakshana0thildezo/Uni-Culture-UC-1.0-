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

  // Hero screen logic
  const heroScreen = document.getElementById('heroScreen');
  const heroScreenTitle = document.getElementById('heroScreenTitle');
  const heroScreenBody = document.getElementById('heroScreenBody');
  const heroSubtabs = document.getElementById('heroSubtabs');
  const heroScreenClose = document.getElementById('heroScreenClose');
  let inactivityTimer = null;

  const topics = {
    study: {
      title: 'Study Materials',
      tabs: [
        { key: 'notes', label: 'Lecture Notes', content: () => grid([
          { title: 'CS Semester 1 Notes', desc: 'Algorithms, Programming', link: '#' },
          { title: 'Engineering Maths', desc: 'Calculus, Linear Algebra', link: '#' },
        ]) },
        { key: 'papers', label: 'Past Papers', content: () => grid([
          { title: 'Mid-term Papers', desc: 'Practice sets and keys', link: 'https://papers.gceguide.com/' },
          { title: 'Final Exams', desc: 'Past finals by dept', link: 'https://www.education.gov.lk/' },
        ]) },
        { key: 'research', label: 'Research Papers', content: () => grid([
          { title: 'IEEE Xplore', desc: 'Explore IEEE publications', link: 'https://ieeexplore.ieee.org/' },
          { title: 'Google Scholar', desc: 'Scholarly articles', link: 'https://scholar.google.com/' },
        ]) },
      ]
    },
    tools: {
      title: 'Learning Tools',
      tabs: [
        { key: 'courses', label: 'Online Courses', content: () => grid([
          { title: 'Coursera', desc: 'Courses from top universities', link: 'https://coursera.org' },
          { title: 'edX', desc: 'Online programs', link: 'https://edx.org' },
        ]) },
        { key: 'software', label: 'Software & Tools', content: () => grid([
          { title: 'Office 365', desc: 'Student access', link: 'https://www.microsoft.com/education' },
          { title: 'JetBrains IDEs', desc: 'Free for students', link: 'https://www.jetbrains.com/community/education/' },
        ]) },
        { key: 'library', label: 'Library', content: () => grid([
          { title: 'E-books', desc: 'Digital library', link: '#' },
          { title: 'Archives', desc: 'Research archives', link: '#' },
        ]) },
      ]
    },
    career: {
      title: 'Career',
      tabs: [
        { key: 'jobs', label: 'Job Board', content: () => grid([
          { title: 'Internships', desc: 'Latest internships', link: '#' },
          { title: 'Full-time', desc: 'Graduate roles', link: '#' },
        ]) },
        { key: 'services', label: 'Career Services', content: () => grid([
          { title: 'Resume Builder', desc: 'Templates and tips', link: '#' },
          { title: 'Interview Prep', desc: 'Practice Q&A', link: '#' },
        ]) },
        { key: 'alumni', label: 'Alumni Network', content: () => grid([
          { title: 'Mentorship', desc: 'Get a mentor', link: '#' },
          { title: 'Events', desc: 'Networking sessions', link: '#' },
        ]) },
      ]
    },
    kuppi: {
      title: 'Kuppi Sessions',
      tabs: [
        { key: 'discord', label: 'Discord Servers', content: () => grid([
          { title: 'Main Server', desc: 'Modules, revisions', link: 'https://discord.com/' },
          { title: 'Study Group', desc: 'Peer learning', link: 'https://discord.com/' },
        ]) },
        { key: 'chat', label: 'Chatrooms', content: () => grid([
          { title: 'Industry Experts', desc: 'Join discussions', link: 'https://discord.com/' },
        ]) },
      ]
    }
  };

  function grid(items) {
    return items.map(i => (
      `<div class="hero-card">
        <h4>${i.title}</h4>
        <p>${i.desc}</p>
        <a class="hero-link" href="${i.link}" target="_blank" rel="noopener">Open</a>
      </div>`
    )).join('');
  }

  function renderHero(topicKey) {
    const topic = topics[topicKey];
    if (!topic) return;
    heroScreenTitle.textContent = topic.title;
    heroSubtabs.innerHTML = '';
    heroScreenBody.innerHTML = '';
    topic.tabs.forEach((t, idx) => {
      const b = document.createElement('button');
      b.className = 'hero-subtab' + (idx === 0 ? ' active' : '');
      b.textContent = t.label;
      b.addEventListener('click', () => selectSubtab(topic, idx));
      heroSubtabs.appendChild(b);
    });
    selectSubtab(topic, 0);
    showHeroScreen();
  }

  function selectSubtab(topic, idx) {
    heroSubtabs.querySelectorAll('.hero-subtab').forEach(el => el.classList.remove('active'));
    const tabBtn = heroSubtabs.children[idx];
    if (tabBtn) tabBtn.classList.add('active');
    heroScreenBody.innerHTML = topic.tabs[idx].content();
    resetInactivity();
  }

  function showHeroScreen() {
    heroScreen.classList.add('visible');
    heroScreen.setAttribute('aria-hidden', 'false');
    resetInactivity();
  }

  function hideHeroScreen() {
    heroScreen.classList.remove('visible');
    heroScreen.setAttribute('aria-hidden', 'true');
    clearTimeout(inactivityTimer);
  }

  function resetInactivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      hideHeroScreen();
    }, 10000); // 10s inactivity
  }

  document.querySelectorAll('.hero-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hero-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderHero(btn.dataset.topic);
    });
  });

  heroScreenClose?.addEventListener('click', hideHeroScreen);
  heroScreen?.addEventListener('mousemove', resetInactivity);
  heroScreen?.addEventListener('keydown', resetInactivity);
  heroScreen?.addEventListener('click', resetInactivity);
});


