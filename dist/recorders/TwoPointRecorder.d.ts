import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';
export declare class TwoPointRecord extends InteractionRecord {
    startPoint: Point;
    endPoint: Point;
    serialize(): {
        data: {
            startPoint: Point;
            endPoint: Point;
        };
        type: string;
    };
}
export declare class TwoPointRecorder extends InteractionRecorder {
    private currentRecord;
    pressStart(event: InteractionEvent): void;
    moveDuringPress(event: InteractionEvent): void;
    pressStop(event: InteractionEvent): void;
}
