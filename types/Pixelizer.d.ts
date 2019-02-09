import { InteractionAdapter } from './InteractionAdapter';
import { InteractionRecorder } from './recorders/InteractionRecorder';
import { InteractionRecord } from './recorders/InteractionRecord';
import { Tool } from './tools/Tool';
import { Style } from './interfaces/Style';
import { Action } from './interfaces/Action';
interface PixelizerConfig {
    tool?: Tool;
    recorderCreator?: (preview: (record: InteractionRecord) => void, finish: (record: InteractionRecord) => void) => InteractionRecorder;
}
export declare class Pixelizer {
    private connector;
    private currentRecorder;
    private currentTool;
    private adapter;
    private canvas;
    private newActionListener;
    private style;
    private history;
    constructor(adapter: InteractionAdapter);
    mountCanvasInDOMElement(element: HTMLElement): void;
    setConfig(config: PixelizerConfig): void;
    setStyle(style: Style): void;
    private preview;
    private finishAction;
    applyActions(actions?: Action[]): void;
    addNewActionListener(listener: (action: Action) => void): void;
    revertAction(): void;
    private applyMutation;
}
export {};
