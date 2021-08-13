function getPhotographers() {
  fetch("FishEyeData.json")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log(value);
      let allTags = [];
      value.photographers.forEach(photographer => {
        showPhotographers(photographer);
        photographer.tags.forEach(tag => {
          if (!allTags.includes(tag)) {
            allTags.push(tag);
          }
        });
      });
      let parent = document.querySelector(".header");
      showTags(allTags, parent);
      console.log(allTags);
    })
    .catch(function(err) {
      console.log(err);
    });
}
document.addEventListener("load", getPhotographers());

function showTags(tags, parent) {
  const tagList = document.createElement("ul");
  tagList.classList.add("taglist");
  tags.forEach(tag => {
    const listItem = document.createElement("li");
    listItem.textContent = `#${tag}`;
    listItem.classList.add("taglist__tag");
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
  showTags(photographer.tags, card);
}
