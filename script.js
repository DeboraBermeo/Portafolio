
// --- Menú responsive ---
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
 
// --- Botón volver arriba ---
const backToTop = document.getElementById('back-to-top');
 
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 500 ? 'flex' : 'none';
}, { passive: true });
backToTop.style.display = 'none';
 
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});