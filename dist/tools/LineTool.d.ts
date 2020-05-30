import { Tool } from './Tool';
import { TwoPointRecord } from '../recorders/TwoPointRecorder';
export declare class LineTool extends Tool<TwoPointRecord> {
    applyToContext(context: CanvasRenderingContext2D, record: TwoPointRecord): void;
    private drawLineBasedOnTwoPoints;
}
