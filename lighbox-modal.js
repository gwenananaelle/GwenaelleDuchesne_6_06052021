function buildLightbox(media) {
  console.log("buildLightbox");
  const main = document.getElementById("main");
  const slide = document.createElement("div");
  slide.classList.add("slide");
  slide.innerHTML = `
  <section id="lightbox-modal" class="modal lightbox-modal">
  <span class="close" onclick="closeModal()">&times;</span>
  <figure id="lightbox__container" class="lightbox-modal__container">
    <img id="${media.id}" src="/public/img/${media.photographerId}/${media.image}" class="lightbox-modal__img">
    <figcaption class="lightbox-modal__caption">${media.title}</figcaption>
</figure>
<button class="lightbox__next">Suivant</button>
    <button class="lightbox__prev">Précédent</button>
  </section>
  `;
  main.appendChild(slide);
  document.querySelector(".lightbox__next").addEventListener("click", getNext);
  document.querySelector(".lightbox__prev").addEventListener("click", getPrev);
}

function getNext() {
  const img = document.querySelector(".lightbox-modal__img");
  const caption = document.querySelector(".lightbox-modal__caption");
  let index = mediaList.findIndex(
    media => media.id.toString() === img.id.toString()
  );
  index++;
  if (index > mediaList.length - 1) {
    index = 0;
  }
  img.id = mediaList[index].id;
  img.src = `/public/img/${mediaList[index].photographerId}/${mediaList[index].image}`;
  caption.innerText = `${mediaList[index].title}`;
}
function getPrev() {
  const img = document.querySelector(".lightbox-modal__img");
  const caption = document.querySelector(".lightbox-modal__caption");
  let index = mediaList.findIndex(
    media => media.id.toString() === img.id.toString()
  );
  index--;
  if (index < 0) {
    index = mediaList.length - 1;
  }
  img.id = mediaList[index].id;
  img.src = `/public/img/${mediaList[index].photographerId}/${mediaList[index].image}`;
  caption.innerText = `${mediaList[index].title}`;
}
function closeModal() {
  const slide = document.querySelector(".slide");
  slide.parentNode.removeChild(slide);
}
