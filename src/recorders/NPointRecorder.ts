import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

export interface NPointRecord extends InteractionRecord {
    points: Point[];
}

export const createNPointRecord = (): NPointRecord => ({ points: [] });

export const isNPointRecord = (record: any): record is NPointRecord =>
    'points' in record;

export class NPointRecorder extends InteractionRecorder<NPointRecord> {
    private currentRecord: NPointRecord = createNPointRecord();

    public pressStart(event: InteractionEvent) {
        this.currentRecord.points.push({ ...event.position });
    }

    public moveDuringPress(event: InteractionEvent) {
        this.currentRecord.points.push({ ...event.position });

        this.preview(this.currentRecord);
    }

    public pressStop(event: InteractionEvent) {
        this.currentRecord.points.push({ ...event.position });

        this.finishRecord(this.currentRecord);

        this.currentRecord = createNPointRecord();
    }
}
