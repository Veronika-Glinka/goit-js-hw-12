// js/main.js
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

let currentPage = 1;
let query = '';

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', handleSearchSubmit);

loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearchSubmit(event) {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    iziToast.info({
      title: 'Input Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  // Оновлюємо глобальну змінну query і скидаємо сторінку
  query = searchQuery;
  currentPage = 1;

  clearGallery();
  showLoader();

  const images = await getImagesByQuery(query, currentPage);
  hideLoader();
  createGallery(images);

  // Сховуємо кнопку "Load more" після першого завантаження
  hideLoadMoreButton();
  showLoadMoreButton();
}

async function handleLoadMore() {
  currentPage += 1;
  showLoader();

  const images = await getImagesByQuery(query, currentPage);
  hideLoader();
  createGallery(images);

  // Якщо зображення більше немає, ховаємо кнопку
  if (images.length === 0) {
    hideLoadMoreButton();
  }
}
