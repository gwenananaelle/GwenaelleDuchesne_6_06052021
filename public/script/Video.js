/**
 * Class representing a video
 * @extends Media
 */
class Video extends Media {
  constructor(media) {
    super(media);
    this.type = "video";
    this.src = `/public/img/${media.photographerId}/${media.video}`;
  }
  buildSlide() {
    super.buildSlide(this.type, this.src);
  }
  buildThumb() {
    super.buildThumb(this.type, this.src);
  }
}
