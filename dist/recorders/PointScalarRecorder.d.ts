import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';
export declare class PointScalarRecord extends InteractionRecord {
    point: Point;
    value: number;
    serialize(): {
        data: {
            point: Point;
            value: number;
        };
        type: string;
    };
}
export declare class PointScalarRecorder extends InteractionRecorder {
    private currentRecord;
    private lastValue;
    move(event: InteractionEvent): void;
    increase(event: InteractionEvent): void;
    decrease(event: InteractionEvent): void;
    press(event: InteractionEvent): void;
}
