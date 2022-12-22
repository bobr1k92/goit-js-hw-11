import NewsApiSevice from './api-service';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
}

const newsApiService = new NewsApiSevice();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.query.value;
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(articles => console.log(articles));
}

function onLoadMore() {
    newsApiService.fetchArticles().then(articles => console.log(articles));
}