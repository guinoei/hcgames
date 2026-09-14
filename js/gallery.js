// Gallery images — swap the `src` values for hosted URLs later, or add more entries.
// Placeholder images are generated on the fly (placehold.co), no local files needed.
const galleryImages = [
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_1_a0kxaf.jpg', alt: 'Serviço 1' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_2_kwjzz5.jpg', alt: 'Serviço 2' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_3_vtouax.jpg', alt: 'Serviço 3' },
  { src: 'https://res.cloudinary.com/dmcsf10tz/image/upload/v1789400216/hcgames/service_4_cdewpg.jpg', alt: 'Serviço 4' },
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
    .map((_, i) => `<button type="button" class="crt-dot" data-index="${i}">${String(i + 1).padStart(2, '0')}</button>`)
    .join('');

  crtDots.querySelectorAll('.crt-dot').forEach((dot) => {
    dot.addEventListener('click', () => goToSlide(Number(dot.dataset.index)));
  });
}

function updateGallery() {
  crtTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  crtDots.querySelectorAll('.crt-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
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
