const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    root.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const techs = card.dataset.tech.split(',');
      const matches = filter === 'todos' || techs.includes(filter);
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalProblem = document.getElementById('modal-problem');
const modalTech = document.getElementById('modal-tech');
const modalRepo = document.getElementById('modal-repo');
const modalDemo = document.getElementById('modal-demo');
const modalClose = document.getElementById('modal-close');
let lastFocusedElement = null;

function openModal(card) {
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = card.dataset.title;
  modalDesc.textContent = card.dataset.desc;
  modalProblem.textContent = card.dataset.problem;
  modalTech.textContent = card.dataset.techLabel;

  const repo = card.dataset.repo;
  const demo = card.dataset.demo;
  modalRepo.href = repo || '#';
  modalRepo.style.display = repo ? 'inline-flex' : 'none';
  modalDemo.href = demo || '#';
  modalDemo.style.display = demo ? 'inline-flex' : 'none';

  modalOverlay.hidden = false;
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

projectCards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card);
    }
  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
});

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const validators = {
  name: value => value.trim().length >= 2 || 'Ingresa tu nombre (mínimo 2 caracteres).',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Ingresa un correo electrónico válido.',
  message: value => value.trim().length >= 10 || 'Cuéntame un poco más (mínimo 10 caracteres).'
};

function validateField(input) {
  const field = input.closest('.field');
  const error = field.querySelector('.field-error');
  const result = validators[input.name](input.value);

  if (result === true) {
    field.classList.remove('has-error');
    error.textContent = '';
    return true;
  } else {
    field.classList.add('has-error');
    error.textContent = result;
    return false;
  }
}

['name', 'email', 'message'].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('blur', () => validateField(input));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const inputs = ['name', 'email', 'message'].map(id => document.getElementById(id));
  const allValid = inputs.map(validateField).every(Boolean);

  if (allValid) {
    formStatus.textContent = `¡Gracias, ${inputs[0].value.trim()}! Tu mensaje quedó registrado (demo sin backend).`;
    form.reset();
  } else {
    formStatus.textContent = 'Revisa los campos marcados antes de enviar.';
  }
});

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 500 ? 'flex' : 'none';
}, { passive: true });
backToTop.style.display = 'none';

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
