export default class NewsApiService {
    constructor() {
    this.searchQuery = '';
    this.page = 1;
    }

    fetchArticles() {
        console.log(this);
        const options = {
            headers: {
                Authorization: 'b5f9a10038a94cda93723e0a1eeb5c6e',
            },
        }
        const url =
             `https://newsapi.org/v2/everything?q=${this.searchQuery}&language=en&pageSize=5&${this.page}`;
             
     return fetch(url, options)
    .then(res => res.json())
    .then(data => {
        this.incrementPage();

        return data.articles;
      });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
          return this.searchQuery;  
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}