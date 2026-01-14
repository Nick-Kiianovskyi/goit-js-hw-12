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
    hideLoader();

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

    createGallery(data.hits);
    totalHits = data.totalHits;
    loadedImages += data.hits.length;

    if (loadedImages < totalHits) {
      showLoadMoreButton();
    } else {
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


loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton(); 

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length > 0) {
      createGallery(data.hits);
      loadedImages += data.hits.length;

      
      const { height } = document
        .querySelector(".gallery-item")
        .getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: "smooth" });
    }

    hideLoader();

    if (loadedImages < totalHits) {
      showLoadMoreButton();
    } else {
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
    showLoadMoreButton(); 
    iziToast.error({
      title: "Error",
      message: "Something went wrong: " + error.message,
    });
  }
});
