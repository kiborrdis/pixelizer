class ImageData {
  constructor(x, y) {
    this.width = x;
    this.height = y;
    this.data = new Uint8ClampedArray();
  }
}

global.ImageData = ImageData;
