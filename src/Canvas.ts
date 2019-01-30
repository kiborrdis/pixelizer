import { Style } from './interfaces/Style';
import { Mutation } from './interfaces/Mutation';
import { Action } from './interfaces/Action';

export class Canvas {
  private canvasElement: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private imageDataBeforePreview: ImageData;
  private currentStyle: Style = {
    color: '#ffffff',
    lineWidth: 1,
  };

  constructor() {
    this.createCanvasElement();
  }

  private createCanvasElement() {
    this.canvasElement = document.createElement('canvas');

    this.canvasElement.style.width = '100%';
    this.canvasElement.style.height = '100%';

    this.canvasContext = this.canvasElement.getContext('2d');

    this.setStyle(this.currentStyle);
  }

  public setSize(width: number, height: number) {
    this.canvasElement.width = width;
    this.canvasElement.height = height;
  }

  public applyMutation(mutation: Mutation) {
    if (mutation.checkpoint) {
      this.applyImageData(mutation.checkpoint);
    } else if (this.imageDataBeforePreview) {
      this.applyImageData(this.imageDataBeforePreview);
    }

    this.imageDataBeforePreview = null;

    mutation.actions.forEach((action) => this.applyAction(action));
  }

  public setStyle(style: Style) {
    this.currentStyle = { ...this.currentStyle, ...style };
  }

  public previewAction(action: Action) {
    let imageData;

    if (!this.imageDataBeforePreview) {
      imageData = this.getImageData();
    } else {
      this.applyImageData(this.imageDataBeforePreview);
    }

    this.applyAction(action);

    if (imageData) {
      this.imageDataBeforePreview = imageData;
    }
  }

  private applyAction(action: Action) {
    const style = { ...this.currentStyle, ...action.style };

    this.context.lineWidth = style.lineWidth;
    this.context.strokeStyle = style.color;
    this.context.fillStyle = style.color;

    action.tool.applyToContext(this.context, action.record, {
      width: this.canvasElement.width,
      height: this.canvasElement.height,
    });
  }

  public get element() {
    return this.canvasElement;
  }

  public get context() {
    return this.canvasContext;
  }

  public applyImageData(data: ImageData) {
    this.context.putImageData(data, 0, 0);
  }

  public getImageData() {
    return this.context.getImageData(0, 0, this.element.width, this.element.height);
  }
}
