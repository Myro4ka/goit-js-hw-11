import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { refs } from './refs';
import { getImages } from './api';
import { galleryMarkup } from './markup';

export let pageCounter = 1;
export let perPage = 40;
let pagesCount = 1;
let inputValue = '';

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formInput.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);
window.addEventListener('scroll', debounce(onScroll, 300));

function onInput(e) {
  inputValue = e.target.value.trim();
  if (inputValue) {
    refs.formBtn.removeAttribute('disabled');
  } else {
    refs.formBtn.setAttribute('disabled', 'disabled');
  }
}

function onSubmit(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  getImages(inputValue)
    .then(res => {
      const { hits, totalHits } = res.data;
      pagesCount = Math.ceil(totalHits / perPage);
      if (hits.length === 0) {
        refs.gallery.innerHTML = '';
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(hits));
      lightBox.refresh();
    })
    .catch(error => {
      throw new Error(error);
    });
}

function loadMoreHandler() {
  pageCounter++;

  getImages(inputValue).then(res => {
    const { hits } = res.data;
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(hits));
    lightBox.refresh();
    if (pagesCount === pageCounter) {
      return Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  });
}

function onScroll() {
  let clientViewportHeight = document.querySelector('body').clientHeight;
  let position = clientViewportHeight - window.scrollY;
  if (
    position - window.innerHeight <= clientViewportHeight * 0.1 &&
    pageCounter < pagesCount
  ) {
    loadMoreHandler(pageCounter);
  }
}
