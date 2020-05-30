import { PressRecorder } from './PressRecorder';
import { InteractionEventType } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

describe('PressRecorder', () => {
    let recorder: PressRecorder;
    let preview: jest.Mock;
    let finish: jest.Mock;

    function press(point: Point) {
        recorder.press({
            type: InteractionEventType.Press,
            position: point,
        });
    }

    beforeEach(() => {
        preview = jest.fn();
        finish = jest.fn();

        recorder = new PressRecorder(preview, finish);
    });

    test('should call finish on press', () => {
        press({ x: 0, y: 0 });

        expect(finish).toBeCalled();
    });
});
