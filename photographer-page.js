async function name() {
  let params = new URLSearchParams(document.location.search.substring(1));
  let paramId = params.get("id");
  let id = parseInt(paramId, 10);
  let photographer = await getPhotographersById(id);
  createPhotographerBanner(photographer);
}

async function getPhotographersById(id) {
  const data = await fetchFishEyeDataJSON();
  const photographers = data.photographers;
  const photographersWithId = photographers.find(
    photographer => photographer.id === id
  );
  return photographersWithId;
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
