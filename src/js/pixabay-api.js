// js/pixabay-api.js
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '50239307-4265dc0f1525b6f9dda79b82a';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15, // Встановлюємо кількість зображень на сторінку
      },
    });

    const { hits } = response.data;
    return hits;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images.',
      position: 'topRight',
    });
    return [];
  }
}
