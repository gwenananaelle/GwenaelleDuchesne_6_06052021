/**
 * creates a Media
 * @class
 */
class Media {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.tags = media.tags;
    this.likes = media.likes;
    this.date = new Date(media.date);
    this.price = media.price;
    this.alt = media.alt;
    this.addLike = function() {
      this.likes++;
      createCounter(photographer);
      const numberOfLikes = document.querySelector(`.numberOfLikes-${this.id}`);
      numberOfLikes.textContent = this.likes;
      console.log(`${this.likes}`);
    };
  }
}
/**
 * insert HTML to create a lighbox
 * @param {String} type
 * @param {String} url
 */
Media.prototype.buildSlide = function(type, url) {
  const main = document.getElementById("main");
  const modal = document.createElement("section");
  let controls = "";
  if (type === "video") {
    controls = "controls";
  }
  const closeButton = `
<svg aria-hidden="true" focusable="false" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#911C1C"/>
</svg>
`;
  const chevron = `
  <svg aria-hidden="true" focusable="false" width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 3.88195e-06L0.360108 5.64Z" fill="#911C1C"/>
</svg>
  `;
  modal.classList.add("slide", "modal");
  modal.innerHTML = `
            <div id="lightbox-modal" class="lightbox-modal" role="dialog" aria-modal="true" aria-label=”image closeup view”>
                <figure id="lightbox__container" class="lightbox-modal__container">
                    <${type} ${controls} id="${this.id}" src="${url}" alt="${this.alt}" class="lightbox-modal__media"></${type}>
                    <figcaption class="lightbox-modal__caption">${this.title}</figcaption>
                </figure>
                <button class="lightbox-modal__next" aria-labelledby="button-next-label"><span id="button-next-label" hidden>Next image</span>${chevron}</button>
                <button class="lightbox-modal__prev" aria-labelledby="button-prev-label"><span id="button-prev-label" hidden>Previous image</span>${chevron}</button>
                <button class="lightbox-modal__close" aria-labelledby="button-close-label"><span id="button-close-label" hidden>Close dialog</span>${closeButton}</button>
            </div>
         `;
  window.addEventListener("keyup", keyControl);
  main.prepend(modal);
  document
    .querySelector(".lightbox-modal__next")
    .addEventListener("click", function() {
      plusSlide(1);
    });
  document
    .querySelector(".lightbox-modal__prev")
    .addEventListener("click", function() {
      plusSlide(-1);
    });
  document
    .querySelector(".lightbox-modal__close")
    .addEventListener("click", closeModal);
  const header = document.querySelector("header");
  header.classList.add("hidden");
  document.querySelector(".lightbox-modal").focus();
};

/**
 * insert HTML for media thumb
 * @param {String} type
 * @param {String} url
 */
Media.prototype.buildThumb = function(type, url) {
  const thumb = document.createElement("article");
  thumb.classList.add("thumb-imgfull");
  thumb.setAttribute("role", "link");
  const media = document.createElement(`${type}`);
  media.src = url;
  media.alt = this.alt;
  media.classList.add("thumb-imgfull__media");
  const buildSlide = this.buildSlide.bind(this);
  media.addEventListener("click", buildSlide);
  thumb.appendChild(media);
  const caption = document.createElement("div");
  caption.classList.add("thumb-imgfull__caption");
  caption.innerHTML = `
  <p class="thumb-imgfull__title">
${this.title}
<div class="thumb-imgfull__likes"><span class="numberOfLikes-${this.id}">${this.likes}</span> <i class="fas fa-heart like-${this.id}" aria-label="likes"></i>
</div>
</p>
`;
  thumb.appendChild(caption);
  gallery.appendChild(thumb);
  const heart = document.querySelector(`.like-${this.id}`);
  let addLike = this.addLike.bind(this);
  heart.addEventListener("click", addLike);
};
