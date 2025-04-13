import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');

const loadBtn = document.querySelector('.btn-load');

form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', onLoadMore);

let page;
let query = '';

async function handleSubmit(event) {
    event.preventDefault();
    showLoader();
    let query = form.elements["search-text"].value.trim();
    if (!form.elements["search-text"].value) {
        return;
    }
    
    clearGallery();

    try {
        page = 1;
        const response = await getImagesByQuery(query, page);
        const hits = response.hits;

        if (hits.length === 0) {
            throw new Error('Sorry, there are no images matching your search query. Please try again!');
        }
        createGallery(hits);

        if (hits.length < response.totalHits) {
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
    page++;
    try {
        const data = await getImagesByQuery(query, page);
        let lengthArr = 15 * page;
        createGallery(data.hits);
        if (lengthArr >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            })
        }

        const card = document.querySelector('li');
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth"
        });
    }
    catch (error) {
        iziToast.error({
                message: error.message,
                position: "topRight",
            });
    }
    finally {
        hideLoader();
        showLoadMoreButton();
    }
};