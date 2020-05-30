import { InteractionEvent } from '../InteractionAdapter';
import { InteractionHandler } from '../interfaces/InteractionHandler';
import { InteractionRecord } from './InteractionRecord';
export declare abstract class InteractionRecorder<R extends InteractionRecord> implements InteractionHandler {
    private requestPreview;
    private reportFinishRecord;
    constructor(requestPreview: (record: R) => void, reportFinishRecord: (record: R) => void);
    protected finishRecord(record: R): void;
    protected preview(record: R): void;
    pressStart(event: InteractionEvent): void;
    moveDuringPress(event: InteractionEvent): void;
    pressStop(event: InteractionEvent): void;
    press(event: InteractionEvent): void;
    move(event: InteractionEvent): void;
    doublePress(event: InteractionEvent): void;
    increase(event: InteractionEvent): void;
    decrease(event: InteractionEvent): void;
}
