class MediaFactory {
  constructor() {
    this.createMedia = function(type, mediaObject) {
      let media;
      if (type === "video") media = new Video(mediaObject);
      else if (type === "image") media = new Image(mediaObject);
      return media;
    };
  }
}

class Media {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.tags = media.tags;
    this.likes = media.likes;
    this.date = new Date(media.date);
    this.price = media.price;
  }
}

class Video extends Media {
  constructor(media) {
    super(media);
    this.type = "video";
    this.src = `/public/img/${media.photographerId}/${media.video}`;
    this.buildSlide = function() {
      const main = document.getElementById("main");
      const modal = document.createElement("section");
      modal.classList.add("slide", "modal");
      modal.innerHTML = `
            <section id="lightbox-modal" class="lightbox-modal">
                <span class="close" onclick="closeModal()">&times;</span>
                <figure id="lightbox__container" class="lightbox-modal__container">
                    <video id="${this.id}" src="${this.src}" class="lightbox-modal__video"></video>
                    <figcaption class="lightbox-modal__caption">${this.title}</figcaption>
                </figure>
                <button class="lightbox__next">Suivant</button>
                <button class="lightbox__prev">Précédent</button>
            </section>
         `;
      main.appendChild(modal);
      document
        .querySelector(".lightbox__next")
        .addEventListener("click", getNext);
      document
        .querySelector(".lightbox__prev")
        .addEventListener("click", getPrev);
    };
    this.buildThumb = function() {
      const thumb = document.createElement("article");
      thumb.classList.add("thumb-imgfull");
      thumb.innerHTML = `
          <video src="${this.src}" class="thumb-imgfull_video"></video>
          <p class="thumb-imgfull_title">
        ${this.title}
        <span class="thumb-imgfull_likes">${this.likes}</span>
        </p>
        `;
      return thumb;
    };
  }
}

class Image extends Media {
  constructor(media) {
    super(media);
    this.type = "image";
    this.src = `/public/img/${media.photographerId}/${media.image}`;
    this.buildSlide = function() {
      const main = document.getElementById("main");
      const modal = document.createElement("section");
      modal.classList.add("slide", "modal");
      modal.innerHTML = `
          <section id="lightbox-modal" class="lightbox-modal">
              <span class="close" onclick="closeModal()">&times;</span>
              <figure id="lightbox__container" class="lightbox-modal__container">
                  <img id="${this.id}" src="${this.src}" class="lightbox-modal__img"></img>
                  <figcaption class="lightbox-modal__caption">${this.title}</figcaption>
              </figure>
              <button class="lightbox__next">Suivant</button>
              <button class="lightbox__prev">Précédent</button>
          </section>
       `;
      main.appendChild(modal);
      document
        .querySelector(".lightbox__next")
        .addEventListener("click", getNext);
      document
        .querySelector(".lightbox__prev")
        .addEventListener("click", getPrev);
    };
    this.buildThumb = function() {
      const thumb = document.createElement("article");
      thumb.classList.add("thumb-imgfull");
      thumb.innerHTML = `
        <img src="${this.src}" class="thumb-imgfull_img"></img>
        <p class="thumb-imgfull_title">
      ${this.title}
      <span class="thumb-imgfull_likes">${this.likes}</span>
      </p>
      `;
      return thumb;
    };
  }
}
