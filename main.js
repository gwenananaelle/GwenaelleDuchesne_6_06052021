let photographers = null;
let medias = null;

function showTags(tags, parent, clickable) {
  // parent.classList.add("taglist");
  tags.forEach(tag => {
    const tagItem = document.createElement("span");
    tagItem.textContent = `#${tag}`;
    tagItem.classList.add("taglist__tag");
    tagItem.setAttribute("tabindex", "0");
    tagItem.setAttribute("role", "link");
    if (clickable) {
      tagItem.addEventListener("click", function buttonClicked(e) {
        getPhotographersByTag(tag);
        e.stopPropagation();
      });
    }
    parent.appendChild(tagItem);
  });
}
