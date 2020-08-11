import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

export interface NPressurePointsRecord extends InteractionRecord {
    points: {
        p: Point;
        pressure: number;
    }[];
    type: 'npp';
}

export const createNPressurePointsRecord = (): NPressurePointsRecord => ({
    points: [],
    type: 'npp',
});

export const isNPressurePointsRecord = (
    record: any,
): record is NPressurePointsRecord => record.type === 'npp';

export class NPressurePointsRecorder extends InteractionRecorder<
    NPressurePointsRecord
> {
    private currentRecord: NPressurePointsRecord = createNPressurePointsRecord();

    public pressStart(event: InteractionEvent) {
        this.currentRecord.points.push({
            p: { ...event.position },
            pressure: event.pressure,
        });
    }

    public moveDuringPress(event: InteractionEvent) {
        this.currentRecord.points.push({
            p: { ...event.position },
            pressure: event.pressure,
        });

        this.preview(this.currentRecord);
    }

    public pressStop(event: InteractionEvent) {
        this.currentRecord.points.push({
            p: { ...event.position },
            pressure: event.pressure,
        });

        this.finishRecord(this.currentRecord);

        this.currentRecord = createNPressurePointsRecord();
    }
}
