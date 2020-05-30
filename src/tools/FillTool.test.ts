import { FillTool } from './FillTool';
import { TwoPointRecord } from '../recorders/TwoPointRecorder';
import { InteractionRecord } from '../recorders/InteractionRecord';
import { Canvas } from '../Canvas';

describe('FillTool', () => {
  test('should apply fill rect path with size of canvas based on InteractionRecord', () => {
    const tool = new FillTool();
    const record = {};

    const canvas = new Canvas();

    tool.applyToContext(canvas.context, record, { width: 100, height: 200 });

    // @ts-ignore
    const producedPath: Path2D = canvas.context.fill.mock.calls[0][0];

    expect(producedPath.rect).toBeCalledWith(
      0,
      0,
      100,
      200,
    );
  });
});
