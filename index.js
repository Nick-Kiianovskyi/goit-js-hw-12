import{a as u,S as d,i as n}from"./assets/vendor-CNqCr-V-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const m="https://pixabay.com/api/",p="54003788-96a27274a1926d2f6361511ae";async function g(s){try{return(await u.get(m,{params:{key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(t){throw new Error("Pixabay API error: "+t.message)}}const f=document.querySelector(".gallery"),a=document.querySelector(".loader"),y=new d(".gallery a");function h(s){const t=s.map(r=>`
      <li class="gallery-item">
        <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}" />
        </a>
        <div class="info">
          <p>Likes: ${r.likes}</p>
          <p>Views: ${r.views}</p>
          <p>Comments: ${r.comments}</p>
          <p>Downloads: ${r.downloads}</p>
        </div>
      </li>`).join("");f.insertAdjacentHTML("beforeend",t),y.refresh()}function L(){f.innerHTML=""}function b(){a.classList.add("visible"),a.setAttribute("aria-hidden","false")}function l(){a.classList.remove("visible"),a.setAttribute("aria-hidden","true")}const w=document.querySelector(".form");w.addEventListener("submit",async s=>{s.preventDefault();const t=s.target.elements["search-text"].value.trim();if(!t){n.warning({title:"Warning",message:"Please enter a search term!"});return}L(),b();try{const r=await g(t);if(l(),r.hits.length===0){n.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#f44336",titleColor:"#ffffff",messageColor:"#ffffff",timeout:5e3,progressBar:!1,close:!1,class:"custom-error-toast"});return}h(r.hits)}catch(r){l(),n.error({title:"Error",message:"Something went wrong: "+r.message})}});
//# sourceMappingURL=index.js.map
