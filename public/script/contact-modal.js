/**
 * insert HTML to create a contact form modal
 */
function buildContactModal() {
  const main = document.getElementById("main");
  const modal = document.createElement("section");
  modal.classList.add("modal");
  const closeButton = `
<svg aria-hidden="true" focusable="false" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#FFFFFF"/>
</svg>
`;
  modal.innerHTML = `
  <div class="contact-modal">
          <h1 class="contact-modal__title">Contactez-moi ${photographer.name}</h1>
          <form id="contact-form" class="contact-modal__form">
            <label class="contact-modal__form__label" for="firstName"
              >Prénom</label
            >
            <input
              class="contact-modal__form__input"
              type="text"
              id="firstName"
              name="firstName"
              required
            />
            <label class="contact-modal__form__label" for="lastName">Nom</label>
            <input
              class="contact-modal__form__input"
              type="text"
              id="lastName"
              name="lastName"
              required
            />
            <label class="contact-modal__form__label" for="email"
              >Email<abbr title="This field is mandatory" aria-label="required"
                >*</abbr
              ></label
            >
            <input
              class="contact-modal__form__input"
              type="email"
              id="email"
              name="email"
              required
            />
            <label class="contact-modal__form__label" for="message"
              >Votre message</label
            >
            <textarea
              class="contact-modal__form__textarea"
              id="message"
              name="msg"
              maxlength="140"
              rows="5"
              required
            ></textarea>
            <button class="button contact-modal__form__button">Envoyer</button>
          </form>
          <button class="contact-modal__close" aria-labelledby="button-close-label"><span id="button-close-label" hidden>Close</span>${closeButton}</button>
        </div>
  `;
  let header = document.querySelector("header");
  header.setAttribute("class", "hidden");
  main.prepend(modal);
  document
    .querySelector(".contact-modal__close")
    .addEventListener("click", closeModal);

  const formElem = document.getElementById("contact-form");
  formElem.addEventListener("submit", e => {
    e.preventDefault();
    new FormData(formElem);
  });

  formElem.addEventListener("formdata", e => {
    let data = e.formData;
    for (var value of data.values()) {
      console.log(value);
    }
  });
}
