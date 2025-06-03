import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndOfCollectionMessage,
  hideEndOfCollectionMessage,
} from './js/render-functions';

let currentPage = 1;
let query = '';
let totalImagesLoaded = 0;
let totalHitsFromServer = 0;

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loadingText = document.querySelector('.loading-text');

form.addEventListener('submit', handleSearchSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

function showLoadingMessage() {
  loadMoreBtn.style.display = 'none';
  loadingText.style.display = 'block';
}

function hideLoadingMessage() {
  loadingText.style.display = 'none';
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  query = searchInput.value.trim();
  if (!query) return;

  currentPage = 1;
  totalImagesLoaded = 0;
  totalHitsFromServer = 0;

  clearGallery();
  hideLoadMoreButton();
  hideEndOfCollectionMessage();
  showLoadingMessage();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, currentPage);
    hideLoadingMessage();

    totalImagesLoaded = hits.length;
    totalHitsFromServer = totalHits;

    if (hits.length === 0) {
      iziToast.error({
        message: 'No images found for this query!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
    if (totalImagesLoaded >= totalHitsFromServer) {
      showEndOfCollectionMessage();
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoadingMessage();
    iziToast.error({
      message: 'Error fetching images.',
      position: 'topRight',
    });
  }
}

async function handleLoadMore() {
  currentPage++;
  showLoadingMessage();

  try {
    const { hits } = await getImagesByQuery(query, currentPage);
    hideLoadingMessage();

    totalImagesLoaded += hits.length;
    createGallery(hits);

    if (totalImagesLoaded >= totalHitsFromServer) {
      showEndOfCollectionMessage();
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoadingMessage();
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
  }
}
