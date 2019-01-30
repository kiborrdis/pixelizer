import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

export class TwoPointRecord extends InteractionRecord {
  public startPoint: Point;
  public endPoint: Point;

  public serialize() {
    const obj = super.serialize();

    return {
      ...obj,
      data: {
        startPoint: this.startPoint,
        endPoint: this.endPoint,
      },
    };
  }
}

export class TwoPointRecorder extends InteractionRecorder {
  private currentRecord: TwoPointRecord = new TwoPointRecord();

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

    this.currentRecord = new TwoPointRecord();
  }
}
