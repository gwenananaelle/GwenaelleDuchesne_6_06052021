function getJsonData() {
  fetch("FishEyeData.json")
    .then(response => response.json())
    .then(data => console.log(data));
}

function getPhotographers() {
  fetch("FishEyeData.json")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log(value);
      value.photographers.forEach(photographer => {
        showPhotographers(photographer);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}
document.addEventListener("load", getPhotographers());

function showPhotographers(photographer) {
  const card = document.createElement("article");
  card.classList.add("card");
  const link = document.createElement("a");
  link.classList.add("card__link");
  const img = document.createElement("img");
  img.classList.add("card__img");
  const name = document.createElement("h2");
  name.classList.add("card__name");
  const location = document.createElement("p");
  location.classList.add("card__location");
  const tagLine = document.createElement("p");
  tagLine.classList.add("card__tagline");
  const price = document.createElement("p");
  price.classList.add("card__price");
  const tags = document.createElement("ul");

  img.src = `/public/img/Photographers-ID/${photographer.portrait}`;
  name.textContent = photographer.name;
  location.textContent = `${photographer.city}, ${photographer.country}`;
  tagLine.textContent = photographer.tagline;
  price.textContent = `${photographer.price}€/jour`;

  card.appendChild(link);
  link.appendChild(img);
  link.appendChild(name);
  card.appendChild(location);
  card.appendChild(tagLine);
  card.appendChild(price);

  const section = document.getElementById("photographers");
  section.appendChild(card);
}
