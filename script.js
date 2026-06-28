// Mobile nav toggle
const burgerEl = document.getElementById('burger');
if (burgerEl) {
  burgerEl.addEventListener('click', () => {
    document.querySelector('.nav__links').classList.toggle('open');
  });
}

// Preloader: hide once page has loaded (minimum dwell so the animation is visible)
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  setTimeout(() => preloader.classList.add('is-hidden'), 500);
});

// Sticky nav shadow on scroll
const navEl = document.getElementById('nav');
if (navEl) {
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('is-scrolled', window.scrollY > 10);
  });
}

// Scroll-reveal animations
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
}

// Generic filter chips: click toggles .active and shows/hides items matching data-filter
document.querySelectorAll('[data-filter-group]').forEach((group) => {
  const targetSelector = group.dataset.filterGroup;
  const items = document.querySelectorAll(targetSelector);
  group.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('[data-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const value = btn.dataset.filter;
      items.forEach((item) => {
        const match = value === 'alle' || item.dataset.category === value;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });
});

// Pricing cards <-> select sync (membership page)
const pricingCards = document.querySelectorAll('.pricing-card');
const membershipSelect = document.getElementById('membership-type');
if (pricingCards.length) {
  pricingCards.forEach((card) => {
    card.addEventListener('click', () => {
      pricingCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      if (membershipSelect) membershipSelect.value = card.dataset.value;
    });
  });
}

// Demo form submit handlers (no backend — show inline success state)
document.querySelectorAll('form[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = form.querySelector('.form-success');
    const button = form.querySelector('.form-submit');
    if (button) {
      button.disabled = true;
      button.textContent = 'Gesendet ✓';
    }
    if (success) success.classList.add('show');
  });
});

// Matchday navigation (spielplan page) — cycles through a small demo dataset
const matchdayData = [
  { day: 17, opponent: 'SC West', score: '2:2', result: 'draw' },
  { day: 18, opponent: 'SV Ost', score: '– : –', result: 'home' },
  { day: 19, opponent: 'FC Nord', score: '–', result: 'home' },
];
let matchdayIndex = 1;
const matchdayLabel = document.getElementById('matchday-label');
if (matchdayLabel) {
  const renderMatchday = () => {
    matchdayLabel.textContent = 'Spieltag ' + matchdayData[matchdayIndex].day;
  };
  document.getElementById('matchday-prev')?.addEventListener('click', () => {
    matchdayIndex = Math.max(0, matchdayIndex - 1);
    renderMatchday();
  });
  document.getElementById('matchday-next')?.addEventListener('click', () => {
    matchdayIndex = Math.min(matchdayData.length - 1, matchdayIndex + 1);
    renderMatchday();
  });
  renderMatchday();
}

// Team position tabs reuse the same filter-chip mechanic via [data-filter-group]

// "Mehr laden" button on news page reveals additional hidden cards
const loadMoreBtn = document.getElementById('load-more');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    document.querySelectorAll('.news-card.is-more').forEach((card) => card.classList.remove('is-more', 'is-hidden'));
    loadMoreBtn.classList.add('is-disabled');
    loadMoreBtn.textContent = 'Alle Artikel geladen';
  });
}

function startCountdown(targetDate) {
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  if (!hoursEl || !minutesEl || !secondsEl) return;

  function tick() {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

const nextMatch = new Date();
nextMatch.setHours(nextMatch.getHours() + 2, nextMatch.getMinutes() + 14, nextMatch.getSeconds() + 37);
startCountdown(nextMatch);
