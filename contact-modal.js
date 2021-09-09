function buildContactModal() {
  const main = document.getElementById("main");
  const modal = document.createElement("section");
  modal.classList.add("modal");
  modal.innerHTML = `
  <div class="contact-modal">
          <h1 class="contact-modal__title">Contactez-moi ${photographer.name}</h1>
          <form class="contact-modal__form">
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
            <span class="close" onclick="closeModal()">&times;</span>
          </form>
        </div>
  `;
  main.appendChild(modal);
}
