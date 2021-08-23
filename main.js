function getPhotographersByTag(tag) {
  clearPhotographers();
  fetchFishEyeDataJSON().then(data => {
    const photographers = data.photographers;
    const photographersWithTag = photographers.filter(photographer =>
      photographer.tags.includes(tag)
    );
    photographersWithTag.forEach(photographer =>
      showPhotographers(photographer)
    );
  });
}
async function fetchFishEyeDataJSON() {
  const response = await fetch("FishEyeData.json");
  const data = await response.json();
  return data;
}

window.addEventListener("load", async () => {
  let allTags = [];
  fetchFishEyeDataJSON().then(data => {
    console.log(data);
    data.photographers.forEach(photographer => {
      showPhotographers(photographer);
      photographer.tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    let parent = document.querySelector(".header");
    showTags(allTags, parent, true);
    console.log(allTags);
  });
});

function showTags(tags, parent, clickable) {
  const tagList = document.createElement("ul");
  tagList.classList.add("taglist");
  tags.forEach(tag => {
    const listItem = document.createElement("li");
    listItem.textContent = `#${tag}`;
    listItem.classList.add("taglist__tag");
    if (clickable) {
      listItem.addEventListener("click", function buttonClicked(e) {
        getPhotographersByTag(tag);
        e.stopPropagation();
      });
    }
    tagList.appendChild(listItem);
  });
  parent.appendChild(tagList);
}

function showPhotographers(photographer) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.innerHTML = `
    <a class="card__link">
      <img class="card__img" src="/public/img/Photographers-ID/${photographer.portrait}">
      <h2 class="card__name">${photographer.name}</h2>
    </a>
    <p class="card__location">${photographer.city}, ${photographer.country}</p>
    <p class="card__tagline">${photographer.tagline}</p>
    <p class="card__price">${photographer.price}€/jour</p>
`;
  const section = document.getElementById("photographers");
  section.appendChild(card);
  showTags(photographer.tags, card, false);
}

function clearPhotographers() {
  const section = document.getElementById("photographers");
  section.innerHTML = "";
}
