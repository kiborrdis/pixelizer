import { Style } from './interfaces/Style';
import { Mutation } from './interfaces/Mutation';
import { Action } from './interfaces/Action';
export declare class Canvas {
    private canvasElement;
    private canvasContext;
    private imageDataBeforePreview;
    private currentStyle;
    constructor();
    private createCanvasElement;
    setSize(width: number, height: number): void;
    applyMutation(mutation: Mutation): void;
    setStyle(style: Style): void;
    previewAction(action: Action): void;
    private applyAction;
    readonly element: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    applyImageData(data: ImageData): void;
    getImageData(): ImageData;
}
