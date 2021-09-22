function plusSlide(n) {
  const lightboxContainer = document.querySelector(
    ".lightbox-modal__container"
  );
  const slide = document.querySelector(".lightbox-modal__media");
  const isSlide = element => element.id.toString() === slide.id.toString();
  let index = mediaList.findIndex(isSlide);
  index += n;
  if (index < 0) {
    index = mediaList.length - 1;
  }
  if (index > mediaList.length - 1) {
    index = 0;
  }
  lightboxContainer.innerHTML = `
  <${mediaList[index].type} id="${mediaList[index].id}" src="${mediaList[index].src}" class="lightbox-modal__media"></${mediaList[index].type}>
  <figcaption class="lightbox-modal__caption">${mediaList[index].title}</figcaption>`;
}

function closeModal() {
  window.removeEventListener("keyup", keyControl);
  const modal = document.querySelector(".modal");
  modal.parentNode.removeChild(modal);
}
function keyControl(e) {
  var key = e.key || e.keyCode;
  if (key === "ArrowLeft" || key === 37) {
    event.preventDefault();
    plusSlide(-1);
  } else if (key === "ArrowRight" || key === 39) {
    event.preventDefault();
    plusSlide(1);
  } else if (key === "Escape" || key === "Esc" || key === 27) {
    event.preventDefault();
    closeModal();
  }
}
