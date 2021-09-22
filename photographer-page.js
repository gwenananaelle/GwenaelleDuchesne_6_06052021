let photographer = null;
let mediaList = null;
const id = getId();
let options = ["Popularité", "Date", "Titre"];

window.addEventListener("load", async () => {
  const response = await fetch("FishEyeData.json");
  const data = await response.json();
  const photographers = await data.photographers;
  const medias = await data.media;
  photographer = photographers.find(photographer => photographer.id === id);
  createPhotographerBanner(photographer);
  mediaByPhotographer = medias.filter(media => media.photographerId === id);
  const factory = new MediaFactory();
  mediaList = mediaByPhotographer.map(media => {
    if (media.video) {
      return factory.createMedia("video", media);
    } else {
      return factory.createMedia("image", media);
    }
  });
  createMedia(mediaList);
  createCounter(photographer);
  assignOptionsalues();
  const selectElement = document.querySelector(".select__button--native");
  selectElement.addEventListener("change", event => {
    console.log(event.target.value);
    selectOption(event.target.value);
  });
});

function getId() {
  let params = new URLSearchParams(document.location.search.substring(1));
  let paramId = params.get("id");
  let id = parseInt(paramId, 10);
  return id;
}
function createCounter(photographer) {
  const elCounter = document.querySelector(".counter");
  const reducer = (accumulator, currentMedia) =>
    accumulator + parseInt(currentMedia.likes, 10);
  numberOfLikes = mediaList.reduce(reducer, 0);
  elCounter.innerHTML = `<p class="counter_text"> ${numberOfLikes} &hearts;</p> <p class="counter_text">${photographer.price}/jour </p>`;
}
function createPhotographerBanner(photographer) {
  const banner = document.createElement("article");
  banner.classList.add("photograph-header");
  banner.innerHTML = `
    <div class="photographer-profile">
    <h1 class="photographer-profile__name">${photographer.name}</h1>
    <p class="photographer-profile__location">${photographer.city}, ${photographer.country}</p>
    <p class="photographer-profile__tagline">${photographer.tagline}</p>
    <div class="photographer-profile__taglist"></div>
    </div>
    <img class="photograph-header__user" src="/public/img/Photographers-ID/${photographer.portrait}">
    `;
  const section = document.getElementById("banner");
  section.appendChild(banner);
  const taglist = document.querySelector(".photographer-profile__taglist");
  showTags(photographer.tags, taglist, false);
}

function createMedia(mediaList) {
  mediaList.forEach(media => {
    media.buildThumb();
  });
}
function assignOptionsalues() {
  const optionsEl = document.querySelectorAll(".option");
  optionsEl.forEach((element, index) => {
    element.textContent = options[index];
    element.dataset.value = options[index];
    element.addEventListener("click", getSortingOption);
  });
}
function getSortingOption(e) {
  let value = e.target.dataset.value;
  selectOption(value);
}
function selectOption(value) {
  // let value = e.target.dataset.value;
  let index = options.indexOf(value);
  options.splice(index, 1);
  options.splice(0, 0, value);
  assignOptionsalues();
  sortBy(value);
}

function sortBy(param) {
  resetGallery();
  if (param === "Titre") {
    sortedMedias = mediaList.sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );
  } else if (param === "Date") {
    sortedMedias = mediaList.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  } else if (param === "Popularité") {
    sortedMedias = mediaList.sort(function(a, b) {
      return b.likes - a.likes;
    });
  }
  createMedia(sortedMedias);
}
function resetGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
}
