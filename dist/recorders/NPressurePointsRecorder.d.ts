import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';
export interface NPressurePointsRecord extends InteractionRecord {
    points: {
        p: Point;
        pressure: number;
    }[];
    type: 'npp';
}
export declare const createNPressurePointsRecord: () => NPressurePointsRecord;
export declare const isNPressurePointsRecord: (record: any) => record is NPressurePointsRecord;
export declare class NPressurePointsRecorder extends InteractionRecorder<NPressurePointsRecord> {
    private currentRecord;
    pressStart(event: InteractionEvent): void;
    moveDuringPress(event: InteractionEvent): void;
    pressStop(event: InteractionEvent): void;
}
