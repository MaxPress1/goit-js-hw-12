import axios from 'axios';

const API_KEY = '49649405-8aeb588384e19e05040c9b75c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {

    return axios({
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true'
        }
    })

};