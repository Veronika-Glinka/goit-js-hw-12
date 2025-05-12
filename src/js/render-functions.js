import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

Object.assign(galleryEl.style, {
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: '24px',
});

galleryEl.addEventListener('click', handleLinkClick);

function handleLinkClick(e) {
  if (!e.target.closest('.gallery-link')) {
    return;
  }
  e.preventDefault();
}

function imageTemplate(image) {
  const tags = image.tags.split(',').slice(0, 3).join(', ');

  return `<li class="gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}">
      <img class="gallery-image" src="${image.webformatURL}" alt="${tags}" />
    </a>
    <div class="image-info">
      <p><b>Likes:</b> ${image.likes}</p>
      <p><b>Views:</b> ${image.views}</p>
      <p><b>Comments:</b> ${image.comments}</p>
      <p><b>Downloads:</b> ${image.downloads}</p>
      <p><b>Categories:</b> ${tags}</p> <!-- Виводимо тільки перші три категорії -->
    </div>
  </li>`;
}

function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}

function createGallery(images) {
  const markup = imagesTemplate(images);
  galleryEl.innerHTML = markup;

  if (images.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
  lightbox.refresh();
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

function showLoader() {
  loader.classList.add('loader-show');
}

function hideLoader() {
  loader.classList.remove('loader-show');
}

export { createGallery, clearGallery, showLoader, hideLoader };
