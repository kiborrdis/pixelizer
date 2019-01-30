import { Tool } from './Tool';
import { InteractionRecord } from '../InteractionRecord';
import { TwoPointRecord } from '../recorders/TwoPointRecorder';

export class LineTool extends Tool {
  public applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord) {
    if (record instanceof TwoPointRecord) {
      this.drawLineBasedOnTwoPoints(context, record);
      return;
    }

    super.applyToContext(context, record);
  }

  private drawLineBasedOnTwoPoints(context: CanvasRenderingContext2D, record: TwoPointRecord) {
    const path = new Path2D();

    path.moveTo(record.startPoint.x, record.startPoint.y);
    path.lineTo(record.endPoint.x, record.endPoint.y);

    context.stroke(path);
  }
}
