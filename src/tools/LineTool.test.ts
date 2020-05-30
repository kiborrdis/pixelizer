import { LineTool } from './LineTool';
import { TwoPointRecord } from '../recorders/TwoPointRecorder';
import { Canvas } from '../Canvas';

describe('LineAction', () => {
  test('should apply line path to canvas', () => {
    const lineTool = new LineTool();

    const startPoint = { x: 10, y: 20 };
    const endPoint = { x: 30, y: 20 };

    const record = { startPoint, endPoint };

    const canvas = new Canvas();

    lineTool.applyToContext(canvas.context, record);

    // @ts-ignore
    const producedPath: Path2D = canvas.context.stroke.mock.calls[0][0];

    expect(producedPath.moveTo).toBeCalledWith(startPoint.x, startPoint.y);
    expect(producedPath.lineTo).toBeCalledWith(endPoint.x, endPoint.y);
  });
});
