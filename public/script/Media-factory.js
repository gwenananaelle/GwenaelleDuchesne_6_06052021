/**
 * Creates a MediaFactory
 * @class
 */
class MediaFactory {
  createMedia(type, mediaObject) {
    let media;
    if (type === "video") media = new Video(mediaObject);
    else if (type === "image") media = new Image(mediaObject);
    return media;
  }
}
