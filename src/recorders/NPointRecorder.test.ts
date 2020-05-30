import { NPointRecorder, NPointRecord } from './NPointRecorder';
import { InteractionEventType } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

describe('NPointRecorder', () => {
    let recorder: NPointRecorder;
    let preview: jest.Mock;
    let finish: jest.Mock;

    const startPoint: Point = { x: 10, y: 20 };
    const endPoint: Point = { x: 20, y: 10 };

    function pressStart(point: Point) {
        recorder.pressStart({
            type: InteractionEventType.PressStart,
            position: point,
        });
    }

    function moveDuringPress(point: Point) {
        recorder.moveDuringPress({
            type: InteractionEventType.MoveDuringPress,
            position: point,
        });
    }

    function pressStop(point: Point) {
        recorder.pressStop({
            type: InteractionEventType.PressStop,
            position: point,
        });
    }

    beforeEach(() => {
        preview = jest.fn();
        finish = jest.fn();

        recorder = new NPointRecorder(preview, finish);
    });

    test('should call preview on moveDuringPress with array of points', () => {
        pressStart(startPoint);
        moveDuringPress({ x: 1, y: 2 });
        moveDuringPress(endPoint);

        expect(preview).toBeCalledWith({
            points: [startPoint, { x: 1, y: 2 }, endPoint],
        });
    });

    test('should call finish on moveStop with array of all points being interacted', () => {
        pressStart(startPoint);
        moveDuringPress({ x: 1, y: 2 });
        moveDuringPress({ x: 2, y: 1 });
        pressStop(endPoint);

        expect(preview).toBeCalledWith({
            points: [startPoint, { x: 1, y: 2 }, { x: 2, y: 1 }, endPoint],
        });
    });
});
