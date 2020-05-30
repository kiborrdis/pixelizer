import { Tool } from './Tool';
import { NPointRecord } from '../recorders/NPointRecorder';
export declare class MultilineTool extends Tool<NPointRecord> {
    applyToContext(context: CanvasRenderingContext2D, record: NPointRecord): void;
    private drawLineBasedOnArrayOfPoints;
}
