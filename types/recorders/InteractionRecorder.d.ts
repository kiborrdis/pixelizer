import { InteractionEvent } from '../InteractionAdapter';
import { InteractionHandler } from '../interfaces/InteractionHandler';
import { InteractionRecord } from './InteractionRecord';
export declare abstract class InteractionRecorder implements InteractionHandler {
    private requestPreview;
    private reportFinishRecord;
    constructor(requestPreview: (record: InteractionRecord) => void, reportFinishRecord: (record: InteractionRecord) => void);
    protected finishRecord(record: InteractionRecord): void;
    protected preview(record: InteractionRecord): void;
    pressStart(event: InteractionEvent): void;
    moveDuringPress(event: InteractionEvent): void;
    pressStop(event: InteractionEvent): void;
    press(event: InteractionEvent): void;
    move(event: InteractionEvent): void;
    doublePress(event: InteractionEvent): void;
    increase(event: InteractionEvent): void;
    decrease(event: InteractionEvent): void;
}
