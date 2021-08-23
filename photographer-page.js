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

function showPhotographerBanner(photographer) {
  const banner = document.createElement("article");
  banner.classList.add("banner");
  banner.innerHTML = `
    <h1>${photographer.name}<h1>
    <p class="card__location">${photographer.city}, ${photographer.country}</p>
    <p class="card__tagline">${photographer.tagline}</p>
    <button>Contactez moi<button>
    <img class="card__img" src="/public/img/Photographers-ID/${photographer.portrait}">
    `;
  const section = document.getElementById("banner");
  section.appendChild(banner);
}
