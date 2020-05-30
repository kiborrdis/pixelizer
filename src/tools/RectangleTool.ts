import { Tool } from './Tool';
import { TwoPointRecord, isTwoPointRecord } from '../recorders/TwoPointRecorder';
import { PointScalarRecord, isPointScalarRecord } from '../recorders/PointScalarRecorder';

export class RectangleTool extends Tool<TwoPointRecord | PointScalarRecord> {
  public applyToContext(context: CanvasRenderingContext2D, record: TwoPointRecord | PointScalarRecord) {
    if (isTwoPointRecord(record)) {
      this.drawRectBasedOnTwoPoints(context, record);
      return;
    }

    if (isPointScalarRecord(record)) {
      this.drawRectBasedOnPointScalar(context, record);
      return;
    }
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
