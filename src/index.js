import PictureApiSevice from './js/api-service';
import LoadMoreBtn from './js/loadMoreBtn'
import {Notify} from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery')
}

refs.searchForm.addEventListener('submit', onSearch);

const pictureAPI = new PictureApiSevice();
const loadMoreBtn = new LoadMoreBtn('load-more', onLoadMore);
const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});



async function onSearch(e) {
    e.preventDefault();

    pictureAPI.query = e.currentTarget.elements.searchQuery.value.trim();
    if (pictureAPI.query === '') {
      Notify.warning('Enter something');
      return; 
    }
    pictureAPI.resetPage();
  try {
    const {hits, totalHits} = await pictureAPI.fetchAPI();
    if(hits.length === 0){
      Notify.warning("Sorry, there are no images matching your search query. Please try again.")
      refs.galleryContainer.innerHTML = ''
      loadMoreBtn.hide();
      return;
    }
    Notify.success(`"Hooray! We found ${totalHits} images."`)
    renderPictures(hits, totalHits);
    simpleLightBox.refresh();
    loadMoreBtn.show()
  } catch (error) {
    Notify.error("Something is wrong");
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
    <a href="${largeImageURL}"><img src="${ webformatURL}" alt="${tags}" loading="lazy" /></a>
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
};



async function onLoadMore() {
  loadMoreBtn.loading()
  try {
    const {hits, totalHits} = await pictureAPI.fetchAPI();
    renderPictures(hits, totalHits);
    simpleLightBox.refresh();
    loadMoreBtn.endloading();
    if (hits.length < 40) {
      loadMoreBtn.hide();
      Notify.info("We're sorry, but you've reached the end of search results.")
      return; 
    }
  } catch (error) {
    Notify.failure("Sorry, there was an Error");
  }
 }