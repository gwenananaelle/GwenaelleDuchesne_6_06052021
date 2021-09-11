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
  const slide = document.querySelector(".modal");
  slide.parentNode.removeChild(slide);
}
