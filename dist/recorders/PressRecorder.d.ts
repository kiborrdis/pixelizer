import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
export declare class PressRecorder extends InteractionRecorder<InteractionRecord> {
    private currentRecord;
    press(event: InteractionEvent): void;
}
