import { MultilineTool } from './MultilineTool';
import { NPointRecord } from '../recorders/NPointRecorder';
import { Canvas } from '../Canvas';

describe('MultilineTool', () => {
  test('should apply multiline path to canvas when NPointRecord has passed', () => {
    const tool = new MultilineTool();

    const points = [
      { x: 10, y: 20 },
      { x: 3, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 30, y: 20 },
    ];

    const record = { points };
    const canvas = new Canvas();

    tool.applyToContext(canvas.context, record);

    // @ts-ignore
    const producedPath: Path2D = canvas.context.stroke.mock.calls[0][0];

    expect(producedPath.moveTo).toBeCalledWith(points[0].x, points[0].y);

    points.slice(1).forEach((point, index) => {
      expect(producedPath.lineTo).toHaveBeenNthCalledWith(index + 1, point.x, point.y);
    });
  });
});
