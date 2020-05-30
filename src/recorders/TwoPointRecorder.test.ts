import { TwoPointRecorder, TwoPointRecord } from './TwoPointRecorder';
import { InteractionEventType } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

describe('TwoPointRecorder', () => {
    let recorder: TwoPointRecorder;
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

        recorder = new TwoPointRecorder(preview, finish);
    });

    test('should call preview on moveDuringPress with move point and pressStart point', () => {
        pressStart(startPoint);
        moveDuringPress(endPoint);

        expect(preview).toBeCalledWith({ startPoint, endPoint });
    });

    test('should call finish on moveStop with stop point and start point, ignoring move point', () => {
        pressStart(startPoint);
        moveDuringPress({ x: 1, y: 2 });
        pressStop(endPoint);

        expect(finish).toBeCalledWith({ startPoint, endPoint });
    });
});
