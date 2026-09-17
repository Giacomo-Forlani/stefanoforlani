const root = document.documentElement;
root.dataset.ready = 'true';

/* Header compatto e CTA mobile allo scroll */
const header = document.querySelector<HTMLElement>('[data-header]');
const mobileCta = document.querySelector<HTMLElement>('[data-mobile-cta]');

const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 18);
  mobileCta?.classList.toggle('is-visible', y > 520);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Menu mobile */
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

const background = document.querySelectorAll<HTMLElement>('main, footer, .skip-link, [data-mobile-cta]');

const setMenu = (open: boolean) => {
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
  menu?.classList.toggle('is-open', open);
  // backdrop-filter dell'header scrollato confinerebbe il menu fixed: si disattiva a menu aperto
  header?.classList.toggle('nav-open', open);
  document.body.classList.toggle('menu-open', open);
  // Con il menu aperto il resto della pagina non è raggiungibile (tastiera e screen reader)
  for (const el of background) el.inert = open;
};

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});

window.matchMedia('(min-width: 1001px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

/*
  Link alle sedi: su mobile si apre l'app di mappe del dispositivo.
  Android: URI geo: (l'utente sceglie l'app). iOS/iPadOS: link Apple Maps,
  che il sistema gira all'app di navigazione predefinita. Altrove resta il
  link alla scheda Google Maps in una nuova scheda.
*/
const isAndroid = /Android/i.test(navigator.userAgent);
const isIOS =
  /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

if (isAndroid || isIOS) {
  document.querySelectorAll<HTMLAnchorElement>('[data-map-link]').forEach((link) => {
    const query = encodeURIComponent(link.dataset.mapQuery ?? '');
    if (!query) return;
    link.href = isAndroid ? `geo:0,0?q=${query}` : `https://maps.apple.com/?q=${query}`;
    link.removeAttribute('target');
    link.querySelector('[data-new-tab]')?.remove();
  });
}

/* Informativa privacy nel footer: si apre quando si segue un link #privacy */
const privacy = document.querySelector<HTMLDetailsElement>('[data-privacy]');
const openPrivacy = () => {
  if (privacy && location.hash === `#${privacy.id}`) privacy.open = true;
};
openPrivacy();
window.addEventListener('hashchange', openPrivacy);
document.querySelectorAll<HTMLAnchorElement>('a[href="#privacy"]').forEach((link) =>
  link.addEventListener('click', () => {
    if (privacy) privacy.open = true;
  }),
);

/* Animazioni d'ingresso */
const items = document.querySelectorAll<HTMLElement>('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  items.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px' },
  );
  items.forEach((item) => observer.observe(item));
}
