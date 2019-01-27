import { RectangleTool } from './RectangleTool';
import { InteractionRecord } from '../InteractionRecord';
import { TwoPointRecord } from '../TwoPointRecorder';
import { Canvas } from '../Canvas';

describe('RectangleTool', () => {
  test('should apply rect path to canvas', () => {
    const tool = new RectangleTool();

    const startPoint = { x: 10, y: 20 };
    const endPoint = { x: 30, y: 20 };

    const record = new TwoPointRecord();

    record.startPoint = startPoint;
    record.endPoint = endPoint;

    const canvas = new Canvas();

    tool.applyToContext(canvas.context, record);

    // @ts-ignore
    const producedPath: Path2D = canvas.context.stroke.mock.calls[0][0];

    expect(producedPath.rect).toBeCalledWith(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
  });
});
