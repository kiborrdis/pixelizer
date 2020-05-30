import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';
export interface PointScalarRecord extends InteractionRecord {
    point: Point;
    value: number;
}
export declare const createPointScalarRecord: () => PointScalarRecord;
export declare const isPointScalarRecord: (record: any) => record is PointScalarRecord;
export declare class PointScalarRecorder extends InteractionRecorder<PointScalarRecord> {
    private currentRecord;
    private lastValue;
    move(event: InteractionEvent): void;
    increase(event: InteractionEvent): void;
    decrease(event: InteractionEvent): void;
    press(event: InteractionEvent): void;
}
