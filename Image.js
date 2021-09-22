class Image extends Media {
  constructor(media) {
    super(media);
    this.type = "img";
    this.src = `/public/img/${media.photographerId}/${media.image}`;
  }
  buildSlide() {
    super.buildSlide(this.type, this.src);
  }
  buildThumb() {
    super.buildThumb(this.type, this.src);
  }
}
