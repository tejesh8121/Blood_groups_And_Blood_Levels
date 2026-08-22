/* ============================================
   Gallery: filtering and lightbox
   ============================================ */

const GALLERY_ITEMS = [
  { id: 1, cat: 'cells',    title: 'Red Blood Cells',     svg: 'rbc' },
  { id: 2, cat: 'cells',    title: 'White Blood Cells',   svg: 'wbc' },
  { id: 3, cat: 'cells',    title: 'Platelets',           svg: 'platelet' },
  { id: 4, cat: 'cells',    title: 'Plasma',              svg: 'plasma' },
  { id: 5, cat: 'groups',   title: 'Type A',              svg: 'typeA' },
  { id: 6, cat: 'groups',   title: 'Type B',              svg: 'typeB' },
  { id: 7, cat: 'groups',   title: 'Type AB',             svg: 'typeAB' },
  { id: 8, cat: 'groups',   title: 'Type O',              svg: 'typeO' },
  { id: 9, cat: 'awareness', title: 'Donate Blood',        svg: 'donate' },
  { id: 10, cat: 'awareness', title: 'Save Lives',          svg: 'heart' },
  { id: 11, cat: 'awareness', title: 'Blood Drive',         svg: 'drive' },
  { id: 12, cat: 'gallery',  title: 'Blood Drop',          svg: 'drop' },
  { id: 13, cat: 'gallery',  title: 'Laboratory',          svg: 'lab' },
  { id: 14, cat: 'gallery',  title: 'Blood Bag',           svg: 'bag' },
  { id: 15, cat: 'gallery',  title: 'Hospital',            svg: 'hospital' },
  { id: 16, cat: 'gallery',  title: 'Research',            svg: 'research' },
];

/* SVG library for gallery items */
const SVG_LIB = {
  rbc: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="42" ry="28" fill="#e11d48" opacity="0.85"/><ellipse cx="50" cy="50" rx="30" ry="18" fill="#fecdd3" opacity="0.6"/><ellipse cx="50" cy="50" rx="15" ry="9" fill="#fff1f2" opacity="0.7"/></svg>`,
  wbc: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="38" fill="#3b82f6" opacity="0.85"/><circle cx="50" cy="50" r="24" fill="#dbeafe" opacity="0.7"/><circle cx="50" cy="50" r="12" fill="#1e293b" opacity="0.5"/></svg>`,
  platelet: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,20 65,45 80,35 70,60 85,75 55,70 50,90 45,70 15,75 30,60 20,35 35,45" fill="#f59e0b" opacity="0.85"/><circle cx="50" cy="55" r="10" fill="#fef3c7" opacity="0.7"/></svg>`,
  plasma: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C30 35 20 50 20 65 C20 80 33 90 50 90 C67 90 80 80 80 65 C80 50 70 35 50 10Z" fill="#fbbf24" opacity="0.8"/><circle cx="40" cy="60" r="4" fill="#e11d48" opacity="0.6"/><circle cx="58" cy="55" r="3" fill="#3b82f6" opacity="0.6"/><circle cx="50" cy="70" r="3" fill="#fff" opacity="0.5"/></svg>`,
  typeA: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C30 35 20 50 20 65 C20 80 33 90 50 90 C67 90 80 80 80 65 C80 50 70 35 50 10Z" fill="#e11d48"/><text x="50" y="68" text-anchor="middle" font-size="28" font-weight="bold" fill="#fff">A</text></svg>`,
  typeB: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C30 35 20 50 20 65 C20 80 33 90 50 90 C67 90 80 80 80 65 C80 50 70 35 50 10Z" fill="#e11d48"/><text x="50" y="68" text-anchor="middle" font-size="28" font-weight="bold" fill="#fff">B</text></svg>`,
  typeAB: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C30 35 20 50 20 65 C20 80 33 90 50 90 C67 90 80 80 80 65 C80 50 70 35 50 10Z" fill="#e11d48"/><text x="50" y="68" text-anchor="middle" font-size="20" font-weight="bold" fill="#fff">AB</text></svg>`,
  typeO: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C30 35 20 50 20 65 C20 80 33 90 50 90 C67 90 80 80 80 65 C80 50 70 35 50 10Z" fill="#e11d48"/><text x="50" y="68" text-anchor="middle" font-size="28" font-weight="bold" fill="#fff">O</text></svg>`,
  donate: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 15 C35 35 28 48 28 60 C28 73 38 82 50 82 C62 82 72 73 72 60 C72 48 65 35 50 15Z" fill="#e11d48"/><rect x="42" y="55" width="16" height="25" rx="3" fill="#fff" opacity="0.9"/><path d="M50 45 L50 58" stroke="#fff" stroke-width="3" opacity="0.9"/></svg>`,
  heart: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 85 C20 65 10 45 15 30 C20 15 38 15 50 35 C62 15 80 15 85 30 C90 45 80 65 50 85Z" fill="#e11d48"/><path d="M50 60 L50 40 M42 50 L50 40 L58 50" stroke="#fff" stroke-width="3" fill="none" opacity="0.8"/></svg>`,
  drive: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="30" width="60" height="50" rx="6" fill="#3b82f6" opacity="0.85"/><rect x="30" y="15" width="40" height="20" rx="4" fill="#1e40af"/><path d="M50 25 C40 40 35 48 35 58 C35 68 42 75 50 75 C58 75 65 68 65 58 C65 48 60 40 50 25Z" fill="#e11d48"/><rect x="15" y="78" width="70" height="6" rx="3" fill="#94a3b8"/></svg>`,
  drop: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C30 35 20 50 20 65 C20 80 33 90 50 90 C67 90 80 80 80 65 C80 50 70 35 50 10Z" fill="#e11d48"/><ellipse cx="42" cy="55" rx="8" ry="5" fill="#fff" opacity="0.4"/></svg>`,
  lab: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M40 15 L40 45 L25 80 C22 88 28 90 35 90 L65 90 C72 90 78 88 75 80 L60 45 L60 15Z" fill="none" stroke="#3b82f6" stroke-width="3"/><path d="M28 65 L72 65" stroke="#3b82f6" stroke-width="3"/><circle cx="45" cy="75" r="4" fill="#e11d48"/><circle cx="58" cy="72" r="3" fill="#f59e0b"/><rect x="38" y="10" width="24" height="6" rx="2" fill="#3b82f6"/></svg>`,
  bag: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="20" width="40" height="60" rx="6" fill="#e11d48" opacity="0.85"/><rect x="30" y="20" width="40" height="25" rx="6" fill="#fecdd3" opacity="0.5"/><rect x="42" y="10" width="16" height="12" fill="#94a3b8"/><rect x="38" y="78" width="24" height="5" rx="2" fill="#94a3b8"/><line x1="50" y1="83" x2="50" y2="92" stroke="#94a3b8" stroke-width="2"/></svg>`,
  hospital: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="30" width="70" height="60" rx="4" fill="#3b82f6" opacity="0.85"/><rect x="40" y="15" width="20" height="15" fill="#1e40af"/><path d="M50 40 L50 60 M40 50 L60 50" stroke="#fff" stroke-width="4"/><rect x="25" y="65" width="15" height="20" fill="#fff" opacity="0.6"/><rect x="60" y="65" width="15" height="20" fill="#fff" opacity="0.6"/></svg>`,
  research: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="45" cy="45" r="28" fill="none" stroke="#3b82f6" stroke-width="3"/><path d="M65 65 L85 85" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/><path d="M35 50 L42 45 L50 55 L58 40" stroke="#e11d48" stroke-width="3" fill="none"/><circle cx="35" cy="50" r="3" fill="#e11d48"/><circle cx="42" cy="45" r="3" fill="#f59e0b"/><circle cx="50" cy="55" r="3" fill="#10b981"/><circle cx="58" cy="40" r="3" fill="#e11d48"/></svg>`,
};

function renderGallery() {
  const grid = document.querySelector('#galleryGrid');
  if (!grid) return;

  grid.innerHTML = GALLERY_ITEMS.map(
    (item) => `
    <div class="gallery-item reveal-scale" data-cat="${item.cat}" data-id="${item.id}">
      ${SVG_LIB[item.svg] || SVG_LIB.drop}
      <div class="gallery-overlay"><span>${item.title}</span></div>
    </div>`
  ).join('');

  grid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => openLightbox(item.getAttribute('data-id')));
  });

  initScrollRevealGallery();
}

function initScrollRevealGallery() {
  const elements = document.querySelectorAll('.gallery-item.reveal-scale');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  elements.forEach((el) => observer.observe(el));
}

function initGalleryFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      items.forEach((item) => {
        if (filter === 'all' || item.getAttribute('data-cat') === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'scaleIn 0.4s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

function openLightbox(id) {
  const lightbox = document.querySelector('#lightbox');
  if (!lightbox) return;
  const item = GALLERY_ITEMS.find((i) => i.id === parseInt(id, 10));
  if (!item) return;

  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close">&times;</button>
      ${SVG_LIB[item.svg] || SVG_LIB.drop}
      <h3>${item.title}</h3>
      <p>Category: ${item.cat.charAt(0).toUpperCase() + item.cat.slice(1)}</p>
    </div>
  `;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

function closeLightbox() {
  const lightbox = document.querySelector('#lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.innerHTML = '';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initGalleryFilter();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
