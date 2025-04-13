import axios from 'axios';

const API_KEY = '49649405-8aeb588384e19e05040c9b75c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
    try {
        const response = await axios({
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
