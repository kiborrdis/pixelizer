import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

export interface TwoPointRecord extends InteractionRecord {
  startPoint: Point;
  endPoint: Point;
}

export const createTwoPointRecord = (): TwoPointRecord => ({
  startPoint: { x: 0, y: 0 },
  endPoint: { x: 0, y: 0 },
});

export const isTwoPointRecord = (record: any): record is TwoPointRecord => (
  'startPoint' in record &&
  'endPoint' in record
);

export class TwoPointRecorder extends InteractionRecorder<TwoPointRecord> {
  private currentRecord: TwoPointRecord = createTwoPointRecord();

  public pressStart(event: InteractionEvent) {
    this.currentRecord.startPoint = event.position;
  }

  public moveDuringPress(event: InteractionEvent) {
    this.currentRecord.endPoint = event.position;

    this.preview(this.currentRecord);
  }

  public pressStop(event: InteractionEvent) {
    this.currentRecord.endPoint = event.position;

    this.finishRecord(this.currentRecord);

    this.currentRecord = createTwoPointRecord();
  }
}
