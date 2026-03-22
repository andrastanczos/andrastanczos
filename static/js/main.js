// ── Sidebar ──
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('visible');
}

// ── Lightbox ──
let currentImages = [];
let currentIndex = 0;

function initLightbox() {
  document.querySelectorAll('.series-image').forEach(fig => {
    fig.addEventListener('click', () => {
      const container = fig.closest('.entry-body') || fig.parentElement;
      currentImages = Array.from(container.querySelectorAll('.series-image'));
      currentIndex = currentImages.indexOf(fig);
      openLightbox();
    });
  });
}

function openLightbox() {
  const fig = currentImages[currentIndex];
  if (!fig) return;

  const lb = document.getElementById('lightbox');
  const wrap = document.getElementById('lightboxImgWrap');
  const exifEl = document.getElementById('lightboxExif');
  const captionEl = document.getElementById('lightboxCaption');

  const imgSource = fig.querySelector('img');
  if (imgSource) {
    const clone = imgSource.cloneNode(true);
    clone.style.cursor = 'default';
    clone.removeAttribute('loading');
    wrap.innerHTML = '';
    wrap.appendChild(clone);
  }

  // EXIF
  const exif = fig.dataset.exif;
  if (exif) {
    const parts = exif.split(' · ');
    exifEl.innerHTML = parts.map(p => `<span>${p}</span>`).join('');
    exifEl.style.display = 'flex';
  } else {
    exifEl.style.display = 'none';
  }

  // Caption
  const caption = fig.querySelector('figcaption');
  if (caption) {
    captionEl.textContent = caption.textContent;
    captionEl.style.display = 'block';
  } else {
    captionEl.style.display = 'none';
  }

  // Nav arrows
  document.querySelector('.lightbox-nav.prev').style.display = currentImages.length > 1 ? '' : 'none';
  document.querySelector('.lightbox-nav.next').style.display = currentImages.length > 1 ? '' : 'none';

  lb.style.display = 'flex';
  requestAnimationFrame(() => lb.classList.add('visible'));
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('visible');
  setTimeout(() => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

function navLightbox(dir) {
  currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
  openLightbox();
}

// Close on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget || e.target.classList.contains('lightbox-img-wrap')) {
    closeLightbox();
  }
});

// Keyboard
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (lb.style.display !== 'flex') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

// Init
document.addEventListener('DOMContentLoaded', initLightbox);
