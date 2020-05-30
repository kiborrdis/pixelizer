import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';

export class PressRecorder extends InteractionRecorder<InteractionRecord> {
    private currentRecord: InteractionRecord = {};

    public press(event: InteractionEvent) {
        this.finishRecord(this.currentRecord);

        this.currentRecord = {};
    }
}
