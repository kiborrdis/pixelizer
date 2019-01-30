import { Tool } from './Tool';
import { InteractionRecord } from '../recorders/InteractionRecord';
import { TwoPointRecord } from '../recorders/TwoPointRecorder';
import { PointScalarRecord } from '../recorders/PointScalarRecorder';

export class RectangleTool extends Tool {
  public applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord) {
    if (record instanceof TwoPointRecord) {
      this.drawRectBasedOnTwoPoints(context, record);
      return;
    }

    if (record instanceof PointScalarRecord) {
      this.drawRectBasedOnPointScalar(context, record);
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

  private drawRectBasedOnPointScalar(context: CanvasRenderingContext2D, record: PointScalarRecord) {
    const path = new Path2D();

    path.rect(
      record.point.x - record.value / 2,
      record.point.y - record.value / 2,
      record.value,
      record.value,
    );

    context.stroke(path);
  }
}
