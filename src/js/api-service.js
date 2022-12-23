import axios from "axios";

const API_KEY = '32277249-d7139627b7e0a08a8752d2e83';
axios.defaults.baseURL = 'https://pixabay.com/api/'

export default class PictureApiSevice {
    constructor() {
    this.searchQuery = '';
    this.page = 1;
    }

    async fetchAPI() {
        const options = new URLSearchParams({
            key: API_KEY,
            page: this.page,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 40,
            
        });
        const { data } = await axios(`?${options}`);
        this.incrementPage()
        return data;
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