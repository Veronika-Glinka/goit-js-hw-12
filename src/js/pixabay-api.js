// js/pixabay-api.js
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '50239307-4265dc0f1525b6f9dda79b82a';

export function getImagesByQuery(query) {
  return axios
    .get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      const { hits } = response.data;
      return hits;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images.',
        position: 'topRight',
      });
      return [];
    });
}
