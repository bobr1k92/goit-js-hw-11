import PictureApiSevice from './js/api-service';
import LoadMoreBtn from './js/loadMoreBtn'
import {Notify} from 'notiflix';
import simpleLightbox from 'simplelightbox';



const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery')
}

const pictureAPI = new PictureApiSevice();
const loadMoreBtn = new LoadMoreBtn('load-more', onLoadMore);

refs.searchForm.addEventListener('submit', onSearch);



async function onSearch(e) {
    e.preventDefault();

    pictureAPI.query = e.currentTarget.elements.searchQuery.value.trim();
    if (pictureAPI.query === '') {
      Notify.warning('Введіть що небудь');
    }
    pictureAPI.resetPage();
  try {
    const {hits, totalHits} = await pictureAPI.fetchAPI();
    renderPictures(hits, totalHits)
  } catch (error) {
    Notify.failure("Винекла помилка");
  }
};


function renderPictures(hits) {
const images = hits.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
}) => {
    return `<div class="photo-card">
    <img src="${ webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: </b>${likes}
      </p>
      <p class="info-item">
        <b>Views: </b>${views}
      </p>
      <p class="info-item">
        <b>Comments: </b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads: </b>${downloads}
      </p>
    </div>
  </div>`
}).join('');

refs.galleryContainer.insertAdjacentHTML('beforeend', images);
}

async function onLoadMore() {
  try {
    const {hits, totalHits} = await pictureAPI.fetchAPI();
    renderPictures(hits, totalHits)
  } catch (error) {
    Notify.failure("Винекла помилка");
  }
 }