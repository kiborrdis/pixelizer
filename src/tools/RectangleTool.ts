import { Tool } from '../Tool';
import { InteractionRecord } from '../InteractionRecord';
import { TwoPointRecord } from '../TwoPointRecorder';

export class RectangleTool extends Tool {
  public applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord) {
    if (record instanceof TwoPointRecord) {
      this.drawRectBasedOnTwoPoints(context, record);
      return;
    }

    super.applyToContext(context, record);
  }

  private drawRectBasedOnTwoPoints(context: CanvasRenderingContext2D, record: TwoPointRecord) {
    const path = new Path2D();

    path.rect(
      record.startPoint.x,
      record.startPoint.y,
      record.endPoint.x - record.startPoint.x,
      record.endPoint.y - record.startPoint.y,
    );

    context.stroke(path);
  }
}
