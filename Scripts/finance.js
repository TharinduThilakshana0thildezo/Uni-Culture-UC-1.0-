// Finance page interactions - reuses global animations from Scripts/home.js

window.addEventListener('DOMContentLoaded', () => {
  // Search filter for scholarships and transactions
  const input = document.getElementById('financeSearch');
  const scholarships = document.querySelectorAll('.scholarship-item');
  const txList = document.getElementById('txList');
  const totalEl = document.getElementById('totalBalance');
  const incomeEl = document.getElementById('incomeValue');
  const expenseEl = document.getElementById('expenseValue');
  const creditEl = document.getElementById('creditValue');
  const heroMedia = document.getElementById('eventHeroMedia');
  const heroBar = document.getElementById('eventHeroBar');

  let transactions = [
    { name: 'Paypal', date: 'Aug 8 · 11:55 AM', amount: -12.89, type: 'spending' },
    { name: 'Apple', date: 'Aug 8 · 10:03 AM', amount: -13.30, type: 'spending' },
    { name: 'Adobe Creative Cloud', date: 'Aug 7 · 19:15 PM', amount: -26.99, type: 'spending' },
    { name: 'Walmart', date: 'Aug 7 · 18:23 PM', amount: -358.54, type: 'spending' },
    { name: 'Chase', date: 'Aug 7 · 16:47 PM', amount: 5287.0, type: 'income' }
  ];

  function renderTransactions(filter = 'all', term = '') {
    txList.innerHTML = '';
    transactions
      .filter(t => (filter === 'all' || t.type === filter))
      .filter(t => (term ? (t.name + ' ' + t.date).toLowerCase().includes(term) : true))
      .forEach(t => {
        const li = document.createElement('li');
        li.className = 'tx-item';
        li.innerHTML = `<span class="tx-name">${t.name}<small style="color:#9bb6aa; margin-left:8px">${t.date}</small></span>
                        <span class="tx-amount ${t.amount < 0 ? 'negative' : 'positive'}">${t.amount < 0 ? '-' : '+'}$${Math.abs(t.amount).toFixed(2)}</span>`;
        txList.appendChild(li);
      });
  }

  renderTransactions();

  // Event-driven dashboards
  const eventData = {
    fest: {
      total: 'Rs:25,230.00', income: 'Rs:2,259.70', expense: 'Rs:1,589.65', credit: 'Rs:4,568.00',
      tx: [
        { name: 'Ticket Sales', date: 'Oct 12 · 09:00', amount: 18250, type: 'income' },
        { name: 'Stage Vendor', date: 'Oct 12 · 14:10', amount: -8200, type: 'spending' },
        { name: 'Food Stalls', date: 'Oct 12 · 19:30', amount: 5600, type: 'income' },
        { name: 'Decor', date: 'Oct 11 · 12:45', amount: -3250, type: 'spending' }
      ],
      spark: [2,3,2,4,5,6,5,7,8,7,9,11,10,12,11,13,12,14,13,15],
      budget: [4600,3800,4100,6000,3200]
    },
    sports: {
      total: 'Rs:12,940.00', income: 'Rs:6,320.00', expense: 'Rs:4,870.00', credit: 'Rs:1,750.00',
      tx: [
        { name: 'Sponsorship', date: 'Nov 01 · 10:00', amount: 3000, type: 'income' },
        { name: 'Jersey Supplier', date: 'Nov 02 · 08:30', amount: -1450, type: 'spending' },
        { name: 'Ticketing', date: 'Nov 03 · 18:10', amount: 2100, type: 'income' },
        { name: 'Logistics', date: 'Nov 02 · 15:40', amount: -980, type: 'spending' }
      ],
      spark: [1,1.2,1.8,1.1,2.2,2.4,2.0,2.8,3.1,2.7,3.5,3.9,3.4,4.0,4.2,4.5,4.1,4.9,5.1,5.4],
      budget: [2200,2800,2400,1800,1600]
    },
    research: {
      total: 'Rs:19,780.00', income: 'Rs:8,560.00', expense: 'Rs:6,420.00', credit: 'Rs:2,800.00',
      tx: [
        { name: 'Grant A', date: 'Dec 05 · 11:00', amount: 5000, type: 'income' },
        { name: 'Printing', date: 'Dec 09 · 16:20', amount: -760, type: 'spending' },
        { name: 'Sponsorship', date: 'Dec 08 · 10:35', amount: 2400, type: 'income' },
        { name: 'Hall Setup', date: 'Dec 10 · 06:45', amount: -1300, type: 'spending' }
      ],
      spark: [0.8,1.1,1.3,1.6,2.0,2.3,2.9,3.1,3.6,3.8,4.0,4.6,4.9,5.2,5.8,6.0,6.3,6.9,7.1,7.6],
      budget: [2600,2400,2200,2800,2300]
    }
    ,
    orientation: {
      total: 'Rs:14,250.00', income: 'Rs:5,200.00', expense: 'Rs:3,950.00', credit: 'Rs:1,100.00',
      tx: [
        { name: 'Welcome Packs', date: 'Jan 04 · 16:00', amount: -1450, type: 'spending' },
        { name: 'Sponsors', date: 'Jan 03 · 10:00', amount: 3000, type: 'income' },
        { name: 'Catering', date: 'Jan 05 · 12:40', amount: -1200, type: 'spending' }
      ],
      spark: [0.6,0.7,0.9,1.1,1.3,1.2,1.6,1.7,1.9,2.0,2.2,2.5,2.7,2.6,2.9,3.2,3.0,3.3,3.6,3.8],
      budget: [1800,1600,1500,1400,1300]
    },
    alumni: {
      total: 'Rs:22,300.00', income: 'Rs:11,400.00', expense: 'Rs:7,800.00', credit: 'Rs:3,100.00',
      tx: [
        { name: 'Tickets', date: 'Feb 16 · 11:20', amount: 5200, type: 'income' },
        { name: 'Hall Rent', date: 'Feb 17 · 09:00', amount: -3900, type: 'spending' },
        { name: 'Sponsorship', date: 'Feb 15 · 14:10', amount: 4200, type: 'income' }
      ],
      spark: [1.0,1.3,1.5,1.4,1.8,2.1,2.0,2.5,2.7,2.6,3.0,3.4,3.2,3.6,3.8,4.0,3.9,4.2,4.5,4.7],
      budget: [2600,2500,2400,2200,2100]
    },
    tech: {
      total: 'Rs:28,900.00', income: 'Rs:15,800.00', expense: 'Rs:10,900.00', credit: 'Rs:2,200.00',
      tx: [
        { name: 'Expo Booths', date: 'Mar 20 · 10:00', amount: 7800, type: 'income' },
        { name: 'A/V Systems', date: 'Mar 21 · 13:30', amount: -5400, type: 'spending' },
        { name: 'Keynote Sponsor', date: 'Mar 21 · 16:40', amount: 4200, type: 'income' }
      ],
      spark: [1.2,1.4,1.6,1.8,2.0,2.5,2.2,2.9,3.2,3.0,3.6,4.1,3.9,4.4,4.9,5.3,5.1,5.6,6.0,6.4],
      budget: [3000,3400,3200,3600,3800]
    }
  };

  let sparkChart = null;
  let budgetChart = null;

  // Filter chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const term = (input?.value || '').trim().toLowerCase();
      renderTransactions(chip.dataset.filter, term);
    });
  });

  // Search typing
  input?.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    scholarships.forEach(s => {
      const match = s.dataset.search.includes(term);
      s.style.display = term && !match ? 'none' : '';
    });
    const active = document.querySelector('.chip.active');
    renderTransactions(active ? active.dataset.filter : 'all', term);
  });

  // Segmented control demo
  document.querySelectorAll('.seg').forEach(seg => {
    seg.addEventListener('click', () => {
      document.querySelectorAll('.seg').forEach(s => s.classList.remove('active'));
      seg.classList.add('active');
      // Could reload chart data here based on seg.dataset.range
    });
  });

  // Charts
  const spark = document.getElementById('sparkline');
  if (spark && window.Chart) {
    sparkChart = new Chart(spark.getContext('2d'), {
      type: 'line',
      data: { labels: Array.from({ length: 20 }, (_, i) => i + 1), datasets: [{ data: eventData.fest.spark, borderColor: '#aaf5c2', borderWidth: 2, pointRadius: 0, fill: false }] },
      options: { responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } }, elements: { line: { tension: 0.35 } } }
    });
  }

  const budget = document.getElementById('budgetChart');
  if (budget && window.Chart) {
    budgetChart = new Chart(budget.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          { label: 'Income', data: eventData.fest.budget, backgroundColor: 'rgba(170,245,194,0.5)' },
          { label: 'Spent', data: [3000, 3400, 2800, 2400, 2600], backgroundColor: 'rgba(0,102,204,0.45)' },
          { label: 'Scheduled', data: [800, 600, 700, 900, 500], backgroundColor: 'rgba(138,125,255,0.45)' },
          { label: 'Savings', data: [800, 600, 600, 1700, 100], backgroundColor: 'rgba(255,195,107,0.45)' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#b6cfc2' } } },
        scales: {
          x: { ticks: { color: '#9bb6aa' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#9bb6aa' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }

  // Event card click handling: switch metrics + charts + transactions
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.event-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const key = card.dataset.event;
      const data = eventData[key];
      if (!data) return;
      if (totalEl) totalEl.textContent = data.total;
      if (incomeEl) incomeEl.textContent = data.income;
      if (expenseEl) expenseEl.textContent = data.expense;
      if (creditEl) creditEl.textContent = data.credit;
      transactions = data.tx;
      const active = document.querySelector('.chip.active');
      renderTransactions(active ? active.dataset.filter : 'all', (input?.value || '').trim().toLowerCase());
      if (sparkChart) { sparkChart.data.datasets[0].data = data.spark; sparkChart.update(); }
      if (budgetChart) { budgetChart.data.datasets[0].data = data.budget; budgetChart.update(); }
      // Swap hero media background
      const src = card.getAttribute('data-img');
      if (heroMedia && src) {
        if (heroBar) heroBar.classList.remove('is-hidden');
        heroMedia.classList.remove('bg');
        // fade switch
        heroMedia.style.opacity = '0';
        setTimeout(() => {
          heroMedia.style.backgroundImage = `url('${src}')`;
          heroMedia.classList.add('bg');
          heroMedia.style.transition = 'opacity 400ms ease';
          heroMedia.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Initialize hero media with first card
  const firstCard = document.querySelector('.event-card');
  const initSrc = firstCard ? firstCard.getAttribute('data-img') : null;
  if (heroMedia && initSrc) {
    heroMedia.style.backgroundImage = `url('${initSrc}')`;
    heroMedia.classList.add('bg');
  }
});


