import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');
const endOfCollectionMessage = document.querySelector('.end-of-collection');

// Початкове приховування
loadMoreBtn.style.display = 'none';
endOfCollectionMessage.style.display = 'none';

Object.assign(galleryEl.style, {
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: '24px',
});

// ✅ ІНСТАНЦІЮЄМО lightbox ОДИН РАЗ
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

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
      <p><b>Categories:</b> ${tags}</p>
    </div>
  </li>`;
}

function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}

function createGallery(images, totalHits) {
  const markup = imagesTemplate(images);
  galleryEl.insertAdjacentHTML('beforeend', markup);
  smoothScrollToNewImages();

  console.log('Gallery children:', galleryEl.children.length);
  console.log('Total hits:', totalHits);
  console.log('Show end message:', galleryEl.children.length >= totalHits);

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

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'inline-block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function showEndOfCollectionMessage() {
  endOfCollectionMessage.style.display = 'block'; // block для <p>
}

function hideEndOfCollectionMessage() {
  endOfCollectionMessage.style.display = 'none';
}

function smoothScrollToNewImages() {
  const galleryItem = galleryEl.querySelector('.gallery-item');
  if (!galleryItem) return;

  const itemHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: itemHeight * 2,
    behavior: 'smooth',
  });
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndOfCollectionMessage,
  hideEndOfCollectionMessage,
  smoothScrollToNewImages,
};
