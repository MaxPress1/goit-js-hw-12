import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryList = document.querySelector('.gallery');

const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    overlayOpacity: 0.8,
});

export function createGallery(images) {
    const markup = images.map(image => `
    <li class = "gallery-item">
            <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}"/>
            </a>
            <div class="gallery-info">
            <p><span>Likes</span>${image.likes} </p>
            <p><span>Views</span>${image.views}</p>
            <p><span>Comments</span>${image.comments}</p>
            <p><span>Downloads</span>${image.downloads}</p>
            </div>
    </li>
    `).join("");

    galleryList.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();
};

export function clearGallery() {
    const galleryContainer = document.querySelector(".gallery");
    if (galleryContainer) {
        galleryContainer.innerHTML = "";
    }
};

export function showLoader() {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.classList.remove("hidden");
    }
};


export function hideLoader() {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.classList.add("hidden");
    }
};

export function showLoadMoreButton() {
    const btnLoadMore = document.querySelector('.btn-load');
    if (btnLoadMore) {
        btnLoadMore.classList.remove("hidden");
    }
};

export function hideLoadMoreButton() {
    const btnLoadMore = document.querySelector('.btn-load');
    if (btnLoadMore) {
        btnLoadMore.classList.add("hidden");
    }
};