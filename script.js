// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('open');
});

// Active link highlight on scroll
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (pageYOffset >= top) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// Counters
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function runCounter(el){
  const target = +el.getAttribute('data-target');
  const duration = 1200;
  const startTime = performance.now();
  function update(now){
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value;
    if(progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function observeCounters(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !countersStarted){
        counters.forEach(runCounter);
        countersStarted = true;
        observer.disconnect();
      }
    });
  }, { threshold: .4 });
  counters.forEach(c => observer.observe(c));
}
observeCounters();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .plan, .feature-card, .metric, .step, .c-card');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .15 });
revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Contact form (dummy)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks! Your message has been sent. We will contact you shortly.');
  contactForm.reset();
});

// ===== Mobile compatibility enhancements (non-breaking) =====

// Close menu when a nav link is clicked (mobile UX)
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('show');
    hamburger.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

// Toggle body scroll lock when opening mobile menu
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.contains('show');
  document.body.classList.toggle('menu-open', !isOpen);
});

// On resize to desktop, ensure menu is reset
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    navLinks.classList.remove('show');
    hamburger.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
});
