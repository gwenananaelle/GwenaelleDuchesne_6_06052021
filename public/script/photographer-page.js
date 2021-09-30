let photographer = null;
let mediaList = null;
const id = getId();
let options = ["Popularité", "Date", "Titre"];

/**
 * initiate photographer, mediaList and generate the page during load
 */
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
    selectOption(event.target.value);
  });
});

/**
 * get id from url parameters
 * @returns {Number} id - photographer id
 */
function getId() {
  let params = new URLSearchParams(document.location.search.substring(1));
  let paramId = params.get("id");
  let id = parseInt(paramId, 10);
  return id;
}
/**
 * Insert HTML with number of likes and price per day
 * @param {Object} photographer
 */
function createCounter(photographer) {
  const elCounter = document.querySelector(".counter");
  const reducer = (accumulator, currentMedia) =>
    accumulator + parseInt(currentMedia.likes, 10);
  numberOfLikes = mediaList.reduce(reducer, 0);
  elCounter.innerHTML = `<p class="counter_text"> ${numberOfLikes} &hearts;</p> <p class="counter_text">${photographer.price}/jour </p>`;
}

/**
 * Insert HTML to create the photographer banner
 * @param {Object} photographer
 */
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
    <img class="photograph-header__user" src="public/img/Photographers-ID/${photographer.portrait}">
    `;
  const section = document.getElementById("banner");
  section.appendChild(banner);
  const taglist = document.querySelector(".photographer-profile__taglist");
  showTags(photographer.tags, taglist, true);
}
/**
 * for each Media in Medialist creates a thumbnail
 * @param {Array} mediaList
 */
function createMedia(mediaList) {
  mediaList.forEach(media => {
    media.buildThumb();
  });
}
/**
 * assign value for each sorted by select options
 */
function assignOptionsalues() {
  const optionsEl = document.querySelectorAll(".option");
  optionsEl.forEach((element, index) => {
    element.textContent = options[index];
    element.dataset.value = options[index];
    element.addEventListener("click", getSortingOption);
  });
}
/**
 * get selected option
 * @param {event} e
 */
function getSortingOption(e) {
  let value = e.target.dataset.value;
  selectOption(value);
}
/**
 * change options order for the sorted by selct button
 * @param {String} value
 */
function selectOption(value) {
  let index = options.indexOf(value);
  options.splice(index, 1);
  options.splice(0, 0, value);
  assignOptionsalues();
  sortBy(value);
}

/**
 * sorts the media depending on the otpion selected
 * @param {String} param
 */
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
/**
 * remove HTML of the gallery
 */
function resetGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
}
