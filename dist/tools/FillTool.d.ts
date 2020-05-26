import { Tool } from './Tool';
import { InteractionRecord } from '../recorders/InteractionRecord';
import { CanvasParams } from '../interfaces/CanvasParams';
export declare class FillTool extends Tool {
    applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord, params: CanvasParams): void;
}
