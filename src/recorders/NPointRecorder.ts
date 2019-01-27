import { InteractionRecorder } from '../InteractionRecorder';
import { InteractionRecord } from '../InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../Point';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

export class NPointRecord extends InteractionRecord {
  public points: Point[] = [];
}

export class NPointRecorder extends InteractionRecorder {
  private currentRecord: NPointRecord = new NPointRecord();

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

    this.currentRecord = new NPointRecord();
  }
}
