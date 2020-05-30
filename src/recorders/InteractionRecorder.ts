import { InteractionEvent } from '../InteractionAdapter';
import { InteractionHandler } from '../interfaces/InteractionHandler';
import { InteractionRecord } from './InteractionRecord';

export abstract class InteractionRecorder<R extends InteractionRecord> implements InteractionHandler {
  private requestPreview: (record: R) => void;
  private reportFinishRecord: (record: R) => void;

  constructor(
    requestPreview: (record: R) => void,
    reportFinishRecord: (record: R) => void,
  ) {
    this.requestPreview = requestPreview;
    this.reportFinishRecord = reportFinishRecord;
  }

  protected finishRecord(record: R) {
    this.reportFinishRecord(record);
  }

  protected preview(record: R) {
    this.requestPreview(record);
  }

  public pressStart(event: InteractionEvent) {}
  public moveDuringPress(event: InteractionEvent) {}
  public pressStop(event: InteractionEvent) {}
  public press(event: InteractionEvent) {}
  public move(event: InteractionEvent) {}
  public doublePress(event: InteractionEvent) {}
  public increase(event: InteractionEvent) {}
  public decrease(event: InteractionEvent) {}
}
