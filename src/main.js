import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
let totalHits = 0;
let loadedImages = 0;

// --- Search handler ---
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.target.elements["search-text"].value.trim();

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search term!",
    });
    return;
  }

  clearGallery();
  page = 1;
  loadedImages = 0;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);


    requestAnimationFrame(() => {
      hideLoader();
    });

    if (data.hits.length === 0) {
      iziToast.info({
        title: "Info",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
        backgroundColor: "#f44336",
        titleColor: "#ffffff",
        messageColor: "#ffffff",
        timeout: 5000,
        progressBar: false,
        close: false,
        class: "custom-error-toast",
      });
      return;
    }

    totalHits = data.totalHits;
    loadedImages += data.hits.length;

    if (loadedImages < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: "Error",
      message: "Something went wrong: " + error.message,
    });
  }
});


loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);


    requestAnimationFrame(() => {
      hideLoader();
    });

    loadedImages += data.hits.length;


    const items = document.querySelectorAll(".gallery-item");
    const lastItem = items[items.length - 1];
    lastItem.scrollIntoView({ behavior: "smooth", block: "end" });

    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
        backgroundColor: "#4e75ff",
        titleColor: "#ffffff",
        messageColor: "#ffffff",
        timeout: 4000,
        progressBar: true,
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: "Error",
      message: "Something went wrong: " + error.message,
    });
  }
});
