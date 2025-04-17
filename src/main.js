import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');
const loadBtn = document.querySelector('.btn-load');

form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', onLoadMore);

let pageNumber = 1;
let query = '';
let totalHits = 0;



async function handleSubmit(event) {
    event.preventDefault();
    query = form.elements["search-text"].value.trim();
    if (!query) {
        return;
    }    
    showLoader();
    clearGallery();

    try {
        pageNumber = 1;
        const response = await getImagesByQuery(query, pageNumber);
        const hits = response.hits;
        totalHits = response.totalHits;

        if (hits.length === 0) {
            throw new Error('Sorry, there are no images matching your search query. Please try again!');
        }
        createGallery(hits);

        if (hits.length < totalHits) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }

    }
    catch (error) {
        hideLoadMoreButton();
        iziToast.error({
            message: error.message,
            position: "topRight",
        });
    }
    finally {
        hideLoader();
    }
};


async function onLoadMore() {
    showLoader();
    hideLoadMoreButton();
    pageNumber++;

    try {
        const data = await getImagesByQuery(query, pageNumber);

        createGallery(data.hits);

        const totalLoaded = document.querySelectorAll('.gallery-item').length;
        
        if (totalLoaded >= totalHits) {
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
            hideLoadMoreButton();
        } else {
            showLoadMoreButton();
        }

        const newItems = document.querySelectorAll('.gallery-item');
        if (newItems.length > 0) {
            const lastItem = newItems[newItems.length - 15] || newItems[0]; // остання порція або fallback
            const itemTop = lastItem.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: itemTop,
                behavior: 'smooth'
            });
        }
    }
    catch (error) {
        iziToast.error({
                message: error.message,
                position: "topRight",
            });
    }
    finally {
        hideLoader();
    }
};

