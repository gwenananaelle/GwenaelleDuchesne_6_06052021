let photographers = null;
let medias = null;

/**
 * insert HTML for the tags
 * @param {String} tags
 * @param {Object} parent element
 * @param {Boolean} clickable
 */
function showTags(tags, parent, clickable) {
  tags.forEach(tag => {
    const tagItem = document.createElement("span");
    tagItem.textContent = `#${tag}`;
    tagItem.classList.add("taglist__tag");
    tagItem.setAttribute("tabindex", "0");
    tagItem.setAttribute("role", "link");
    if (clickable) {
      tagItem.addEventListener("click", function buttonClicked() {
        window.location = `index.html?tag=${tag}`;
      });
    }
    parent.appendChild(tagItem);
  });
}
/**
 * close modal
 */
function closeModal() {
  window.removeEventListener("keyup", keyControl);
  const header = document.querySelector("header");
  header.classList.remove("hidden");
  const modal = document.querySelector(".modal");
  modal.parentNode.removeChild(modal);
}
