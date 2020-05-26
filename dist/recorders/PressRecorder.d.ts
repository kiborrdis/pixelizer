import { InteractionRecorder } from './InteractionRecorder';
import { InteractionEvent } from '../InteractionAdapter';
export declare class PressRecorder extends InteractionRecorder {
    private currentRecord;
    press(event: InteractionEvent): void;
}
