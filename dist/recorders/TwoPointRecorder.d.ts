import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';
export interface TwoPointRecord extends InteractionRecord {
    startPoint: Point;
    endPoint: Point;
}
export declare const createTwoPointRecord: () => TwoPointRecord;
export declare const isTwoPointRecord: (record: any) => record is TwoPointRecord;
export declare class TwoPointRecorder extends InteractionRecorder<TwoPointRecord> {
    private currentRecord;
    pressStart(event: InteractionEvent): void;
    moveDuringPress(event: InteractionEvent): void;
    pressStop(event: InteractionEvent): void;
}
