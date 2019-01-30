import { InteractionEvent } from '../InteractionAdapter';
import { InteractionHandler } from '../interfaces/InteractionHandler';
import { InteractionRecord } from '../InteractionRecord';

export abstract class InteractionRecorder implements InteractionHandler {
  private requestPreview: (record: InteractionRecord) => void;
  private reportFinishRecord: (record: InteractionRecord) => void;

  constructor(
    requestPreview: (record: InteractionRecord) => void,
    reportFinishRecord: (record: InteractionRecord) => void,
  ) {
    this.requestPreview = requestPreview;
    this.reportFinishRecord = reportFinishRecord;
  }

  protected finishRecord(record: InteractionRecord) {
    this.reportFinishRecord(record);
  }

  protected preview(record: InteractionRecord) {
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
