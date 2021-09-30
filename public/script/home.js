window.addEventListener("load", async () => {
  const response = await fetch("FishEyeData.json");
  const data = await response.json();
  photographers = data.photographers;
  medias = data.medias;
  updatePhotographersRendering();
  const tag = getTag();
  if (tag) {
    getPhotographersByTag(tag);
  }
});

function getTag() {
  let params = new URLSearchParams(document.location.search.substring(1));
  let tag = params.get("tag");
  return tag;
}

function getPhotographersByTag(tag) {
  clearPhotographers();
  const photographersWithTag = photographers.filter(photographer =>
    photographer.tags.includes(tag)
  );
  photographersWithTag.forEach(photographer => showPhotographers(photographer));
}

async function updatePhotographersRendering() {
  let allTags = [];
  photographers.forEach(photographer => {
    showPhotographers(photographer);
    photographer.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });
  let parent = document.querySelector(".header__nav");
  parent.classList.add("taglist");
  showTags(allTags, parent, true);
}

function showPhotographers(photographer) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.innerHTML = `
      <a class="card__link" href="photographer-page.html?id=${photographer.id}" role="link">
        <img class="card__img" src="/public/img/Photographers-ID/${photographer.portrait}">
        <h2 class="card__name">${photographer.name}</h2>
      </a>
      <p class="card__location">${photographer.city}, ${photographer.country}</p>
      <p class="card__tagline">${photographer.tagline}</p>
      <p class="card__price">${photographer.price}€/jour</p>
  `;
  const section = document.getElementById("photographers");
  section.appendChild(card);
  const taglist = document.createElement("div");
  taglist.classList.add("taglist");
  card.appendChild(taglist);
  showTags(photographer.tags, taglist, true);
}

function clearPhotographers() {
  const section = document.getElementById("photographers");
  section.innerHTML = "";
}
