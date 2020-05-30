import { RectangleTool } from './RectangleTool';
import { TwoPointRecord } from '../recorders/TwoPointRecorder';
import { PointScalarRecord } from '../recorders/PointScalarRecorder';
import { Canvas } from '../Canvas';

describe('RectangleTool', () => {
    test('should apply rect path to canvas base on TwoPointRecord', () => {
        const tool = new RectangleTool();

        const startPoint = { x: 10, y: 20 };
        const endPoint = { x: 30, y: 20 };

        const record = {
            startPoint,
            endPoint,
        };

        const canvas = new Canvas();

        tool.applyToContext(canvas.context, record);

        // @ts-ignore
        const producedPath: Path2D = canvas.context.stroke.mock.calls[0][0];

        expect(producedPath.rect).toBeCalledWith(
            startPoint.x,
            startPoint.y,
            endPoint.x - startPoint.x,
            endPoint.y - startPoint.y,
        );
    });

    test('should apply rect path to canvas base on PointScalarRecord', () => {
        const tool = new RectangleTool();

        const point = { x: 10, y: 10 };
        const value = 3;

        const record = {
            point,
            value,
        };

        const canvas = new Canvas();

        tool.applyToContext(canvas.context, record);

        // @ts-ignore
        const producedPath: Path2D = canvas.context.stroke.mock.calls[0][0];

        expect(producedPath.rect).toBeCalledWith(
            point.x - value / 2,
            point.y - value / 2,
            value,
            value,
        );
    });
});
