const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const filterButtons = document.querySelectorAll('.filter-button');
const galleryTiles = document.querySelectorAll('.gallery-grid .gallery-tile');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  galleryTiles.forEach(tile => {
    tile.style.display = filter === 'all' || tile.dataset.category === filter ? '' : 'none';
  });
}));

const studioPhoto = document.querySelector('#studioPhoto');
const studioPreviewImage = document.querySelector('#studioPreviewImage');
const previewPlaceholder = document.querySelector('#previewPlaceholder');
const captionInput = document.querySelector('#studioCaption');
const captionPreview = document.querySelector('#captionPreview');
const previewPrint = document.querySelector('#previewPrint');
let previewUrl = null;
studioPhoto.addEventListener('change', () => {
  const photo = studioPhoto.files[0];
  if (!photo) return;
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = URL.createObjectURL(photo);
  studioPreviewImage.src = previewUrl;
  studioPreviewImage.hidden = false;
  previewPlaceholder.hidden = true;
});
captionInput.addEventListener('input', () => {
  captionPreview.textContent = captionInput.value.trim() || 'A little moment I love';
});
document.querySelectorAll('input[name="frameStyle"]').forEach(radio => radio.addEventListener('change', () => {
  if (radio.checked) previewPrint.dataset.theme = radio.value;
}));
document.querySelector('#usePreview').addEventListener('click', () => {
  const caption = captionInput.value.trim() || 'A little moment I love';
  const mood = document.querySelector('input[name="frameStyle"]:checked').value;
  const subject = encodeURIComponent('A keepsake idea for Artistry Coded');
  const body = encodeURIComponent(`Hello Artistry Coded,\n\nI tried the preview studio.\nCaption idea: ${caption}\nColour mood: ${mood}\n\nI would love to talk about this idea.`);
  window.location.href = `mailto:artistry.coded@gmail.com?subject=${subject}&body=${body}`;
});

const compareSlider = document.querySelector('#compareSlider');
const compareRange = document.querySelector('.slider-range');
compareRange.addEventListener('input', () => {
  compareSlider.style.setProperty('--split', `${compareRange.value}%`);
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.section-heading, .product-card, .steps article, .gallery-tile, .faq-list details').forEach(el => {
  el.classList.add('reveal'); observer.observe(el);
});
