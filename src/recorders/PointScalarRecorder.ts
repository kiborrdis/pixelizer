import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from '../InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

const MAX_SCALAR_VALUE = 100;
const MIN_SCALAR_VALUE = 1;

export class PointScalarRecord extends InteractionRecord {
  public point: Point;
  public value: number = 3;

  public serialize() {
    const obj = super.serialize();

    return {
      ...obj,
      data: {
        point: this.point,
        value: this.value,
      },
    };
  }
}

export class PointScalarRecorder extends InteractionRecorder {
  private currentRecord: PointScalarRecord = new PointScalarRecord();
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

    this.currentRecord = new PointScalarRecord();
    this.currentRecord.value = this.lastValue;
  }
}
