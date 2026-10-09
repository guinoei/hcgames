// Gallery images — swap the `src` values for hosted URLs later, or add more entries.
// Placeholder images are generated on the fly (placehold.co), no local files needed.
const galleryImages = [
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_1_a0kxaf.jpg', alt: 'Serviço 1' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_2_kwjzz5.jpg', alt: 'Serviço 2' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_3_vtouax.jpg', alt: 'Serviço 3' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_4_cdewpg.jpg', alt: 'Serviço 4' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_5_geqvts.jpg', alt: 'Serviço 5' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_6_jhlqea.jpg', alt: 'Serviço 6' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_7_vrjqhi.jpg', alt: 'Serviço 7' },
];

const AUTOPLAY_MS = 5000;

const crtTrack = document.getElementById('crtTrack');
const crtDots = document.getElementById('crtDots');
const crtPrev = document.getElementById('crtPrev');
const crtNext = document.getElementById('crtNext');

let currentSlide = 0;
let autoplayTimer = null;

function renderGallery() {
  crtTrack.innerHTML = galleryImages
    .map((img) => `
      <div class="crt-slide">
        <img src="${img.src}" alt="${img.alt}" loading="lazy" />
      </div>
    `)
    .join('');

  crtDots.innerHTML = galleryImages
    .map(
      (img, i) => `
      <button type="button" class="crt-thumb" data-index="${i}" aria-label="Ir para ${img.alt}">
        <img src="${img.src}" alt="" loading="lazy" />
        <span class="crt-thumb-ch">${String(i + 1).padStart(2, '0')}</span>
      </button>
    `
    )
    .join('');

  crtDots.querySelectorAll('.crt-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => goToSlide(Number(thumb.dataset.index)));
  });
}

function updateGallery() {
  crtTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  crtDots.querySelectorAll('.crt-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === currentSlide);
    thumb.setAttribute('aria-current', i === currentSlide ? 'true' : 'false');
  });
}

function goToSlide(index) {
  currentSlide = (index + galleryImages.length) % galleryImages.length;
  updateGallery();
  restartAutoplay();
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), AUTOPLAY_MS);
}

if (crtTrack && galleryImages.length) {
  renderGallery();
  updateGallery();
  restartAutoplay();

  crtPrev?.addEventListener('click', () => goToSlide(currentSlide - 1));
  crtNext?.addEventListener('click', () => goToSlide(currentSlide + 1));
}
