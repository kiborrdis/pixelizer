import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';
export declare class NPointRecord extends InteractionRecord {
    points: Point[];
    serialize(): {
        data: Point[];
        type: string;
    };
}
export declare class NPointRecorder extends InteractionRecorder {
    private currentRecord;
    pressStart(event: InteractionEvent): void;
    moveDuringPress(event: InteractionEvent): void;
    pressStop(event: InteractionEvent): void;
}
