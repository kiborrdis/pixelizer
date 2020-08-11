import { Tool } from './Tool';
import { NPointRecord } from '../recorders/NPointRecorder';
import { NPressurePointsRecord } from '../recorders/NPressurePointsRecorder';
import { CanvasParams } from '../interfaces/CanvasParams';
export declare class MultilineTool extends Tool<NPointRecord | NPressurePointsRecord> {
    applyToContext(context: CanvasRenderingContext2D, record: NPointRecord | NPressurePointsRecord, params: CanvasParams): void;
    private drawPressureAwareLine;
    private drawLineBasedOnArrayOfPoints;
}
