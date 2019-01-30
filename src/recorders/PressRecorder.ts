import { InteractionRecorder } from './InteractionRecorder';
import { InteractionRecord } from './InteractionRecord';
import { InteractionEvent } from '../InteractionAdapter';

export class PressRecorder extends InteractionRecorder {
  private currentRecord: InteractionRecord = new InteractionRecord();

  public press(event: InteractionEvent) {
    this.finishRecord(this.currentRecord);

    this.currentRecord = new InteractionRecord();
  }
}
