import axios from 'axios';
import { pageCounter, perPage } from '../index';

const BASE_URL = 'https://pixabay.com/api/';
const USER_KEY = '32431010-caf7a3962f7fe8b7dd9329d8c';

export const getImages = value => {
  return axios.get(BASE_URL, {
    params: {
      key: USER_KEY,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageCounter,
      per_page: perPage,
    },
  });
};
