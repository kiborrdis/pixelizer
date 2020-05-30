import { Tool } from './Tool';
import { TwoPointRecord } from '../recorders/TwoPointRecorder';
import { PointScalarRecord } from '../recorders/PointScalarRecorder';
export declare class RectangleTool extends Tool<TwoPointRecord | PointScalarRecord> {
    applyToContext(context: CanvasRenderingContext2D, record: TwoPointRecord | PointScalarRecord): void;
    private drawRectBasedOnTwoPoints;
    private drawRectBasedOnPointScalar;
}
