import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

const MAX_SCALAR_VALUE = 100;
const MIN_SCALAR_VALUE = 1;

export interface PointScalarRecord extends InteractionRecord {
    point: Point;
    value: number;
}

export const createPointScalarRecord = (): PointScalarRecord => ({
    point: { x: 0, y: 0 },
    value: 3,
});

export const isPointScalarRecord = (record: any): record is PointScalarRecord =>
    'value' in record && 'point' in record;

export class PointScalarRecorder extends InteractionRecorder<
    PointScalarRecord
> {
    private currentRecord: PointScalarRecord = createPointScalarRecord();
    private lastValue: number = 3;

    public move(event: InteractionEvent) {
        this.currentRecord.point = event.position;

        this.preview(this.currentRecord);
    }

    public increase(event: InteractionEvent) {
        this.lastValue = Math.min(MAX_SCALAR_VALUE, this.lastValue + 1);
        this.currentRecord.value = this.lastValue;

        this.preview(this.currentRecord);
    }

    public decrease(event: InteractionEvent) {
        this.lastValue = Math.max(MIN_SCALAR_VALUE, this.lastValue - 1);
        this.currentRecord.value = this.lastValue;

        this.preview(this.currentRecord);
    }

    public press(event: InteractionEvent) {
        this.currentRecord.point = event.position;

        this.finishRecord(this.currentRecord);

        this.currentRecord = createPointScalarRecord();
        this.currentRecord.value = this.lastValue;
    }
}
