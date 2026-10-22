import './style.css';

// Native anchors preserve URL fragments and browser history.
// CSS scrolling respects the visitor's reduced-motion setting.
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mobile = window.matchMedia('(max-width: 650px)');

if (toggle && nav) {
  toggle.hidden = false;
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !mobile.matches) return;
    setOpen(false);
    const section = document.getElementById(link.hash.slice(1));
    if (section) {
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  mobile.addEventListener('change', () => setOpen(false));
}
