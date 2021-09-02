async function name() {
  const id = getId();
  let photographer = await getPhotographerById(id);
  createPhotographerBanner(photographer);
  let mediaList = await getMediaByPhotographerId(id);
  createMedia(mediaList);
}
function getId() {
  let params = new URLSearchParams(document.location.search.substring(1));
  let paramId = params.get("id");
  let id = parseInt(paramId, 10);
  return id;
}
async function getPhotographerById(id) {
  const data = await fetchFishEyeDataJSON();
  const photographers = data.photographers;
  const photographerWithId = photographers.find(
    photographer => photographer.id === id
  );
  return photographerWithId;
}
async function getMediaByPhotographerId(id) {
  const data = await fetchFishEyeDataJSON();
  const media = data.media;
  const photographerId = media.filter(media => media.photographerId === id);
  return photographerId;
}
function createPhotographerBanner(photographer) {
  const banner = document.createElement("article");
  banner.classList.add("photograph-header");
  banner.innerHTML = `
    <div class="photographer-profile">
    <h1 class="photographer-profile__name">${photographer.name}</h1>
    <p class="photographer-profile__location">${photographer.city}, ${photographer.country}</p>
    <p class="photographer-profile__tagline">${photographer.tagline}</p>
    </div>
    <button class="button">Contactez moi</button>
    <img class="photograph-header__user" src="/public/img/Photographers-ID/${photographer.portrait}">
    `;
  const section = document.getElementById("banner");
  section.appendChild(banner);
}

function createMedia(mediaList) {
  const gallery = document.getElementById("gallery");
  mediaList.forEach(media => {
    if (media.image) {
      const thumb = document.createElement("article");

      thumb.classList.add("thumb-imgfull");
      thumb.innerHTML = `
  <img src="/public/img/${media.photographerId}/${media.image}" class="thumb-imgfull_img"></img>
  <p class="thumb-imgfull_title">
  ${media.title}
  <span class="thumb-imgfull_likes">${media.likes}</span>
  </p>
  `;
      gallery.appendChild(thumb);
    } else if (media.video) {
    }
  });
}
async function sortByTitle() {
  console.log("sort by title");
  resetGallery();
  const id = getId();
  let mediaList = await getMediaByPhotographerId(id);
  sortedMedias = mediaList.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
  console.log(sortedMedias);
  createMedia(sortedMedias);
}
async function sortByPopularity() {
  console.log("sort by popularity");
  resetGallery();
  const id = getId();
  let mediaList = await getMediaByPhotographerId(id);
  sortedMedias = mediaList.sort(function(a, b) {
    return a.likes - b.likes;
  });
  console.log(sortedMedias);
  createMedia(sortedMedias);
}
async function sortByDate() {
  console.log("sort by date");
  resetGallery();
  const id = getId();
  let mediaList = await getMediaByPhotographerId(id);
  sortedMedias = mediaList.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  console.log(sortedMedias);
  createMedia(sortedMedias);
}
function resetGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
}
