import { Tool } from './Tool';
import { InteractionRecord } from '../recorders/InteractionRecord';
export declare class RectangleTool extends Tool {
    applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord): void;
    private drawRectBasedOnTwoPoints;
    private drawRectBasedOnPointScalar;
}
