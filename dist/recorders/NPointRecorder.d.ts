import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';
export interface NPointRecord extends InteractionRecord {
    points: Point[];
}
export declare const createNPointRecord: () => NPointRecord;
export declare const isNPointRecord: (record: any) => record is NPointRecord;
export declare class NPointRecorder extends InteractionRecorder<NPointRecord> {
    private currentRecord;
    pressStart(event: InteractionEvent): void;
    moveDuringPress(event: InteractionEvent): void;
    pressStop(event: InteractionEvent): void;
}
