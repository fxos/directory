export default class IconHelper {
  static setImage(imageElement, imagePath) {
    imageElement.src = imagePath || window.DEFAULT_ICON_URL;
    imageElement.onerror = (e) => {
      console.warn('Warning, failed to load icon url', e);
      imageElement.src = window.DEFAULT_ICON_URL;
    };
  }
}
