export const galleryMarkup = data => {
  return data
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a href='${largeImageURL}' class='gallery__link'>
    <img class='gallery__image' src='${webformatURL}' alt='${tags}' loading='lazy' />
    <div class='info'>
      <p class='info-item likes'>${likes}</p>
      <p class='info-item views'>${views}</p>
      <p class='info-item comments'>${comments}</p>
      <p class='info-item downloads'>${downloads}</p>
    </div>
    </a>`
    )
    .join('');
};
