import { Tool } from './Tool';
import { InteractionRecord } from '../recorders/InteractionRecord';
export declare class LineTool extends Tool {
    applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord): void;
    private drawLineBasedOnTwoPoints;
}
