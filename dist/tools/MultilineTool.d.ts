import { Tool } from './Tool';
import { InteractionRecord } from '../recorders/InteractionRecord';
export declare class MultilineTool extends Tool {
    applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord): void;
    private drawLineBasedOnArrayOfPoints;
}
