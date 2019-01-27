import { Tool } from '../Tool';
import { InteractionRecord } from '../InteractionRecord';
import { NPointRecord } from '../recorders/NPointRecorder';

export class MultilineTool extends Tool {
  public applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord) {
    if (record instanceof NPointRecord) {
      this.drawLineBasedOnArrayOfPoints(context, record);
      return;
    }

    super.applyToContext(context, record);
  }

  private drawLineBasedOnArrayOfPoints(context: CanvasRenderingContext2D, record: NPointRecord) {
    const path = new Path2D();
    const { points } = record;

    if (points.length < 1) {
      return;
    }

    path.moveTo(points[0].x, points[0].y);

    points.slice(1).forEach((point) => {
      path.lineTo(point.x, point.y);
    });

    context.stroke(path);
  }
}
