import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

const lightbox = new SimpleLightbox(".gallery a");

export function createGallery(images) {
  const markup = images
    .map(
      (img) => `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="info">
          <p>Likes: ${img.likes}</p>
          <p>Views: ${img.views}</p>
          <p>Comments: ${img.comments}</p>
          <p>Downloads: ${img.downloads}</p>
        </div>
      </li>`
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
    loader.classList.add("visible");
    loader.setAttribute("aria-hidden", "false");
}

export function hideLoader() {
    loader.classList.remove("visible");
    loader.setAttribute("aria-hidden", "true");
}

const loadMoreBtn = document.querySelector(".load-more");
export function showLoadMoreButton() {
  loadMoreBtn.style.display = "block";
  
}
export function hideLoadMoreButton()
{ loadMoreBtn.style.display = "none"; }