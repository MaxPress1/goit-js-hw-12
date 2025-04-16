import axios from 'axios';

const API_KEY = '49649405-8aeb588384e19e05040c9b75c';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page,
                per_page: '15'
            }
        });
        return response.data;
        
    } catch (error) {
        return error.messege;
    }
};
