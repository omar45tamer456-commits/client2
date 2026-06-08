const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const navToggle = $('#nav-toggle');
const navLinks = $('#nav-menu');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

const sections = $$('section[id]');
const navItems = $$('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.4,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = $(`.nav-links a[href="#${id}"]`);
    if (entry.isIntersecting) {
      link?.classList.add('active');
    } else {
      link?.classList.remove('active');
    }
  });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

const form = $('#contact-form');
const status = $('#form-status');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const message = $('#message').value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields.';
    status.style.color = '#ff6b6b';
    return;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    status.textContent = 'Enter a valid email address.';
    status.style.color = '#ff6b6b';
    return;
  }

  status.textContent = 'Sending…';
  status.style.color = getComputedStyle(document.documentElement)
                         .getPropertyValue('--color-accent')
                         .trim();
  setTimeout(() => {
    status.textContent = 'Message sent! I’ll get back to you shortly.';
    status.style.color = '#4caf50';
    form.reset();
  }, 1200);
});

/* ---------------------------------------------------------
   Close mobile menu on link click (optional UX)
---------------------------------------------------------- */
navLinks?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
  }
});
