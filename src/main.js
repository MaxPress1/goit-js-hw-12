import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    showLoader();

    if (!form.elements["search-text"].value) {
        return;
    }
    const query = form.elements["search-text"].value.trim();

    clearGallery();

    getImagesByQuery(query)
    .then((response) => {
            const hits = response.data.hits;
            if (hits.length === 0) {
                throw new Error('Sorry, there are no images matching your search query. Please try again!');
            }
            createGallery(hits);
        }
        )
        .catch(error => {
            iziToast.error({
                message: error.message,
                position: "topRight",
            });
        })
        .finally(() => hideLoader()
        );
};